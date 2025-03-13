import Helper from "../utils/helper.js";

export default function renderRecently(products) {
  let recentlyProd = localStorage.getItem("recentlyProd");
  if (!recentlyProd) {
    document.getElementById("recently").classList.add("hide");
  } else {
    let recentlyContainer =
      document.getElementsByClassName("recently-viewed")[0];
    recentlyProd = JSON.parse(recentlyProd);
    products = products
      .filter((prod) => recentlyProd.includes(String(prod.product_id)))
      .sort((a, b) => recentlyProd.indexOf(String(a.product_id)) - recentlyProd.indexOf(String(b.product_id)));


    for (let prod of products) {
      let card = document.createElement("div");
      card.setAttribute("data-prod-id", prod.product_id);
      card.className = "recently-prod";
      card.onclick = Helper.goToProduct;

      card.innerHTML = `
        <img src=${prod.images[0]} alt=${prod.product_name} />
        <p class="price">
            <span class="current">USD ${prod.current_price}</span>
            ${+prod.discount > 0
          ? `<span class="old">USD ${(
            prod.current_price /
            (1 - prod.discount / 100)
          ).toFixed(2)}</span>`
          : ""
        }
        </p>`;

      // add fav button
      let fav = document.createElement("i");
      fav.className = `fa-heart product-favorite ${Helper.isFav(prod.product_id) ? "fa-solid red" : "fa-regular"
        }`;
      fav.onclick = Helper.toggleIcon;
      fav.dataset.prodId = prod.product_id;
      fav.addEventListener("click", Helper.toggleFav);
      card.appendChild(fav);

      recentlyContainer.appendChild(card);
    }
  }
}
