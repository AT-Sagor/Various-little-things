var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var iCanvas = 0;

document.body.innerHTML += '<canvas class="smile" width="'+windowWidth+'" height="'+windowHeight+'"></canvas>';

var drawingCanvas = document.getElementsByClassName("smile")[0];
var context = drawingCanvas.getContext('2d');

function cavasCru() {
  let randomНeight2 = Math.round(Math.random()*300);
  let randomWidth2 = Math.round(Math.random()*300);
  let randomНeight = Math.round(Math.random()*windowHeight - randomНeight2);
  let randomWidth = Math.round(Math.random()*windowWidth - randomWidth2);
  let iColor1 = Math.round(Math.random()*256);
  let iColor2 = Math.round(Math.random()*256);
  let iColor3 = Math.round(Math.random()*256);
 
  context.fillStyle = 'rgba('+iColor1+', '+iColor2+', '+iColor3+', 0.8)';
  context.fillRect(randomWidth,randomНeight,randomНeight2,randomWidth2);
  iCanvas++;
  
  if (iCanvas >= 200) {
   context.clearRect(0, 0, windowWidth, windowHeight);
   iCanvas = 0;
  }
 }
 
 setInterval(cavasCru, 10);
