/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/helpers");

// Get ALL quizzes
router.get("/", (req, res) => {
  let userId = req.cookies.userId;
  let userName = req.cookies.userName;

  quizQueries.getQuizzes().then((quizzes) => {
    const templateVars = {
      quizzes,
      userId,
      userName,
    };

    // res.json({ quizzes });
    res.render("allquizzes", templateVars);
  });
});

// Get ALL quizzes
router.get("/", (req, res) => {
  quizQueries
    .getQuizzes()
    .then((quizzes) => {
      const templateVars = {
        quizzes,
      };
      res.render("allquizzes", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


// Create a new quiz
router.get("/create", (req, res) => {
  let userId = req.cookies.userId;
  let userName = req.cookies.userName;
  const templateVars = {
    userId,
    userName,
  };
  res.render("createquiz", templateVars);
});


// User owned quizzes (must be logged in)
router.get("/myQuizzes", (req, res) => {
  let userId = req.cookies.userId;
  let userName = req.cookies.userName;

  quizQueries.getUserQuizzes(userId).then((userQuizzes) => {
    const templateVars = {
      userQuizzes,
      userId,
      userName,
    };
    res.render("myQuizzes", templateVars);
  });
});

router.post("/", (req, res) => {
  //need to add more stuff
  let quizName = req.body.name;
  let userId = req.cookies.userId;
  quizQueries
    .addQuiz(quizName, userId)
    .then(() => {
      res.redirect("/quizzes");
    })

    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Get user owned quizzes
// Need params ID for quiz
router.get("/myquizzes/:id", (req, res) => {
  const { id } = req.params;
  quizQueries
    .getUserQuizzes(id)
    .then((quizzes) => {
      res.json({ quizzes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Show the selected quiz
router.get('/quiz/:id', (req, res) => {
  const {id} = req.params;
  let userName = req.cookies.userName;
  let userId = req.cookies.userId;
  let number;
  quizQueries.countQuestions(id)
    .then(numberOfQuestions => {
      number = numberOfQuestions;
    });
  quizQueries.getQuizById(id)
    .then(quizName => {
      const templateVars = {
        number,
        userId,
        quiz: id,
        quizName: quizName.name,
        userName: quizName.username
      };
      console.log(templateVars);
      res.render("takeQuiz", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Do a quiz
router.get('/quiz/:id/takequiz', (req, res) => {
  const {id} = req.params;
  const userId = req.cookies.userId;
  let userName = req.cookies.userName;
  quizQueries.getQuestionsForQuiz(id) // object of quiz name and questions
    .then(questionsObject => {
      const templateVars = {
        userName,
        userId, // index 0 in object templateVars
        questionsObject // index 1 in object templateVars and an array of objects per question
      };
      console.log('questionsobject', questionsObject, 'templatevars', templateVars);
      res.render("actuallyTakingQuiz", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// actually take quiz button redirects to results
router.post('/results', (req, res) => {
  const id = req.params;
  res.redirect(`quiz/${id}/takequiz`);
});

module.exports = router;
