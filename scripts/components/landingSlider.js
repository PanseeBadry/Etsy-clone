import Helper from "../utils/helper.js";

const carousel = document.getElementById("carousel"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev"),
  scroller = document.getElementById("scroller");

export default function renderSlider(products) {
  renderScroll();
  let prodArray = products
    .filter((prod) => +prod.discount > 0)
    .sort((a, b) => b.discount - a.discount);
  prodArray.length == 0 && scroller.classList.add("hide");
  for (let prod of prodArray.slice(0, 20)) {
    let slide = document.createElement("div");
    slide.setAttribute("data-prod-id", prod.product_id);
    slide.className = "slide";
    slide.onclick = Helper.goToProduct;

    slide.innerHTML = `
      <img src="${prod.images[0]}" alt="${prod.product_name}" />
      <div class="product-data">
        <div>
          <p class="title">${prod.product_name}</p>
          <div class="rating">
            <p>${prod.rating}</p>
            <img src="./assets/icons/star.svg" alt="Star Icon" />
          </div>
        </div>
        <div class="pricing">
          <p class="current-price">USD ${prod.current_price}</p>
          <p class="old-price">USD ${(
            prod.current_price /
            (1 - prod.discount / 100)
          ).toFixed(2)}</p>
          <p class="disc">${prod.discount}% off</p>
        </div>
      </div>`;

    // add fav button
    let fav = document.createElement("i");
    fav.className = `fa-heart product-favorite ${
      Helper.isFav(prod.product_id) ? "fa-solid red" : "fa-regular"
    }`;
    fav.onclick = Helper.toggleIcon;
    fav.dataset.prodId = prod.product_id;
    fav.addEventListener("click", Helper.toggleFav);
    slide.appendChild(fav);
    carousel.appendChild(slide);
  }
  prodArray.length != 0 && checkButtons();
}

function renderScroll() {
  carousel.addEventListener("scroll", pauseScrolling);
  window.addEventListener("resize", checkButtons);

  next.onclick = function () {
    carousel.scrollBy({
      left: updateScrollAmount(),
      behavior: "smooth",
    });
  };

  prev.onclick = function () {
    carousel.scrollBy({
      left: -updateScrollAmount(),
      behavior: "smooth",
    });
  };
}

function updateScrollAmount() {
  let gap = 16.5;
  let res;
  let carouselWidth = carousel.getBoundingClientRect().width;
  let slides = document.getElementsByClassName("slide");
  let slideWidth = slides[0].getBoundingClientRect().width;

  if (window.matchMedia("(min-width: 900px)").matches) {
    res = carouselWidth - slideWidth / 2;
  } else {
    res = carouselWidth + gap;
  }
  return res;
}

function checkButtons() {
  next.classList.add("next");
  prev.classList.add("prev");
  let maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
  prev.disabled = carousel.scrollLeft <= 0;
  next.disabled = carousel.scrollLeft >= maxScrollLeft;
}
function pauseScrolling() {
  disableButtons();
  setTimeout(function () {
    checkButtons();
  }, 400);
}
function disableButtons() {
  next.classList.remove("next");
  prev.classList.remove("prev");
  next.disabled = true;
  prev.disabled = true;
}
