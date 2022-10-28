-- USERS
INSERT INTO users (name, email)
VALUES
('Paris', 'paris@email.com'),
('Lindsey', 'lindsey@lhl.ca'),
('Bondy', 'bondy@lhl.ca'),
('Steven', 'steven@lhl.ca');


-- QUIZZES
INSERT INTO quizzes (name, user_id, likes, rating, listed)
VALUES
('Easy general knowledge', 1, 18, 4.5, TRUE),
('Geography Trivia', 2, 35, 4.2, TRUE),
('Music Trivia', 3, 12, 3.5, TRUE),
('Do you know cats?', 4, 23, 5, TRUE),
('Do you wear wigs?', 1, 21, 5, TRUE);


-- QUESTIONS
INSERT INTO questions (quiz_id, question,correct_answer, option_1, option_2, option_3)
VALUES
-- QUIZ QUESTIONS FOR QUIZ 1
(1, 'Which one of the following scientists is known for their contributions to the science of evolution?', 'Marie Curie', 'Thomas Edison', 'Stephen Hawking', 'Charles Darwin'),
(1, 'Which fruit is associated with Isaac Newton?', 'Apple', 'Pear', 'Pineapple', 'Banana'),
(1, 'Which one of the following actors did not play James Bond?', 'Colin Firth', 'Daniel Craig', 'Pierce Brosnan', 'Sean Connery'),
-- QUIZ QUESTIONS FOR QUIZ 2
(2, 'Whats the capital of Germany', 'Paris', 'Berlin', 'Brussels', 'Amsterdam'),
(2, 'How many people live in canada', 'Less than 20 million', '20 million - 30 million', '30 million-50 million', 'more than 20 million'),
(2, 'Arnold Schwarzenegger was the governor of which American state?', 'Florida', 'Texas', 'California', 'Montana'),
-- QUIZ QUESTIONS FOR QUIZ 3
(3, 'How many lines are on the Spotify logo?', '3', '4', '2', '5'),
(3, 'What was Madonnas first top 10 hit?', 'Holiday', 'Like a Prayer', 'La Isla Bonita', 'Hung Up'),
(3, 'Which classical composer was deaf?', 'Beethoven', 'Mozart', 'Bach', 'Chopin'),
-- QUIZ QUESTIONS FOR QUIZ 4
(4, 'What percent of a house cats genome is tiger?', '95.6%', '76.5%', '50%', '65%'),
(4, 'How high can a cat jump?', 'Up to six times their height', 'Six feet', 'My cat is lazy', 'Nine feet'),
(4, 'How many bones do cats have?', '230', '150', '400', '300'),
--QUIZ QUESTIONS FOR QUIZ 5
(5, 'Well, do you wear wigs?', 'Uh, no I do not', 'Yes', 'No', 'Maybe'),
(5, 'Have you worn wigs?', 'No I have not', 'Yes', 'No', 'Maybe'),
(5, 'Will you wear wigs?', 'Maybe?', 'Yes', 'No', 'Maybe'),
(5, 'When will you wear wigs?', '*LAUGHS*', 'Yes', 'No', 'Maybe');








