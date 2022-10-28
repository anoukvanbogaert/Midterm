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

// Get user owned quizzes
// Need params ID for quiz
router.get("/myquizzes/:id", (req, res) => {
  const {id} = req.params;
  quizQueries
    .getUserQuizzes(id)
    .then((quizzes) => {
      res.json({quizzes});
    })
    .catch((err) => {
      res.status(500).json({error: err.message});
    });
});

// Show the selected quiz
router.get("/quiz/:id", (req, res) => {
  const {id} = req.params;
  let userName = req.cookies.userName;
  let userId = req.cookies.userId;
  let number;
  quizQueries.countQuestions(id).then((numberOfQuestions) => {
    number = numberOfQuestions;
  });
  quizQueries
    .getQuizById(id)
    .then((quizName) => {
      const templateVars = {
        number,
        userId,
        userName,
        quiz: id,
        quizName: quizName.name,
        quizMaker: quizName.username
      };
      res.render("takeQuiz", templateVars);
    })
    .catch((err) => {
      res.status(500).json({error: err.message});
    });
});

// Do a quiz // [0, 1, 2, 3]
router.get("/quiz/:id/takequiz", (req, res) => {
  const {id} = req.params;
  const userId = req.cookies.userId;
  let userName = req.cookies.userName;
  let quizName = '';
  quizQueries.getQuizById(id).then((title) => {
    quizName = title.name;
  });

  quizQueries
    .getQuestionsForQuiz(id) // object of quiz name and questions
    .then((questionsObject) => {
      const templateVars = {
        quizName,
        userName,
        userId, // index 0 in object templateVars
        questionsObject, // index 1 in object templateVars and an array of objects per question
      };
      console.log('rapunzel', templateVars.quizName);
      res.render("actuallyTakingQuiz", templateVars);
    })
    .catch((err) => {
      res.status(500).json({error: err.message});
    });
});

// POST ROUTES
// actually take quiz button redirects to results
router.post("/results", (req, res) => {
  const id = req.params;
  res.redirect(`quiz/${id}/takequiz`);
});

// submits new quiz information
router.post("/", (req, res) => {
  const questions = req.body;
  console.log(questions);
  const quizName = req.body.name;
  console.log('name', quizName);
  console.log('question', questions);
  let userId = req.cookies.userId;

  quizQueries
    .addQuiz(quizName, userId)
    .then(() => {
      let quizId;
      quizQueries.getQuizByName(quizName).then((obj) => {
        console.log('obj: ', obj);
        quizId = obj.id;
        console.log('name: ', quizName);
        for (let i = 0; i < 5; i++) {
          const question = questions[`question${i + 1}`];
          const [questionName, correctAnswer, option1, option2, option3] = question;
          console.log('Testing error', quizId);
          quizQueries.addQuestions(questionName, correctAnswer, option1, option2, option3, quizId);
        }
      })
        .then(() => {
          res.redirect("/quizzes");
        })
        .catch((err) => {
          res.status(500).json({error: err.message});
        });

    });
});

// Remove user owned quiz from homepage
router.post('/:id/update', (req, res) => {
  const userId = req.cookies.userId;
  let userName = req.cookies.userName;
  quizQueries.getUserQuizzes(userId).then((userQuizzes) => {
    const templateVars = {
      userQuizzes,
      userId,
      userName,
    };

    const quizId = req.params;
    quizQueries.privateQuiz(quizId.id) //quizId is an object
      .then(() => {
        res.render('myQuizzes', templateVars);
      })
      .catch((err) => {
        res.status(500).json({error: err.message});
      });
  });
});



module.exports = router;
