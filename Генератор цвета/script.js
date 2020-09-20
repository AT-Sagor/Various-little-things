var iStartColor, iRandomColor;
var iStart = 0;
var oEntryField = document.getElementsByClassName("EntryField")[0];
var oRandomColor = document.getElementsByClassName("RandomColor")[0];

function fRandomColor () {
 let iRandomColorR = Math.round(Math.random()*255).toString(16);
 let iRandomColorG = Math.round(Math.random()*255).toString(16);
 let iRandomColorB = Math.round(Math.random()*255).toString(16);
 let iRandomColorA = Math.round(Math.random()*(255-33)+33).toString(16);
 
 if (iRandomColorR < 16) {
  iRandomColorR = '0'+iRandomColorR;
 }

 if (iRandomColorG < 16) {
  iRandomColorG = '0'+iRandomColorG;
 }
  
 if (iRandomColorB < 16) {
  iRandomColorB = '0'+iRandomColorB;
 }
 
 let iRandomColorFull = document.body.style.background =  '#'+iRandomColorR+iRandomColorG+iRandomColorB+iRandomColorA;
 
 if (iStart == 0) {
  iStartColor = iRandomColorFull;
  iStart++;
 }
 
 iRandomColor = iRandomColorFull;
}

fRandomColor();

function fColorСhange() {
 let iBodyColor;
 let sColor = document.body.style.background = oEntryField.value;
 
 if (sColor == 0) {
  document.body.style.background = iStartColor;
 }
}

oRandomColor.addEventListener('click', function() {
  fRandomColor();
  oEntryField.value = iRandomColor;
 }
)