let oImageForm = document.forms.FormImage;
let oImputImage = oImageForm.elements.ImputImage;
let oImgTotal = document.getElementById('IDImage');

oImputImage.addEventListener('change', function() {

    let frImage = new FileReader();

    frImage.addEventListener('load', function() {
        oImgTotal.style.backgroundImage = "url(" + frImage.result + ")";
    }, false);

    frImage.readAsDataURL(this.files[0]);
});