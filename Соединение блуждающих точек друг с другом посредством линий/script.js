var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;
var iRandomX = [];
var iRandomY = [];
var iRandomXLine = [];
var iRandomYLine = [];
var iPointSum = 1000;
var iDistance = window.innerWidth*0.02;
var iRandomMove;
var iColorR = [];
var iColorG = [];
var iColorB = [];
var iRandomMoveX = [];
var iRandomMoveY = [];
var iRoundX = [];
var iRoundY = [];
var iRoundLimit = 100;

for (iPoint = 0; iPoint < iPointSum; iPoint++) {
 iRandomX[iPoint] = Math.round(Math.random()*innerWidth);
 iRandomY[iPoint] = Math.round(Math.random()*windowHeight);
 iRandomXLine[iPoint] = 0;
 iRandomYLine[iPoint] = 0;
 iColorR[iPoint] = Math.round(Math.random()*256);
 iColorG[iPoint] = Math.round(Math.random()*256);
 iColorB[iPoint] = Math.round(Math.random()*256);
 iRoundX[iPoint] = 0;
 iRoundY[iPoint] = 0;
}

function fRandomMove() {
 iRandomMove = Math.round(Math.random()*1);
}

function fRandomMoveX() {
 iRandomMoveX[iPoint] = Math.round(Math.random()*1);
}

function fRandomMoveY() {
 iRandomMoveY[iPoint] = Math.round(Math.random()*1);
}

document.body.innerHTML += '<canvas id="idCanvas" width="'+windowWidth+'" height="'+windowHeight+'"></canvas>';

var drawingCanvas = document.getElementById('idCanvas');
var context = drawingCanvas.getContext('2d');

function fLineCreate () {
  context.clearRect(0, 0, windowWidth, windowHeight);
  
  for (iPoint = 0; iPoint < iPointSum; iPoint++) {
   context.strokeStyle = 'rgba('+iColorR[iPoint]+', '+iColorG[iPoint]+', '+iColorB[iPoint]+', 0.4)';
   context.lineWidth = 1;
   context.beginPath();
   context.moveTo(iRandomX[iPoint], iRandomY[iPoint]);
   for (iStep = 0; iStep < iPointSum; iStep++) {
   if (iRandomX[iPoint] <= iRandomX[iStep]-iDistance || iRandomX[iPoint] >= iRandomX[iStep]+iDistance || iRandomY[iPoint] <= iRandomY[iStep]-iDistance || iRandomY[iPoint] >= iRandomY[iStep]+iDistance) {
   
    }
    
   else {
    if (iRandomXLine[iPoint] <= 2 || iRandomYLine[iPoint] <= 2) {
      context.lineTo(iRandomX[iStep], iRandomY[iStep]);
      iRandomXLine[iPoint]++;
      iRandomYLine[iPoint]++;
     }
    }
   }
    
   context.stroke();
    
   if (iRoundX[iPoint] >= iRoundLimit) {
    iRoundX[iPoint] = 0;
   }
    
   if (iRoundX[iPoint] == 0) {
   fRandomMoveX();
  }
 
   if (iRandomMoveX[iPoint] > 0) {
    iRandomX[iPoint] = iRandomX[iPoint]+0.2;
    iRoundX[iPoint]++;
   }

   if (iRandomMoveX[iPoint] < 1) {
    iRandomX[iPoint] = iRandomX[iPoint]-0.2;
    iRoundX[iPoint]++;
   }
   
   if (iRoundY[iPoint] >= iRoundLimit) {
    iRoundY[iPoint] = 0;
   }
    
   if (iRoundY[iPoint] == 0) {
    fRandomMoveY();
   }
    
   if (iRandomMoveY[iPoint] > 0) {
    iRandomY[iPoint] = iRandomY[iPoint]+0.2;
    iRoundY[iPoint]++;
   }
    
   if (iRandomMoveY[iPoint] < 1) {
    iRandomY[iPoint] = iRandomY[iPoint]-0.2;
    iRoundY[iPoint]++;
   }
   
   iRandomXLine[iPoint] = 0;
   iRandomYLine[iPoint] = 0; 
  }
}

setInterval(fLineCreate, 20);