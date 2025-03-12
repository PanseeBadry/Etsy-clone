import LS from '/scripts/utils/localStorage.js';



/**
 * Updates the cart icon to reflect the total number of items in the cart.
 * Ensures that missing or invalid cart data does not cause errors.
 */
function updateCartIcon() {
    // Retrieve the cart data from local storage
    const cart = LS.getItem('cart');
    const cartCount = cart ? Object.values(cart).reduce((acc, item) => acc + item.quantity, 0) : 0;
    const cartIcon = document.querySelector('.header-cart-total');
    cartIcon.textContent = cartCount;
    cartIcon.style.display = cartCount > 0 ? 'block' : 'none';
}



export default updateCartIcon;