<?php
 $aTemplate = array (
  '/\{(test1)\}/is',
  '/\{(test2)\}/is',
  '/\{(random1_100)\}/is',
 );
 
 $aTemplatePerformance = array (
  '<strong>Выполнение команды №1</strong>',
  '<i>Выполнение команды №2</i>',
  '$iRandom1_100;',
 );
 
 $aTemplatePerformance[2] = rand(1, 100);
?>
