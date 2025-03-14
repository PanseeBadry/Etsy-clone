import DataStore from "../utils/data_store.js";
let categories, subCategories, products;
const searchInput = document.getElementById("header-search-input"),
  searchCancel = document.getElementById("header-search-cancel"),
  searchMenu = document.getElementById("search-menu"),
  searchItems = document.getElementsByClassName("search-item"),
  searchForm = document.getElementById("search-con");

export default async function initializeSearch() {
  try {
    categories = await DataStore.getCategories();
    subCategories = await DataStore.getSubCategories();
    products = await DataStore.getProducts();
  } catch (error) {
    console.error("Error loading data:", error);
  }

  searchForm.onsubmit = function (e) {
    e.preventDefault();
    console.log(searchInput.value.length);
    searchInput.value.trim().length == 0 || searchItems.length == 0
      ? window.location.assign("/")
      : window.location.assign(
          `/pages/products.html?search=${searchInput.value}`
        );
  };
  searchInput.oninput = handleSearchInput;
  searchCancel.onclick = handleSearchCancel;
}

function handleSearchInput() {
  if (this.value.length == 0) {
    searchCancel.classList.add("hide");
    searchMenu.classList.add("hide");
  } else {
    searchCancel.classList.remove("hide");
    renderSearchElements(this.value);
  }
}

function renderSearchElements(pattern) {
  if (pattern.trim().length > 0) {
    searchMenu.innerHTML = "";
    let regex = new RegExp(pattern, "i");
    products
      .filter((prod) => regex.test(prod.product_name))
      .slice(0, 5)
      .forEach((prod) => {
        searchMenu.innerHTML += `<li><a class="search-item" href="/pages/product_description.html?prodId=${prod.product_id}">${prod.product_name}</a></li>`;
      });
    searchItems.length < 5 &&
      subCategories
        .filter((subCat) => regex.test(subCat.name))
        .slice(0, 5 - searchItems.length)
        .forEach((subCat) => {
          searchMenu.innerHTML += `<li><a class="search-item" href="/pages/products.html?catId=${subCat.category_id}&subCatId=${subCat.id}">${subCat.name}</a></li>`;
        });
    searchItems.length < 5 &&
      categories
        .filter((cat) => regex.test(cat.name))
        .slice(0, 5 - searchItems.length)
        .forEach((cat) => {
          searchMenu.innerHTML += `<li><a class="search-item" href="/pages/products.html?catId=${cat.id}">${cat.name}</a></li>`;
        });
  }
  searchMenu.classList.toggle("hide", searchItems.length == 0);
}

function handleSearchCancel() {
  searchCancel.classList.add("hide");
  searchMenu.classList.add("hide");
}
