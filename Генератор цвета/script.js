var iStartColor, iRandomColor;
var iStart = 0;
var oEntryField = document.getElementsByClassName("EntryField")[0];
var oRandomColor = document.getElementsByClassName("RandomColor")[0];
var oMemoryColor = document.getElementsByClassName("MemoryColor")[0];
var oAddColor, iMemoryColor;

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

function fColorMemory(AddColor) {
 if (AddColor == 1) { oAddColor = document.getElementById("AddColor_1"); }
 if (AddColor == 2) { oAddColor = document.getElementById("AddColor_2"); }
 if (AddColor == 3) { oAddColor = document.getElementById("AddColor_3"); }
  
 if (event.ctrlKey) {
  oMemoryColor.style.background = oAddColor.style.background;
  return;
 }
  
 if (event.altKey) {
  oMemoryColor.style.background = "none";
  return;
 }
 
 if (oAddColor.value == 1) {
  document.body.style.background = oEntryField.value = oAddColor.style.background;
  oAddColor.style.background = 'none';
  oAddColor.innerHTML = '<b>+</b>';
  oAddColor.value = 0;
  return;
 }
 
 if (oEntryField.value == 0) {
  oEntryField.value = iStartColor;
 }
 
 oAddColor.style.background = oEntryField.value;
 oAddColor.innerHTML = '&#8635;';
 oAddColor.value = 1;
}
