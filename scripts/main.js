import renderSlider from "./components/landingSlider.js";
import Helper from "./utils/helper.js";

fetch("../components/header.html")
  .then((response) => response.text())
  .then((data) => {
    const body = document.body;
    body.insertAdjacentHTML("afterbegin", data);
    const head = document.getElementsByTagName("head")[0];
    let headerScript = document.createElement("script");
    headerScript.src = "./scripts/components/header.js";
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
const heroSubCat = document.getElementsByClassName("sub-cat-name")[0];

// getting one of jewelery subcategories
const jeweleryId = categories.find(
  (cat) => cat.name.toLowerCase() === "jewelry"
).id;
const jewelerySubCat = subCategories.find(
  (cat) => cat.category_id == jeweleryId
);
const jeweleryProduct = products.find(
  (prod) =>
    prod.category_id == jeweleryId && prod.subcategory_id == jewelerySubCat.id
);

heroSubCat.innerText = jewelerySubCat.name;
// heroElement[1].style.backgroundImage = jeweleryProduct.images[0];
heroElement[1].dataset.cat = jeweleryId;
heroElement[1].dataset.subCat = jewelerySubCat.id;
[...heroElement].forEach((el) => (el.onclick = Helper.goToProducts));

renderSlider(products);
