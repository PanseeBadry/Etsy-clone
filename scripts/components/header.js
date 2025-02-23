const searchInput = document.getElementById("header-search-input"),
  searchCancel = document.getElementById("header-search-cancel"),
  searchButton = document.getElementById("search-button"),
  searchMenu = document.getElementById("search-menu");

searchInput.oninput = handleSearchInput;
searchCancel.onclick = handleSearchCancel;

function handleSearchInput() {
  if (this.value.length == 0) {
    searchCancel.classList.add("hide");
    searchMenu.classList.add("hide");
  } else {
    searchCancel.classList.remove("hide");
    searchMenu.classList.remove("hide");
  }
}

function handleSearchCancel() {
  searchCancel.classList.add("hide");
  searchMenu.classList.add("hide");
  searchInput.value = "";
}
