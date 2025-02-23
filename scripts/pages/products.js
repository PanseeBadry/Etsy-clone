var currentProductIndex =0
const productsContainer = document.getElementById('product-cards');
const showMoreBtn1 = document.getElementsByClassName('btn1')[0]
fetch('../../data/products.json').then(response=> response.json()).then(data =>{
    const products = data.products.filter(pro => pro.category_id === 1);   
    console.log(products)  
    displayInitialItems(products , 4);
    showMoreBtn1.addEventListener("click", () => {
        if (showMoreBtn1.value === "Show More") {
            displayRemainingItems(products ,currentProductIndex);
        } else {
            hideExtraItems(products,4);
        }
    });    
})
.catch(error => console.error('Error fetching data:', error));









var subCategoriesContainer = document.getElementsByClassName('sub-category-cards')[0];
var showMoreBtn2 = document.getElementsByClassName('btn2')[0];
var currentSubcategoryIndex =0
fetch('../../data/subCategories.json').then(response=> response.json()).then(data =>{
    
    const subCategories = data.subcategories.filter(sub => sub.category_id === 1); 
    if(subCategories.length == 6){
        showMoreBtn2.style.display = 'none';
    }
    console.log(subCategories)  
    displayInitialItems(subCategories , 6);
    showMoreBtn2.addEventListener("click", () => {
        if (showMoreBtn2.value === "Show More") {
            displayRemainingItems(subCategories , currentSubcategoryIndex );
        } else {
            console.log(currentSubcategoryIndex)
            hideExtraItems(subCategories,6);
        }
    });    
})
.catch(error => console.error('Error fetching data:', error));





    
    


    







function displayInitialItems(items , initialLength){
    for(let i=0;i<initialLength;i++){
        if(initialLength ==4){
            displayProduct(items[i],items.length)
        }
        else if(initialLength == 6){
            displaySubCategory(items[i],items.length)
        }
        
        
    }

}

function displayRemainingItems(items , index){
    for(let i=index; i<items.length; i++){
        if(index == 4){
            console.log(currentProductIndex);
            displayProduct(items[i],items.length)
        }else if(index == 6){
            console.log(currentSubcategoryIndex);
            displaySubCategory(items[i],items.length)
        }
        

    }
}


function hideExtraItems(items,count){
    if(count == 4){
        for(let i=0;i<items.length-count;i++){
            console.log(currentProductIndex)
            removeProduct()
             
        }
        showMoreBtn1.value = "Show More"

    }else if(count == 6){
        for(let i=0;i<items.length-count;i++){
            console.log(currentSubcategoryIndex)
            removeSubCategory()
             
        }
        showMoreBtn2.value = "Show More"
    }
    
}



function displayProduct(product,len){    
    if(currentProductIndex <= len-1){
        const item = document.createElement('div');
        item.classList.add('product-card') 
        item.setAttribute('id',currentProductIndex+1) 
        var priceAfterDiscount = parseFloat(product.current_price - (product.current_price * (parseFloat(product.discount) / 100))).toFixed(2)      
        item.innerHTML = `
           
                        <img src=${product.primary_image} alt="" class="product-image">
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
                             <p >${product.discount && product.discount !== "0%" ?`<span class="product-after-discount"> USD ${priceAfterDiscount} </span>  <span class="product-current-price"><s style="text-decoration: line-through;"> USD ${product.current_price}</s> (${product.discount}off)</span>`: `<span class="product-current-price">${product.current_price}</span>`} </p>
                            <span class="product-vendor">${product.vendor}</span> <br>
                            ${product.free_shipping ? `<span class="free-shipping">FREE Shipping</span>` : ''}                    
                        </div>                    
        `
        
        productsContainer.appendChild(item);
        setTimeout(() => {
            item.classList.add('show');
          }, 1000);
        currentProductIndex++
        if(currentProductIndex == len-1){
            showMoreBtn1.value = "Show Less"
        }

    }else{
        currentProductIndex = len-1
    }
   
       


}







function removeProduct(){
    productsContainer.removeChild(productsContainer.lastElementChild);
    currentProductIndex--
}








function displaySubCategory(subCategories,len){    
    if(currentSubcategoryIndex <= len-1){
        const item = document.createElement('div');
        item.classList.add('sub-category-card')         
        item.innerHTML = `                      
                    
                            <a href="">
                                <img class="sub-category-img" src="${subCategories.image}" alt="">
                                <p class="sub-category-name">${subCategories.name}</p>
                            </a>
                    
        ` 
        subCategoriesContainer.appendChild(item);
        setTimeout(() => {
            item.classList.add('show');
          }, 1000);
        currentSubcategoryIndex++
        if(currentSubcategoryIndex == len){
            console.log(currentSubcategoryIndex)
            showMoreBtn2.value = "Show Less"
        }

    }else{
        currentSubcategoryIndex = len-1
    }
   
       


}







function removeSubCategory(){
    subCategoriesContainer.removeChild(subCategoriesContainer.lastElementChild);
    currentSubcategoryIndex--
}






