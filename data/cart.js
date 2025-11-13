export const cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
]

// function putCartOut(){
//     return JSON.parse(localStorage.getItem('cart'))
// }

// function putCartIn(){
//     localStorage.setItem('cart', JSON.stringify(cart))
// }

// if(!localStorage.getItem('cart')){
//     localStorage.setItem('cart', JSON.stringify(cart))
// }

export function addProductToCart(productId) {
    
    const matchingProduct = cart.find((elem) => {
        return elem.productId === productId
    })

    if (matchingProduct) {
        matchingProduct.quantity += 1;
    }
    else {

        cart.push({
            productId: productId,
            quantity: 1
        })
    }

}

export function removeProduct(productId) {
    document.querySelectorAll('.js-delete').forEach((btn)=>{
        document.querySelectorAll(".js-cart-item-container").forEach((elem)=>{
            if(productId === elem.dataset.delete){
                cart.forEach((item, index)=>{
                    if(item.productId === productId){
                        cart.splice(index, 1)
                        elem.remove()
                        console.log(cart);
                    }
                }) 
            }
        })
    })
}