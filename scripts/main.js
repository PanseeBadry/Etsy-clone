fetch("../components/header.html")
  .then((response) => response.text())
  .then((data) => {
    const body = document.body;
    body.insertAdjacentHTML("afterbegin", data);
    const head = document.getElementsByTagName("head")[0];
    let headerScript = document.createElement("script");
    headerScript.src = "./scripts/components/header.js";
    head.appendChild(headerScript);
  });

// big deals part

let testArray = [
  {
    product_id: 1,
    category_id: 12,
    subcategory_id: 303,
    primary_image: "/assets/images/leatherWallet.png",
    secondary_image: "gift_for_him_secondary.jpg",
    current_price: 49.99,
    discount: 10,
    rating: "3",
    vendor: "Vendor A",
    product_name: "Classic Leather Wallet",
  },
  {
    product_id: 2,
    category_id: 12,
    subcategory_id: 305,
    primary_image: "/assets/images/goldEarings.png",
    secondary_image: "gift_for_her_secondary.jpg",
    current_price: 39.99,
    discount: 15,
    vendor: "Vendor B",
    rating: "4",
    product_name: "Gold tone stud earings",
  },
  {
    product_id: 3,
    category_id: 6,
    subcategory_id: 202,
    primary_image: "/assets/images/summerHats.png",
    secondary_image: "accessory_hat_secondary.jpg",
    current_price: 24.99,
    rating: "4",
    discount: 5,
    vendor: "Vendor C",
    product_name: "Trendy Summer Hat",
  },
  {
    product_id: 1,
    category_id: 12,
    subcategory_id: 303,
    primary_image: "/assets/images/leatherWallet.png",
    secondary_image: "gift_for_him_secondary.jpg",
    current_price: 49.99,
    discount: 10,
    rating: "3",
    vendor: "Vendor A",
    product_name: "Classic Leather Wallet",
  },
  {
    product_id: 2,
    category_id: 12,
    subcategory_id: 305,
    primary_image: "/assets/images/goldEarings.png",
    secondary_image: "gift_for_her_secondary.jpg",
    current_price: 39.99,
    discount: 15,
    vendor: "Vendor B",
    rating: "4",
    product_name: "Gold tone stud earings",
  },
  {
    product_id: 3,
    category_id: 6,
    subcategory_id: 202,
    primary_image: "/assets/images/summerHats.png",
    secondary_image: "accessory_hat_secondary.jpg",
    current_price: 24.99,
    rating: "4",
    discount: 5,
    vendor: "Vendor C",
    product_name: "Trendy Summer Hat",
  },
  {
    product_id: 1,
    category_id: 12,
    subcategory_id: 303,
    primary_image: "/assets/images/leatherWallet.png",
    secondary_image: "gift_for_him_secondary.jpg",
    current_price: 49.99,
    discount: 10,
    rating: "3",
    vendor: "Vendor A",
    product_name: "Classic Leather Wallet",
  },
  {
    product_id: 2,
    category_id: 12,
    subcategory_id: 305,
    primary_image: "/assets/images/goldEarings.png",
    secondary_image: "gift_for_her_secondary.jpg",
    current_price: 39.99,
    discount: 15,
    vendor: "Vendor B",
    rating: "4",
    product_name: "Gold tone stud earings",
  },
  {
    product_id: 3,
    category_id: 6,
    subcategory_id: 202,
    primary_image: "/assets/images/summerHats.png",
    secondary_image: "accessory_hat_secondary.jpg",
    current_price: 24.99,
    rating: "4",
    discount: 5,
    vendor: "Vendor C",
    product_name: "Trendy Summer Hat",
  },
  {
    product_id: 1,
    category_id: 12,
    subcategory_id: 303,
    primary_image: "/assets/images/leatherWallet.png",
    secondary_image: "gift_for_him_secondary.jpg",
    current_price: 49.99,
    discount: 10,
    rating: "3",
    vendor: "Vendor A",
    product_name: "Classic Leather Wallet",
  },
  {
    product_id: 2,
    category_id: 12,
    subcategory_id: 305,
    primary_image: "/assets/images/goldEarings.png",
    secondary_image: "gift_for_her_secondary.jpg",
    current_price: 39.99,
    discount: 15,
    vendor: "Vendor B",
    rating: "4",
    product_name: "Gold tone stud earings",
  },
  {
    product_id: 3,
    category_id: 6,
    subcategory_id: 202,
    primary_image: "/assets/images/summerHats.png",
    secondary_image: "accessory_hat_secondary.jpg",
    current_price: 24.99,
    rating: "4",
    discount: 5,
    vendor: "Vendor C",
    product_name: "Trendy Summer Hat",
  },
  {
    product_id: 1,
    category_id: 12,
    subcategory_id: 303,
    primary_image: "/assets/images/leatherWallet.png",
    secondary_image: "gift_for_him_secondary.jpg",
    current_price: 49.99,
    discount: 10,
    rating: "3",
    vendor: "Vendor A",
    product_name: "Classic Leather Wallet",
  },
  {
    product_id: 2,
    category_id: 12,
    subcategory_id: 305,
    primary_image: "/assets/images/goldEarings.png",
    secondary_image: "gift_for_her_secondary.jpg",
    current_price: 39.99,
    discount: 15,
    vendor: "Vendor B",
    rating: "4",
    product_name: "Gold tone stud earings",
  },
  {
    product_id: 3,
    category_id: 6,
    subcategory_id: 202,
    primary_image: "/assets/images/summerHats.png",
    secondary_image: "accessory_hat_secondary.jpg",
    current_price: 24.99,
    rating: "4",
    discount: 5,
    vendor: "Vendor C",
    product_name: "Trendy Summer Hat",
  },
  {
    product_id: 1,
    category_id: 12,
    subcategory_id: 303,
    primary_image: "/assets/images/leatherWallet.png",
    secondary_image: "gift_for_him_secondary.jpg",
    current_price: 49.99,
    discount: 10,
    rating: "3",
    vendor: "Vendor A",
    product_name: "Classic Leather Wallet",
  },
  {
    product_id: 2,
    category_id: 12,
    subcategory_id: 305,
    primary_image: "/assets/images/goldEarings.png",
    secondary_image: "gift_for_her_secondary.jpg",
    current_price: 39.99,
    discount: 15,
    vendor: "Vendor B",
    rating: "4",
    product_name: "Gold tone stud earings",
  },
  {
    product_id: 3,
    category_id: 6,
    subcategory_id: 202,
    primary_image: "/assets/images/summerHats.png",
    secondary_image: "accessory_hat_secondary.jpg",
    current_price: 24.99,
    rating: "4",
    discount: 5,
    vendor: "Vendor C",
    product_name: "Trendy Summer Hat",
  },
].slice(0, 12);

let bigDeals = this.document.getElementById("content");

for (let prod of testArray) {
  let slide = this.document.createElement("div");
  slide.setAttribute("data-prod-id", prod.product_id);
  slide.className = "slide";
  // slide.onclick = goToProduct;
  let fav = this.document.createElement("button");
  fav.className = "product-favorite";
  // fav.onclick = handleFav;
  fav.innerHTML = "<img src='./assets/icons/heart.svg' alt='fav' />";
  slide.appendChild(fav);
  slide.innerHTML += `<img src=${prod.primary_image} alt=${prod.product_name} />
              <div class="product-data">
                <div>
                  <p class="title">
                    ${prod.product_name}
                  </p>
                  <div class="rating">
                    <p>${prod.rating}</p>
                    <img src="./assets/icons/star.svg" alt="" />
                  </div>
                </div>
                <div class="pricing">
                  <p class="current-price">USD ${prod.current_price}</p>
                  <p class="old-price">USD ${(
                    prod.current_price /
                    (1 - prod.discount / 100.0)
                  ).toFixed(2)}</p>
                  <p class="disc">${prod.discount}% off</p>
                </div>
              </div>`;
  bigDeals.appendChild(slide);
}
