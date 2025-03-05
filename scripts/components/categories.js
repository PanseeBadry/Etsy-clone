// Select key DOM elements
const categoriesBtn = document.querySelector(".categories-menu-button");
const categoriesContainer = document.querySelector(".categories-on-air");
const categoriesMenu = document.querySelector(".categories-menu");
const menuOverlay = document.querySelector(".menu-overlay");
const categoriesArrow = document.querySelector(".categories-arrow");
const subCategoriesContainer = document.querySelector(".sub-categories");
const allCategories = document.querySelector(".all-categories");

// Variables to store categories and subcategories data
let categories = [];
let subCategories = [];

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
    showCategoriesMenu(categories, subCategories);
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

/**
 * Renders the categories menu by creating buttons for each category.
 * Sets the first category as the default active category.
 *
 * @param {Array} categories - List of category objects.
 * @param {Array} subCategories - List of subcategory objects.
 */
function showCategoriesMenu(categories, subCategories) {
  // Populate the categories menu with buttons for each category
  categoriesMenu.innerHTML = categories
    .map((category) => `<button data-category-id="${category.id}">${category.name}</button>`)
    .join("");

  // Set the first category as active by default
  setActiveCategory(categories[0].id, subCategories);
}

/**
 * Updates the UI to highlight the selected category and display its subcategories.
 *
 * @param {number|string} categoryID - The ID of the selected category.
 * @param {Array} subCategories - List of subcategory objects.
 */
function setActiveCategory(categoryID, subCategories) {
  // Find the button corresponding to the selected category
  const activeBtn = document.querySelector(`[data-category-id="${categoryID}"]`);

  // Remove the "active" class from all category buttons
  document.querySelectorAll(".categories-menu button").forEach((btn) => btn.classList.remove("active"));

  // Add the "active" class to the selected category button
  activeBtn.classList.add("active");

  // Update the heading to indicate the selected category
  allCategories.textContent = `All ${activeBtn.textContent}`;

  // Filter subcategories based on the selected category and render them
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
    `).join('\n');
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

// Event listener for toggling the categories menu on button click
categoriesBtn.addEventListener("click", () => toggleMenu());

// Event listener to close the menu when clicking outside of it
document.addEventListener("click", (event) => {
  if (!categoriesContainer.contains(event.target) && !categoriesBtn.contains(event.target)) {
    toggleMenu(true);
  }
});

/**
 * Handles category selection on hover.
 * When a category button is hovered over, its subcategories are displayed.
 */
categoriesMenu.addEventListener("mouseover", (event) => {
  const categoryBtn = event.target.closest("button");

  if (categoryBtn) setActiveCategory(categoryBtn.getAttribute("data-category-id"), subCategories);
});

// Fetch and display categories data when the page loads
fetchCategoriesData();