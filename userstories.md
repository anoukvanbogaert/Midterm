## Option 2: Quiz App
An app that lets you create quizzes and share them between friends. The creator of the quiz can view and share all the results at the end of the quiz.

## Requirements:
users can create quizzes
users can make their quiz unlisted (make them private and not available on the home page, but if someone knows the quiz URL they can visit and take the quiz)
users can share a link to a single quiz
users can see a list of public quizzes
users can see a list of public quizzes on the home page
users can attempt a quiz
users can see the results of their recent attempt
users can share a link to the result of their attempt

## Web pages for quiz
Home page - displays a list of user-created quizzes 

Quiz page - after clicking on a quiz on HomePage get redirected to a webpage with the quiz questions and answers 
(similar to compass quizzes)

Results page - shows the results of your quiz 

## routes 

Get '/' Home page - displays ALL quizzes (no questions) with the user that made it 

Get '/quizzes/"questionsID"' - after clicking on a quiz it will redirect to that quiz with the questions listed 

Get '/results' - redirects to the results for the quiz the user did - has an option to share 

<!-- Get '/quizzes/"userid"' - populates quiz name for user that owns that quiz  -->



