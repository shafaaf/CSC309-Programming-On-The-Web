//Todo: write to file for oututs

'use strict';
//--------------------------------------------------------------------------------------------------------------------------------------

module.exports = function(app) {

	function typeOf (obj) {
  return {}.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase();
}

	
//--------------------------------------------------------------------------------------------------------------------------------------

	var express = require('express');
	var fs = require('fs');
	
	//load in tas.json file into memory	
	var tas = JSON.parse(fs.readFileSync('./tas.json', 'utf8'));
	console.log('initial full tas file is: ', tas);

	//load in courses.json file into memory	
	var courses = JSON.parse(fs.readFileSync('./courses.json', 'utf8'));
	//console.log('initial full courses file is: ', courses);
	/* JS Object format
	{	
		"courses": [
        {
          "CSC108": [{"rank":"", "experience":"", "status":"",
          	"givenname":"", "fname":""],
          "ECE454": [...],
          "CSC309": [...],
          .....
          .....
        }
     }
	*/
	//Need to put in all courses from courses JS object to coursesJs object
	var coursesJs = {};
	for (var key in courses)	//executed once since 1 courses field. key is courses
	{
		if (courses.hasOwnProperty(key))
		{    			
			//console.log("courses[key].length is " + courses[key].length);	//prints 24
			for(var j = 0; j < courses[key].length; j++) //looping through each course
		    {
		        	//console.log("value is: " , courses[key][j]);
		        	coursesJs[courses[key][j]] = [];
		    }
 		}
	}

	console.log("coursesJs after init is: ",coursesJs);

	//Filling in coursesJS object
	for (var key in tas)	//executed once since 1 TAs field. key is tas
	{
		if (tas.hasOwnProperty(key))
		{
			for(var j = 0; j < tas[key].length; j++) //looping through each TA
		    {
		    	if(tas[key][j] == null)
		    	{
		    		continue;
		    	}

		    	console.log("length of courses is: ", tas[key][j]["courses"].length);
	        	console.log("value is: " , tas[key][j]["courses"]);
	        	var numberOfCourses = tas[key][j]["courses"].length;

	        	//Going through each course for each specific TA
			    for(var k = 0; k<numberOfCourses; k++)
			    {
			    	//console.log("key is ", tas[key][j]["courses"][k]["code"]);
			    	var courseCode = tas[key][j]["courses"][k]["code"];

			    	//If this course code already in courseJs, add in info
			    	if(courseCode in coursesJs)
			    	{
			    		console.log("In courses is: ", courseCode);
			    		
			    		//Add in course in entry in courseJs object under this coursecode
			    		var entry = {};
			    		entry.rank = tas[key][j]["courses"][k]["rank"];
			    		entry.experience =  tas[key][j]["courses"][k]["experience"];
			    		entry.status = tas[key][j]["status"];
			    		entry.givenname = tas[key][j]["givenname"];
			    		entry.familyname = tas[key][j]["familyname"];
			    		coursesJs[courseCode].push(entry);
			    	}
			    	//Course code not present before in structure. So make one
			    	else
			    	{
			    		console.log("Not In courses is: ", courseCode);
			    		//Add in new entry for course
			    		coursesJs[courseCode] = [];

			    		//Add in course in entry in courseJs object under this coursecode
			    		var entry = {};
			    		entry.rank = tas[key][j]["courses"][k]["rank"];
			    		entry.experience =  tas[key][j]["courses"][k]["experience"];
			    		entry.status = tas[key][j]["status"];
			    		entry.givenname = tas[key][j]["givenname"];
			    		entry.familyname = tas[key][j]["familyname"];
			    		coursesJs[courseCode].push(entry);
			    	}
			    }
		    }
 		}
	}

	console.log("coursesJs after setting is: ",coursesJs);



	
//--------------------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------------------	
	//Basic '/' route. Send back file.
	app.get('/', function(req, res) {
		res.send('Welcome to the home page!');
	});

//--------------------------------------------------------------------------------------------------------------------------------------
	//applicants routes
	var applicantsRouter = express.Router();
	
	/*---- GET handler for applicants-------*/
	applicantsRouter.get('/', function(req, res) {
	    console.log('GET handler for /applicants.');

		//-----------------------------------------------------
	    //Passed in a status in GET request for applicants
	    if(req.query.status)
	    {
	    	var status = req.query.status;
	    	console.log("Passed in status: " + status);

	    	//list to store TAs having queried status
	    	var statusApplicants = new Object;
	    	statusApplicants.tas = []; 
	    	var found = 0;

	    	for (var key in tas)	//executed once since 1 TAs field. key is tas
			{
	  			if (tas.hasOwnProperty(key))
	  			{
	    			
					//console.log("tas[key].length is " + tas[key].length);
	    			for(var j = 0; j < tas[key].length; j++) //looping through each TA
				    {
				    	if(tas[key][j] == null)
				    	{
				    		continue;
				    	}
				    	
				    	//console.log("tas[key][j][status] is " + tas[key][j]["status"]);
				    	//Want this specific TA information. Assuming no duplicates
				        if(tas[key][j]["status"] == status)
				        {
				        	console.log("value is: " , tas[key][j]);
					        statusApplicants.tas.push(tas[key][j]);
					        found = 1;
					    }
				    }
		 		}
			}

			//If found, return applicant. Or else return error message.
			if(found == 1)
			{	
				res.json(statusApplicants);
			}
			else
			{
				return res.json({ error: true, message: 'Applicants with a status of ' + status + ' not found.'});
			}
	    }

	    //-----------------------------------------------------
	    //Passed in an fname in GET request for applicants
	    else if(req.query.fname)
	    {
	    	var fname = req.query.fname;
	    	console.log("Passed in fname: " + fname);

	    	//to store info about TA looking for
	    	var fnameApplicants = new Object;
	    	var found = 0;
			
			for (var key in tas)	//executed once since 1 TAs field
			{
	  			if (tas.hasOwnProperty(key))
	  			{
	    			//console.log("key is " + key);	//key here appears once and is always the keyword: "tas"
	    			for(var j = 0; j < tas[key].length; j++) //looping through each TA
				    {
				    	if(tas[key][j] == null)
				    	{
				    		continue;
				    	}
				    	//Want this specific TA information. Assuming no duplicates
				        if(tas[key][j]["familyname"] == fname)
				        {
				        	console.log("value is: " , tas[key][j]);
					        fnameApplicants = tas[key][j];
					        found = 1;
					        break;
				        }
				    
				    }
		 		}
			}

			//If found, return applicant. Or else return error message.
			if(found == 1)
			{	
				res.json(fnameApplicants);
			}
			else
			{
				return res.json({ error: true, message: 'Applicant with a family name of ' + fname + ' not found.'});
			}

	    	
	    }

	    //-----------------------------------------------------
	    //GET request with no parameters passed in. Return all info about all applicants.
	    //Also comes here if random parameters passed in
	    else
	    {
	    	console.log("No parameters passed in so return all applicants.");
		    res.json(tas);
		}    
	});

//--------------------------------------------------------------------
	/*---- POST handler for applicants-------*/
	applicantsRouter.post('/', function(req, res) {
		console.log('POST handler for /applicants.');

		/* From responses.txt

			POST /applicant
			Request body contains
			{
			    "stunum": "",
			    "givenname": "",
			    "familyname": "",
			    "status": "",
			    "year": "",
			    "courses": [
			        {
			            "code": "",
			            "rank": "",
			            "experience": ""
			        },
			        {
			            "code": "",
			            "rank": "",
			            "experience": ""
			        }
			    ]
			}
			Response is "Success" or "Error: duplicate student number"
		*/

		/*courses pass in like this:
		courses: [{"code": "CSC108", "rank": "1","experience": "3"}, {"code": "CSC343""rank": "1","experience": "2"} ] 
		*/

		
		//New TA from posted data
		var newTa = {};
		newTa.stunum = req.body.stunum;
		var found = 0;

		/*Check if duplicate student number exists*/
		for (var key in tas)	//executed once since 1 TAs field. key is tas
			{
	  			if (tas.hasOwnProperty(key))
	  			{	    			
					//console.log("tas[key].length is " + tas[key].length);
	    			for(var j = 0; j < tas[key].length; j++) //looping through each TA
				    {
				    	if(tas[key][j] == null)
				    	{
				    		continue;
				    	}
				    	
				        if(tas[key][j]["stunum"] == newTa.stunum)
				        {
				        	console.log("Found duplcate stunum: ", tas[key][j]["stunum"]);
					        found = 1;
					        break;
					    }
				    }
		 		}
			}

		//Found duplicate student number	
		if(found == 1)
		{
			return res.json({ error: true, message: 'Error: duplicate student number'});
		}

		//All good so continue extracting info
		newTa.givenname = req.body.givenname;
		newTa.familyname = req.body.familyname;
		newTa.status = req.body.status;
		newTa.year = req.body.year;
		
		//Setting up courses array
		var courses = req.body.courses;
		console.log("courses is: " , courses);
		console.log("NEW courses is: ",  JSON.stringify(courses));
		console.log("typeOf(courses) is: ", typeOf(courses));

		newTa.courses = courses;
		console.log("newTa is: ", newTa);
		console.log("tas is: ", tas);

		tas["tas"].push(newTa);
		console.log("new tas is: ", tas);

		//For debugging
		//return res.json(tas);

		//Adding in new applicant's courses in coursesJS
		console.log("new ta has courses ", courses);
		console.log("courses.length is ", courses.length);
		for(var i = 0; i< courses.length; i++)
		{
			for(var key in coursesJs)
			{
				if(courses[i].code  == key)
				{
					var entry = {};
					entry.rank = courses[i].rank;
					entry.experience = courses[i].experience;
					entry.status = courses[i].req.body.status;
					entry.givenname = req.body.givenname;
					entry.familyname = req.body.familyname;
					
					//Found course already inside courses JS
					console.log("Found: ", courses[i].code);
					coursesJs[key].push(entry);
				}
				//entry doesnr exist
				else
				{
					var entry = {};
					entry.rank = courses[i].rank;
					entry.experience = courses[i].experience;
					entry.status = req.body.status;
					entry.givenname = req.body.givenname;
					entry.familyname = req.body.familyname;


					console.log("Make new entry for: ", courses[i].code);
					coursesJs[key] = [];
					coursesJs[key].push(entry);
				}

			}
			
		}

		return res.json({success: true, message: 'Success'});

	});
//-----------------------------------------------------------------------
	
	/*----DELETE handler for applicants-------*/
	applicantsRouter.delete('/', function(req, res) 
	{
		console.log('DELETE handler for /applicants');

		//-----------------------------------------------------
	    //Passed in a fname in DELETE request for applicants
	    if(req.query.fname)
	    {
	    	var fname = req.query.fname;
	    	console.log("fname is " + fname);

	    	var found = 0;

	    	//Deleted applicant will have these courses
	    	var haveCourses = [];

	    	for (var key in tas)	//executed once since 1 TAs field
			{
	  			if (tas.hasOwnProperty(key)) 
	  			{
	    			//console.log("key is " + key);	//key here appears once and is always the keyword: tas
	    			for(var j = 0; j < tas[key].length; j++)	//looping through each TA
				    {
				    	//if null value, skip over it
				    	if(tas[key][j] == null)
				    	{
				    		continue;
				    	}
				    	//Found TA with fname passed in
				    	if(tas[key][j]["familyname"] == fname)
				    	{
				        	console.log("Need to delete entry: " , tas[key][j]);

				        	//Store this applicant's courses to remove from courses object
				        	for(var k = 0;k<tas[key][j]["courses"].length;k++)
				        	{
				        		haveCourses.push(tas[key][j]["courses"][k]);
				        	}

				        	tas[key][j] = null;
				        	delete tas[key][j];
							console.log("Deleted entry!");
							found = 1;
							break;
				        }				        
				    }
		 		}
			}

			//If found, return success. Or else return error message.
			if(found == 1)
			{
				console.log("Deleted successfully. Now returning new updated list of TAs.")

				// Iterate the array from back to front, removing null entries
				console.log("old tas is: ", tas);
				for (var i=tas.tas.length;i--;)
				{
				  if (tas.tas[i]===null){ tas.tas.splice(i,1);}
				  if (tas.tas[i]===undefined){ tas.tas.splice(i,1);}
				   
				}

				console.log("new tas is: ", tas);

				//Delete from coursesJs
				console.log("haveCourses is ", haveCourses);
				for(var i =0; i<haveCourses.length; i++)
				{
					for(var key in coursesJs)
					{
						var numberOfApplicants =  Object.keys(coursesJs[key]).length;
						//console.log("numberOfApplicants in ", key + " is: ", numberOfApplicants);
						if(haveCourses[i].code == key)	//found the course entry in coursesJS
						{
							for(var x = 0; x < numberOfApplicants; x++ )	//looping through course applicants to find right applicant to delete
							{
								if(coursesJs[key][x] == null)
						    	{
						    		continue;
						    	}
								if(coursesJs[key][x].familyname == fname)
								{
									console.log("Delete ", coursesJs[key][x].familyname);
									coursesJs[key][x] = null;
				        			delete coursesJs[key][x];
				        			//tas.tas[i]===null){ tas.tas.splice(i,1);
									coursesJs[key].splice(x,1);

								}
							}

						}
					}
				}

				//for debugging - res.json(tas);
				return res.json({ success: true, message: "Success."});
			}
			else
			{
				return res.json({ error: true, message: "Error: no such student."});
			}
	    }


	    //-----------------------------------------------------
	    //Passed in a stunum in DELETE request for applicants
	    else if(req.query.stunum)
	    {
	    	var stunum = req.query.stunum;
	    	console.log("stunum is " + stunum);
	    	
	    	var found = 0;
	    	
	    	//Deleted applicant will have these courses
	    	var haveCourses = [];

	    	for (var key in tas)	//executed once since 1 TAs field
			{
	  			if (tas.hasOwnProperty(key)) 
	  			{
	    			//console.log("key is " + key);	//key here appears once and is always the keyword: "tas"
	    			for(var j = 0; j < tas[key].length; j++)	//looping through each TA
				    {
				    	//if null value, skip over it
				    	if(tas[key][j] == null)
				    	{
				    		continue;
				    	}
				    	//Delete this specific TA. Assuming no duplicates
				    	if(tas[key][j]["stunum"] == stunum)
				    	{
				    		//Store this applicant's courses to remove from courses object
				        	for(var k = 0;k<tas[key][j]["courses"].length;k++)
				        	{
				        		haveCourses.push(tas[key][j]["courses"][k]);
				        	}

				        	console.log("Need to delete entry: " , tas[key][j]);
				        	tas[key][j] = null;
				        	delete tas[key][j]; // or use => delete test['blue'];
							console.log("Deleted TA!");
							found = 1;
							break;
				        }
				        

				    }
		 		}
			}

			//If found, return updated list of applicants. Or else return error message.
			if(found == 1)
			{
				console.log("Deleted successfully. Now returning new updated list of TAs.")
				
				//Iterate the array from back to front, removing null entries
				console.log("old tas is: ", tas);
				for (var i=tas.tas.length;i--;)
				{
				  if (tas.tas[i]===null){ tas.tas.splice(i,1);}
				  if (tas.tas[i]===undefined){ tas.tas.splice(i,1);}
				   
				}
				console.log("new tas is: ", tas);
				
				//Delete applicant entry from coursesJs
				console.log("haveCourses is ", haveCourses);
				for(var i =0; i<haveCourses.length; i++)
				{
					for(var key in coursesJs)
					{
						var numberOfApplicants =  Object.keys(coursesJs[key]).length;
						//console.log("numberOfApplicants in ", key + " is: ", numberOfApplicants);
						if(haveCourses[i].code == key)	//found the course entry in coursesJS
						{
							for(var x = 0; x < numberOfApplicants; x++ )	//looping through course applicants to find right applicant to delete
							{
								if(coursesJs[key][x] == null)
						    	{
						    		continue;
						    	}
								if(coursesJs[key][x].stunum == req.query.stunum)
								{
									console.log("Delete ", coursesJs[key][x].familyname);
									coursesJs[key][x] = null;
				        			delete coursesJs[key][x];
				        			//tas.tas[i]===null){ tas.tas.splice(i,1);
									coursesJs[key].splice(x,1);

								}
							}

						}
					}
				}

				//res.json(tas);
				return res.json({ success: true, message: 'Success'});

			}
			else
			{
				return res.json({ error: true, message: 'Applicant with a stunum of ' + stunum + ' not found.'});
			}

	    }

	    //Didnt select fname or stunum  in DELETE route
	    else
	    {
	    	return res.json({ error: true, message: 'Need to select an fname or stunum'});
	    }

	});
//--------------------------------------------------------------------------------------------------------------------------------------
	
	//Courses routes
	var coursesRouter = express.Router();

	//GET handlers for courses
	coursesRouter.get('/', function(req, res) 
	{
		console.log('GET handler for /courses.');

		//GET handler for /courses?course=course
		if(req.query.course)
		{
			var courseRequested = req.query.course;


			//Find info about specific course
			
			//To hold info about course requested
			var infoCourse = {};
			var found = 0;

			for (var key in coursesJs)	//goes through all courses
			{
    			console.log("key is " + key);	//key here is each course
    			
				//Want this specific TA information. Assuming no duplicates
		        if(key == courseRequested)
		        {
		        	console.log("Found: ", key);
			        infoCourse[courseRequested] = coursesJs[key];
			        found = 1;
			        break;
		        }   
		 		
			}
			if(found == 1)
			{
				console.log("Found, returning: ", infoCourse);
				return res.json(infoCourse);
			}
			else
			{
				return res.json({ error: true, message: "Error: no such course."});
			}


			

		}
		
		//return all course info
		else
		{
			return res.json(coursesJs);
		}
		    		    	
	});




//--------------------------------------------------------------------------------------------------------------------------------------
	app.use('/applicants', applicantsRouter);
	app.use('/courses', coursesRouter);
	
//---------------------------------------------------------------------------------------------------------------------------------	
}

