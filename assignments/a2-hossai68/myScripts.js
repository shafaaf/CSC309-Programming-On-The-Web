/* 
	For reference:
		For id : Use #
		For class : use .
*/
'use strict';
//-----------------------------------------------------------------------------------------------------------------

console.log("Loaded in myScripts.js");

//-----------------------------------------------------------------------------------------------------------------

// jQuery Document
$(document).ready(function() 
{	
	//used in adding in more courses
	var courses = 1;
//-----------------------------------------------------------------------------------------------------------------

	//get all applicants
	$( "#getAllApplicantsBtn" ).click(function() 
	{
  		console.log("GET handler for /applicants");

  		$.ajax({
            url: "/applicants",
            type: "GET",
            dataType: "json",
            success: function (data) 
            {
        		console.log("data received back is: ", data);
        		var tas = data;

				//Need Given Name, Family Name, Status, Year
				console.log("Now making table:");

				$("#getAllApplicantsTable").empty();
				$("#getAllApplicantsTable").append("<tr><th>Given Name</th><th>Family Name</th><th>Status</th><th>Year</th></tr>");

				//Adding in entries
				var givenName;
				var familyName;
				var status;
				var year;

				for (var key in tas)
				{
		  			if (tas.hasOwnProperty(key))
		  			{
		    			for(var j = 0; j < tas[key].length; j++) //looping through each TA
					    {
					 		//console.log("value is: " , tas[key][j]);
					 		givenName = tas[key][j]["givenname"];
							familyName = tas[key][j]["familyname"];
					 		status = tas[key][j]["status"];
					 		year = tas[key][j]["year"];
					 		$("#getAllApplicantsTable").append('<tr>  <td>'+givenName+'</td>' + '<td>'+familyName+'</td>' + '<td>'+status+'</td>'+ '<td>'+year+'</td>'+ '</tr>');

						}
			 		}
				}
    		}
        });
	});

//------------------------------------------------------------------------------------------------------
	
	//get applicant by family name
	$("#getApplicantsFnameBtn").click(function() 
	{		
		    //Get value from form input
		    var value = document.getElementById("getApplicantsFnameId").value;
		    console.log("value is: " + value);
		    
		    //make sure something passed in as fname
		    if(value === ""){
		    	$('#getApplicantsFnameErrorMessage').text('Need to pass in a family name.');
		    	return;
		    }

		    var fullUrl = "/applicants?fname="+value;

		    $.ajax({
	            url: fullUrl,
	            type: "GET",
	            dataType: "json",
	            success: function (data) 
	            {
	            	console.log("data is ", data)
	            	var tas = data;
	            	
	            	//clear old data
	            	$("#getApplicantsFnameTable").empty();
	            	$("#getApplicantsFnameTableCourses").empty();
	            	$('#getApplicantsFnameErrorMessage').text('');
	            	$('#getApplicantsFnameTableHeader').text('');
	            	$('#getApplicantsFnameTableCoursesHeader').text('');            	

	            	//If error
	            	if("error" in tas){
	            		console.log("Couldnt find anyone with that fname");
	            		 $('#getApplicantsFnameErrorMessage').text('Couldnt find anyone with that family name.')
	            		return;
	            	}

	            	//new header
	            	$('#getApplicantsFnameTableHeader').text('TA personal information');
					$('#getApplicantsFnameTableCoursesHeader').text('TA teaching information');


	            	//Need ALL info
					console.log("Now making table:");
					
					$("#getApplicantsFnameTable").append("<tr> <th>Student Number</th> <th>Given Name</th> <th>Family Name</th> <th>Status</th> <th>Year</th> </tr>");

					//Adding in entries
					var stuNum;
					var givenName;
					var familyName;
					var status;
					var year;
					var courses;

			 		stuNum = tas["stunum"];
			 		givenName = tas["givenname"];
					familyName = tas["familyname"];
			 		status = tas["status"];
			 		year = tas["year"];
			 		$("#getApplicantsFnameTable").append('<tr>  <td>'+stuNum+'</td>' + '<td>'+givenName+'</td>' + '<td>'+familyName+'</td>' + '<td>'+status+'</td>'+ '<td>'+year+'</td>'+ '</tr>');

			 		//loop through courses. Courses is array of course objects where each object has fields code, rank, experience.
			 		courses = tas["courses"];
			 		console.log("courses.length is: " + courses.length);
			 		$("#getApplicantsFnameTableCourses").append("<tr> <th>Coursecode</th> <th>rank</th> <th>experience</th>	</tr>");
			 		var code;
			 		var rank;
			 		var experience;
			 		var i = 0;

			 		for(i=0;i<courses.length;i++)
			 		{
			 			code = courses[i]["code"];
				 		rank = courses[i]["rank"];
						experience = courses[i]["experience"];
			 			$("#getApplicantsFnameTableCourses").append('<tr>  <td>'+code+'</td>' + '<td>'+rank+'</td>' + '<td>'+experience+'</td>' + '</tr>');
			 		}

					

	            }

       	 	});
	});

//------------------------------------------------------------------------------------------------------

	//get applicants by status
	$("#getApplicantsStatusBtn").click(function() 
	{
		console.log("Status submit btn!");
		var statusValue = $("#statusDropDown :selected").text(); // The text content of the selected option
		console.log("statusValue is " + statusValue);

		var fullUrl = "/applicants?status="+statusValue;

		$.ajax({
            url: fullUrl,
            type: "GET",
            dataType: "json",
            success: function (data) 
            {
            	console.log("data is ", data)
	            var tas = data;

	            //clear old data
	            $("#getApplicantsStatusErrorMessage").empty();
	            $("#getApplicantsStatusTable").empty();

	            //if no one found
	            if("error" in tas){
	            		console.log("Couldnt find anyone with that status");
	            		$('#getApplicantsStatusErrorMessage').text('Couldnt find anyone with that status.')
	            		return;
	            	}

	            //Adding in entries
				var givenName;
				var familyName;
				var status;
				var year;

				//making table headers - only show Given Name, Family Name, Status, Year
				$("#getApplicantsStatusTable").append("<tr><th>Given Name</th><th>Family Name</th><th>Status</th><th>Year</th></tr>");

				//go through all entries
				for (var key in tas)
				{
		  			if (tas.hasOwnProperty(key))
		  			{
		  				console.log("key is ", tas[key]);
		  				console.log("tas[key].length is ", tas[key].length);
		  				
		    			for(var j = 0; j < tas[key].length; j++) //looping through each TA
					    {
					 		console.log("inner for: value is: " , tas[key][j]);
					 		givenName = tas[key][j]["givenname"];
							familyName = tas[key][j]["familyname"];
					 		status = tas[key][j]["status"];
					 		year = tas[key][j]["year"];
					 		$("#getApplicantsStatusTable").append('<tr>  <td>'+givenName+'</td>' + '<td>'+familyName+'</td>' + '<td>'+status+'</td>'+ '<td>'+year+'</td>'+ '</tr>');

						}
			 		}
				}
            }
        });


	});

//------------------------------------------------------------------------------------------------------
    //DELETE /applicants?fname=fname
    $("#deleteApplicantsFnameBtn").click(function() 
	{
		console.log("Delete by fname btn clicked");

		//Get value from form input
	    var value = document.getElementById("deleteApplicantsFnameId").value;
	    console.log("value is: " + value);
	    
	    //make sure something passed in as fname
	    if(value === "")
	    {
	    	$('#deleteApplicantsFnameMessage').text('Need to pass in a family name.');
	    	console.log("No value put in so return");
	    	return;
	    }

	    var fullUrl = "/applicants?fname="+value;
	    $.ajax({
	            url: fullUrl,
	            type: 'DELETE',
	            dataType: "json",
	            success: function (data) 
	            {
	            	console.log("data is ", data)
	            	var tas = data;

	            	//clear old data
	            	$('#deleteApplicantsFnameMessage').text('');

	            	//No one with that family name found
	            	if("error" in tas){
	            		console.log("Couldnt find anyone with that fname");
	            		 $('#deleteApplicantsFnameMessage').text('Error: no such student');
	            		return;
	            	}

	            	else
	            	{
	            		console.log("Successfully deleted applicant with family name " + value);
	            		$('#deleteApplicantsFnameMessage').text("Success.");
	            	}
	            }
	        });    
	});

//------------------------------------------------------------------------------------------------------

	//DELETE /applicants?stunum=stunum
    $("#deleteApplicantsStunumBtn").click(function() 
	{
		console.log("Delete by stunum btn clicked");

		//Get value from form input
	    var value = document.getElementById("deleteApplicantsStunumId").value;
	    console.log("value is: " + value);

	    //make sure something passed in as stunum
	    if(value === "")
	    {
	    	$('#deleteApplicantsStunumMessage').text('Need to pass in a student number.');
	    	console.log("No value put in so return");
	    	return;
	    }

	    var fullUrl = "/applicants?stunum="+value;
	    $.ajax({
	            url: fullUrl,
	            type: 'DELETE',
	            dataType: "json",
	            success: function (data) 
	            {
	            	console.log("data is ", data)
	            	var tas = data;

	            	//clear old data
	            	$('#deleteApplicantsStunumMessage').text('');

	            	//No one with that student number found
	            	if("error" in tas){
	            		console.log("Couldnt find anyone with that stunum");
	            		 $('#deleteApplicantsStunumMessage').text('Error: no such student');
	            		return;
	            	}

	            	else
	            	{
	            		console.log("Successfully deleted applicant with student number: " + value);
	            		$('#deleteApplicantsStunumMessage').text("Success");
	            	}
	            }
	        });



	});

//------------------------------------------------------------------------------------------------------
	
	//POST /applicants
    $("#postApplicantsBtn").click(function() 
	{
		console.log("POST btn clicked");

		//Get value from form inputs
	    var status = document.getElementById("postApplicantsStatusId").value;
	    var year = document.getElementById("postApplicantsYearId").value;
	    var studentNumber = document.getElementById("postApplicantsStudentNumberId").value;
	    var givenName = document.getElementById("postApplicantsGivenNameId").value;
	    var familyName = document.getElementById("postApplicantsFamilyNameId").value;
		
		//todo: checks if courses input fields are filled out or not
		if((status == "") || (year == "") || (studentNumber == "") || (givenName == "") || (familyName == ""))	
	    {
	    	$('#postApplicantsMessage').text('Need to pass in all values.');
	    	console.log("No value put in 1 of them so return");
	    	return;	
	    }

	    console.log("Can continue");

	    console.log("Making course array of objects:");
	    var coursesArray = [];
		var codeId;
		var rankId;
		var experienceId;
		
		//Make array of courses
		var i;
	    for(i=1;i<=courses;i++)
	    {
	    	codeId = "code" + i;
	    	rankId = "rank" + i;
	    	experienceId = "experience" + i;

	    	var codeValue = document.getElementById(codeId).value;
	    	var rankValue = document.getElementById(rankId).value;
	    	var experienceValue = document.getElementById(experienceId).value;

	    	console.log("codeValue: " + codeValue);
	    	console.log("rankValue: " + rankValue);
	    	console.log("experienceValue: " + experienceValue);
	    	
	    	coursesArray[i-1] = {};
	    	coursesArray[i-1]["code"] = codeValue;
			coursesArray[i-1]["rank"] = rankValue;
	    	coursesArray[i-1]["experience"] = experienceValue;
	    	console.log("\n");
	    }

	    console.log("coursesArray is: ", coursesArray);

	    
	    //clear old data
	    $('#postApplicantsMessage').text('');

	    //Handling ajax
	    $.ajax({
	            url: '/applicants',
	            type: 'POST',
	            data: { stunum: studentNumber, givenname : givenName, familyname : familyName, status : status, year : year, courses : coursesArray},
	            dataType: "json",
	            success: function (data) 
	            {
	            	console.log("data is: ", data)
	            	var tas = data;	

	            	if("error" in tas){
	            		console.log("Duplicate student number.");
	            		 $('#postApplicantsMessage').text('Error: duplicate student number.')
	            		return;
	            	}
	            	//Worked
	            	console.log("Now parsing");
	            	console.log("data is NOW: ", JSON.parse(JSON.stringify(data)));
	            	$('#postApplicantsMessage').text('Success.');            	
	            }
	        });



	});

//------------------------------------------------------------------------------------------------------
	//Add more courses button
	$("#addCourseBtn").click(function() 
	{
		courses++;
		console.log("Courses is now: " + courses);
		var newCode = "code" + courses;
		var newRank = "rank" + courses;
		var newExperience = "experience" + courses;

		$( "#moreCourses" ).append( "<br><input type='text' placeholder = 'Code' id = " + newCode + "><input type='text' placeholder = 'Rank' id = " + newRank + "><input type='text' placeholder = 'Experience' id = " + newExperience + "><br>");

	});

//------------------------------------------------------------------------------------------------------
	//GET /courses
	$("#getAllCoursesBtn").click(function()
	{
		console.log("GET handler for /courses");
		$.ajax({
            url: "/courses",
            type: "GET",
            dataType: "json",
            success: function (data) 
            {
        		console.log("data received back is: ", data);
        		var courses = data;

        		console.log("Now making table of courses:");

        		//Clear all tables
        		$("#getAllCoursesSection").empty();

				//Adding in entries
				var courseCode;
				var rank;
				var experience;
				var status;				
				var givenName;
				var familyName;
		
				var numberOfCourses = Object.keys(courses).length;
				console.log("number of courses is ", numberOfCourses);

				for(var course in courses)	//looping through each course
				{
					var courseTas = courses[course].length;
					//console.log("courseTas is ", courseTas);
					if(courseTas == 0)
					{
						continue;
					}

					//Making table
					var tableId = course + "TableId";
					$("#getAllCoursesSection").append('<h4>Course code: ' + course + '</h4>');
					$("#getAllCoursesSection").append('<table align="center" id = '+tableId+'><tr><th>Given Name</th><th>Family Name</th><th>Status</th><th>Experience</th><th>Ranking</th></tr><table>');
					courseCode = course;

					//looping through each TA info for this secific course
					for(var i = 0; i < courseTas; i++)	
					{
						rank = courses[course][i]["rank"];
						experience = courses[course][i]["experience"];
						status = courses[course][i]["status"];
						givenName = courses[course][i]["givenname"];
						familyName = courses[course][i]["familyname"];
						var tableIdentifier = "#" + tableId; 
						
						$("#" + tableId ).append('<tr><td>'+givenName +'</td><td>'+familyName+'</td><td>'+status+'</td><td>'+experience+'</td><td>'+rank+'</td></tr>');
						$("#" + tableId ).css('text-align', 'center');

						


					}
					
            	}
            }	
        });

	});
//------------------------------------------------------------------------------------------------------
	//GET /courses
	$("#getCourseInfoButton").click(function()
	{
		console.log("Hi there");

	    //Get value from form input
	    var value = document.getElementById("getCourseInfoId").value;
	    console.log("value is: " + value);
		    
		    //make sure something passed in as fname
		    if(value === "")
		    {
		    	$('#getCourseInfoErrorMessage').text('Need to pass in a course code.');
		    	return;
		    }

		    var fullUrl = "/courses?course="+value;

		    		    $.ajax({
				            url: fullUrl,
				            type: "GET",
				            dataType: "json",
				            success: function (data) 
				            {
				            	console.log("data is ", data)
	            				var courses = data;

				            	//clear old data
				            	$('#getCourseInfoErrorMessage').text('');
				            	$('#getCourseInfoHeader').text('');            	
				            	$("#getCourseInfoTable").empty();

				            	//no course found
				            	if("error" in courses)
				            	{
				            		console.log("Couldnt find any course with that name.");
				            		$('#getCourseInfoErrorMessage').text('Couldnt find any course with that name.')
				            		return;
				            	}
				            	
				            	//Found course, so make headers and table Ranking, Experience, Status, Given Name, Family Name.
				            	$('#getCourseInfoHeader').text('Info on ' + value);
				            	$("#getCourseInfoTable").append("<tr> <th>Ranking</th> <th>Experience</th> <th>Status</th> <th>Given Name</th> <th>Family Name</th> </tr>");

				            	//Adding in entries
								var rank;
								var experience;
								var status;
								var givenName;
								var familyName;
								for(var course in courses)
								{	
									for(var i = 0; i<courses[course].length;i++)
									{
										console.log("info is: ", courses[course][i]);
										rank = courses[course][i].rank;
										experience = courses[course][i].experience;
										status = courses[course][i].status;
										givenName = courses[course][i].givenname;
										familyName = courses[course][i].familyname;
										$("#getCourseInfoTable").append('<tr>  <td>'+rank+'</td>' + '<td>'+experience+'</td>' + '<td>'+status+'</td>' + '<td>'+givenName+'</td>'+ '<td>'+familyName+'</td>'+ '</tr>');
									}
								}
						 		
				            	
				            	
				            }
				        });

	});



//------------------------------------------------------------------------------------------------------

});
