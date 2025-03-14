import Helper from "../utils/helper.js";
import * as Cookies from "../utils/cookiesLibrary.js";

Promise.all([
  fetch("/components/header.html").then((res) => res.text()),
  fetch("/components/footer.html").then((res) => res.text()),
]).then(([header, footer]) => {
  const body = document.body;
  body.insertAdjacentHTML("afterbegin", header);
  body.insertAdjacentHTML("beforeend", footer);
  const head = document.getElementsByTagName("head")[0];
  let headerScript = document.createElement("script");
  headerScript.src = "/scripts/components/header.js";
  headerScript.type = "module";
  head.appendChild(headerScript);
  let CategoriesScript = document.createElement("script");
  CategoriesScript.src = "/scripts/components/categories.js";
  head.appendChild(CategoriesScript);
});
//containers
var productsContainer = document.getElementsByClassName("product-cards")[0];
var categoryContainer =
  document.getElementsByClassName("category-container")[0];
var subcatContainer = document.getElementsByClassName("sub-category-cards")[0];

//indecies for looping
var currentSubcategoryIndex = 0;
var currentProductIndex = 0;

//buttons
var filterBtn = document.getElementsByClassName("filter-btn")[0];
var cancelBtn = document.getElementsByClassName("cancel-btn")[0];
var applyBtn = document.getElementsByClassName("apply-btn")[0];
var closebutton = document.getElementsByClassName("filter-close")[0];
var showMoreBtn1 = document.getElementsByClassName("sbtn1")[0];
var showMoreBtn2 = document.getElementsByClassName("sbtn2")[0];

//filter panel
var filterPanel = document.getElementsByClassName("filter-panel")[0];
var pageOverlay = document.getElementsByClassName("overlay")[0];

var categoryID;
var subcategoryID;
var cats = [];
var subCats = [];
var products = [];

var checkFav;
var searchResult;

window.onload = function () {
  fetchQueryString();
  fetchAllData();
};

function fetchQueryString() {
  var arr = [];
  if (location.search.length > 0) {
    var data = location.search.substring(1, location.search.length);
    var info = data.split("&");

    for (var i = 0; i < info.length; i++) {
      arr[info[i].split("=")[0]] = info[i].split("=")[1];
    }
    if (arr["catId"]) {
      categoryID = arr["catId"];
    } else {
      categoryID = 0;
    }
    if (arr["subCatId"]) {
      subcategoryID = arr["subCatId"];
    } else {
      subcategoryID = 0;
    }
    if (arr["fav"]) {
      checkFav = arr["fav"];
    }

    if (arr["search"]) {
      searchResult = arr["search"];
    }
  } else {
    categoryID = 0;
    subcategoryID = 0;
    checkFav = false;
  }
}

async function fetchAllData() {
  try {
    const [catsData, subCatsData, productsData] = await Promise.all([
      fetch("/data/categories.json").then((res) => res.json()),
      fetch("/data/subCategories.json").then((res) => res.json()),
      fetch("/data/products.json").then((res) => res.json()),
    ]);

    cats = catsData.categories;
    subCats = subCatsData.subCategories;
    products = productsData.products;
    displayPage();
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

function displayPage() {
  displayCategory();
  displaySubCategories();
  displayProducts();
}

function displayCategory() {
  var category;
  var foundSubCat = {};
  if (categoryID != 0 && subcategoryID == 0) {
    category = cats.find((c) => c.id == categoryID);
  } else if (subcategoryID != 0) {
    foundSubCat = subCats.find((s) => s.id == subcategoryID);
    category =
      categoryID == 0
        ? cats.find((c) => c.id == foundSubCat.category_id)
        : cats.find((c) => c.id == categoryID);
  } else if (checkFav) {
    category = cats.find((c) => c.id == 0);
    foundSubCat.name = "Favorites";
  } else if (searchResult) {
    let regex = new RegExp(searchResult, "i");
    if (subCats.filter((subCat) => regex.test(subCat.name)).length > 0) {
      category = cats.find((c) => c.id == 0);
      foundSubCat.name = "Search Results";
    } else {
      category = cats.find((c) => c.id == 0);
    }
  } else {
    category = cats.find((c) => c.id == categoryID);
  }

  var cat = document.createElement("div");
  cat.classList.add("category-info");
  cat.innerHTML = `        
                    <p class="category-name">${
                      category.name
                    } <span  style="font-size: 23px; color:grey "> ${
    foundSubCat.name != undefined ? "/ " + foundSubCat.name : ""
  } </span></p>
                    <span class="category-description">${
                      category.description
                    }</span>
                
    `;
  categoryContainer.insertBefore(cat, categoryContainer.firstChild);
  document.title = `${category.name} - Etsy Egypt`;
}

function displaySubCategories() {
  var displayedSubCats;
  if (searchResult) {
    let regex = new RegExp(searchResult, "i");

    if (subCats.filter((subCat) => regex.test(subCat.name)).length > 0) {
      displayedSubCats = subCats.filter((subCat) => regex.test(subCat.name));

      // category = cats.find(c => c.id == foundSubCat.category_id)
    } else {
      displayedSubCats = subCats.slice(0, 12);
    }

    // foundSubCat = subCats.find(s => s.name == searchResult)
    // displayedSubCats = subCats.filter(sub => sub.category_id == foundSubCat.category_id);
  } else if (categoryID != 0) {
    displayedSubCats = subCats.filter((sub) => sub.category_id == categoryID);
  } else if (categoryID == 0 && subcategoryID != 0) {
    var foundSubCat = subCats.find((sub) => sub.id == subcategoryID);
    var foundCat = foundSubCat.category_id;
    displayedSubCats = subCats.filter((sub) => sub.category_id == foundCat);
  } else {
    displayedSubCats = subCats.slice(0, 12);
  }

  showMoreBtn2.classList.toggle("hide", displayedSubCats.length <= 6);
  subcatContainer.classList.toggle(
    "sub-category-min",
    displayedSubCats.length < 6
  );

  displayInitialItems(displayedSubCats, 6);

  if (showMoreBtn2) {
    showMoreBtn2.replaceWith(showMoreBtn2.cloneNode(true));

    showMoreBtn2 = document.getElementsByClassName("sbtn2")[0];
    showMoreBtn2.addEventListener("click", () => {
      if (showMoreBtn2.value == "Show More") {
        displayRemainingItems(displayedSubCats, currentSubcategoryIndex);
      } else {
        hideExtraItems(displayedSubCats, 6);
      }
    });
  }
}

function displayProducts() {
  var displayedProducts;
  if (categoryID != 0 && subcategoryID != 0) {
    displayedProducts = products.filter(
      (pro) =>
        pro.category_id == categoryID && pro.subcategory_id == subcategoryID
    );
  } else if (categoryID != 0 && subcategoryID == 0) {
    displayedProducts = products.filter((pro) => pro.category_id == categoryID);
  } else if (categoryID == 0 && subcategoryID != 0) {
    displayedProducts = products.filter(
      (pro) => pro.subcategory_id == subcategoryID
    );
  } else if (checkFav) {
    let cookieValue = Cookies.getCookie("favProducts");
    let favProducts = cookieValue
      ? JSON.parse(cookieValue).map((prod) => +prod)
      : [];
    displayedProducts = products.filter((pro) =>
      favProducts.includes(pro.product_id)
    );
  } else if (searchResult) {
    let regex = new RegExp(searchResult, "i");
    displayedProducts = products.filter((prod) =>
      regex.test(prod.product_name)
    );
  } else {
    displayedProducts = products.slice(0, 12);
  }

  if (displayedProducts.length == 0) {
    showMoreBtn1.style.display = "none";

    productsContainer.classList.add("no-products");
    productsContainer.innerHTML = ``;
    productsContainer.innerHTML = `<h1> No Products Yet </h1>`;
  }
  showMoreBtn1.classList.toggle(
    "hide",
    displayedProducts.length <= 4 && displayedProducts.length >= 0
  );
  displayInitialItems(displayedProducts, 4);
  if (showMoreBtn1) {
    showMoreBtn1.replaceWith(showMoreBtn1.cloneNode(true));
    showMoreBtn1 = document.getElementsByClassName("sbtn1")[0];
    showMoreBtn1.addEventListener("click", () => {
      if (showMoreBtn1.value == "Show More") {
        displayRemainingItems(displayedProducts, currentProductIndex);
      } else {
        hideExtraItems(displayedProducts, 4);
      }
    });
  }
}

function displayInitialItems(items, initialLength) {
  const count = Math.min(initialLength, items.length);
  if (initialLength == 4) {
    for (let i = 0; i < count; i++) {
      displayProduct(items[i], items.length);
    }
  } else {
    for (let i = 0; i < count; i++) {
      displaySubCategory(items[i], items.length);
    }
  }
}

function displaySubCategory(subCat, len) {
  if (currentSubcategoryIndex <= len - 1) {
    const item = document.createElement("div");
    item.classList.add("subCategory-card");
    item.innerHTML = `                      
                    
                            <a href="/pages/products.html?catId=${subCat.category_id}&subCatId=${subCat.id}" class="sub-category-link">
                                <img class="sub-category-img" src="${subCat.image}" alt="">
                                <p class="sub-category-name">${subCat.name}</p>
                            </a>
                    
        `;
    subcatContainer.appendChild(item);
    setTimeout(() => {
      item.classList.add("show");
    }, 1000);
    currentSubcategoryIndex++;
    if (currentSubcategoryIndex == len) {
      showMoreBtn2.value = "Show Less";
    }
  } else {
    currentSubcategoryIndex = len - 1;
  }
}

function displayProduct(product, len) {
  if (currentProductIndex <= len - 1) {
    const item = document.createElement("div");
    item.classList.add("product-card");
    item.setAttribute("data-prod-id", item.product_id);
    var priceAfterDiscount = parseFloat(
      product.current_price -
        product.current_price * (parseFloat(product.discount) / 100)
    ).toFixed(2);
    item.innerHTML = `
           
                        <img src=${
                          product.images[0]
                        } alt="" class="product-image">
                        <div class="product-body">
                            
                            <p class="product-name">${product.product_name}</p>
                            <div class="product-info">
                                <span class="product-rating">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    (${product.rating})
                                </span>

                            </div>
                             <p >${
                               product.discount && product.discount !== "0%"
                                 ? `<span class="product-after-discount"> USD ${priceAfterDiscount} </span>  <span class="product-current-price"><span style="text-decoration: line-through; "> USD ${product.current_price.toFixed(
                                     2
                                   )}</span> (${product.discount}% off)</span>`
                                 : `<span class="product-current-price">${product.current_price}</span>`
                             } </p>
                            <span class="product-vendor">${
                              product.vendor
                            }</span> <br>
                            ${
                              product.free_shipping
                                ? `<span class="free-shipping">FREE Shipping</span>`
                                : ""
                            }
                                                
                        </div>                    
        `;

    productsContainer.appendChild(item);
    let favIcon = document.createElement("i");
    favIcon.className = `fa-heart product-favorite ${
      Helper.isFav(product.product_id) ? "red fa-solid" : "fa-regular"
    } `;
    item.dataset.prodId = product.product_id;
    item.addEventListener("click", Helper.goToProduct);
    favIcon.onclick = Helper.toggleIcon;
    favIcon.dataset.prodId = product.product_id;
    favIcon.addEventListener("click", Helper.toggleFav);
    favIcon.addEventListener("click", function () {
      if (checkFav && favIcon.classList.contains("fa-regular")) {
        location.reload();
      }
    });
    item.appendChild(favIcon);
    setTimeout(() => {
      item.classList.add("show");
    }, 1000);
    currentProductIndex++;
    if (currentProductIndex == len) {
      showMoreBtn1.value = "Show Less";
    }
  } else {
    currentProductIndex = len;
  }
}

function displayRemainingItems(items, index) {
  for (let i = index; i < items.length; i++) {
    if (index == 4) {
      displayProduct(items[i], items.length);
    } else if (index == 6) {
      displaySubCategory(items[i], items.length);
    }
  }
}

function hideExtraItems(items, count) {
  if (count == 4) {
    for (let i = 0; i < items.length - count; i++) {
      removeProduct();
    }
    showMoreBtn1.value = "Show More";
  } else if (count == 6) {
    for (let i = 0; i < items.length - count; i++) {
      removeSubCategory();
    }
    showMoreBtn2.value = "Show More";
  }
}

function removeProduct() {
  productsContainer.removeChild(productsContainer.lastElementChild);
  currentProductIndex--;
}

function removeSubCategory() {
  subcatContainer.removeChild(subcatContainer.lastElementChild);
  currentSubcategoryIndex--;
}

//part el filter
closebutton.addEventListener("click", closePanel);
filterBtn.addEventListener("click", () => {
  filterPanel.classList.toggle("active");
  pageOverlay.classList.toggle("active");
});
cancelBtn.addEventListener("click", closePanel);
applyBtn.addEventListener("click", handleFilterApply);

function closePanel() {
  filterPanel.classList.remove("active");
  pageOverlay.classList.remove("active");
}

function handleFilterApply() {
  const selectedCategory = document.getElementsByClassName("cat-filter")[0];
  const selectedCategoryId = parseInt(
    selectedCategory.options[selectedCategory.selectedIndex].getAttribute(
      "catId"
    )
  );
  console.log(selectedCategoryId);
  if (selectedCategoryId !== categoryID) {
    categoryID = selectedCategoryId;
    console.log("catID", categoryID);
    subcategoryID = 0;
    currentProductIndex = 0;
    currentSubcategoryIndex = 0;
    categoryContainer.innerHTML = "";
    subcatContainer.innerHTML = "";
    productsContainer.innerHTML = "";
    showMoreBtn1.value = "Show More";
    showMoreBtn2.value = "Show More";
    displayPage();
  }

  closePanel();
}
