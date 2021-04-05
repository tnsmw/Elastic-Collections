/* globals require */
console.log("Hello, Airtable");


// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

var base = new Airtable({apiKey: 'keyDLatrGr9ultBwX'}).base('appHzBt6PuzBf0hlX');


//get the table from the base, select ALL the records, and specify the functions that will receive the data
base("restaurants").select({}).eachPage(gotRestaurants, gotAllRestaurants);

// an empty array to hold our restaurants data
const restaurants = [];

// callback function that receives our data
function gotRestaurants(records, fetchNextPage) {
  console.log("gotRestaurants()");
  // add the records from this page to our restaurants array
  restaurants.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllRestaurants(err) {
  console.log("gotAllRestaurants()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading restaurants");
    console.error(err);
    return;
  }

  // call functions to log and show
  consoleLogRestaurants();
  showRestaurants();
}

// just loop through the restaurants and console.log them
function consoleLogRestaurants() {
  console.log("consoleLogRestaurants()");
  restaurants.forEach(restaurant => {
    console.log("Restaurant:", restaurant);
  });
}

// loop through our airtable data, create elements
function showRestaurants() {
  console.log("showRestaurants()");
  restaurants.forEach(restaurant => {

         var restaurantContainer = document.createElement("div");
         restaurantContainer.classList.add("restaurant-container");
         document.querySelector(".container").append(restaurantContainer);

         var restaurantImg = document.createElement("img");
         restaurantImg.classList.add("restaurant-img");
         restaurantImg.src = restaurant.fields.Image[0].url;
         restaurantContainer.append(restaurantImg);

         var restaurantName = document.createElement("h2");
         restaurantName.classList.add("restaurant-name");
         restaurantName.innerText = restaurant.fields.Name;
         restaurantContainer.append(restaurantName);

         var restaurantDescription = document.createElement("h3");
         restaurantDescription.classList.add("restaurant-description");
         restaurantDescription.innerText = restaurant.fields.Notes;
         restaurantContainer.append(restaurantDescription);

         var restaurantVisibility = document.createElement("h4");
         restaurantVisibility.classList.add("restaurant-visibility");
         restaurantVisibility.innerText = restaurant.fields.Visibility;
         restaurantContainer.append(restaurantVisibility);

    });
}


//random positioning?
(function restaurantContainer(){

    // make position sensitive to size and document's width
    var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
    var posy = (Math.random() * ($(document).height() - divsize)).toFixed();

})();