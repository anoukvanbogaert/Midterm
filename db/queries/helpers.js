const { Pool } = require("pg/lib");
const db = require("../connection");

// Grab user DB
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

// Get ALL quizzes
const getQuizzes = () => {
  return db.query("SELECT * FROM quizzes;").then((data) => {
    return data.rows;
  });
};

// Get 1 quiz from quiz_id
const getQuizById = (id) => {
  return db.query("SELECT quizzes.*, users.name as username FROM quizzes JOIN users On users.id = user_id WHERE quizzes.id = $1", [id])
    .then((data) => {
      return data.rows[0];
    });
};

// Grab quizzes DB
const getUserQuizzes = (id) => {
  return db
    .query("SELECT * FROM quizzes WHERE user_id = $1", [id])
    .then((data) => {
      return data.rows;
    });
};

// ADD quizz
const addQuiz = (name, user_id) => {
  return db
    .query("INSERT INTO quizzes (name, user_id) VALUES ($1, $2) RETURNING *;", [
      name,
      user_id,
    ])
    .then((data) => {
      return data.rows[0];
    });
};

// Grab questions DB
const getQuestionsForQuiz = (id) => {
  return db
    .query(
      "SELECT quizzes.id as id, question, option_1, option_2, option_3, option_4 FROM questions JOIN quizzes ON quizzes.id = quiz_id WHERE quiz_id = $1",
      [id]
    )
    .then((data) => {
      return data.rows;
    });
};

// Grab user with DB
const getUserWithId = (id) => {
  return db
    .query("SELECT id,name FROM users WHERE users.id = $1", [id])
    .then((data) => {
      console.log(data.rows[0]);
      return data.rows[0];
    });
};

const checkQuizAnswers = (id) => {
  return db
    .query("SELECT questions.id, answers.user_answer FROM answers JOIN questions ON questions.id = question_id WHERE question_id = $1", [id])
    .then((data) => {
      console.log(data.rows);
      return data.rows[0];
    })
    .then((obj) => {
      let correctAnswers = [];
      let userAnswers = [];
      console.log(obj);
    });
};

// export helper functions
module.exports = {
  getUsers,
  getQuizzes,
  getQuestionsForQuiz,
  getUserQuizzes,
  addQuiz,
  getUserWithId,
  getQuizById,
  checkQuizAnswers
};
