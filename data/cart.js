export let cart = JSON.parse(localStorage.getItem('cart'))

if (!JSON.parse(localStorage.getItem('cart'))) {
    cart = []
    localStorage.setItem('cart', JSON.stringify(cart))
}

function putCartIn() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

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
            quantity: 1,
			deliveryOption: "1"
        })
    }
    putCartIn();
}

export function removeProduct(productId) {
    document.querySelectorAll('.js-delete').forEach((btn) => {
        document.querySelectorAll(".js-cart-item-container").forEach((elem) => {
            if (productId === elem.dataset.delete) {
                cart.forEach((item, index) => {
                    if (item.productId === productId) {
                        cart.splice(index, 1)
                        
                        elem.remove()
                        console.log(cart);
                    }
                })
            }
        })
    })
    putCartIn()
}

export function saveDeliveryInfo(productId){
    cart.forEach((product) => {
        if (product.productId === productId){
            const selectedOption = document.querySelector(`input[name="delivery-option-${productId}"]:checked`).value;
            product.deliveryOption = selectedOption;
            putCartIn();
        }
    })
}