Promise.all([
  fetch("/data/subCategories.json").then((res) => res.json()),
  fetch("/data/products.json").then((res) => res.json()),
])
  .then(([subCategoriesData, productsData]) => {
    let giftsCards = document.querySelector(".gifts-cards");
    let subCategories = subCategoriesData.subCategories.filter(
      (sub) => sub.category_id === 10
    );
    let products = productsData.products.filter(
      (prod) => prod.category_id === 10 && prod.rating >= 4.5
    );

    for (let i = 0; i < subCategories.length; i++) {
      let subCategory = subCategories[i];
      let matchingProduct = products.find(
        (prod) => prod.subcategory_id === subCategory.id
      );

      if (matchingProduct) {
        giftsCards.innerHTML += `
                    <div class="gift-card" data-cat="10" data-sub-cat="${subCategory.id}">
                        <div class="gift-img">
                            <img src="${matchingProduct.images[0]}" alt="${matchingProduct.name}">
                        </div>
                        <h3>${subCategory.name}</h3>
                    </div>
                `;
      }

      // Add event listener to each gift card
      let giftCards = document.querySelectorAll(".gift-card");
      giftCards.forEach((card) => {
        card.addEventListener("click", () => {
          let catId = card.getAttribute("data-cat");
          let subCatId = card.getAttribute("data-sub-cat");
          window.location.href = `/pages/products.html?catId=${catId}&subCatId=${subCatId}`;
        });
      });
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
