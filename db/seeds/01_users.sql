-- Users table seeds here (Example)
INSERT INTO users (name, email) VALUES ('lindsey', 'lindsey@lhl.ca'); -- ID 1
INSERT INTO users (name, email) VALUES ('Paris', 'paris@email.com'); -- ID 2

-- QUIZ 1 - ID 1
INSERT INTO quizzes (name, user_id) VALUES ('how smart am I', 1);

INSERT INTO questions (question, option_1, option_2, option_3, option_4, quiz_id)
VALUES ('Whats the capital of Germany', 'Paris', 'Berlin', 'Brussels', 'Amsterdam', 1),
('How many people live in canada', 'Less than 20 million', '20 million - 30 million', '30 million-50 million', 'more than 20 million', 1);

-- QUIZ 2 -- ID 2

INSERT INTO quizzes (name, user_id) VALUES ('Do you know Cats?', 2);

INSERT INTO questions (question, option_1, option_2, option_3, option_4, quiz_id)
VALUES ('What percent of a Cats genome is Tiger?', '95.6', '50', '60', '70',  2),
('How high can a cat jump?', 'Six times their length', 'As high as they want', 'Up to six feet', 'My cat is lazy', 2),
('Which of the following is true?', 'A cat cannot taste sweetness', 'Cats have 100 bones', 'There are no whiskers on their front legs', 'Females are more likely to be left-pawed', 2);


INSERT INTO users_questions (user_id, question_id, answer)
VALUES(2, 2, '95.6'),
(2, 2, 'Six times their length'),
(2, 2, 'A cat cannot taste sweetness');

-- user replies for specific questions

-- FOR QUIZ 1 USER 1
INSERT INTO users_questions (user_id, question_id, answer)
VALUES (1, 1, 'Berlin'),
(1, 2, 'more than 20 million');


-- FOR QUIZ 2 USER 2
INSERT INTO users_questions (user_id, question_id, answer)
VALUES(2, 2, '95.6'),
(2, 2, 'Six times their length'),
(2, 2, 'A cat cannot taste sweetness');


-- user 1 scores 2/2 for quizz 1 and 2/3 for quizz 2
INSERT INTO scores (quiz_id, user_id, score)
VALUES
(1, 1, 2/2),
(2, 1, 2/3);


-- user 2 scores 1/2 for quiz 1 and 3/3 for quiz 2
INSERT INTO scores (quiz_id, user_id, score)
VALUES (1, 2, 1/2),
(2, 2, 3/3);



