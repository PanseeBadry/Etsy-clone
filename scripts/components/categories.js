// Select key DOM elements
const categoriesBtn = document.querySelector(".categories-menu-button");
const categoriesContainer = document.querySelector(".categories-on-air");
const categoriesMenu = document.querySelector(".categories-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const categoriesArrow = document.querySelector(".categories-arrow");
const subCategoriesContainer = document.querySelector(".sub-categories");
const allCategories = document.querySelector(".all-categories");
const closeBtn = document.querySelector(".close-button");

// Variables to store categories and subcategories data
let categories = [];
let subCategories = [];
let activeBtn = null;


/**
 * Fetches categories and subcategories data from JSON files.
 * Uses Promise.all to retrieve both datasets simultaneously.
 */
async function fetchCategoriesData() {
  try {
    const [categoriesData, subCategoriesData] = await Promise.all([
      fetch("/data/categories.json").then((res) => res.json()),
      fetch("/data/subCategories.json").then((res) => res.json()),
    ]);

    categories = categoriesData.categories;
    subCategories = subCategoriesData.subCategories;

    // Display the categories menu after data is loaded
    initializeCategoriesMenu();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}



/**
 * Renders the categories menu by creating buttons for each category.
 * Sets the first category as the default active category.
 */
function initializeCategoriesMenu() {
  categoriesMenu.innerHTML = categories
    .filter((category) => category.id !== 0)
    .map((category) => `<button class="category-btn" data-category-id="${category.id}">${category.name}</button>`)
    .join("");

  activeBtn = document.querySelector(`[data-category-id="${categories[1].id}"]`);
  // activeBtn.classList.add("active");
  // allCategories.textContent = `All ${activeBtn.textContent}`;
  setActiveCategory(categories[1].id);
}



/**
 * Updates the UI to highlight the selected category and display its subcategories.
 *
 * @param {number|string} categoryID - The ID of the selected category.
 */
function setActiveCategory(categoryID) {
  document.querySelectorAll(".categories-menu button").forEach((btn) => btn.classList.remove("active"));
  if (activeBtn) activeBtn.classList.remove("rotated");
  activeBtn = document.querySelector(`[data-category-id="${categoryID}"]`);
  activeBtn.classList.add("active");
  allCategories.textContent = `All ${activeBtn.textContent}`;
  allCategories.addEventListener("click", () => {
    window.location.href = `/pages/products.html?catId=${categoryID}`;
  }
  );

  subCategoriesContainer.innerHTML = subCategories
    .filter((sub) => sub.category_id == categoryID)
    .map(sub => `
    <div class="sub-category-card" data-category-id="${categoryID}" data-sub-category-id="${sub.id}">
      <div class="sub-category-card-padding">
        <div class="sub-category-card-content">
          <img src="${sub.image}" alt="${sub.name}">
          <p>${sub.name}</p>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll(".sub-category-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      const subCategoryID = event.currentTarget.getAttribute("data-sub-category-id");
      window.location.href = `/pages/products.html?catId=${categoryID}&subCatId=${subCategoryID}`;
    });
  });

  window.innerWidth < 920 ? displaySubCategoriesList(categoryID) : '';
}



/**
 * Display subcategories as a list for small screens.
 * @param {number} categoryID - The selected category ID.
 */
function displaySubCategoriesList(categoryID) {
  // activeBtn = document.querySelector(`[data-category-id="${categoryID}"]`);
  const existingList = document.querySelector(".sub-category-list");

  if (existingList) {
    if (existingList.getAttribute("data-category-id") === categoryID) {
      // activeBtn.classList.remove("rotated");
      existingList.remove();
      return;
    } else {
      existingList.remove();
    }
  }

  const subCategoryList = document.createElement("div");
  subCategoryList.classList.add("sub-category-list");
  subCategoryList.setAttribute("data-category-id", categoryID);
  subCategoryList.innerHTML = subCategories
    .filter((sub) => sub.category_id == categoryID)
    .map((sub) => `<div class="sub-category-item" data-category-id="${categoryID}" data-sub-category-id="${sub.id}">${sub.name}</div>`)
    .join("");

  activeBtn.insertAdjacentElement("afterend", subCategoryList);
  activeBtn.classList.add("rotated");

  document.querySelectorAll(".sub-category-item").forEach((item) => {
    item.addEventListener("click", (event) => {
      const subCategoryID = event.target.getAttribute("data-sub-category-id");
      window.location.href = `/pages/products.html?catId=${categoryID}&subCatId=${subCategoryID}`;
    });
  }
  );

}



/**
 * Handles category selection on hover (large screens).
 * Handles category selection on click (small screens).
 */
function catBtnHandler(event) {
  const categoryBtn = event.target.closest("button");

  if (categoryBtn) setActiveCategory(categoryBtn.getAttribute("data-category-id"));
}



/**
 * Adjust menu behavior based on screen size and retain active category.
 */
function updateMenuBehavior() {
  const screenWidth = window.innerWidth;

  categoriesMenu.removeEventListener("mouseover", catBtnHandler);
  categoriesMenu.removeEventListener("click", catBtnHandler);
  if (screenWidth > 919) {
    categoriesMenu.addEventListener("mouseover", catBtnHandler);
    const existingList = document.querySelector(".sub-category-list");
    if (existingList) {
      existingList.remove();
    }
  } else {
    categoriesMenu.addEventListener("click", catBtnHandler);
  }
}



/**
 * Toggles the visibility of the categories menu.
 * Can force the menu to close when needed.
 * 
 * @param {boolean} forceClose - If true, the menu will be closed regardless of its current state.
 */
function toggleMenu(forceClose = false) {
  const isActive = categoriesContainer.classList.contains("active");

  if (forceClose || isActive) {
    categoriesContainer.classList.remove("active");
    menuOverlay.classList.remove("active");
    categoriesArrow.classList.remove("active");
  } else {
    categoriesContainer.classList.add("active");
    menuOverlay.classList.add("active");
    categoriesArrow.classList.add("active");
  }
}



// /**
//  * Handles category selection and redirects to the products page.
//  */
// function handleCategoryClick(event) {
//   const categoryBtn = event.target.closest("button");
//   if (!categoryBtn) return;

//   const categoryId = categoryBtn.getAttribute("data-category-id");
//   if (categoryId) {
//     window.location.href = `/pages/products.html?catId=${categoryId}`;
//   }
// }



// /**
//  * Handles subcategory selection and redirects to the products page.
//  */
// function handleSubCategoryClick(event) {
//   const subCategoryCard = event.target.closest(".sub-category-card");
//   if (!subCategoryCard) return;

//   const categoryId = subCategoryCard.getAttribute("data-category-id");
//   const subCategoryId = subCategoryCard.getAttribute("data-sub-category-id");
//   if (categoryId && subCategoryId) {
//     window.location.href = `/pages/products.html?catId=${categoryId}&subCatId=${subCategoryId}`;
//   }
// }



// Event Listeners
categoriesBtn.addEventListener("click", () => toggleMenu());
closeBtn.addEventListener("click", () => toggleMenu());
document.addEventListener("click", (event) => {
  if (!categoriesContainer.contains(event.target) && !categoriesBtn.contains(event.target)) {
    toggleMenu(true);
  }
});
window.addEventListener("resize", updateMenuBehavior);
// categoriesMenu.addEventListener("click", handleCategoryClick);
// subCategoriesContainer.addEventListener("click", handleSubCategoryClick);



// Initialize script
fetchCategoriesData();
updateMenuBehavior();