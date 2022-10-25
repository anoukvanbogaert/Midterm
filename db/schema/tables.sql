DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS users_questions CASCADE;
DROP TABLE IF EXISTS scores CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  likes smallint NOT NULL DEFAULT 0,
  rating smallint NOT NULL DEFAULT 5
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY NOT NULL,
  question TEXT,
  correct_answer TEXT,
  option_1 TEXT,
  option_2 TEXT,
  option_3 TEXT,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE
);

CREATE TABLE answers (
id SERIAL PRIMARY KEY NOT NULL,
result_id INEGER NOT NULL REFERENCES results(id) ON DELETE CASCADE,
question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
user_answer TEXT
);

CREATE TABLE results (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answer_id INTEGER NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  score INTEGER
);




