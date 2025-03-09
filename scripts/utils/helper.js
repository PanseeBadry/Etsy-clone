import * as Cookies from "./cookiesLibrary.js";

export default class Helper {
  static goToProducts() {
    window.location.assign(
      `/pages/products.html?catId=${this.dataset.cat}&subCatId=${this.dataset.subCat}`
    );
  }

  static goToProduct() {
    window.location.assign(
      `/pages/product_description.html?prodId=${this.dataset.prodId}`
    );
  }

  static toggleFav(e) {
    e.stopPropagation();
    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    let cookieValue = Cookies.getCookie("favProducts");
    let favProducts = cookieValue ? JSON.parse(cookieValue) : [];
    let idx = favProducts.indexOf(this.dataset.prodId);

    if (idx != -1) {
      favProducts.splice(idx, 1);
    } else {
      favProducts.push(this.dataset.prodId);
    }
    Cookies.setCookie("favProducts", JSON.stringify(favProducts), date);
  }

  static isFav(prodId) {
    let cookieValue = Cookies.getCookie("favProducts");
    let favProducts = cookieValue
      ? JSON.parse(cookieValue).map((prod) => +prod)
      : [];
    return favProducts.indexOf(prodId) != -1;
  }

  static toggleIcon(e) {
    e.stopPropagation();
    this.classList.toggle("red");
    this.classList.toggle("fa-solid");
    this.classList.toggle("fa-regular");
  }
}
