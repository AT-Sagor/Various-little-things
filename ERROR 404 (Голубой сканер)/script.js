var iText = document.getElementById('TestText');
var iReplacing = 0;

function ReplacingText() {
 let sNewText;
 if (iReplacing == 0) {
  sNewText = 'Page not found.';
  iText.textContent = sNewText;
  iReplacing = 1;
  return;
 }
  
 if (iReplacing == 1) {
  sNewText = 'ERROR 404';
  iText.textContent = sNewText;
  iReplacing = 0;
  return;
 }
}

setInterval(ReplacingText, 10000);