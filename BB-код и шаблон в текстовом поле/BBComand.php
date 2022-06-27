<?php
 $aBBComand = array (
  '/\[b\](.*?)\[\/b\]/is',
  '/\[i\](.*?)\[\/i\]/is',
  '/\[u\](.*?)\[\/u\]/is',
 );
 
 $aBBPerformance = array (
  '<strong>$1</strong>',
  '<i>$1</i>',
  '<u>$1</u>',
 );
?>
