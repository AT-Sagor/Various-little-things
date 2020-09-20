document.body.addEventListener ('mousemove', function() {
  let oLight = document.getElementsByClassName("Light")[0];
  let oContainer = document.getElementsByClassName("Container")[0];
  let oDarkness = document.getElementsByClassName("Darkness")[0];
  let eLightX = event.pageX;
  let eLightY = event.pageY;
  oLight.style.left = eLightX+'px';
  oLight.style.top = eLightY+'px';
  
  oDarkness.style.textShadow = 30-eLightX/20+'px '+-(eLightY/15-30)+'px 6px black';
 }
)