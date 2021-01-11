var iColorR; var iColorG; var iColorB;
var iLocationX; var iLocationY;
var iPicture = 0;
var iTrafficX = 1; var iTrafficY = 1;
var oCanvas = document.getElementsByClassName("CanvasContainer")[0];
var oContext = oCanvas.getContext('2d');

function fRandomRGB() { 
 iColorR = Math.round(Math.random()*256);
 iColorG = Math.round(Math.random()*256);
 iColorB = Math.round(Math.random()*256);
}

function fRandomLocation() {
 iLocationX = Math.round(Math.random()*770);
 iLocationY = Math.round(Math.random()*470);
}

function fCanvas() {
 oContext.clearRect(iLocationX,iLocationY,30,30);
 
 if (iPicture != 1) {
  fRandomRGB();
  fRandomLocation();
 }
 
 if (iPicture == 1) { 
  if (iLocationX >= 770) { iTrafficX = 0; fRandomRGB(); }
  if (iLocationX <= 0) { iTrafficX = 1; fRandomRGB(); }
  if (iLocationY >= 470) { iTrafficY = 0; fRandomRGB(); }
  if (iLocationY <= 0) { iTrafficY = 1; fRandomRGB(); }
  
  if (iTrafficX == 0) { iLocationX = iLocationX-3; }
  if (iTrafficX == 1) { iLocationX = iLocationX+3; }
  if (iTrafficY == 0) { iLocationY = iLocationY-3; }
  if (iTrafficY == 1) { iLocationY = iLocationY+3; }
 }
   
 oContext.fillStyle = 'rgba('+iColorR+', '+iColorG+', '+iColorB+', 0.8)';
 oContext.fillRect(iLocationX,iLocationY,30,30);
 iPicture = 1;
}

setInterval(fCanvas, 20);