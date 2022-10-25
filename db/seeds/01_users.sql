-- USERS
INSERT INTO users (name, email)
VALUES
('Paris', 'paris@email.com'),
('Lindsey', 'lindsey@lhl.ca'),
('Bondy', 'bondy@lhl.ca');


-- QUIZZES
INSERT INTO quizzes (name, user_id, likes, rating)
VALUES
('Easy general knowledge', 1, 18, 4.5 ),
('Geography Trivia', 2, 35, 4.2),
('Music Trivia', 3, 12, 3.5);


-- QUESTIONS
INSERT INTO questions (quiz_id, question,, option_1, option_2, option_3)
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
(3, 'Which classical composer was deaf?', 'Beethoven', 'Mozart', 'Bach', 'Chopin');

-- RESULTS

-- ANSWERS tbd







