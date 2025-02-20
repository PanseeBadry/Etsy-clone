var currentProductIndex =0
const container = document.getElementById('products-container');
const showMoreBtn = document.getElementsByClassName('show-more-btn')[0]
fetch('../../data/products.json').then(response=> response.json()).then(data =>{
    var products = data.products;
    
    for(let i =0;i<4;i++){
        console.log(currentProductIndex)
        displayProduct(products[currentProductIndex],products.length) 
    }
    
    
 
    showMoreBtn.addEventListener("click", () => {
        if(showMoreBtn.value == "Show More"){
            for(let i=0;i<2;i++){
                displayProduct(products[currentProductIndex],products.length)
                console.log(currentProductIndex)
            }
        }else{
            for(let i=0;i<products.length-4;i++){
                console.log(currentProductIndex)
                removeProduct()
                showMoreBtn.value = "Show More" 
            }
        }
        
       
        
        
        
    });
    
    

    
    // products.forEach(product => { 
    //     const item = document.createElement('div');
    //     item.classList.add('product-item')
        
    //     item.innerHTML = `
    //         <img src="${product.imageUrl}" alt="" class="product-image">
    //         <div class="product-body">
    //             <p class="product-state">${product.state}</p>
    //             <i class="fa-regular fa-heart product-favorite"></i>
    //             <p class="product-name">${product.title}</p>
    //             <span class="product-description">${product.seller}</span>
    //             <div class="product-info">
    //                 <span class="product-rating">${product.rating}<i class="fa-solid fa-star"></i></span>
    //                 <span class="product-views">${product.ratingCount}</span>
    //             </div>
    //             <p class="product-price"> ${product.currency} ${product.price} </p>
    //             <button class="add-to-cart-btn">
    //                 <i class="fa-solid fa-plus"></i>Add to cart
    //            </button>
    //            <button class="more-like-this-btn">More like this <i class="fa-solid fa-arrow-right"></i></button>
    //         </div>
    //     ` 
    //     container.appendChild(item);
    // }
    // );
    
    
})
.catch(error => console.error('Error fetching data:', error));

function displayProduct(product,len){    
    if(currentProductIndex <= len-1){
        const item = document.createElement('div');
        item.classList.add('product-item')        
        item.innerHTML = `
            <img src="${product.imageUrl}" alt="" class="product-image">
            <div class="product-body">
                <p class="product-state">${product.state}</p>
                <i class="fa-regular fa-heart product-favorite"></i>
                <p class="product-name">${product.title}</p>
                <span class="product-description">${product.seller}</span>
                <div class="product-info">
                    <span class="product-rating">${product.rating}<i class="fa-solid fa-star"></i></span>
                    <span class="product-views">${product.ratingCount}</span>
                </div>
                <p class="product-price"> ${product.currency} ${product.price} </p>
                <button class="add-to-cart-btn">
                    <i class="fa-solid fa-plus"></i>Add to cart
               </button>
               <button class="more-like-this-btn">More like this <i class="fa-solid fa-arrow-right"></i></button>
            </div>
        ` 
        container.appendChild(item);
        currentProductIndex++
        if(currentProductIndex == len-1){
            showMoreBtn.value = "Show Less"
        }

    }else{
        currentProductIndex = len-1
    }
   
       


}







function removeProduct(){
    container.removeChild(container.lastElementChild);
    currentProductIndex--
}