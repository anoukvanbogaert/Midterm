// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

const quizQueries = require("./db/queries/helpers");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({extended: true}));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require("./routes/users-api");
const quizzesApiRoutes = require("./routes/quizzes-api");
const questionsApiRoutes = require("./routes/questionsForQuiz-api");
const {all} = require("./routes/quizzes-api");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/users", userApiRoutes);
app.use("/quizzes", quizzesApiRoutes);
app.use("/questions", questionsApiRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  let userId = req.cookies.userId;
  let userName = req.cookies.userName;
  let templateVars = {
    userId,
    userName,
  };
  res.render("index", templateVars);
});

app.get('/results/:id', (req, res) => {
  let userId = req.cookies.userId;
  let userName = req.cookies.userName;
  // let userName = req.cookies.userName;
  const resultId = req.params.id;
  let score = 0;
  let testersName = '';
  let numberOfQuestions = 0;

  let templateVars = {
    userId,
    userName,
  };

  quizQueries.getScore(resultId) // score and quiz id 
    .then((result) => {
      console.log('TEST', result);
      score = result[0].score;
      testersName = result[0].name;
      templateVars.score = score;
      templateVars.name = testersName;
      quizQueries.countQuestions(result[0].quiz_id)
        .then((num) => {
          numberOfQuestions = num.toString();
          templateVars.number = num.toString();
          res.render("resultsPage", templateVars);
        });
    });



});

app.post("/results", (req, res) => {
  let userId = req.cookies.userId;
  let score = 0;
  const quizId = req.headers.referer[35];

  quizQueries.correctAnswer(quizId)
    .then((data) => {
      let answerArray = [];
      for (let i = 0; i < data.length; i++) {
        answerArray.push(data[i].correct_answer);
      }
      for (let i = 0; i < answerArray.length; i++) {
        if (answerArray[i] === req.body.answers[i]) {
          score++;
        }
      }
      quizQueries
        .addScore(userId, quizId, score)
        .then(() => {
          const resultId = quizQueries.getResultsId(userId, quizId, score);
          return resultId
            .then((resultId) => {
              res.json(resultId.id);
            });
        });
    }
    );
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
