<?php
 //Включение режима обработки bb-кодов.
 $iMode_BB = 1;
 //Включение режима обработки шаблонов.
 $iMode_Template = 1;
 $Variable = $_POST['comment'];
 
 //Обработка bb-кодов и шаблонов без подключения библиотек и включения режимов.
 function fCode($result) {
  $search = array (
  '/\[b\](.*?)\[\/b\]/is',
  '/\{(test1)\}/is',
  '/\{(test2)\}/is'
  );
  $replace = array (
   '<strong>$1</strong>',
   '<strong>Выполнение команды №1</strong>',
   '<i>Выполнение команды №2</i>'
  );
  
  $result = preg_replace($search, $replace, $result);
  return $result;  
 }
 
 //echo fCode($Variable);
 
 //Обработка bb-кодов и шаблонов с подключение библиотек и включением режимов.
 function fTextReplace($result) {
  global $iMode_BB, $iMode_Template;
  $search = array(); $replace = array();
  
  //bb-коды
  if($iMode_BB == 1) {
   include 'BBComand.php';
   $search = array_merge($search, $aBBComand);
   $replace = array_merge($replace, $aBBPerformance);    
  }
  
  //Шаблоны
  if($iMode_Template == 1) {
   include 'Template.php';   
   $search = array_merge($search, $aTemplate);
   $replace = array_merge($replace, $aTemplatePerformance);   
  }
  
  $result = preg_replace($search, $replace, $result);
  return $result;
 }
 
 echo fTextReplace($Variable);

//Это [b]жирный текст[/b], а это {test2}.
?>