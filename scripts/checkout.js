import { cart, removeProduct } from "../data/cart.js";
import { products } from "../data/products.js";
import { Money } from "./utils/money.js";
import { deliveryOptions } from "../data/deliveryoptions.js";
import dayjs from "dayjs";


let checkoutHtml = '';

cart.forEach((product_incart) => {
    let productId = product_incart.productId;

    let matchingItem = products.find((product) => {
        return product.id === productId
    })

    let deliveryOPTid = deliveryOptions.find((item)=>{
        return item.deliveryId === product_incart.deliveryOption
    })
   
    const today = dayjs();
    const deliveryDate = today.add(deliveryOPTid.deliveryDays, 'day').format('dddd, MMMM D');
    
    checkoutHtml += `
        <div class="cart-item-container js-cart-item-container" data-delete="${matchingItem.id}">
            <div class="delivery-date">
                Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingItem.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingItem.name}
                    </div>
                    <div class="product-price">
                        $${Money(matchingItem.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${product_incart.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete" data-delete="${matchingItem.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryopt(matchingItem, cart)}
                </div>
            </div>
        </div>
    `;

})
function deliveryopt(matchingItem, cart) {
    let delopt = ''

    deliveryOptions.forEach((option) => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays, 'day').format('dddd, MMMM D');
        const deliveryPrice = option.priceCents === 0 ? 'FREE Shipping' : `$${Money(option.priceCents) } - Shipping`;
        const isChecked = cart.find((item)=>{
            return item.deliveryOption === option.deliveryId
        })
        // const isChecked = cart.deliveryOptions === option.deliveryId;
        delopt = delopt +`
            <div class="delivery-option">
                <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${matchingItem.id}">
                <div>
                    <div class="delivery-option-date">
                        ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                        ${deliveryPrice}
                    </div>
                </div>
            </div>
        `
        
    })
    
    return delopt
}

document.querySelector('.js-order-summary').innerHTML = checkoutHtml
//my code
document.querySelectorAll('.js-delete').forEach((btn) => {
    btn.addEventListener('click', () => {
        removeProduct(btn.dataset.delete)
    })
})


//ai code
// document.querySelectorAll('.js-delete').forEach((btn) => {
//     btn.addEventListener('click', () => {
//         const productIdToDelete = btn.dataset.delete;

//         // Remove from cart array
//         const index = cart.findIndex((item) => {
//             return item.productId === productIdToDelete
//         });
//         if (index !== -1) {
//             cart.splice(index, 1);
//         }

//         // Remove the correct DOM element
//         const container = btn.closest('.js-cart-item-container');
//         if (container) {
//             container.remove();
//         }
//     });
// });

