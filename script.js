// This code in combination with .no-js .js in css enables a class on the document that will let you determine how the page looks with/without JavaScript enabled
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