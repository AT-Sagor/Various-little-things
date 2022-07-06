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

<p>
 <b><u>Доступные BB-команды</u>:</b>
 <ui>
  <li>[b]Текст[/b] - делает <strong>текст</strong> жирным.</li>
  <li>[i]Текст[/i] - делает <i>текст</i> курсивом.</li>
  <li>[u]Текст[/u] - делает <u>текст</u> подчёркнутым</li>
 </ui>
</p>
<p>
 <b><u>Доступные шаблоны</u>:</b>
 <ui>
  <li>{test1} - пишет жирным текстом: "<strong>Выполнение команды №1</strong>".</li>
  <li>{test2} - пишет курсивным текстом: "<i>Выполнение команды №2</i>".</li>
  <li>{random1_100} - вставляет случайное число от 1 - 100.</li>
 </ui>
</p>

 </body>
</html>
