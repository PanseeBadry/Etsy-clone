import DataStore from '/scripts/utils/data_store.js';
import Helper from '/scripts/utils/helper.js';

async function renderPicks() {
  const picksContainer = document.querySelector(".grid-sub-cat1-container");
  const products = await DataStore.getProducts();
  const filteredProducts = products
    .filter(product => product.category_id === 4 && product.subcategory_id === 405)
    .slice(0, 6);

  filteredProducts.forEach(product => {
    const productElement = document.createElement("div");
    productElement.classList.add("picks-element");
    productElement.innerHTML = `
        <div class="picks-element-container">
          <a href="/pages/product_description.html?prodId=${product.product_id}">
            <div class="listing-card">
              <div class="placeholder">
                <div class="placeholder-content">
                  <div class="height-placeholder">
                    <img alt="${product.product_name}" src="${product.images[0]}" loading="lazy">
                    <p class="listing-card-price-badge">
                      <span class="first-span">
                        <span class="currency">
                          <span class="currency-symbol">USD </span>
                          <span class="currency-value">${product.current_price}</span>
                          <span class="discount">USD ${(product.current_price / (1 - product.discount / 100)).toFixed(2)}</span>
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="v2-listing-card__info">
              <h3>${product.description}</h3>
            </div>
          </a>
          <div class="v2-listing-card__actions">
            <button class="favorite-listing-button" aria-label="Add to Favorites" data-prod-id="${product.product_id}">
              <div class="favorite-listing-button-icon-container">
                ${Helper.isFav(product.product_id) ? `
                    <span class="etsy-icon">
                      <svg class="heart-empty hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12,21C10.349,21,2,14.688,2,9,2,5.579,4.364,3,7.5,3A6.912,6.912,0,0,1,12,5.051,6.953,6.953,0,0,1,16.5,3C19.636,3,22,5.579,22,9,22,14.688,13.651,21,12,21ZM7.5,5C5.472,5,4,6.683,4,9c0,4.108,6.432,9.325,8,10,1.564-.657,8-5.832,8-10,0-2.317-1.472-4-3.5-4-1.979,0-3.7,2.105-3.721,2.127L11.991,8.1,11.216,7.12C11.186,7.083,9.5,5,7.5,5Z"></path>
                      </svg>
                      <svg class="heart-filled" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M16.5,3A6.953,6.953,0,0,0,12,5.051,6.912,6.912,0,0,0,7.5,3C4.364,3,2,5.579,2,9c0,5.688,8.349,12,10,12S22,14.688,22,9C22,5.579,19.636,3,16.5,3Z"></path>
                      </svg>
                    </span>
                  ` : `
                    <span class="etsy-icon">
                      <svg class="heart-empty" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12,21C10.349,21,2,14.688,2,9,2,5.579,4.364,3,7.5,3A6.912,6.912,0,0,1,12,5.051,6.953,6.953,0,0,1,16.5,3C19.636,3,22,5.579,22,9,22,14.688,13.651,21,12,21ZM7.5,5C5.472,5,4,6.683,4,9c0,4.108,6.432,9.325,8,10,1.564-.657,8-5.832,8-10,0-2.317-1.472-4-3.5-4-1.979,0-3.7,2.105-3.721,2.127L11.991,8.1,11.216,7.12C11.186,7.083,9.5,5,7.5,5Z"></path>
                      </svg>
                      <svg class="heart-filled hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M16.5,3A6.953,6.953,0,0,0,12,5.051,6.912,6.912,0,0,0,7.5,3C4.364,3,2,5.579,2,9c0,5.688,8.349,12,10,12S22,14.688,22,9C22,5.579,19.636,3,16.5,3Z"></path>
                      </svg>
                    </span>`
                }
              </div>
              <span aria-hidden="true" class="icon"></span>
            </button>
          </div>
        </div>
      `;
    picksContainer.appendChild(productElement);
  });

  const favoriteButtons = document.querySelectorAll(".favorite-listing-button");
  favoriteButtons.forEach(button => {
    button.addEventListener("click", Helper.toggleFav);
    button.addEventListener("click", () => {
      let filledHeart = button.querySelector(".heart-filled");
      let emptyHeart = button.querySelector(".heart-empty");
      filledHeart.classList.toggle("hidden");
      emptyHeart.classList.toggle("hidden");
    }
    );
  });

}


export default renderPicks;