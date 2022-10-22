/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const quizQueries = require('../db/queries/helpers');

// // Get ALL quizzes
// router.get('/', (req, res) => {
//   quizQueries.getQuizzes()
//     .then(quizzes => {
//       res.json({ quizzes });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

// Get user owned quizzes
// Need params ID for quiz
router.get('/', (req, res) => {
  quizQueries.getUserQuizzes()
    .then(quizzes => {
      res.json({ quizzes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

