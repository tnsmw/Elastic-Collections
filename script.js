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
         console.log(numberFilter);

         restaurantContainer.classList.add(numberFilter);

       // clicking on filter
       // hide if not 5
          var filterFive = document.querySelector(".visibility-5");
          filterFive.addEventListener("click", function() {
            if (restaurantContainer.classList.contains("5")) {
              restaurantContainer.classList.add('is-active');
            } else {
               restaurantContainer.classList.remove('is-active');
            }
            // this section grabs all the pokemon cards
               const restaurants = document.querySelector('.filter');
               // triple check we actually have cards
               if (restaurants.length > 0) {
                  restaurants.forEach(function(number) {
                     /* gets the data-filter attribute from the clicked element, 
                     and checks each pokemon to see if the card has the relevant class, 
                     if it doesn't have the class, we hide the card with .is-hidden */
                     if (restaurantContainer.classList.remove('is-active')) {
                        restaurantContainer.classList.add('is-hidden');
                     } else {
                        restaurantContainer.classList.remove('is-hidden');
                     }
                 });
               }
             });
           });
};

  function onoff() {
   var on = document.querySelector("link[href='style.css']").href = "style-dark.css";
   if (on.href = "style-dark.css") {
      on.href = "style.css";
   } else {
      on.href = "style-dark.css";
   }

};