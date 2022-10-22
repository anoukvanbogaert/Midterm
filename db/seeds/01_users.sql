-- Users table seeds here (Example)
INSERT INTO users (name, email) VALUES ('lindsey', 'lindsey@lhl.ca');

INSERT INTO quizzes (name, user_id) VALUES ('how smart am I', 1);

INSERT INTO questions (question, option_1, option_2, quiz_id) 
VALUES ('Whats the capital of Germany', 'Paris', 'Berlin', 1),
('How many people live in canada', 'Less than 20 million', 'more than 20 million', 1);

-- quizz id not necessary because we already have question id and every question is linked to a specific quizz
INSERT INTO users_questions (user_id, question_id, answer) 
VALUES (1, 1, 'Berlin'), 
(1, 1, 'more than 20 million');







