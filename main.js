const shop= document.getElementById('shop')

function app(){
   alert("hello");
}

let generateShop = () =>{
 shop.innerHTML = shopItemsData.map((x) =>{

    let{id,name,price,desc,img}=x

    return(
        
        
         <div class='shop_tem'>
           <img src='${img}' alt=''/>
           <div class='product_info' >
              <h5>${name}</h5>
            <p><span>$:</span>${price}</p>
            <p>${desc}</p>

            <button>Add to cart</button>
           </div>

            
        </div>
    )
    
 })
}