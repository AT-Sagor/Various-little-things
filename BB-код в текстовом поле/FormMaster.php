<?php
 $Variable = $_POST['comment'];
 
 function fCode($result) {
  $search = array (
  '/\[b\](.*?)\[\/b\]/is'
  );
  $replace = array (
   '<strong>$1</strong>'
  );

  $result = preg_replace($search, $replace, $result);
  return $result;  
 }
 
 echo fCode($Variable); 
?>