fetch('../../components/header.html')
    .then(response => response.text())
    .then(data => {
        const body = document.body;
        body.insertAdjacentHTML('afterbegin', data);
    });

    
let slideIndex = 0;
const images = document.querySelectorAll('.slide-item img');
const slideShow = document.querySelector('.slide-show');
function updateProductImages() {
    slideIndex = slideIndex > images.length - 1 ? 0 : slideIndex < 0 ? images.length - 1 : slideIndex;
    slideShow.innerHTML = images[slideIndex].outerHTML;
    images[slideIndex].classList.add('active-slide');
}


function selectSlide(n) {
    images[slideIndex].classList.remove('active-slide');
    slideIndex = n;
    updateProductImages();
}

function goPrev() {
    selectSlide(slideIndex - 1);
}

function goNext() {
    selectSlide(slideIndex + 1);
}

updateProductImages(slideIndex);