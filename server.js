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
app.use(express.urlencoded({ extended: true }));
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

app.post("/results", (req, res) => {
  let score = 0;
  let final = 0;
  let finalScore = `${score}/${final}`;
  const quizId = req.headers.referer[35];
  const correctArray = Promise.all([quizQueries.correctAnswer(quizId)]).then(
    (data) => {
      let answerArray = [];

      for (let i = 0; i < data[0].length; i++) {
        answerArray.push(data[0][i].correct_answer);
      }
      final = answerArray.length;
      for (let i = 0; i < answerArray.length; i++) {
        if (answerArray[i] === req.body.answers[i]) {
          console.log(
            answerArray[i],
            "DOES ===",
            req.body.answers[i],
            "correct!"
          );
          score++;
        } else {
          console.log(
            answerArray[i],
            "DOES NOT !=",
            req.body.answers[i],
            "Wrong!"
          );
        }
      }
      console.log(score, "correct awnsers");
    }
  );
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
