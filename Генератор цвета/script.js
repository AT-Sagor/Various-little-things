var iStartColor, iRandomColor;
var iStart = 0;
var oEntryField = document.getElementsByClassName("EntryField")[0];
var oRandomColor = document.getElementsByClassName("RandomColor")[0];
var oMemoryColor = document.getElementsByClassName("MemoryColor")[0];
var oAddColor1 = document.getElementById("AddColor_1");
var oAddColor2 = document.getElementById("AddColor_2");
var oAddColor3 = document.getElementById("AddColor_3");
var iMemoryColor1, iMemoryColor2, iMemoryColor3;

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
  if (event.altKey) {
   oMemoryColor.style.background = "none";
   return;
  } 
  
 if (AddColor == 1) {
  if (event.ctrlKey) {
   oMemoryColor.style.background = oAddColor1.style.background;
   return;
  }
   
  if (iMemoryColor1 == 1) {
   document.body.style.background = oEntryField.value = oAddColor1.style.background;
   oAddColor1.innerHTML = '<b>+</b>';
   oAddColor1.style.background = "transparent";
   
   iMemoryColor1--;
   return;
  }
   
  if (oEntryField.value == 0) {
   oAddColor1.style.background = iStartColor;
  }
  
  else {oAddColor1.style.background = oEntryField.value;}
   
  oAddColor1.innerHTML = '&#8635;';
  iMemoryColor1 = 1;
 }

 if (AddColor == 2) {
   
  if (event.ctrlKey) {
   oMemoryColor.style.background = oAddColor2.style.background;
   return;
  }
  
  if (iMemoryColor2 == 1) {
   document.body.style.background = oEntryField.value = oAddColor2.style.background;
   oAddColor2.innerHTML = '<b>+</b>';
   oAddColor2.style.background = "transparent";
   
   iMemoryColor2--;
   return;
  }
  
  if (oEntryField.value == 0) {
   oAddColor2.style.background = iStartColor;
  }
  
  else {oAddColor2.style.background = oEntryField.value;}
  
  oAddColor2.innerHTML = '&#8635;';
  iMemoryColor2 = 1;
 }
  
 if (AddColor == 3) {
   
  if (event.ctrlKey) {
   oMemoryColor.style.background = oAddColor3.style.background;
   return;
  }
   
  if (iMemoryColor3 == 1) {
   document.body.style.background = oEntryField.value = oAddColor3.style.background;
   oAddColor3.innerHTML = '<b>+</b>';
   oAddColor3.style.background = "transparent";
   
   iMemoryColor3--;
   return;
  }
  
  if (oEntryField.value == 0) {
   oAddColor3.style.background = iStartColor;
  }
  
  else {oAddColor3.style.background = oEntryField.value;}
  
  oAddColor3.innerHTML = '&#8635;';
  iMemoryColor3 = 1;
 }
}
