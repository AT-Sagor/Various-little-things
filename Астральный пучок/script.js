var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var iRandomX = [];
var iRandomY = [];
var iPointSum = 300;

for (iPoint = 0; iPoint < iPointSum; iPoint++) {
 iRandomX[iPoint] = Math.round(Math.random()*innerWidth);
 iRandomY[iPoint] = Math.round(Math.random()*windowHeight);
}

document.body.innerHTML += '<canvas id="smile" width="'+windowWidth+'" height="'+windowHeight+'"></canvas>';

var drawingCanvas = document.getElementById('smile');
var context = drawingCanvas.getContext('2d');

 function fPoint() {
   for (iPoint = 0; iPoint < iPointSum; iPoint++) {
    context.fillStyle = 'cyan';
    context.fillRect(iRandomX[iPoint], iRandomY[iPoint], 2, 2);    
   }

 }

fPoint();

document.body.addEventListener ('mousemove', function() {
  let eLightX = event.pageX;
  let eLightY = event.pageY;
  
  context.clearRect(0, 0, windowWidth, windowHeight);
  
  context.strokeStyle = 'rgba(0,255,255, 0.4)';
  context.lineWidth = 1;
  
  for (iPoint = 0; iPoint < iPointSum; iPoint++) {
   if (eLightX <= iRandomX[iPoint]-100 || eLightX >= iRandomX[iPoint]+100 || eLightY <= iRandomY[iPoint]-100 || eLightY >= iRandomY[iPoint]+100) {

   }
   
   else {
    context.beginPath();
    context.moveTo(iRandomX[iPoint], iRandomY[iPoint]);
    context.lineTo(eLightX, eLightY);
    context.stroke();
   }
    
  }
   fPoint();  
 }
)