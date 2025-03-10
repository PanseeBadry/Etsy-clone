import renderSlider from "./components/landingSlider.js";
import renderRecently from "./components/recentlyViewed.js";
import Helper from "./utils/helper.js";

fetch("/components/header.html")
  .then((response) => response.text())
  .then((data) => {
    const body = document.body;
    body.insertAdjacentHTML("afterbegin", data);
    const head = document.getElementsByTagName("head")[0];
    let headerScript = document.createElement("script");
    headerScript.src = "/scripts/components/header.js";
    headerScript.type = "module";
    head.appendChild(headerScript);
    let CategoriesScript = document.createElement("script");
    CategoriesScript.src = "/scripts/components/categories.js";
    head.appendChild(CategoriesScript);
  });

// get data
try {
  const [categoriesData, subCategoriesData, productData] = await Promise.all([
    fetch("/data/categories.json").then((res) => res.json()),
    fetch("/data/subCategories.json").then((res) => res.json()),
    fetch("/data/products.json").then((res) => res.json()),
  ]);

  var categories = categoriesData.categories;
  var subCategories = subCategoriesData.subCategories;
  var products = productData.products;
} catch (error) {
  console.error("Error loading data:", error);
}

// handeling hero section
const heroElement = document.getElementsByClassName("hero-hover");

// getting clothing id
const clothingId = categories.find(
  (cat) => cat.name.toLowerCase() === "clothing"
).id;

heroElement[1].dataset.cat = clothingId;
heroElement[1].dataset.subCat = 0;
[...heroElement].forEach((el) => (el.onclick = Helper.goToProducts));

// render recently viewed section
renderRecently(products);
// render slider section
renderSlider(products);
