# Information for Graders

Please add any information that might be relevant to the grader.  This file
will not be marked, but if the grader is confused by your work, or is looking
for more information about your design decisions, or is wondering why something
doesn't quite work he or she will look here to find some insight into your
thought process. The grader will also look at the documentation in your HTML,
CSS, and JavaScript files.

Done by: Shafaaf Khaled Hossain, utorid - hossai68, student number - 998891515, emailID - shafaaf.hossain@mail.utoronto.ca

Explanations from me: 
All instructions mentioned in handout are implemented including grading, showing accumulated score, resetting quiz etc. Grade and resetting quiz are at the top right bar which is fixed.
Code commented, indented. Done in full screen in sublime text, so see in full screen to see layout style of code better.
References are on the bottom of the page and in the references.txt file

Details and additional features below.

The website is somewhat almost fully responsive as an additional feature.
In all the questions the user will be graded based on his submitted answer on the first attempt unless he resets the quiz where he will be graded for each question again.

Question 1: Here the user can chose to see all/individual explanations after chosing 1 answer.

As an additional feature for this question, after grading and clicking on "see all answers", user can hide all answers and then can continue looking at indivitual answers by clicking on each. Clicking on each answer will not work when seeing all answers. User has to click on "hide all answers" button first.

Question 2: Here the user can select/deselect items by clicking on them. User can only submit 2 items at a time and selecting more/less items will notify the user with an error message.

As an additional feature for this question, after getting graded for first attempt, the user can continue playing and try to guess the correct answer with the appropriate response displayed at the bottom although his initial grade will not change.

Question 3: Here the user choses an item from the left and a corresponding item from the right to make a pair. Having weird pairs like pairing 2 left items or 2 right items will notify the user of an error message. When a professor in the left is selected or a pair is made, a status update is made on top, and error messages are made at the bottom in red. See these if get confused on what selected. 
To deselect a pair made before, one can either just click on the used left professior OR select a professor from the right and make a new pair with a fact already used to overwrite the old pair. Colors will be reused accordingly.

Additional features for this question are as described above. These are select-deselect pairs with colors, status updates, error messages, overwrite other pairs etc
Spent a lot of time for this question to figure out cases, match and reuse colors, highlight and unhighlight, removing pairs etc.

Question 4:
Here the user can drag and drop inventions from the bottom box to the top box. Statues and reponses will be displayed at the bottom.
Note: Always select one item at a time or else may get errors. If not dragging, probably something else focused on like the submit button, so deselect by clicking in the background or refresh.

As an additional feature for this question, after getting graded for first attempt, the user can continue playing and try to guess the correct answer although his initial grade will not change. He will need to reset the quiz to get a new grade.

My references:
http://stackoverflow.com/questions/2829665/align-div-with-fixed-position-on-the-right-side
http://stackoverflow.com/questions/16406015/how-can-i-create-a-fixed-top-bar
http://www.w3schools.com/css/css3_borders.asp
http://www.w3schools.com/jsref/jsref_push.asp
http://www.w3schools.com/js/js_htmldom_html.asp
http://www.w3schools.com/html/html5_draganddrop.asp
http://stackoverflow.com/questions/1208222/how-do-i-implement-a-dictionary-or-hashtable-in-javascript
http://stackoverflow.com/questions/3010840/loop-through-an-array-in-javascript
http://www.w3schools.com/jsref/met_loc_reload.asp
http://stackoverflow.com/questions/9277311/horizontally-aligning-divs
http://stackoverflow.com/questions/7560832/how-to-center-a-button-within-a-div
