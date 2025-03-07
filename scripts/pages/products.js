
//containers 
var productsContainer = document.getElementsByClassName('product-cards')[0];
var categoryContainer = document.getElementsByClassName('category-container')[0];
var subcatContainer = document.getElementsByClassName('sub-category-cards')[0];

//indecies for looping
var currentSubcategoryIndex = 0
var currentProductIndex = 0

//buttons
var filterBtn = document.getElementsByClassName('filter-btn')[0];
var cancelBtn = document.getElementsByClassName('cancel-btn')[0];
var applyBtn = document.getElementsByClassName('apply-btn')[0];
var closebutton = document.getElementsByClassName('filter-close')[0];
var showMoreBtn1 = document.getElementsByClassName('sbtn1')[0]
var showMoreBtn2 = document.getElementsByClassName('sbtn2')[0];

//filter panel
var filterPanel = document.getElementsByClassName('filter-panel')[0];
var pageOverlay = document.getElementsByClassName('overlay')[0];


var categoryID;
var subcategoryID;
var cats = [];
var subCats = [];
var products = [];



window.onload = function () {
    fetchIDS()
    fetchAllData()


}

function fetchIDS() {
    var arr = []
    if (location.search.length > 0) {
        data = location.search.substring(1, location.search.length)
        info = data.split("&")

        for (var i = 0; i < info.length; i++) {
            arr[info[i].split("=")[0]] = info[i].split("=")[1]
        }
        if (arr['catId']) {
            categoryID = arr['catId']
        } else {
            categoryID = 0
        }
        if (arr['subCatId']) {
            subcategoryID = arr['subCatId']
        } else {
            subcategoryID = 0
        }


    } else {
        categoryID = 0
        subcategoryID = 0
    }

    console.log(arr)

}





async function fetchAllData() {
    try {
        const [catsData, subCatsData, productsData] = await Promise.all([
            fetch("/data/categories.json").then((res) => res.json()),
            fetch("/data/subCategories.json").then((res) => res.json()),
            fetch("/data/products.json").then((res) => res.json())
        ]);

        cats = catsData.categories;
        subCats = subCatsData.subCategories;
        products = productsData.products;
        displayPage()


    } catch (error) {
        console.error("Error loading data:", error);
    }
}




function displayPage() {
    displayCategory()
    displaySubCategories()
    displayProducts()
}

function displayCategory() {
    var category;
    if (subcategoryID != 0 && categoryID == 0) {
        var foundSubCat = subCats.find(s => s.id == subcategoryID)
        category = cats.find(c => c.id == foundSubCat.category_id)
    } else {
        category = cats.find(c => c.id == categoryID)
    }
    console.log("Displaying Category:", category);

    var cat = document.createElement('div');
    cat.classList.add('category-info');
    cat.innerHTML = `        
                    <p class="category-name">${category.name}</p>
                    <span class="category-description">${category.description}</span>
                
    `
    categoryContainer.insertBefore(cat, categoryContainer.firstChild);
}



function displaySubCategories() {
    var displayedSubCats;
    if (categoryID == 0 && subcategoryID == 0) {
        displayedSubCats = subCats.slice(0, 12);

    } else if (categoryID != 0 && subcategoryID != 0) {
        displayedSubCats = subCats.filter(sub => sub.category_id == categoryID);

    } else if (categoryID != 0 && subcategoryID == 0) {
        displayedSubCats = subCats.filter(sub => sub.category_id == categoryID);

    } else if (categoryID == 0 && subcategoryID != 0) {
        var foundSubCat = subCats.find(sub => sub.id == subcategoryID)
        var foundCat = foundSubCat.category_id
        displayedSubCats = subCats.filter(sub => sub.category_id == foundCat)

    }


    if (displayedSubCats.length <= 6) {
        showMoreBtn2.style.display = 'none';
    } else {
        showMoreBtn2.style.display = 'block';
    }
    // console.log(subCategories)  
    displayInitialItems(displayedSubCats, 6);

    if (showMoreBtn2) {
        showMoreBtn2.replaceWith(showMoreBtn2.cloneNode(true));
        showMoreBtn2 = document.getElementsByClassName('sbtn2')[0];
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
    if (categoryID == 0 && subcategoryID == 0) {
        displayedProducts = products.slice(0, 12);

    } else if (categoryID != 0 && subcategoryID != 0) {
        displayedProducts = products.filter(pro => pro.category_id == categoryID && pro.subcategory_id == subcategoryID)

    } else if (categoryID != 0 && subcategoryID == 0) {
        displayedProducts = products.filter(pro => pro.category_id == categoryID);
    } else if (categoryID == 0 && subcategoryID != 0) {
        displayedProducts = products.filter(pro => pro.subcategory_id == subcategoryID);
    }



    if (displayedProducts.length <= 4) {
        showMoreBtn1.style.display = 'none';
    } else {
        showMoreBtn1.style.display = 'block';
    }
    displayInitialItems(displayedProducts, 4);
    if (showMoreBtn1) {
        showMoreBtn1.replaceWith(showMoreBtn1.cloneNode(true));
        showMoreBtn1 = document.getElementsByClassName('sbtn1')[0];
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
            // console.log(currentProductIndex);
            displayProduct(items[i], items.length)
        }
    } else {
        for (let i = 0; i < count; i++) {
            // console.log(currentSubcategoryIndex);
            displaySubCategory(items[i], items.length)

        }
    }

}










function displaySubCategory(subCat, len) {

    if (currentSubcategoryIndex <= len - 1) {
        const item = document.createElement('div');
        item.classList.add('subCategory-card')
        item.innerHTML = `                      
                    
                            <a href="">
                                <img class="sub-category-img" src="${subCat.image}" alt="">
                                <p class="sub-category-name">${subCat.name}</p>
                            </a>
                    
        `
        subcatContainer.appendChild(item);
        // console.log(document.getElementsByClassName('sub-categories-container')[0].innerHTML);   
        setTimeout(() => {
            item.classList.add('show');
        }, 1000);
        currentSubcategoryIndex++
        if (currentSubcategoryIndex == len) {
            // console.log(currentSubcategoryIndex)
            showMoreBtn2.value = "Show Less"
        }

    } else {
        currentSubcategoryIndex = len - 1
    }

}


function displayProduct(product, len) {
    // console.log(product)
    if (currentProductIndex <= len - 1) {
        const item = document.createElement('div');
        item.classList.add('product-card')
        item.setAttribute('data-prod-id', item.product_id)
        var priceAfterDiscount = parseFloat(product.current_price - (product.current_price * (parseFloat(product.discount) / 100))).toFixed(2)
        item.innerHTML = `
           
                        <img src=${product.images[0]} alt="" class="product-image">
                        <div class="product-body">
                            <i class="fa-regular fa-heart product-favorite"></i>
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
                             <p >${product.discount && product.discount !== "0%" ? `<span class="product-after-discount"> USD ${priceAfterDiscount} </span>  <span class="product-current-price"><s style="text-decoration: line-through;"> USD ${product.current_price}</s> (${product.discount}off)</span>` : `<span class="product-current-price">${product.current_price}</span>`} </p>
                            <span class="product-vendor">${product.vendor}</span> <br>
                            ${product.free_shipping ? `<span class="free-shipping">FREE Shipping</span>` : ''}                    
                        </div>                    
        `

        productsContainer.appendChild(item);
        setTimeout(() => {
            item.classList.add('show');
        }, 1000);
        currentProductIndex++
        if (currentProductIndex == len) {
            showMoreBtn1.value = "Show Less"
        }

    } else {
        currentProductIndex = len
    }




}



function displayRemainingItems(items, index) {
    for (let i = index; i < items.length; i++) {
        if (index == 4) {
            console.log(currentProductIndex);
            displayProduct(items[i], items.length)
        } else if (index == 6) {
            console.log(currentSubcategoryIndex);
            displaySubCategory(items[i], items.length)
        }


    }
}


function hideExtraItems(items, count) {
    if (count == 4) {
        for (let i = 0; i < items.length - count; i++) {
            console.log(currentProductIndex)
            removeProduct()

        }
        showMoreBtn1.value = "Show More"

    } else if (count == 6) {
        for (let i = 0; i < items.length - count; i++) {
            console.log(currentSubcategoryIndex)
            removeSubCategory()

        }
        showMoreBtn2.value = "Show More"
    }

}

function removeProduct() {
    productsContainer.removeChild(productsContainer.lastElementChild);
    currentProductIndex--
}


function removeSubCategory() {
    subcatContainer.removeChild(subcatContainer.lastElementChild);
    currentSubcategoryIndex--
}







//part el filter
closebutton.addEventListener('click', closePanel);
filterBtn.addEventListener('click', () => {
    filterPanel.classList.toggle('active');
    pageOverlay.classList.toggle('active');
});
// if (cancelBtn && applyBtn) {
cancelBtn.addEventListener('click', closePanel);
applyBtn.addEventListener('click', handleFilterApply);
// }
function closePanel() {
    filterPanel.classList.remove('active');
    pageOverlay.classList.remove('active');
}

function handleFilterApply() {
    const selectedCategory = document.getElementsByClassName('cat-filter')[0];
    const selectedCategoryId = parseInt(selectedCategory.options[selectedCategory.selectedIndex].getAttribute('catId'));
    // console.log("selected category id:", selectedCategoryId);
    if (selectedCategoryId !== categoryID) {
        categoryID = selectedCategoryId;
        // console.log("updated category id:", categoryID); 
        currentProductIndex = 0;
        currentSubcategoryIndex = 0;
        categoryContainer.innerHTML = '';
        subcatContainer.innerHTML = '';
        productsContainer.innerHTML = '';

        showMoreBtn1.value = "Show More";
        showMoreBtn2.value = "Show More";

        displayPage();
    }

    closePanel();
}
























