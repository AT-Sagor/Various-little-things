var mTab = []; var mCaption = []; var mText = [];
var iInputNum = 0; var iCycle = 0; var iNumCycle = 0; var iNumCaption = 1;

function creatElement(aElement, aClassName, aIdName, aText) {
 var icPlace;
 var icElement = document.createElement(aElement);
 icElement.className = aClassName;
 if (aText == 'valueinputTab') {
  aIdName = aIdName+document.getElementById(mTab[iNumCycle]).value;
  if (document.getElementById(mTab[iNumCycle]).value == '') {aIdName = aIdName+'idEmply'+iNumCycle}
  aText = document.getElementById(mTab[iNumCycle]).value;
  if (document.getElementById(mTab[iNumCycle]).value == '') {aText = 'Безымянный'}
  if (aClassName == 'tabCaption') {mCaption[iNumCycle] = aIdName;}
  if (aClassName == 'tabText') {aText = 'Текст блока '+document.getElementById(mTab[iNumCycle]).value; mText[iNumCycle] = aIdName;}
  iNumCycle++;
 }
 icElement.id = aIdName;
 if (aElement == 'div') {icPlace = document.body;}
 if (aElement == 'input') {iInputNum++; icElement.id = aIdName+iInputNum; icPlace = idMainMenu; icElement.type = 'text';
  mTab[iInputNum-1] = aIdName+iInputNum;}
 icPlace.appendChild(icElement);
 if (aText) {icElement.innerHTML = aText;}
 return icElement, icPlace;
}

creatElement('div', 'mainMenu', 'idMainMenu'); //Создаём блок главного меню.
creatElement('input', 'inputTab', 'idInputTab'); //Создаём поле для ввода названия вкладки.
creatElement('div', 'buttonAdd', 'idButtonAdd','+'); //Создаём кнопку для вывода дополнительного поля.
document.getElementById('idButtonAdd').setAttribute("onclick", "creatElement('input', 'inputTab', 'idInputTab')");
document.getElementById('idButtonAdd').setAttribute("title", "Добавить ещё одну вкладку");
creatElement('div', 'endCreate', 'idEndCreate','Завершить'); //Создаём кнопку "Завершить"
creatElement('div', 'closeMenu', 'idcloseMenu', '+'); //Создаём кнопку отмены
document.getElementById('idcloseMenu').setAttribute("onclick", "clouseMenu()");
document.getElementById('idEndCreate').setAttribute("onclick", "endCreateTab()");

function clouseMenu() {
 document.getElementById("idMainMenu").remove("idMainMenu");
 document.getElementById("idButtonAdd").remove("idButtonAdd");
 document.getElementById("idEndCreate").remove("idEndCreate");
 document.getElementById("idcloseMenu").remove("idcloseMenu"); 
}

function endCreateTab() {
  for (iCycle; iCycle < iInputNum; iCycle++) {
  creatElement('div', 'tabCaption', 'idtabCaption','valueinputTab');
  document.getElementById(mCaption[iCycle]).setAttribute("onclick", "switchingText()");
  document.getElementById(mCaption[iCycle]).setAttribute("value", iCycle);
  if (iCycle != 0) {
   document.getElementById(mCaption[iCycle]).style.background = "#c4c2c4";
   iNumCaption++;
  }
 } //Заголовки вкладок.
 iNumCycle = 0;
 for (iCycle = 0; iCycle < iInputNum; iCycle++) {creatElement('div', 'tabText', 'idtabText','valueinputTab')
  if (iCycle != 0) {document.getElementById(mText[iCycle]).style.display = "none"};
 } //Поля для текста.
 clouseMenu();
}

function switchingText(icIdCaption, icValueCaption, icValueText, icActiveCaption, icActiveText) {
 icIdCaption = event.target.id;
 icValueCaption = document.getElementById(icIdCaption).getAttribute('value');
 icValueText = icValueCaption;
 icActiveCaption = icValueCaption; icActiveText = icValueText;
 document.getElementById(icIdCaption).style.background = "#f9f9c5";
 for (iCycle = 0; iCycle < iNumCaption; iCycle++) {
  if (icValueCaption != icActiveCaption) {document.getElementById(mCaption[icValueCaption]).style.background = "#c4c2c4";}
  document.getElementById(mText[icValueText]).style.display = "none"
  if (icValueText == icActiveText) {
   document.getElementById(mText[icValueText]).style.display = "inline-block";
   }
  icValueCaption++; icValueText++;
  if (icValueCaption == iNumCaption) {icValueCaption = 0}
  if (icValueText == iNumCaption) {icValueText = 0}
 }
}