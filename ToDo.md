# Quiz app

Basic idea behind this app:

Friends can create short quizes and send them to friends via URL.
Friends then answer the quiz and see what other people answered.

## Pages
* Main page /quiz
** main page after logging in
** shows list of quizes either created by the user or quizes they have been sent by other users
** Can click on a quiz to open up the quiz (/quiz/{quiz_slug})
** Can create new quiz questions. /quiz/admin

* /quiz/{quiz_slug}
** Will display the quiz that corresponds to the slug
** Display Title, Question and a Text Input to 
*** If user hasn't answered yet, it will show the quiz form and let them answer
*** Else, they will see the results of the quiz

* /quiz/{quiz_slug}/results
** Display results for the current quiz
** Results will be a table of each person that answered the quiz, showing users name and answer to quiz

* /quiz/admin
** Display a list of questions created by the logged in user
** Easily get URL to send to friends for each question
** Click on quiz to see results so far
** Show button to create a new quiz
** Allow Edit on quiz
** Allow Delete on quiz

* /quiz/admin/new
** New Question form
** Each Question has a Title and a Question
** Upon Post, save the quiz with a random GUID for slug


## Models
* Quiz
** Title - String
** Question - String
** Slug - String (random GUID) (Primary Key)
** Created By - User ID
** Created Date - Date

* Answers
** Slug - Foreign Key to Quiz
** ID - Primary Key
** Answered By - User ID
** Answered On - Date
** Answer - String


## POC
- [ ] Create Quiz Admin page
- [ ] Create Quiz Admin / New page
- [ ] Create Question/Slug page
- [ ] Create Question/Slug/Results page


