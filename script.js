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
base("restaurants").select({
   maxRestaurants: 200;
   view: "All"
}).eachPage(function page(restaurants, fetchNextPage) {
  restaurants.forEach(function(restaurant) {

      if (container) {
         // define and create elements
         let el = document.createElement('li');
         let img = document.createElement('img');
         let name = document.createElement('h2');
         let notes = document.createElement('h3');
         let visibility = document.createElement('h4');
         // Set innerHTML of the elements
         img.src = restaurant.fields.Image[0].url;
         name.innerHTML = restaurant.fields.Name;
         notes.innerHTML = restaurant.fields.Notes;
         visibility.innerHTML = restaurant.fields.Visibility;
         // append them to the list
         container.append(el);
         el.append(img, name, notes, visibility);
      }
    });

    fetchNextPage();

}, function done(err) {
    if (err) {console.error(err); return; }

});
