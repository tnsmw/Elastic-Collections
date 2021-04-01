/* globals require */
console.log("Hello, Airtable");


// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

var base = new Airtable({apiKey: 'keyDLatrGr9ultBwX'}).base('appHzBt6PuzBf0hlX');


//get the table from the base, select ALL the records, and specify the functions that will receive the data
base("restaurants").select({}).eachPage(gotRestaurants, gotAllRestaurants);

// an empty array to hold our book data
const restaurants = [];

// callback function that receives our data
function gotRestaurants(records, fetchNextPage) {
  console.log("gotRestaurants()");
  // add the records from this page to our books array
  books.push(...records);
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

// just loop through the books and console.log them
function consoleLogRestaurants() {
  console.log("consoleLogRestaurants()");
  restaurants.forEach((restaurant) => {
    console.log("Restaurants:", restaurant);
  });
}

// loop through the books, create an h2 for each one, and add it to the page
function showRestaurants() {
  console.log("showRestaurants()");
  restaurants.forEach((restaurant) => {
    const h2 = document.createElement("h2");
    h2.innerText = restaurants.fields.Name;
    document.body.appendChild(h2);
  });
}




//randomize positioning code:

document.documentElement.className = document.documentElement.className.replace('no-js','js');

function getRandomPosition(element) {
   var x = document.body.offsetHeight-element.clientHeight;
   var y = document.body.offsetWidth-element.clientWidth;
   var randomX = Math.floor(Math.random()*x);
   var randomY = Math.floor(Math.random()*y);
   return [randomX,randomY];
}
window.onload = function() {
   var img = document.createElement('img');
   img.setAttribute("style", "position:absolute;");
   img.setAttribute("src", "some-image.jpg");
   document.body.appendChild(img);
   var xy = getRandomPosition(img);
   img.style.top = xy[0] + 'px';
   img.style.left = xy[1] + 'px';
}