/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { request } = require("express");
const express = require("express");
const router = express.Router();
const quizQueries = require("../db/queries/helpers");

// Get ALL quizzes
router.get("/", (req, res) => {
  let userId = req.cookies.userId;
  let userName = req.cookies.userName;
  quizQueries
    .getQuizzes()
    .then((quizzes) => {
      const templateVars = {
        quizzes,
        userId,
        userName,
      };

      // res.json({ quizzes });
      res.render("allquizzes", templateVars);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/create", (req, res) => {
  let userId = req.cookies.userId;
  let userName = req.cookies.userName;
  const templateVars = {
    userId,
    userName,
  };
  res.render("createquiz", templateVars);
});

router.get("/myQuizzes", (req, res) => {
  let userId = req.cookies.userId;
  let userName = req.cookies.userName;

  quizQueries.getUserQuizzes(userId).then((userQuizzes) => {
    console.log(userQuizzes);
    const templateVars = {
      userQuizzes,
      userId,
      userName,
    };
    res.render("myQuizzes", templateVars);
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
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
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  quizQueries
    .getUserQuizzes(id)
    .then((quizzes) => {
      res.json({ quizzes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
