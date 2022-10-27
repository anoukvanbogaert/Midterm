# SmartyParty Project

SmartyParty is a full stack web application built with Node / Express / jQuery / SASS / EJS to
allow users to be able to create/share/post quizzes in one place. Take a quiz , get results and share them.

## Final Product

## Dependencies

- Node.js
- Express
- EJS
- cookie-parser
- pg node
- jQuery (CDN)

## DEV Dependencies

- SASS
- morgan
- dotenv
- nodemon

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `npm start` command.

## Using Smarty Party

1. Start by logging in as a user by going to /users/login/ + "id of a user".
   For the purposes of this project demo / time , we are not
   using auth (bcrypt). This has been deminstrated with previous project.
   ![Screenshot](/_readMeUtils/screenshots/homepage.png)

2. Any user can see a list of public quizzes by clicking "All Quizzes" in the navbar.
   ![Screenshot](/_readMeUtils/screenshots/allquizzes.png)

3. To create a quiz , click the button "Create Quiz" on the home page.
   This will redirect you to a page where you can then specify the details about your quiz.
   Once created , you will be redirected to your quizzes page. This can also be done by clicking
   "My Quizzes" in the navbar. Here you can click on the blue button to take you to the quiz.

   ![Screenshot](/_readMeUtils/screenshots/createQuiz.png)

4. Once on the quiz. You can see the amount of questions and the title of the quiz and user name. You take an attempt at the quiz. Click "TAKE QUIZ!"
   ![Screenshot](/_readMeUtils/screenshots/createQuiz.png)

5. Clicking the button will take you to the quiz. Where you can fill out your awnsers. After clicking submit. You will see results displayed with your final score.

   ![Screenshot](/_readMeUtils/screenshots/takingQuiz.png)
