var iValue = 200;
var fSnowStart; var iNum = 0; var oSnow = []; var tSnow;
var iLeftRandom; var iTopRandom; var iSize;
var iSpeed;
var windowWidth = window.innerWidth;
var iPosition = [];
var oContainer = document.getElementsByClassName("Container")[0];

function fSnowCreate() {
 for (iIdSnow = 1; iIdSnow <= iValue; iIdSnow++) {
  iLeftRandom = Math.round(Math.random()*windowWidth);
  iTopRandom = -Math.round(Math.random()*(1000)+25);
  iSize = Math.round(Math.random()*10);
  iPosition[iNum] = iTopRandom;
  tSnow = '<div class="SnowBlock" id="Block_'+iIdSnow+'" style="left: '+iLeftRandom+'px; top: '+iTopRandom+'px; height: '+iSize+'px; width: '+iSize+'px;"></div>';
  oContainer.insertAdjacentHTML('beforeend', tSnow);
  oSnow[iNum] = document.getElementById('Block_'+iIdSnow);
  iNum++;
 }
}

function fAnimationSnow() {ф
 for(iNum = 0; iNum < iValue; iNum++) {
  oSnow[iNum].style.top = iPosition[iNum]+'px';
  iSpeed = parseInt(oSnow[iNum].style.height);
  iPosition[iNum] = iPosition[iNum]+1/10*iSpeed;
   
  if (iPosition[iNum] > 1000) {
   iPosition[iNum] = -25;
   oSnow[iNum].style.left = Math.round(Math.random()*windowWidth)+'px';
  }
 }
}

function fSnowStart() {
 fSnowStart = setInterval(fAnimationSnow, 20);
}

fSnowCreate();
fSnowStart();
