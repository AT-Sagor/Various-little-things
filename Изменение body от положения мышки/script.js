document.body.addEventListener('mousemove', function() {
  var x = event.clientX;
  var y = event.clientY;
  var iColor1 = Math.round(Math.random()*256);
  var iColor2 = Math.round(Math.random()*256);
  var iColor3 = Math.round(Math.random()*256);
  
  document.body.style.backgroundImage = 'linear-gradient(to left top, rgb('+x/4+', '+x/3+', '+x/2+'), rgb('+y/2+', '+y/3+', '+y/4+')';
 document.body.innerHTML += '<b style="color: rgb('+iColor1+', '+iColor2+', '+iColor3+')"> Koxae </b>';
}
)