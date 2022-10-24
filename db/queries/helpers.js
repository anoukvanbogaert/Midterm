const { Pool } = require("pg/lib");
const db = require("../connection");

// Grab user DB
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

// Grab quizzes DB
const getQuizzes = () => {
<<<<<<< HEAD
  return db.query("SELECT * FROM quizzes;").then((data) => {
    return data.rows;
  });
=======
  return db.query('SELECT * FROM quizzes JOIN users ON users.id = user_id;')
    .then(data => {
      return data.rows;
    });
>>>>>>> refs/remotes/origin/master
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
      "SELECT quizzes.name, question, option_1, option_2, option_3, option_4 FROM questions JOIN quizzes ON quizzes.id = quiz_id WHERE quiz_id = $1",
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

// export helper functions
module.exports = {
  getUsers,
  getQuizzes,
  getQuestionsForQuiz,
  getUserQuizzes,
  addQuiz,
  getUserWithId,
};
