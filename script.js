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

// add click event listener to all span elements in .filter
   document.querySelectorAll('.filter > span').forEach((filter) => {
     filter.addEventListener('click', () => {
       const restaurants = document.querySelectorAll('.restaurant-container');
 
       restaurants.forEach((restaurant) => {
         // save the class nane 'visibility-x' of the .restaurant-container as a variable
         const visibilityClassName = Array.from(restaurant.classList).find((className) => className.includes('visibility'));
 
         // remove .is-hidden if the span that was clicked on has the same 'visibility-x' class as the .restaurant-container
         // else, if the 'visibility-x' class of .restaurant-container is different, add .is-hidden class
         if (filter.classList.contains(visibilityClassName) || filter.classList.contains('all')) {
           restaurant.classList.remove('is-hidden');
         } else {
           restaurant.classList.add('is-hidden');
         }
       });
     });
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