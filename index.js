var artCanvas = document.getElementById("art");
var artContext = artCanvas.getContext("2d");

var space = new Image();
space.src = "https://cdn.glitch.com/9e6587f9-4791-482e-9435-54853ee5b085%2Fstars.jpg?v=1617337124993";

var pizza = new Image();
pizza.src = "https://cdn.glitch.com/9e6587f9-4791-482e-9435-54853ee5b085%2Fza.png?v=1617337001165";

var colors = ["red", "green", "royalblue", "mediumseagreen", "mediumvioletred", "midnightblue", "orange", "yellow"];

function drawArt() {
  
  // draw background
  artContext.drawImage(space,0,0,800,500);
  
  // draw rectangles
  var numRect = Math.floor(Math.random()*10 + 5);
  for (var i = 0; i < numRect; i++) {
    var x = Math.random() * 800;
    var y = Math.random() * 500;
    var w = 20 + Math.random() * 150;
    var h = 20 + Math.random() * 150;
    artContext.fillStyle=colors[Math.floor(Math.random() * colors.length)];
    artContext.fillRect(x,y,w,h);
  }
  
  // draw pizzas
  var numPizza = Math.floor(Math.random()*10 + 5);
  for (var i = 0; i < numPizza; i++) {
    var x = Math.random() * 800;
    var y = Math.random() * 500;
    var w = 20 + Math.random() * 150;
    var h = 20 + Math.random() * 150;
    artContext.drawImage(pizza,x,y,w,h);
  }
  
}

addEventListener("load", drawArt);
artCanvas.addEventListener("click", drawArt);