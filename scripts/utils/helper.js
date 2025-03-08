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

  static toggleFav() {}
}
