-- Users table seeds here (Example)
INSERT INTO users (name, email) VALUES ('Lindsey', 'lindsey@lhl.ca'); -- ID 1
INSERT INTO users (name, email) VALUES ('Paris', 'paris@email.com'); -- ID 2
INSERT INTO users (name, email) VALUES ('Bondy', 'bondy@lhl.ca'); -- ID 3

-- QUIZZES 
INSERT INTO quizzes (name, user_id) VALUES ('how smart am I', 1);
INSERT INTO quizzes (name, user_id) VALUES ('TEST FROM DB 1', 2);
INSERT INTO quizzes (name, user_id) VALUES ('TEST FROM DB 2', 3);

-- QUIZ QUESTIONS 
INSERT INTO questions (question, option_1, option_2, option_3, option_4, quiz_id)
VALUES ('Whats the capital of Germany', 'Paris', 'Berlin', 'Brussels', 'Amsterdam', 1),
('How many people live in canada', 'Less than 20 million', '20 million - 30 million', '30 million-50 million', 'more than 20 million', 1);







