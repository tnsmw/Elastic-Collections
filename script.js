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
      try {
      showRestaurants();
    } catch(err) {
      console.error(err);
    }
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

         var restaurantVisibility = document.createElement("h4");
         restaurantVisibility.classList.add("restaurant-visibility");
         restaurantVisibility.innerText = restaurant.fields.Visibility;
         restaurantContainer.append(restaurantVisibility);

         var restaurantDescription = document.createElement("h3");
         restaurantDescription.classList.add("restaurant-description");
         restaurantDescription.innerText = restaurant.fields.Notes;
         restaurantContainer.append(restaurantDescription);

       // get genre field from airtable
       // loop through the array and add each genre as
       // a class to the song container
         var numberFilter = restaurant.fields.Number[0];
         // console.log(numberFilter);

         restaurantContainer.classList.add('visibility-' + numberFilter);
           
   });

   // clicking on filter
   // hide if visibility (the value in the Number field) is not 5
      var filterFive = document.querySelector(".filter-5");
      var restaurantContainer = document.querySelectorAll('.restaurant-container');

      console.log(restaurantContainer);
      filterFive.addEventListener("click", function() {

      restaurantContainer.forEach(function(restaurant) {
         if (restaurant.classList.contains(".filter-5")) {
            restaurant.classList.add('is-active');
         } else {
            restaurant.classList.remove('is-active');
         }
      });


      // this section grabs all the restaurants
         const restaurants = document.querySelectorAll('.filter');
         // triple check we actually have restaurants
         if (restaurants.length > 0) {
            restaurants.forEach(function(restaurant) {
               /* gets the data-filter attribute from the clicked element, 
               and checks each restaurant to see if the restaurant has the relevant class, 
               if it doesn't have the class, we hide the restaurant with .is-hidden */
               if (!restaurant.classList.contains('is-active')) {
                  restaurant.classList.add('is-hidden');
               } else {
                  restaurant.classList.remove('is-hidden');
               }
            });
         }; 
      });

};


// onoff button to toggle day or night mode
  function onoff() {
   const stylesheet = document.getElementById('stylesheet');
      if (stylesheet.getAttribute('href') === 'style.css') {
         stylesheet.href = 'style-dark.css';
      } else {
         stylesheet.href = 'style.css';
      }

};