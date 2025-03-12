import loadHeader from "/scripts/utils/loadHeader.js";
import DataStore from "/scripts/utils/data_store.js";
import LS from "/scripts/utils/localStorage.js";
import updateCartIcon from "/scripts/components/cartIcon.js";



// Load the header component
loadHeader();



// Initialize the cart page
async function initializeCartPage() {
  const cartItems = LS.getItem("cart");

  if (!cartItems || Object.keys(cartItems).length === 0) {
    displayEmptyCart();
    return;
  }

  await displayCartItems(cartItems);
  attachEventListeners();
}



// Display empty cart message and hide checkout button
function displayEmptyCart() {
  document.querySelector(".empty-cart").style.display = "block";
  document.querySelector(".check-out").style.display = "none";
  document.querySelector(".cart-items").style.display = "none";
}



// Render cart items in the DOM
async function displayCartItems(cartItems) {
  const cartItemsContainer = document.querySelector(".cart-items");
  document.querySelector(".empty-cart").style.display = "none";
  document.querySelector(".check-out").style.display = "block";
  document.querySelector(".cart-items").style.display = "block";


  for (const item of Object.keys(cartItems)) {
    const itemElement = await createCartItemElement(item);
    cartItemsContainer.appendChild(itemElement);
  }
  handleTotalPrice();
}



// Create a cart item element
async function createCartItemElement(productId) {
  const product = await DataStore.getProductById(productId);
  const selectedQuantity = LS.getItem("cart")[productId].quantity;
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");
  itemDiv.setAttribute("data-product-id", productId);

  itemDiv.innerHTML = `
      <div class="header">
          <img class="vendor-image" src="/assets/images/vendor-image.png" alt="Vendor" />
          <p>${product.vendor}</p>
          <div><button class="hover-effect" title="Vendor Options"></button></div>
      </div>
      <div class="main-item-section">
          <img class="product-image" src="${product.images[0]}" alt="${product.description}" />
          <div class="info">
              <div class="data">
                  <a class="product-name" href="/pages/product_description.html?prodId=${product.product_id}">
                      ${product.description}
                  </a>
                  <p class="personalize"> Personalization: <span class="personalize-msg">Make it perfect</span> </p>
                  <p class="product-details"></p>
                  <p class="carts-views">In 64 carts with 30 views</p>
              </div>
          </div>
          <p class="price">USD <span>${ (parseFloat(product.current_price) * selectedQuantity).toFixed(2)}</span></p>
      </div>
      <div class="item-actions">
          <div class="select-container">
              <select name="quantity" class="item-quantity" title="Select quantity">
                  ${Array.from({ length: product.quantity }, (_, i) => `<option value="${i + 1}" ${i + 1 === selectedQuantity ? "selected" : ""}>${i + 1}</option>`).join("\n")}
              </select>
          </div>
          <div class="controls">
              <button class="edit-item hover-effect">Edit</button>
              <button class="save-later hover-effect">Save for later</button>
              <button class="remove-item hover-effect">Remove</button>
          </div>
      </div>
      <p class="shipping"><strong>Shipping:</strong> <span>free</span></p>
  `;

  return itemDiv;
}



// Attach event listeners for quantity change and remove item
function attachEventListeners() {
  document.querySelectorAll(".item-quantity").forEach(select => {
    select.addEventListener("change", handleSelectQuantity);
  });

  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", handleRemoveItem);
  });
}



// Handle quantity selection change
function handleSelectQuantity(event) {
  const newQuantity = +event.target.value;
  const item = event.target.closest(".item");
  const productId = item?.getAttribute("data-product-id");
  const cartItems = LS.getItem("cart");
  const product = cartItems[productId];
  const priceElement = item.querySelector(".price span");

  priceElement.textContent = ((+priceElement.textContent / product.quantity) * newQuantity).toFixed(2);

  product.quantity = newQuantity;
  LS.setItem("cart", cartItems);
  updateCartIcon();
  handleTotalPrice();
}



// Handle item removal from the cart
function handleRemoveItem(event) {
  const productId = event.target.closest(".item").getAttribute("data-product-id");

  const cartItems = LS.getItem("cart");
  delete cartItems[productId];
  LS.setItem("cart", cartItems);

  location.reload();
}



// Handle total price calculation
async function handleTotalPrice() {
  const cartItems = LS.getItem("cart");
  const totalPriceElement = document.querySelector(".total-price");
  const amountElement = document.querySelector(".total-amount strong:first-child");
  const totalAmountElement = document.querySelector(".total-amount strong:last-child");
  let totalPrice = 0;
  let totalAmount = 0;

  for (const item of Object.keys(cartItems)) {
    const product = await DataStore.getProductById(item);
    const selectedQuantity = cartItems[item].quantity;
    totalPrice += parseFloat(product.current_price) * selectedQuantity;
    totalAmount += selectedQuantity;
  }

  totalPriceElement.textContent = `USD ${totalPrice.toFixed(2)}`;
  totalAmountElement.textContent = `USD ${totalPrice.toFixed(2)}`;
  amountElement.textContent = `Total (${totalAmount} items)`;
}



// Initialize the cart page
initializeCartPage();