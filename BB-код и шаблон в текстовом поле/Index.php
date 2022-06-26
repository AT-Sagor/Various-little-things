<?php
 if (isset($_POST['Go'])) {
  include 'FormMaster.php';
 }
?>

<html>
 <head>
  <meta charset="utf-8">
  <title>Тестовый</title>
 </head>
 <body>
  <form action="" method="post">
   <p><b>Введите текст:</b></p>
 
<p><textarea name="comment"></textarea></p>
  
 <p><input type="submit" value="Отправить" name="Go"></p>
 
</form>

Доступные команды: [b][/b], {test1}, {test2}.
 </body>
</html>