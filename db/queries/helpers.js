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
const getUserQuizzes = () => {
  return db.query('SELECT * FROM quizzes WHERE user_id = 2;')
    .then(data => {
      return data.rows[0];
    });
};

// Grab questions DB
const getQuestionsForQuiz = () => {
  return db.query('SELECT quizzes.name, question FROM questions JOIN quizzes ON quizzes.id = quiz_id WHERE quiz_id = 1;')
    .then(data => {
      return data.rows;
    });
};


// export helper functions
module.exports = {getUsers, getQuizzes, getQuestionsForQuiz, getUserQuizzes};

