# Coding-Language-Quiz
Purpose of this website is to enable users to test their knowledge on common coding language questions.
This will be done by creating a quiz website that generates questions for you to answer until the timer runs out.
This was achievable with html,script.js,style.css and quizapi.
Html was used to set the frame work for the type of webpage being created we also used it to link other used files. All buttons being used on webpage their format originates inside the html file also used to decide language being used etc.
Script.js was used to make the webpage interactive, in the javascript file we place the functions needed to achieve desired goals.
I used functions to make calls to the api for the quiz questions and answers upon certain buttons being pressed, thisalso used eventlisteners.
I used countdown functions to start a timer counting down upon starting the quiz. More event listeres where added to start the quiz before the information was fetched.
Style css was used to dictate background color , font size, also position of the text was centered using text alighn center command.
Biggest problem encountered is the api used doesnt transmit answer options on its free api, it sends random generated coding questions but not the multiple choice answer options .For future development I need to link more efficent API to resolve this issue.
Deployable link: http://127.0.0.1:5501/index.html