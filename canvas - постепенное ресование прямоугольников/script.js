var windowHeight = window.innerHeight - 20;
var windowWidth = window.innerWidth - 20;
var iTimeOut =  0;

document.body.innerHTML += '<canvas class="smile" width="'+windowWidth+'" height="'+windowHeight+'"></canvas>';

for (iCanvas = 0; iCanvas <= 200; iCanvas++) {
 
 function cavasCru () { 
  var randomНeight2 = Math.round(Math.random()*300);
  var randomWidth2 = Math.round(Math.random()*300);
  var randomНeight = Math.round(Math.random()*windowHeight - randomНeight2);
  var randomWidth = Math.round(Math.random()*windowWidth - randomWidth2);

  var iColor1 = Math.round(Math.random()*256);
  var iColor2 = Math.round(Math.random()*256);
  var iColor3 = Math.round(Math.random()*256);
  let drawingCanvas = document.getElementsByClassName("smile")[0];
  let context = drawingCanvas.getContext('2d');
  context.fillStyle = 'rgba('+iColor1+', '+iColor2+', '+iColor3+', 0.8)';
  context.fillRect(randomWidth,randomНeight,randomНeight2,randomWidth2);
 }
 
 setTimeout(cavasCru, iTimeOut);
 iTimeOut = iTimeOut + 50;
}