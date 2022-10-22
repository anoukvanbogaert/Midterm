const {Pool} = require('pg/lib');
const db = require('../connection');

// Grab user DB
const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

// Grab quizzes DB
const getQuizzes = () => {
  return db.query('SELECT * FROM quizzes;')
    .then(data => {
      return data.rows;
    });
};

// Grab quizzes DB
const getUserQuizzes = (id) => {
  return db.query('SELECT * FROM quizzes WHERE user_id = $1', [id])
    .then(data => {
      return data.rows[0];
    });
};

// Grab questions DB
const getQuestionsForQuiz = (id) => {
  return db.query('SELECT quizzes.name, question, option_1, option_2, option_3, option_4 FROM questions JOIN quizzes ON quizzes.id = quiz_id WHERE quiz_id = $1', [id])
    .then(data => {
      return data.rows;
    });
};


// export helper functions
module.exports = {getUsers, getQuizzes, getQuestionsForQuiz, getUserQuizzes};

