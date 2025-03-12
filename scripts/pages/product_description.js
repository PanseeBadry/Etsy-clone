import DataStore from "/scripts/utils/data_store.js";
import ReviewsSection from "../components/review.js";
import LS from "/scripts/utils/localStorage.js";
import updateCartIcon from "/scripts/components/cartIcon.js";
import loadHeader from "/scripts/utils/loadHeader.js";

// Initialize Product Description Rendering
async function renderProductDescription() {
  const productId = new URLSearchParams(window.location.search).get("prodId");
  const products = await DataStore.getProducts();
  const product = products.find((prod) => prod.product_id == productId);

  if (!product) return;

  initializeSlider(product);
  renderProductDetails(product);
  handleCartButton(product);
  if (product.reviews.length > 0) {
    ReviewsSection.initialize(product.rating, product.reviews);
  } else {
    document.querySelector(".product-reviews").style.display = "none";
  }
}

// Initialize Image Slider
function initializeSlider(product) {
  const slider = document.querySelector(".slider");
  const slideShow = document.querySelector(".slide-show");
  const prev = document.querySelector(".prev-btn");
  const next = document.querySelector(".next-btn");
  let slideIndex = 0;

  product.images.forEach((image, index) => {
    const slideItem = document.createElement("div");
    slideItem.classList.add("slide-item");

    const img = document.createElement("img");
    img.src = image;
    img.alt = `${product.name} ${product.description}`;
    slideItem.appendChild(img);
    slideItem.addEventListener("click", () => selectSlide(index));

    slider.appendChild(slideItem);
  });

  prev.addEventListener("click", () => selectSlide(slideIndex - 1));
  next.addEventListener("click", () => selectSlide(slideIndex + 1));
  selectSlide(0);

  function selectSlide(index) {
    const slides = document.querySelectorAll(".slide-item");
    slides[slideIndex].classList.remove("active-slide");
    slideIndex = (index + product.images.length) % product.images.length;
    slides[slideIndex].classList.add("active-slide");
    slideShow.innerHTML = slides[slideIndex].innerHTML;
  }
}

// Render Product Details
function renderProductDetails(product) {
  const productDetails = document.querySelector(".product-details");
  productDetails.innerHTML = `
    ${
      product.quantity < 5
        ? `<div class="low-stock">Low in stock, only ${product.quantity} left</div>`
        : ""
    }
    <div class="product-price">
      <div class="price-container">
        ${
          product.discount > 0
            ? `
          <span class="price with-discount">USD ${product.current_price}</span>
          <span class="discount">USD ${(
            product.current_price *
            (1 + product.discount / 100)
          ).toFixed(2)}</span>
        </div>
        <div class="discount-percent">${product.discount}% off</div>
        `
            : `<span class="price">USD ${product.current_price}</span></div>`
        }
    </div>
    <div class="tax">Local taxes included (where applicable)</div>
    <div class="product-description">${product.description}</div>
    <div class="product-vendor">
      <span>${product.vendor}</span>
      ${product.rating == 5 ? renderStarSellerBadge() : ""}
    </div>
    ${renderQuantitySelector(product.quantity)}
    <div class="add-to-cart">
      <button type="submit"><span>Add to cart</span></button>
    </div>
  `;
}

// Render Star Seller Badge
function renderStarSellerBadge() {
  return `
    <div class="star-seller-badge">
      <button aria-label="Star Seller">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="m20.902 7.09-2.317-1.332-1.341-2.303H14.56L12.122 2 9.805 3.333H7.122L5.78 5.758 3.341 7.09v2.667L2 12.06l1.341 2.303v2.666l2.318 1.334L7 20.667h2.683L12 22l2.317-1.333H17l1.342-2.303 2.317-1.334v-2.666L22 12.06l-1.341-2.303V7.09zm-6.097 6.062.732 3.515-.488.363-2.927-1.818-3.049 1.697-.488-.363.732-3.516-2.56-2.181.121-.485 3.537-.243 1.341-3.273h.488l1.341 3.273 3.537.243.122.484z"></path>
          </svg>
        </span>
      </button>
      <div class="star-seller-popover">
        <p class="text-title">Star Seller</p>
        <p class="text-caption">Star Sellers have an outstanding track record for providing a great customer experience—they consistently earned 5-star reviews, shipped orders on time, and replied quickly to any messages they received.</p>
        <span class="popover-arrow"></span>
      </div>
    </div>
    <div class="review-stars">
      <a href="#reviews" aria-label="See reviews">
          ${Array.from({ length: 5 }, (_, i) => i + 1)
            .map(
              (num) =>
                `<svg class="star" viewBox="3 3 18 18" aria-hidden="true"><path d="M20.83,9.15l-6-.52L12.46,3.08h-.92L9.18,8.63l-6,.52L2.89,10l4.55,4L6.08,19.85l.75.55L12,17.3l5.17,3.1.75-.55L16.56,14l4.55-4Z"></path></svg>`
            )
            .join("\n")}
      </a>
    </div>
  `;
}

// Render Quantity Selector
function renderQuantitySelector(quantity) {
  return `
    <div class="product-quantity">
      <label for="quantity">Quantity</label>
      <select name="quantity" id="quantity">
        ${Array.from({ length: quantity }, (_, i) => i + 1)
          .map(
            (num) =>
              `<option value="${num}" ${
                num == 1 ? "selected" : ""
              }>${num}</option>`
          )
          .join("\n")}
      </select>
    </div>
  `;
}

// Handle Add to Cart Button
function handleCartButton(product) {
  const cartButton = document.querySelector(".add-to-cart button");
  const quantitySelector = document.querySelector(".product-quantity select");

  cartButton.addEventListener("click", () => {
    const quantity = parseInt(quantitySelector.value);
    const cart = LS.getItem("cart") || {};
    const cartItem = cart[product.product_id];

    if (cartItem) {
      if (cartItem.quantity + quantity <= product.quantity) {
        cartItem.quantity += quantity;
      } else {
        cartItem.quantity = product.quantity;
      }
    } else {
      cart[product.product_id] = { quantity };
    }

    LS.setItem("cart", cart);
    updateCartIcon();
  });
}

// Execute Functions
loadHeader();
renderProductDescription();
