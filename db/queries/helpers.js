const {Pool} = require("pg/lib");
const db = require("../connection");

// Grab user DB
const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

// Get ALL quizzes
const getQuizzes = () => {
  return db.query("SELECT * FROM quizzes WHERE listed = TRUE;").then((data) => {
    return data.rows;
  });
};

const privateQuiz = (id) => {
  return db.query("UPDATE quizzes SET listed = FALSE WHERE id=$1", [id])
    .then((data) => {
      return data.rows[0];
    });
};

// count number of questions
const countQuestions = (id) => {
  return db.query('SELECT questions.* FROM questions WHERE quiz_id = $1', [id])
    .then((data) => {
      console.log('data', data);
      return data.rows.length;
    });
};

// Get 1 quiz from quiz_id
const getQuizById = (id) => {
  return db.query("SELECT quizzes.*, users.name as username FROM quizzes JOIN users On users.id = user_id WHERE quizzes.id = $1", [id])
    .then((data) => {
      return data.rows[0];
    });
};

// get quiz by name
const getQuizByName = (quizName) => {
  console.log('quizName', quizName);
  return db.query("SELECT id FROM quizzes WHERE name = $1", [quizName])
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

// adding questions from create quiz form to DB
const addQuestions = (questionName, correctAnswer, option1, option2, option3, quizId) => {
  return db
    .query('INSERT INTO questions (question, correct_answer, option_1, option_2, option_3, quiz_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [
      questionName,
      correctAnswer,
      option1,
      option2,
      option3,
      quizId
    ]);
};

const addScore = (userId, quizId, score) => {
  return db
    .query('INSERT INTO results (quiz_id, user_id, score) VALUES ($1, $2, $3) RETURNING  *;', [quizId, userId, score]);
};

const getResultsId = (userId, quizId, score) => {
  return db
    .query('SELECT id FROM results WHERE quiz_id = $1 AND user_id = $2 AND score = $3;', [quizId, userId, score])
    .then((data) => {
      console.log('data rows result id test', data.rows[0]);
      return data.rows[0];
    });
};



// Grab questions DB
const getQuestionsForQuiz = (id) => {
  return db
    .query(
      "SELECT quizzes.id as id, quizzes.name as quizName, question, correct_answer, option_1, option_2, option_3 FROM questions JOIN quizzes ON quizzes.id = quiz_id WHERE quiz_id = $1",
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
      return data.rows[0];
    });
};

//Grab correct_answers array
const correctAnswer = (id) => {
  return db
    .query("SELECT correct_answer FROM questions WHERE quiz_id = $1", [id])
    .then((data) => {
      return data.rows;
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
  countQuestions,
  addQuestions,
  getQuizByName,
  privateQuiz,
  correctAnswer,
  addScore,
  getResultsId,
};
