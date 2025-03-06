import ReviewsSection from "../sections/review.js";

fetch("../../components/header.html")
  .then((response) => response.text())
  .then((data) => {
    const body = document.body;
    body.insertAdjacentHTML("afterbegin", data);
    const head = document.getElementsByTagName("head")[0];
    let headerScript = document.createElement("script");
    headerScript.src = "../scripts/components/header.js";
    head.appendChild(headerScript);
    let CategoriesScript = document.createElement("script");
    CategoriesScript.src = "/scripts/components/categories.js";
    head.appendChild(CategoriesScript);
  });

let slideIndex = 0;
const images = document.querySelectorAll(".slide-item img");
const slideShow = document.querySelector(".slide-show");
function updateProductImages() {
  slideIndex =
    slideIndex > images.length - 1
      ? 0
      : slideIndex < 0
        ? images.length - 1
        : slideIndex;
  slideShow.innerHTML = images[slideIndex].outerHTML;
  images[slideIndex].classList.add("active-slide");
}

function selectSlide(n) {
  images[slideIndex].classList.remove("active-slide");
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

// reviews section
let prodId = 5;

// render part
fetch("../../data/products.json")
  .then((data) => data.json())
  .then((products) => {
    let product = products.products.filter(
      (prod) => prod.product_id == prodId
    )[0];

    ReviewsSection.initialize(product.rating, product.reviews);
  });
