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


/*

function gotNumber(records, fetchNextPage) {
  // add the records from this page to our array
  // typesArray.push(...records);
  records.forEach(function(number) {
    numberArray.push({id: number.id, ...number.fields});
  });
  // request more pages
  fetchNextPage();
}

function gotAllNumber(err) {
  // checks for errors
  try {
    showNumber();
  } catch (error) {
    error.log(error);
  }
}

function showNumber() {
  // once we have all the types, make sure our List exists
  if (numberList) {
    numberArray.forEach(function(number) {
      // create list item
      const el = document.createElement('li');
      // makes sure we have the type name and sets the data attribute of the li
      el.dataset.filter = number.Name ? '';
      el.innerHTML = number.Name ? number.Name : '';
      numberList.append(el);
    })
  }

  // set up filters once we've appended them to the document
  const numberFilters = numberList.querySelectorAll('li');

  numberFilters.forEach(function(numberFilter) {
    // add click listener
    numberFilter.addEventListener('click', function(e) {
      e.preventDefault();
      // removes class from all filters
      numberFilters.forEach(function(filter) {
        filter.classList.remove('is-active');
      });
      // adds class to clicked filter
      e.target.classList.add('is-active');

      // this section grabs all the pokemon cards
      const restaurants = document.querySelectorAll('.retaurant-block');
      // triple check we actually have cards
      if (restaurants.length > 0) {
        restaurants.forEach(function(block) {
          // gets the data-filter attribute from the clicked element, and checks each pokemon to see if the card has the relevant class, if it doesn't have the class, we hide the card with .is-hidden
          if (!block.classList.contains(e.target.dataset.filter)) {
            block.classList.add('is-hidden');
          } else {
            block.classList.remove('is-hidden');
          }
        });
      }
    });
  });
};

*/