'use strict';

/* Lab 3: Airline route display. */

/**
 * App name space.
 *
 * The airlineRouteApp object encapsulates the variables and functions
 * into a namespace to prevent interference with global variables from
 * other libraries. In this case, it isn't strictly necessary, but a good
 * habit to get into.
 *
 * @type {object} airlineRouteApp
 */
var airlineRouteApp = airlineRouteApp || {};

//-----------------------------------------------------------------------------------------------------------
/**
 * Indicates which cities have a direct flight between them.
 * A key has a direct flight to each of the cities in the array
 * associated with that key.
 *
 * @type {object} routes
 * @const
 */
airlineRouteApp.ROUTES = {
  'YYZ': ['YVR', 'YYC', 'YOW'],
  'YVR': ['YYZ', 'YYC'],
  'YXE': ['YYC'],
  'YYC': ['YXE','YVR', 'YYZ'],
  'YOW': ['YYZ']
};

//-----------------------------------------------------------------------------------------------------------

//My own code

//Filled up in buildRoutes function. Removes duplicates
var myNewRoutes = {}; 

//Called when one of the buttons clicked on
function routeGenerator(id){ 

  //Deletes children all children of div with id = routes
  var node = document.getElementById("routes")
  while (node.hasChildNodes()) 
  {
    node.removeChild(node.lastChild);
  }

  //Routing for button clicked done here
  var para;
  var node;
  var element;
  var text;

  var myRoutes = airlineRouteApp.ROUTES;
  //console.log("\n\n\nTESTING ROUTE VALUES in console now:\n\n\n")
  var found = 0;

  for (var key in myNewRoutes)
  {   
      //Key matches so take all values for this key
      if(key == id)
      {
        var valueArrayLength = myNewRoutes[key].length;
        for(var i = 0; i < valueArrayLength; i++)
        {
          para = document.createElement("p");
          text = key + " <=> " + myNewRoutes[key][i];
          node = document.createTextNode(text);
          para.appendChild(node);
          element = document.getElementById("routes");
          element.appendChild(para);
        }

      }
      else  //key did not match
      {
        var valueArrayLength = myNewRoutes[key].length;

        //Going though values for the current key
        for(var i = 0; i < valueArrayLength; i++)
        {
          //Key doesnt match but some other key as this city as a value
          if(myNewRoutes[key][i] == id){
            para = document.createElement("p");
            text = key + " <=> " + myNewRoutes[key][i];
            node = document.createTextNode(text);
            para.appendChild(node);
            element = document.getElementById("routes");
            element.appendChild(para);
          }
           
        }
      }  
  }

}

//-----------------------------------------------------------------------------------------------------------

/**
 * Detects presence of class in an element.
 * Return true if element has the class cls, false otherwise.
 *
 * @param {object} element
 * @param {string} cls
 * @return {boolean}
 */
airlineRouteApp.elementHasClass = function(element, cls) {
  return element.classList.contains(cls);
};

//-----------------------------------------------------------------------------------------------------------

/**
 * Create a paragraph element for each route in the routes object.
 * The text of the element will be "SRC <=> DEST" where SRC is is one of
 * the keys in routes, and DEST is in the array of cities.
 * Because routes are bi-directional, they should not be duplicated in the
 * output. In other words only one of the following should appear on the
 * page: "YYZ <=> YVR" xor "YVR <=> YYZ".
 */

//At startup, make the myNewRoutes variable to remove duplicates
airlineRouteApp.buildRoutes = function() {

  var myRoutes = airlineRouteApp.ROUTES;
  //console.log("\n\nMAKING myRoutes to remove duplicates\n\n")
  var found = 0;
  
  for (var key in myRoutes)
  {
      var valueArrayLength = myRoutes[key].length;
      
      //Going though values for the current key
      for(var i = 0; i < valueArrayLength; i++)
      {
        //My checker to see if seen the key before
        if(myRoutes[key][i] in myNewRoutes)
        {
          //console.log("DUPLICATE for relationship " + key + " and " + myRoutes[key][i]);
        }

        //Not found as a key in myRoutes, then make a new key if doesnt exist and then push the value in the array 
        else
        {
          if(!(key in myNewRoutes))
          {
            myNewRoutes[key] = new Array();
          }
          myNewRoutes[key].push(myRoutes[key][i]);
        }  
      }
  }

};

//-----------------------------------------------------------------------------------------------------------

/**
 * Create one button element for each city in `routes`.
 * When the button is clicked, it will change the colour to red for all of the
 * paragraph elements with the class "route" and with the class name of
 * the city that is the name of the button.
 *
 * For example, if the user clicks on "YOW", only the "YOW <=> YYZ" route
 * will be coloured red. All other routes will be black.
 */
airlineRouteApp.buildCities = function() {

  // Making buttons routes dynamically
  var btn;
  var idName;
  var t;
  var cityElement = document.getElementById("cities");
  
  var myRoutes = airlineRouteApp.ROUTES;
  for (var key in myRoutes)
  {
    if (myRoutes.hasOwnProperty(key))
    {
      btn = document.createElement("BUTTON");
      idName = key;
      btn.setAttribute("id", idName);
      btn.setAttribute("onclick", "routeGenerator(this.id)");
      t = document.createTextNode(key);
      btn.appendChild(t);
      cityElement.appendChild(btn);      
    }
  }

};

//-----------------------------------------------------------------------------------------------------------

/**
 * Init function.
 */
airlineRouteApp.init = function() {
  
  //Builds my route variable which removes duplicates
  this.buildRoutes();
  
  //Builds the buttons
  this.buildCities();
};

//-----------------------------------------------------------------------------------------------------------

// Initializing.
airlineRouteApp.init();

//-----------------------------------------------------------------------------------------------------------
