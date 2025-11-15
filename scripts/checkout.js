import { cart , removeProduct } from "../data/cart.js";
import { products } from "../data/products.js";
import { Money } from "./utils/money.js";

let checkoutHtml = '';

cart.forEach((product_incart) => {
    let productId = product_incart.productId;

    let matchingItem = products.find((product) => {
        return product.id === productId
    })

    checkoutHtml += `
        <div class="cart-item-container js-cart-item-container" data-delete="${matchingItem.id}">
            <div class="delivery-date">
                Delivery date: Tuesday, June 21
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
                    <div class="delivery-option">
                        <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingItem.id}">
                        <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${matchingItem.id}">
                        <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input" name="delivery-option-${matchingItem.id}">
                        <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

})



document.querySelector('.js-order-summary').innerHTML = checkoutHtml
//my code
document.querySelectorAll('.js-delete').forEach((btn)=>{
    btn.addEventListener('click', ()=>{
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

