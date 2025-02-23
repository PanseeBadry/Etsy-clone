let gap = 16.5;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");

content.onscroll = checkScroll;
window.addEventListener("load", checkScroll);
window.addEventListener("resize", checkScroll);

next.onclick = function () {
  content.scrollBy({
    left: updateScrollAmount(1),
    behavior: "smooth",
  });
};

prev.onclick = function () {
  content.scrollBy({
    left: -updateScrollAmount(-1),
    behavior: "smooth",
  });
};

function updateScrollAmount(flag) {
  let res;
  let carouselWidth = carousel.getBoundingClientRect().width;
  let slides = document.getElementsByClassName("slide");
  slideWidth = slides[0].getBoundingClientRect().width;

  for (element of slides) {
    if (flag == 1) {
      element.style.scrollSnapAlign = "start";
    } else {
      element.style.scrollSnapAlign = "end";
    }
  }

  if (window.matchMedia("(min-width: 900px)").matches) {
    res = carouselWidth - slideWidth / 2;
  } else {
    res = carouselWidth + gap;
  }
  return res;
}

function checkScroll() {
  let maxScrollLeft = content.scrollWidth - content.clientWidth;
  prev.disabled = content.scrollLeft <= 0;
  next.disabled = content.scrollLeft >= maxScrollLeft;
}
