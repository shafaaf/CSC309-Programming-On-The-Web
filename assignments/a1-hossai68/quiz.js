'use strict';


/*
	Full comment lines to separate code for each question
	Half comment line to separate functions in same question
*/

/*------------------------------------------------------------------------------------------------------------------------------------------------*/
														/* Most Imp Variables*/

var totalGrade = 0;
var totalDenominator = 0;
var totalAttempts = 0;

var question1Complete = 0;
var question1Score;
var question1Denominator = 1;

var question2Complete = 0;
var question2Score;
var question2Denominator = 2;

var question3Score;
var question3Denominator = 4;

var question4Complete = 0;
var question4Score;
var question4Denominator = 1;

/*------------------------------------------------------------------------------------------------------------------------------------------------*/
														/*Question 1 Javascipt*/

//Explanations to each question
var answer1 = "Incorrect: The HAL 9000 is a fictional computer from Arthur C. Clarke's 2001: A Space Odyssey."
var answer2 = "Correct: The machine arrived in Canada on April 30, 1952.  Named FERUT (FERranti U of T), it was used to compute changes in water levels due to the opening of the St. Lawrence Seaway.";
var answer3 = "Incorrect: The ILLIAC was built at the University of Illinois. It was the first von Neumann architecture computer built and owned by an American university. It was put into service on September 22, 1952.";
var answer4 = "Incorrect: The UNIVAC was the first commericial computer produced in the United States, and was designed by J. Presper Eckert and John Mauchly.  The United States Census Department received delivery of the first UNIVAC in May 1952.";

//Says whether you can show all answer when click on show/hide all answers button
var showAllAnswers = 1;

/*--------------------------------------------------------------------------------*/

//Called when any answers is clicked on
function clickQuestion1(id)
{
	//Remove the answer current answer if user has selected one
	if(showAllAnswers == 0)
	{
		document.getElementById("chosenExplanation").innerHTML = "";
	}
	else
	{
		if(question1Complete == 1)
		{
			document.getElementById("chosenExplanation").innerHTML = "";
		}

		//Do appropriate action for each selection
		var selected;
		var correct;
		var selectedText;

		if(id == "question1Choice1")
		{
			selected = document.createTextNode(answer1);
			selectedText = answer1;
			correct = 0;
		}

		//Correct answer
		else if(id == "question1Choice2")
		{
			selected = document.createTextNode(answer2);
			selectedText = answer2;		
			correct = 1;

		}

		else if(id == "question1Choice3")
		{	
			selected = document.createTextNode(answer3);
			selectedText = answer3;		
			correct = 0;
		}

		else if(id == "question1Choice4")
		{
			selected = document.createTextNode(answer4);
			selectedText = answer4;
			correct = 0;
		}

		//Grade it if done for first time, or else not
		if(question1Complete == 0)
		{
			if(id == "question1Choice2")
			{
				question1Score = 1;
				totalGrade = totalGrade + question1Score;
				totalDenominator = totalDenominator + question1Denominator;

				//Updating local score
				var element = document.getElementById("question1Grade");
				element.innerHTML = "Correct! You chose FERUT. You received 1 out of 1!";
				element.style["text-align"] = "center";
				element.style["color"] = "green";

				//Updating global score
				var element = document.getElementById("totalScore");
				element.innerHTML = "Total score: " + totalGrade + "/" + totalDenominator;
			}

			else
			{
				question1Score = 0;
				totalGrade = totalGrade + question1Score;
				totalDenominator = totalDenominator + question1Denominator;

				//updating local score
				var element = document.getElementById("question1Grade");
				element.innerHTML = "Wrong! You did not chose the correct answer on your first try. You received 0 out of 1! You may still try although the score will not change.";
				element.style["text-align"] = "center";
				element.style["color"] = "red";

				//Updating global score
				var element = document.getElementById("totalScore");
				element.innerHTML = "Total score: " + totalGrade + "/" + totalDenominator;
			}
		}

		//Make new button to show all answers
		if(question1Complete == 0)
		{
			var btn = document.createElement("BUTTON");        
			var t = document.createTextNode("Show all answers");
			btn.appendChild(t);
			var element = document.getElementById("question1");
			element.appendChild(btn);
			btn.id = "question1ShowAllAnswersBtn";
			btn.setAttribute("onclick", "showAllAnswersFunction()"); + 1;
			
			totalAttempts = totalAttempts + 1;
			if(totalAttempts == 4)
			{
				alert("You have received a score of " + totalGrade + " out of " + totalDenominator + "! Reset to try again!");
				var e  = document.getElementById("resetButton");
				e.style["visibility"] = "visible";
			}
		}

		//Make para for explanation of chosen answer
		document.getElementById("chosenExplanation").innerHTML = selectedText;		
		question1Complete = 1;
	}	

}

/*--------------------------------------------------------------------------------*/

//Showing and hiding all answers afer a user has clicked on show/hide all button
function showAllAnswersFunction()
{
	//Show all answers (regardless of correct or not)
	if(showAllAnswers == 1)
	{

		//Explanations
		document.getElementById("chosenExplanation").innerHTML = "";
		var element = document.getElementById("showAllAnswersSection");
		element.style["text-align"] = "center";

		var para = document.createElement("h4");
		var node = document.createTextNode("All answers with explanations below");
		para.appendChild(node);
		element.appendChild(para);

		para = document.createElement("p");
		node = document.createTextNode(answer1);
		para.appendChild(node);
		element.appendChild(para);

		para = document.createElement("p");
		node = document.createTextNode(answer2);
		para.appendChild(node);
		element.appendChild(para);
		
		para = document.createElement("p");
		node = document.createTextNode(answer3);
		para.appendChild(node);
		element.appendChild(para);
		
		para = document.createElement("p");
		node = document.createTextNode(answer4);
		para.appendChild(node);
		element.appendChild(para);

		//Make the button to hide all answers
		document.getElementById("question1ShowAllAnswersBtn").innerHTML = 'Hide answers';
		showAllAnswers = 0;
	}

	//Hide all answers
	else
	{
		var myNode = document.getElementById("showAllAnswersSection");
		while (myNode.firstChild) 
		{
    		myNode.removeChild(myNode.firstChild);
		}
		//next click will show all answers
		document.getElementById("question1ShowAllAnswersBtn").innerHTML = 'Show all answers';
		showAllAnswers = 1;
	}


}

/*------------------------------------------------------------------------------------------------------------------------------------------------*/
														/*Question 2 Javascipt*/
//USer selections
var question2Selections = [];

//Right answers
var question2RightAnswer1 = "function";
var question2RightAnswer2 = "variable";

/*--------------------------------------------------------------------------------*/

//This function called when a user clicks on an option
//Here ids are used as option name
function clickQuestion2(id)
{
	//An item selected for first time
	if(question2Selections.indexOf(id) <= -1)
	{
		var element = document.getElementById(id);
		element.style["background-color"] = "green";
		element.style["color"] = "white";
		question2Selections.push(id);
	}

	//Item selected is already selected so remove and unhighlight
	else
	{
		var element = document.getElementById(id)
		element.style["background-color"] = "white";
		element.style["color"] = "black";
		var index = question2Selections.indexOf(id);
		question2Selections.splice(index, 1);
	}
}

/*--------------------------------------------------------------------------------*/

//This function called when user clicks on submit button
function question2ButtonSubmit()
{
	var question2CurrentScore = 0;
	var element = document.getElementById("question2Response");
	
	//Submitted nothing
	if(question2Selections.length == 0)
	{
		element.innerHTML = "Selected no words: Your answer is incomplete.  Please select 2 words.";
		element.style["color"] = "red";
	}
	else if(question2Selections.length == 1)
	{
		element.innerHTML = "Selected 1 word: Your answer is incomplete.  Please select another word.";
		element.style["color"] = "red";
	}
	else if (question2Selections.length > 2)
	{
		element.innerHTML = "Selected too many words: Only two words can be selected. Please try again.";
		element.style["color"] = "red";
	}

	//Number of words selected is at least correct
	else if (question2Selections.length == 2)
	{
		var firstItem;
		var correctWords = [];
		var wrongWords = [];

		/*Insert correct options into correctWords Array
		  and insert wrong options into wrongWords Array*/
	    
	    if((question2Selections[0] == question2RightAnswer1) || (question2Selections[0] == question2RightAnswer2))
	    {
	    	correctWords.push(question2Selections[0]);
	    }
	    else
	    {
	    	wrongWords.push(question2Selections[0]);
	    }

	    if((question2Selections[1] == question2RightAnswer1) || (question2Selections[1] == question2RightAnswer2))
	    {
	    	correctWords.push(question2Selections[1]);
	    }
	    else
	    {
	    	wrongWords.push(question2Selections[1]);
	    }

	    //If both words selected are correct
	    if(correctWords.length == 2)
	    {
	    	element.innerHTML = "Correct: Yes!  It is hard to believe that words we take for granted in computing were once so new.";
			element.style["color"] = "green";
			question2CurrentScore = 2;
	    }

	    //at least 1 not correct
	    else if(correctWords.length == 1)
	    {
	    			
			element.innerHTML = "Incorrect: You picked "+ correctWords[0] + " correctly, but " + wrongWords[0] + " is one of the words that Professors Gotlieb and Hume got credit for.";
			element.style["color"] = "red";
			question2CurrentScore = 0;    	
	    }

	    //Both wrong
	    else if(correctWords.length == 0)
	    {
	    	element.innerHTML = "Incorrect: Both words you chose are words that Professors Gotlieb and Hume were quoted for in the OED.";
			element.style["color"] = "red";
			question2CurrentScore = 0;
	    }
	    else
	    {
	    	element.innerHTML = "Weird case 4";
			element.style["color"] = "red";
	    }

	    //Upgrade grade only once on first try
	    if(question2Complete == 0)
	    {	
	    	question2Score = question2CurrentScore;
	    	question2Complete = 1;

	    	totalGrade = totalGrade + question2Score;
			totalDenominator = totalDenominator + question2Denominator;

	    	//Showing grade
	    	var element = document.getElementById("question2Grade");

	    	//User correct 
	    	if(question2Score == 2)
	    	{	
	    		//updating local score
	    		element.innerHTML = "You received 2 points out of 2 for choosing function and variable on first try!";
	    		element.style["color"] = "green";
	    		element.style["text-align"] = "center";

	    		//updating global score
	    		element = document.getElementById("totalScore");
				element.innerHTML = "Total score: " + totalGrade + "/" + totalDenominator;
	    	}

	    	//user wrong
	    	else
	    	{
	    		//updating local score
	    		element.innerHTML = "You received 0 points out of 2 for first try! You can try keep trying to get the answers but score wont change!";
	    		element.style["color"] = "red";
	    		element.style["text-align"] = "center";

	    		//updating global score
	    		element = document.getElementById("totalScore");
				element.innerHTML = "Total score: " + totalGrade + "/" + totalDenominator;
			}

			totalAttempts = totalAttempts + 1;
			if(totalAttempts == 4)
			{
				alert("You have received a score of " + totalGrade + " out of " + totalDenominator + "! Reset to try again!");
				var e = document.getElementById("resetButton");
				e.style["visibility"] = "visible";
			}
	 
	    }	

	}
	else
	{
		element.innerHTML = "Weird case";
		element.style["color"] = "red";

	}

}


/*------------------------------------------------------------------------------------------------------------------------------------------------*/
														/*Question 3 Javascipt*/

//Associative arrays (used as dicts) to grade and coloring.
//These are the answers
var question3DictionaryAnswers = {};
question3DictionaryAnswers["Daniel"] = "Taught";
question3DictionaryAnswers["Stephen"] = "Turing";
question3DictionaryAnswers["Geoff"] = "Pioneer";
question3DictionaryAnswers["Karan"] = "Academy";
question3DictionaryAnswers["Diane"] = "Winner";
question3DictionaryAnswers["Raquel"] = "Canada";
question3DictionaryAnswers["David"] = "Associate";
question3DictionaryAnswers["Mike"] = "Scientific";

var question3DictionaryChoices = {};
var leftIdToColor = {};

//Check if item on left is selected and what it is
var leftItemSelected = 0;
var leftItemSelectedId = "";

//Colors are recycled when items are unselected
var freeColors = ["Green", "Red","DarkBlue","Purple","Lime", "SkyBlue", "Gold", "Fuchsia"];
var recycledColors = [];
var colorUsing;

//Response and status element to be updated constantly
var question3ResponseElement = document.getElementById("question3Response");
var question3StatusElement = document.getElementById("question3Status");

/*--------------------------------------------------------------------------------*/

//Called when a user clicks on an option on the left
function question3LeftColumnClick(id)
{
	question3ResponseElement.innerHTML = "";	

	/*If a left item already selected, dont allow another left choice 
		unless choosing the the same left item to unselect/unhighlight*/
	if((leftItemSelected == 1) && id != (leftItemSelectedId))
	{
		//Updating response on bottom with error
		question3ResponseElement.innerHTML = "You already selected a professor from the left. Chose a fact from the right to match!";
		question3ResponseElement.style["color"] = "red";
		return;
	}

	/*Selected left item was not selected/highlighted before, 
		so highlight and put in dictionary*/
	if(!(id in question3DictionaryChoices))
	{
		//console.log("Not selected before, so highlight");
		question3DictionaryChoices[id] = "undecided";
		leftItemSelected = 1;
		leftItemSelectedId = id;

		//Highlighting, choosing a free color and displaying status on top
		var element = document.getElementById(id);
		element.style["color"] = "white";
		element.style["background-color"] = freeColors[0];
		colorUsing = freeColors[0];
		leftIdToColor[id] = colorUsing;
		freeColors.splice(0, 1);

		//Updating status on top
		question3StatusElement.innerHTML = "Selected: " + id;		
	}

	/*Selected left item is already highlighted, so unhighlight 
		left and right cols (if pair exists!) and remove from dict, 
			and recycle color*/
	else
	{
		//console.log("Already selected, so unhighlight");
		leftItemSelected = 0;
		leftItemSelectedId = "";

		//Unhighlighting left
		var element = document.getElementById(id)
		element.style["background-color"] = "white";
		element.style["color"] = "black";

		//Unhighlighting right if selected a right col and made pair before
		if(id in question3DictionaryChoices)
		{
			//If made a pair, unhighlight right col
			var right = question3DictionaryChoices[id];
			if(right != "undecided")
			{
				var element = document.getElementById(right)
				element.style["background-color"] = "white";
				element.style["color"] = "black";
			}
		}

		//Recycling color
		var usedColor = leftIdToColor[id];
		freeColors.push(usedColor);

		//Remove from choice and color dicts
		delete question3DictionaryChoices[id];
		delete leftIdToColor[id];

		//Updating status on top
		question3StatusElement.innerHTML = "Unselected: " + id;
	}
}

/*--------------------------------------------------------------------------------*/

//Selected item on the right column
function question3RightColumnClick(id)
{
	question3ResponseElement.innerHTML = "";

	//Making sure an item from the left is selected first
	if(leftItemSelected == 0)
	{
		//Update response on bottom
		question3ResponseElement.innerHTML = "You have to first select a professor from the left to match with!";
		question3ResponseElement.style["color"] = "red";
		return;
	}

	//Item from left is selected already so can continue
	leftItemSelected = 0;

	//See if already have a mapping to this right col element
    for (var key in question3DictionaryChoices)
    {
    	//Found left item mapping to this one!
        if (question3DictionaryChoices[key] == id) 
        {
        	//Found an old pair
	        if(key != leftItemSelectedId)
	        {
		        //Unhighlighting left only as right will be overwritten later below
				var element = document.getElementById(key)
				element.style["background-color"] = "white";
				element.style["color"] = "black";

				//Recycling color
				var usedColor = leftIdToColor[key];
				freeColors.push(usedColor);

				//Delete the choice and color pair
				delete question3DictionaryChoices[key];
				delete leftIdToColor[key];
        	}
        }
    }

    //Make new a choice pair
	question3DictionaryChoices[leftItemSelectedId] = id;
	
	//Highlighting right column
	var element = document.getElementById(id);
	element.style["background-color"] = colorUsing;
	element.style["color"] = "white";

	//Updating status on top
	question3StatusElement.innerHTML = "Made a pair!";
}

//Filled up in grading in question3ButtonSubmit function
var question3CorrectChoices = [];
var question3WrongChoices = [];

/*--------------------------------------------------------------------------------*/

//Called when user submits question 3
function question3ButtonSubmit()
{	
	//trying to submit with a left item selected
	if(leftItemSelected == 1)
	{
		//Updating reponse at bottom
		question3ResponseElement.innerHTML = "Havent selected a fact for professor " + leftItemSelectedId + "!";
		question3ResponseElement.style["color"] = "red";
		return;
	}
    
	//Calculate number of choices made
    var key;
    var size = 0;    
    for (key in question3DictionaryChoices) 
    {
        if (question3DictionaryChoices.hasOwnProperty(key)) 
        {	
        	size++;
    	}
    }

    if (size<8)
    {
    	question3ResponseElement.innerHTML = "Havent selected a fact for all professors!";
		question3ResponseElement.style["color"] = "red";
		return;
    }

    //Grading
    var question3Grade = 0;
    var choiceKey;
    for (choiceKey in question3DictionaryChoices) 
    {
        if (question3DictionaryChoices.hasOwnProperty(choiceKey)) 
        {	
        	if(question3DictionaryAnswers[choiceKey] == question3DictionaryChoices[choiceKey])
        	{
        		question3Grade = question3Grade + 0.5;
        		question3CorrectChoices.push(choiceKey);
        	}	
        	else
        	{
        		question3WrongChoices.push(choiceKey);
        	}
    	}
    }

    //local grading display
    question3ResponseElement.innerHTML = "You have achieved a grade of " + question3Grade + " out of 4!";
	question3ResponseElement.style["color"] = "green";
	displayCorrectWrongAnswers();

	//global grading display
	question3Score = question3Grade;
	totalGrade = totalGrade + question3Score;
	totalDenominator = totalDenominator + question3Denominator;

	var element = document.getElementById("totalScore");
	element.innerHTML = "Total score: " + totalGrade + "/" + totalDenominator;
	
	totalAttempts = totalAttempts + 1;
	if(totalAttempts == 4)
	{
		alert("You have received a score of " + totalGrade + " out of " + totalDenominator + "! Reset to try again!");
		var e = document.getElementById("resetButton");
		e.style["visibility"] = "visible";
	}
}

//Full solutions to questions
var question3FullAnswers = {};
question3FullAnswers["Daniel"] = "Taught a first-year course while an undergraduate student in our department";
question3FullAnswers["Stephen"] = "Turing Award winner for work in computational complexity";
question3FullAnswers["Geoff"] = "Pioneer in machine learning, now Distinguished Researcher at Google";
question3FullAnswers["Karan"] = "Academy Award for Ryan (software research and development director)";
question3FullAnswers["Diane"] = "Winner of both the President's Teaching Award and OCUFA teaching award";
question3FullAnswers["Raquel"] = "Canada Research Chair in Machine Learning and Computer Vision, researching self-driving cars";
question3FullAnswers["David"] = "Associate Research Scientist at Disney Research before joining the faculty";
question3FullAnswers["Mike"] = "Scientific Director of the Centre for Computational Medicine at Sick Kids Hospital";


function resetButtonClick(){
	location.reload();
}

function displayCorrectWrongAnswers()
{	
	var i;
	var para;
	var node;
	var element;
	var correctKey;
	var correctValue;
	var fullSentence;
	var backgroundColor;

	//Display correct answers	
	para = document.createElement("h3");
	node = document.createTextNode("Correct answers below");
	para.appendChild(node);
	element = document.getElementById("question3CorrectChoices");
	element.appendChild(para);
	para.style["text-align"] = "center";



	for(i = 0; i<question3CorrectChoices.length; i++)
	{
		//Get key and value for the correct answer
		correctKey = question3CorrectChoices[i];
		correctValue =  question3FullAnswers[correctKey];
		fullSentence = correctKey + ": " + correctValue;

		//Insert into html into question3CorrectChoices div
		para = document.createElement("p");
		node = document.createTextNode(fullSentence);
		para.appendChild(node);
		element = document.getElementById("question3CorrectChoices");
		element.appendChild(para);
		
		//Styling
		backgroundColor = leftIdToColor[correctKey];
		para.style["color"] = "white";
		para.style["background-color"] = backgroundColor;
		para.style["text-align"] = "center";
	}

	//Display wrong answers
	para = document.createElement("h3");
	node = document.createTextNode("Wrong answers corrected below");
	para.appendChild(node);
	element = document.getElementById("question3WrongChoices");
	element.appendChild(para);
	para.style["text-align"] = "center";


	var wrongKey;
	var wrongValue;

	for(i = 0; i<question3WrongChoices.length; i++)
	{
		//Get key and value for the correct answer
		wrongKey = question3WrongChoices[i];
		wrongValue =  question3FullAnswers[wrongKey];
		fullSentence = wrongKey + ": " + wrongValue;

		//Insert into html into question3WrongChoices div
		para = document.createElement("p");
		node = document.createTextNode(fullSentence);
		para.appendChild(node);
		element = document.getElementById("question3WrongChoices");
		element.appendChild(para);
		
		//Styling
		backgroundColor = leftIdToColor[wrongKey];
		para.style["color"] = "white";
		para.style["background-color"] = backgroundColor;
		para.style["text-align"] = "center";			
	}
}

/*------------------------------------------------------------------------------------------------------------------------------------------------*/
														/*Question 4 Javascipt*/

var question4DateAnswers = ["firstComputerProgram", "firstComputerNetwork", "firstCompiler", "firstOpenSource", "firstPopular", "firstObjectOriented", "firstMicroprocessor"];

var question4InventionDateDict = {};
question4InventionDateDict["firstComputerProgram"] = "1841 (Ada Lovelace)";
question4InventionDateDict["firstComputerNetwork"] = "1940";
question4InventionDateDict["firstCompiler"] = "1951 (Grace Hopper)";
question4InventionDateDict["firstOpenSource"] = "1953";
question4InventionDateDict["firstPopular"] = "1957 (John Backus)";
question4InventionDateDict["firstObjectOriented"] = "1967 (Ole-Johan Dahl and Kristen Nygaard)";
question4InventionDateDict["firstMicroprocessor"] = "1971";

/*--------------------------------------------------------------------------------*/

//Called when submitting question 4
function question4ButtonSubmit()
{	
	var question4ResponseElement = document.getElementById("question4Response");
	question4ResponseElement.innerHTML = "";

	var question4SolutionElement = document.getElementById("question4Solution");
	question4SolutionElement.innerHTML = "";

	var datesBoxElement = document.getElementById("question4DatesBox");
	var children = datesBoxElement.childElementCount;


	//not chosen enough elements
	if(children<7)
	{
		question4ResponseElement.innerHTML = "You have not used up all inventions!";
		question4ResponseElement.style["color"] = "red";
		question4ResponseElement.style["text-align"] = "center";
		return;	
	}

	//chosen enough elements
	var id;
	var correct = 1;

	//Iterate through history timeline choices
	for (var i = 0; i < children; i++) 
	{
		id = datesBoxElement.childNodes[i].id; 
		if(String(id) != String(question4DateAnswers[i]))
		{
			correct = 0;
			break;
		}
	}

	//update if correct
	if(correct == 1)
	{	
		var question4SolutionElement = document.getElementById("question4Solution");
		question4SolutionElement.innerHTML = "You are correct.";
		question4SolutionElement.style["color"] = "green";
		question4SolutionElement.style["text-align"] = "center";

	}
	//update as wrong even if 1 wrong
	else
	{
		var question4SolutionElement = document.getElementById("question4Solution");
		question4SolutionElement.innerHTML = "You were wrong! Correct order below";
		question4SolutionElement.style["color"] = "red";
		question4SolutionElement.style["text-align"] = "center";

		var i;
		var sol;
		var fullSentence;
		var element;
		for(i = 0;i<question4DateAnswers.length; i++)
		{
			element = document.getElementById(question4DateAnswers[i]);
			sol = question4InventionDateDict[question4DateAnswers[i]];
			fullSentence = element.innerHTML + " - " + sol;
			//console.log(fullSentence);

			//making the element
			var node = document.createElement("h4");                
			var textnode = document.createTextNode(fullSentence);         
			node.appendChild(textnode);
			node.style["color"] = "black";                        
			document.getElementById("question4Solution").appendChild(node);
		}

	}

	//Grading
	if(question4Complete == 0)
	{
		question4Complete = 1;

		if(correct == 1)
		{
			question4Score = 1;
			totalGrade = totalGrade + question4Score;
			totalDenominator = totalDenominator + question4Denominator;

			//updating local score
			var element = document.getElementById("question4Grade");
			element.innerHTML = "You received 1 point out of 1 for correctness in first attempt!";
			element.style["color"] = "green";
			element.style["text-align"] = "center";

			//Updating global score
			element = document.getElementById("totalScore");
			element.innerHTML = "Total score: " + totalGrade + "/" + totalDenominator;
		}
		else
		{
			question4Score = 0;
			totalGrade = totalGrade + question4Score;
			totalDenominator = totalDenominator + question4Denominator;

			//updating local score
			var element = document.getElementById("question4Grade");
			element.innerHTML = "You received 0 points out of 1 for mistakes in first attempt! You can keep trying but score will not change.";
			element.style["color"] = "red";
			element.style["text-align"] = "center";

			//Updating global score
			element = document.getElementById("totalScore");
			element.innerHTML = "Total score: " + totalGrade + "/" + totalDenominator;
		}

		totalAttempts = totalAttempts + 1;
		if(totalAttempts == 4)
		{
			alert("You have received a score of " + totalGrade + " out of " + totalDenominator + "! Reset to try again!");
			var e = document.getElementById("resetButton");
			e.style["visibility"] = "visible";
		}
	}

}

/*--------------------------------------------------------------------------------*/

//Allow dropping
function allowDrop(ev) {
    ev.preventDefault();
}

//What to Drag - ondragstart and setData()
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
}

//Calls when dropped
function drop(ev, id) {
	var boxElement = document.getElementById(id);
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    boxElement.appendChild(document.getElementById(data));
    document.getElementById(data).style["text-align"] = "center";
}

/*------------------------------------------------------------------------------------------------------------------------------------------------*/
														



