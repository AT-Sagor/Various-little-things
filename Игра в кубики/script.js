let lWindowHeight = window.innerHeight;
let oMotherContainer = document.getElementsByClassName("MotherContainer")[0];
let oIDStart = document.getElementById('IDStart');
let oIDPlayer_1 = document.getElementById('IDPlayer_1');
let oIDPlayer_2 = document.getElementById('IDPlayer_2');
let oIDCube_1 = document.getElementById('IDCube_1');
let oIDCube_2 = document.getElementById('IDCube_2');
let oIDTotalScore_1 = document.getElementById('IDTotalScore_1');
let oIDTotalScore_2 = document.getElementById('IDTotalScore_2');
let iRandomCube, iStartPlayer, iNum;
let iWinner_1 = 0; let iWinner_2 = 0;
let oIDCubeField;
let iPersonalScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let iCubeDace = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let iColumnScore = [0, 0, 0, 0, 0, 0];
let iRestart = 0;
let iTotalScorePlayer_1; let iTotalScorePlayer_2;
let oIDFinalContainer = document.getElementById('IDFinalContainer');
let oIDHelpContainer = document.getElementById('IDHelpContainer');
let oMoreGame = document.getElementById('MoreGame');
//let oIDHelp = document.getElementById('IDHelp');

//Создание интерфейса
oMotherContainer.style.height = lWindowHeight*0.95+'px';

//Начало
//Выбор игрока, который будет ходить первый, а после функция рестарта.
function fStart() {  
  if (iRestart == 0) {
    iStartPlayer = Math.round(Math.random()*1);
    IDStart.innerHTML = 'Рестарт';
  
    if (iStartPlayer == 1) { fAI(); }
    if (iStartPlayer == 0) { fRandomCube(); }
  }
  
  //Рестарт
  if (iRestart == 1) {
    //Процесс обнуления всех данных массивов
    iPersonalScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    iCubeDace = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    iColumnScore = [0, 0, 0, 0, 0, 0];
    let oErasing;
    
    //Обнуляем ячейки для кубиков
    fErasing('IDCubeField_', 18, '');
    //Обнуляем счёт в колонках
    fErasing('IDScoreColumnField_', 6, 0);
    //Обнуляем общий счёт
    fErasing('IDTotalScore_', 2, 'Счёт: 0');
    //Обнуляем пространство с кубиком
    fErasing('IDCube_', 2, '');
    
    //Универсальный процесс обнуления
    function fErasing(NameID, iCycle, DefaultName) {     
      for (iErasing = 1; iErasing <= iCycle; iErasing++) {
        oErasing = document.getElementById(''+NameID+iErasing+'');
        oErasing.value = 0;
        oErasing.innerHTML = DefaultName;
      }
    }
    
    iRestart = 0;
    oIDFinalContainer.style.display = 'none';
    fStart();
  }
 
   iRestart = 1;
}

oIDStart.addEventListener('click', fStart);
oMoreGame.addEventListener('click', fStart);

//Кидаем кубик с гранями 1 - 6.
function fRandomCube() { 
  
 iRandomCube = Math.round(Math.random()*5+1);
 //iRandomCube = 2;
 
 //Результаты броска кубика в зависмости от того, чей сейчас ход.
 if (iStartPlayer == 0) {
  oIDCube_1.value = iRandomCube;
  oIDCube_1.innerHTML = iRandomCube;
  oIDPlayer_1.style.background = "linear-gradient(to right, transparent 75%, #ba9a27)";
  oIDPlayer_2.style.background = "transparent";
  
  for (iCycle = 1; iCycle <= 9; iCycle++) {
   oIDCubeField =  document.getElementById('IDCubeField_'+iCycle+'');
   oIDCubeField.setAttribute('onmouseover', 'fFieldSelection('+iCycle+')');
   oIDCubeField.setAttribute('onmouseout', 'fFieldSelectionOut('+iCycle+')');
  }
 }
  
  
 if (iStartPlayer == 1) {
  oIDCube_2.value = iRandomCube;
  oIDCube_2.innerHTML = iRandomCube;
  oIDPlayer_2.style.background = "linear-gradient(to left, transparent 75%, #ba9a27)";
  oIDPlayer_1.style.background = "transparent";
 }
}

//Выбор места для кубика игрока.
function fFieldSelection(iColumnNum) {
  iNum = document.getElementById('IDCubeField_'+iColumnNum+'');
  
  if (iStartPlayer == 0 && iNum.value == 0 || iNum.value == undefined) {
    iNum.style.boxShadow = "inset 0 0 25px #ba9a27";    
    iNum.addEventListener('click', fPutTheCube, { once: true });
    
    function fPutTheCube() {
      if (iStartPlayer == 0) {      
        if (iNum.value == undefined || iNum.value == 0) {
          iNum.value = oIDCube_1.value;
          iNum.innerHTML = oIDCube_1.value;
          oIDCube_1.innerHTML = '';          
          iNum.setAttribute("data-value", 1);
          fScore();
          //setTimeout(fAI, 200);
          fAI();
        }
      }
    }
  }
}

function fFieldSelectionOut(iColumnNum) {
  let iNum = document.getElementById('IDCubeField_'+iColumnNum+'');  
  iNum.style.boxShadow = "none";
}

//Подсчёт очков.
function fScore() {
  let oScoreCube, oIDScoreColumnField, oCubeField;
  //let iPersonalScore = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //let iCubeDace = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //let iColumnScore = [0, 0, 0, 0, 0, 0];
  //let iTotalScorePlayer_1, iTotalScorePlayer_2;
  let iFieldValidation_1, iFieldValidation_2;
  
  for (iCycle = 1; iCycle <= 18; iCycle++) {
    oScoreCube = document.getElementById('IDCubeField_'+iCycle+'');
    
    if (oScoreCube.value == undefined) { oScoreCube.value = 0; }
    
    iPersonalScore[iCycle-1] = oScoreCube.value;
    iCubeDace[iCycle-1] = oScoreCube.value;    
  }
    
    //console.log(iNum);
    fCubeDestruction();
    
    //Уничтожение кубиков из противоположного столбца.
    //console.log(document.getElementById('IDCubeField_1').getAttribute("data-value"));
    function fCubeDestruction () {
    if (iStartPlayer == 0) {
      //Первый столбец
      //Первая ячейка
      if (iCubeDace[0] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_1');
        
        if (iCubeDace[0] == iCubeDace[9] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_10');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[0] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_1');
        
        if (iCubeDace[0] == iCubeDace[10] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_11');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[0] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_1');
        
        if (iCubeDace[0] == iCubeDace[11] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_12');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
      
      //iFieldValidation_1.setAttribute("data-value", 0);
      
      //Вторая ячейка
      if (iCubeDace[1] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_2');
        
        if (iCubeDace[1] == iCubeDace[9] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_10');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[1] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_2');
        
        if (iCubeDace[1] == iCubeDace[10] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_11');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[1] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_2');
        
        if (iCubeDace[1] == iCubeDace[11] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_12');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
      
      //Третья ячейка
      if (iCubeDace[2] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_3');
        
        if (iCubeDace[2] == iCubeDace[9] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_10');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[2] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_3');
        
        if (iCubeDace[2] == iCubeDace[10] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_11');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[2] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_3');
        
        if (iCubeDace[2] == iCubeDace[11] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_12');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
      
      //Вторая колонка
      //Четвёртая ячейка
      if (iCubeDace[3] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_4');
        
        if (iCubeDace[3] == iCubeDace[12] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_13');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[3] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_4');
        
        if (iCubeDace[3] == iCubeDace[13] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_14');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[3] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_4');
        
        if (iCubeDace[3] == iCubeDace[14] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_15');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
      
      //Пятая ячейка
      if (iCubeDace[4] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_5');
        
        if (iCubeDace[4] == iCubeDace[12] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_13');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[4] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_5');
        
        if (iCubeDace[4] == iCubeDace[13] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_14');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[4] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_5');
        
        if (iCubeDace[4] == iCubeDace[14] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_15');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
      
      //Шестая ячейка
      if (iCubeDace[5] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_6');
        
        if (iCubeDace[5] == iCubeDace[12] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_13');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[5] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_6');
        
        if (iCubeDace[5] == iCubeDace[13] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_14');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[5] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_6');
        
        if (iCubeDace[5] == iCubeDace[14] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_15');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
      
      //Третий ряд
      //Седьмая ядейка     
      if (iCubeDace[6] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_7');
        
        if (iCubeDace[6] == iCubeDace[15] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_16');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[6] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_7');
        
        if (iCubeDace[6] == iCubeDace[16] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_17');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[6] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_7');
        
        if (iCubeDace[6] == iCubeDace[17] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_18');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
      
      //Восьмая ядейка
      if (iCubeDace[7] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_8');
        
        if (iCubeDace[7] == iCubeDace[15] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_16');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[7] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_8');
        
        if (iCubeDace[7] == iCubeDace[16] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_17');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[7] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_8');
        
        if (iCubeDace[7] == iCubeDace[17] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_18');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
      
      //Девятая ядейка
      if (iCubeDace[8] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_9');
        
        if (iCubeDace[8] == iCubeDace[15] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_16');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[8] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_9');
        
        if (iCubeDace[8] == iCubeDace[16] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_17');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          
        }
      }
      
      if (iCubeDace[8] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_9');
        
        if (iCubeDace[8] == iCubeDace[0] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_18');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
     }
     
     //Поле ИИ
     if (iStartPlayer == 1) {
       
     for (iValue = 10; iValue <= 18; iValue++) {
    iFieldValidation_2 = document.getElementById('IDCubeField_'+iValue+'').setAttribute("data-value", 1);
     }
       
      //Четвёртый ряд
      //Десятая ячейка
      if (iCubeDace[9] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_10');
        //console.log(iFieldValidation_1.getAttribute("data-value"));
        
        if (iCubeDace[9] == iCubeDace[0] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_1');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';          
        }
      }
      
      if (iCubeDace[9] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_10');
        
        if (iCubeDace[9] == iCubeDace[1] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_2');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';  
        }
      }
      
      if (iCubeDace[9] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_10');
        
        if (iCubeDace[9] == iCubeDace[2] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_3');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
       
       //Одинадцатая ячейка
      if (iCubeDace[10] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_11');
        //console.log(iFieldValidation_1.getAttribute("data-value"));
        
        if (iCubeDace[10] == iCubeDace[0] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_1');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';          
        }
      }
      
      if (iCubeDace[10] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_11');
        
        if (iCubeDace[10] == iCubeDace[1] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_2');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';  
        }
      }
      
      if (iCubeDace[10] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_11');
        
        if (iCubeDace[10] == iCubeDace[2] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_3');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
       
      //Двенадцатая ячейка
      if (iCubeDace[11] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_12');
        //console.log(iFieldValidation_1.getAttribute("data-value"));
        
        if (iCubeDace[11] == iCubeDace[0] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_1');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';          
        }
      }
      
      if (iCubeDace[11] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_12');
        
        if (iCubeDace[11] == iCubeDace[1] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_2');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';  
        }
      }
      
      if (iCubeDace[11] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_12');
        
        if (iCubeDace[11] == iCubeDace[2] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_3');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
     
      //Пятый ряд
      //Тринадцатая ячейка
      if (iCubeDace[12] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_13');
        //console.log(iFieldValidation_1.getAttribute("data-value"));
        
        if (iCubeDace[12] == iCubeDace[3] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_4');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';          
        }
      }
      
      if (iCubeDace[12] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_13');
        
        if (iCubeDace[12] == iCubeDace[4] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_5');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';  
        }
      }
      
      if (iCubeDace[12] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_13');
        
        if (iCubeDace[12] == iCubeDace[5] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_6');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
       
      //Четырнадцатая ячейка
      if (iCubeDace[13] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_14');
        //console.log(iFieldValidation_1.getAttribute("data-value"));
        
        if (iCubeDace[13] == iCubeDace[3] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_4');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';          
        }
      }
      
      if (iCubeDace[13] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_14');
        
        if (iCubeDace[13] == iCubeDace[4] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_5');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';  
        }
      }
      
      if (iCubeDace[13] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_14');
        
        if (iCubeDace[13] == iCubeDace[5] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_6');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
       
      //Пятнадцатая ячейка
      if (iCubeDace[14] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_15');
        //console.log(iFieldValidation_1.getAttribute("data-value"));
        
        if (iCubeDace[14] == iCubeDace[3] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_4');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';          
        }
      }
      
      if (iCubeDace[14] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_15');
        
        if (iCubeDace[14] == iCubeDace[4] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_5');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';  
        }
      }
      
      if (iCubeDace[14] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_15');
        
        if (iCubeDace[14] == iCubeDace[5] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_6');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
      
      //Шетстой ряд
      //16-ая ячейка
      if (iCubeDace[15] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_16');
        //console.log(iFieldValidation_1.getAttribute("data-value"));
        
        if (iCubeDace[15] == iCubeDace[6] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_7');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';          
        }
      }
      
      if (iCubeDace[15] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_16');
        
        if (iCubeDace[15] == iCubeDace[7] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_8');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';  
        }
      }
      
      if (iCubeDace[15] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_16');
        
        if (iCubeDace[15] == iCubeDace[8] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_9');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
       
     //17-ая ячейка
      if (iCubeDace[16] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_17');
        //console.log(iFieldValidation_1.getAttribute("data-value"));
        
        if (iCubeDace[16] == iCubeDace[6] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_7');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';          
        }
      }
      
      if (iCubeDace[16] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_17');
        
        if (iCubeDace[16] == iCubeDace[7] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_8');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';  
        }
      }
      
      if (iCubeDace[16] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_17');
        
        if (iCubeDace[16] == iCubeDace[8] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_9');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
       
      //18-ая ячейка
       if (iCubeDace[17] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_18');
        //console.log(iFieldValidation_1.getAttribute("data-value"));
        
        if (iCubeDace[17] == iCubeDace[6] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_7');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';          
        }
      }
      
      if (iCubeDace[17] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_18');
        
        if (iCubeDace[17] == iCubeDace[7] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_8');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';  
        }
      }
      
      if (iCubeDace[17] != 0) {
        iFieldValidation_1 = document.getElementById('IDCubeField_18');
        
        if (iCubeDace[17] == iCubeDace[8] && iFieldValidation_1.getAttribute("data-value") == "1") {
          oCubeField = document.getElementById('IDCubeField_9');
          oCubeField.setAttribute("data-value", 0);
          oCubeField.value = 0;
          oCubeField.innerHTML = '';
          iFieldValidation_1.setAttribute("data-value", 0);
        }
      }
       
    }
      
  if (iStartPlayer == 0) {
    for (iValue = 9; iValue <= 18; iValue++) {
    iFieldValidation_2 = document.getElementById('IDCubeField_'+iValue+'').setAttribute("data-value", 0);    
  }
 }
    
  if (iStartPlayer == 1) {
    for (iValue = 1; iValue <= 9; iValue++) {
    iFieldValidation_2 = document.getElementById('IDCubeField_'+iValue+'').setAttribute("data-value", 0);
  }
  }
    
    
    //Удвояния и утроения очков.   
   if (iPersonalScore[0] == iPersonalScore[1] && iPersonalScore[0] == iPersonalScore[2]) {
    
      iPersonalScore[0] = iPersonalScore[0]*3;
      iPersonalScore[1] = iPersonalScore[1]*3;
      iPersonalScore[2] = iPersonalScore[2]*3;
    
  }
   
   else if (iPersonalScore[0] == iPersonalScore[1]) {
    
      iPersonalScore[0] = iPersonalScore[0]*2;
      iPersonalScore[1] = iPersonalScore[1]*2;
    
  }
    
   else if (iPersonalScore[0] == iPersonalScore[2]) {
    
      iPersonalScore[0] = iPersonalScore[0]*2;
      iPersonalScore[2] = iPersonalScore[2]*2;
    
  }
    
   else if (iPersonalScore[1] == iPersonalScore[2]) {
    
      iPersonalScore[1] = iPersonalScore[1]*2;
      iPersonalScore[2] = iPersonalScore[2]*2;
    
  }
    
   if (iPersonalScore[3] == iPersonalScore[4] && iPersonalScore[3] == iPersonalScore[5]) {
    
      iPersonalScore[3] = iPersonalScore[3]*3;
      iPersonalScore[4] = iPersonalScore[4]*3;
      iPersonalScore[5] = iPersonalScore[5]*3;
    
  }
    
   else if (iPersonalScore[3] == iPersonalScore[4]) {
    
      iPersonalScore[3] = iPersonalScore[3]*2;
      iPersonalScore[4] = iPersonalScore[4]*2;
    
  }
    
   else if (iPersonalScore[3] == iPersonalScore[5]) {
    
      iPersonalScore[3] = iPersonalScore[3]*2;
      iPersonalScore[5] = iPersonalScore[5]*2;
    
  }
    
   else if (iPersonalScore[4] == iPersonalScore[5]) {
    
      iPersonalScore[4] = iPersonalScore[4]*2;
      iPersonalScore[5] = iPersonalScore[5]*2;
    
  }
    
    
   if (iPersonalScore[6] == iPersonalScore[7] && iPersonalScore[6] == iPersonalScore[8]) {
    
      iPersonalScore[6] = iPersonalScore[6]*3;
      iPersonalScore[7] = iPersonalScore[7]*3;
      iPersonalScore[8] = iPersonalScore[8]*3;
    
  }
    
   else if (iPersonalScore[6] == iPersonalScore[7]) {
    
      iPersonalScore[6] = iPersonalScore[6]*2;
      iPersonalScore[7] = iPersonalScore[7]*2;
    
  }
    
   else if (iPersonalScore[6] == iPersonalScore[8]) {
    
      iPersonalScore[6] = iPersonalScore[8]*2;
      iPersonalScore[8] = iPersonalScore[8]*2;
    
  }
    
   else if (iPersonalScore[7] == iPersonalScore[8]) {
    
      iPersonalScore[7] = iPersonalScore[7]*2;
      iPersonalScore[8] = iPersonalScore[8]*2;
    
  }
    
if (iPersonalScore[6+3] == iPersonalScore[7+3] && iPersonalScore[6+3] == iPersonalScore[8+3]) {
    
      iPersonalScore[6+3] = iPersonalScore[6+3]*3;
      iPersonalScore[7+3] = iPersonalScore[7+3]*3;
      iPersonalScore[8+3] = iPersonalScore[8+3]*3;
    
  }
    
   else if (iPersonalScore[6+3] == iPersonalScore[7+3]) {
    
      iPersonalScore[6+3] = iPersonalScore[6+3]*2;
      iPersonalScore[7+3] = iPersonalScore[7+3]*2;
    
  }
    
   else if (iPersonalScore[6+3] == iPersonalScore[8+3]) {
    
      iPersonalScore[6+3] = iPersonalScore[8+3]*2;
      iPersonalScore[8+3] = iPersonalScore[8+3]*2;
    
  }
    
   else if (iPersonalScore[7+3] == iPersonalScore[8+3]) {
    
      iPersonalScore[7+3] = iPersonalScore[7+3]*2;
      iPersonalScore[8+3] = iPersonalScore[8+3]*2;
    
  }
    
if (iPersonalScore[6+6] == iPersonalScore[7+6] && iPersonalScore[6+6] == iPersonalScore[8+6]) {
    
      iPersonalScore[6+6] = iPersonalScore[6+6]*3;
      iPersonalScore[7+6] = iPersonalScore[7+6]*3;
      iPersonalScore[8+6] = iPersonalScore[8+6]*3;
    
  }
    
   else if (iPersonalScore[6+6] == iPersonalScore[7+6]) {  
     iPersonalScore[6+6] = iPersonalScore[6+6]*2;
     iPersonalScore[7+6] = iPersonalScore[7+6]*2;    
  }
    
   else if (iPersonalScore[6+6] == iPersonalScore[8+6]) {
    
      iPersonalScore[6+6] = iPersonalScore[8+6]*2;
      iPersonalScore[8+6] = iPersonalScore[8+6]*2;
    
  }
    
   else if (iPersonalScore[7+6] == iPersonalScore[8+6]) {
    
      iPersonalScore[7+6] = iPersonalScore[7+6]*2;
      iPersonalScore[8+6] = iPersonalScore[8+6]*2;
    
  }
    
if (iPersonalScore[6+9] == iPersonalScore[7+9] && iPersonalScore[6+9] == iPersonalScore[8+9]) {
    
      iPersonalScore[6+9] = iPersonalScore[6+9]*3;
      iPersonalScore[7+9] = iPersonalScore[7+9]*3;
      iPersonalScore[8+9] = iPersonalScore[8+9]*3;
    
  }
    
   else if (iPersonalScore[6+9] == iPersonalScore[7+9]) {
    
      iPersonalScore[6+9] = iPersonalScore[6+9]*2;
      iPersonalScore[7+9] = iPersonalScore[7+9]*2;
    
  }
    
   else if (iPersonalScore[6+9] == iPersonalScore[8+9]) {
    
      iPersonalScore[6+9] = iPersonalScore[8+9]*2;
      iPersonalScore[8+9] = iPersonalScore[8+9]*2;
    
  }
    
   else if (iPersonalScore[7+9] == iPersonalScore[8+9]) {
     iPersonalScore[7+9] = iPersonalScore[7+9]*2;
     iPersonalScore[8+9] = iPersonalScore[8+9]*2;  
  }
    
      oIDScoreColumnField = document.getElementById('IDScoreColumnField_1');
      iColumnScore[0] = oIDScoreColumnField.value = iPersonalScore[0]+iPersonalScore[1]+iPersonalScore[2];
      oIDScoreColumnField.innerHTML = oIDScoreColumnField.value;
    
      oIDScoreColumnField = document.getElementById('IDScoreColumnField_2');
      iColumnScore[1] = oIDScoreColumnField.value = iPersonalScore[3]+iPersonalScore[4]+iPersonalScore[5];
      oIDScoreColumnField.innerHTML = oIDScoreColumnField.value;
    
      oIDScoreColumnField = document.getElementById('IDScoreColumnField_3');
      iColumnScore[2] = oIDScoreColumnField.value = iPersonalScore[6]+iPersonalScore[7]+iPersonalScore[8];
      oIDScoreColumnField.innerHTML = oIDScoreColumnField.value;
    
      oIDScoreColumnField = document.getElementById('IDScoreColumnField_4');
      iColumnScore[3] = oIDScoreColumnField.value = iPersonalScore[9]+iPersonalScore[10]+iPersonalScore[11];
      oIDScoreColumnField.innerHTML = oIDScoreColumnField.value;

      oIDScoreColumnField = document.getElementById('IDScoreColumnField_5');
      iColumnScore[4] = oIDScoreColumnField.value = iPersonalScore[12]+iPersonalScore[13]+iPersonalScore[14];
      oIDScoreColumnField.innerHTML = oIDScoreColumnField.value;
       
      oIDScoreColumnField = document.getElementById('IDScoreColumnField_6');
      iColumnScore[5] = oIDScoreColumnField.value = iPersonalScore[15]+iPersonalScore[16]+iPersonalScore[17];
      oIDScoreColumnField.innerHTML = oIDScoreColumnField.value;
     
    iTotalScorePlayer_1 = oIDTotalScore_1.value = iColumnScore[0]+iColumnScore[1]+iColumnScore[2];
    oIDTotalScore_1.innerHTML = 'Счёт: '+oIDTotalScore_1.value;
    iTotalScorePlayer_2 = oIDTotalScore_2.value = iColumnScore[3]+iColumnScore[4]+iColumnScore[5];
    oIDTotalScore_2.innerHTML = 'Счёт: '+oIDTotalScore_2.value; 
  }
}

//Выбор ИИ куда сходить.
function fAI() {
  
  if (iPersonalScore[0] > 0 && iPersonalScore[1] > 0 && iPersonalScore[2] > 0 && iPersonalScore[3] > 0 && iPersonalScore[4] > 0 && iPersonalScore[5] > 0 && iPersonalScore[6] > 0 && iPersonalScore[7] > 0 && iPersonalScore[8] > 0) {
    setTimeout(fFinal, 50);
    return;
  }
  
  iStartPlayer = 1;
  let iAIField = Math.round(Math.random()*(18 - 10) + 10);
  fRandomCube();
  let oIDCubeFieldAI = document.getElementById('IDCubeField_'+iAIField+'');
  fBust(); 
  
  function fBust(){
  if (oIDCubeFieldAI.value > 0) {
    for (iStep = 1; iStep <= 9; iStep++) {
      //if (iStep == 9) { fFinal(2); }
      iAIField++
      if (iAIField == 19) { iAIField = 10; }
      oIDCubeFieldAI = document.getElementById('IDCubeField_'+iAIField+'');
      if (oIDCubeFieldAI.value == 0) { return oIDCubeFieldAI; }
     }
   }
 }
 
 oIDCubeFieldAI.value = oIDCube_2.value;
 oIDCubeFieldAI.innerHTML = oIDCube_2.value;
 oIDCubeFieldAI.setAttribute("data-value", 1);
  
 fScore();
  
 
  if (iPersonalScore[9] > 0 && iPersonalScore[10] > 0 && iPersonalScore[11] > 0 && iPersonalScore[12] > 0 && iPersonalScore[13] > 0 && iPersonalScore[14] > 0 && iPersonalScore[15] > 0 && iPersonalScore[16] > 0 && iPersonalScore[17] > 0) {
   setTimeout(fFinal, 50);
   return;
  } 
  
 iStartPlayer = 0;
 fRandomCube();
}

function fFinal (sWinner) {
  let oIDWinnerName =  document.getElementById('IDWinnerName');
  let oIDScore =  document.getElementById('IDScore');
  oIDFinalContainer.style.display = 'flex';
  oIDScore.innerHTML = 'СЧЁТ: '+oIDTotalScore_1.value+' / '+oIDTotalScore_2.value+'';

  if (iTotalScorePlayer_1 > iTotalScorePlayer_2) {
    oIDWinnerName.innerHTML = 'Игрок #1';
    //alert('Победил игрок #1'); 
 }
  
  if (iTotalScorePlayer_1 < iTotalScorePlayer_2) {
    //alert('Победил игрок #2');
    oIDWinnerName.innerHTML = 'Игрок #2';
 }
  
  if (iTotalScorePlayer_1 == iTotalScorePlayer_2) {
    //alert('Ничья!');
    oIDWinnerName.innerHTML = 'Ничья!';
  } 
}

function fHelp(iState) {
  //oIDHelpContainer.style.display = 'flex';
  
  if (iState == 0) { oIDHelpContainer.style.display = 'none'; }
  if (iState == 1) { oIDHelpContainer.style.display = 'flex'; }
   
  console.log(oIDHelpContainer.style.display);
}