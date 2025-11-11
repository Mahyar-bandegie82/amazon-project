export const cart = []

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
    console.log(cart);
    
}