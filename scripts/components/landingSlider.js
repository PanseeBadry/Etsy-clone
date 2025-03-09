import Helper from "../utils/helper.js";

export default function renderSlider(products) {
  let bigDeals = document.getElementById("content");
  let prodArray = products
    .filter((prod) => +prod.discount > 0)
    .sort((a, b) => b - a);
  for (let prod of prodArray.slice(0, 12)) {
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
    bigDeals.appendChild(slide);
  }
}
