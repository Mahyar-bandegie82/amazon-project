import { cart, removeProduct, saveDeliveryInfo } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { Money } from "../utils/money.js";
import { deliveryOptions, getDeliveryOPtion } from "../../data/deliveryoptions.js";
import renderPriceSummary from "./paymentSummery.js";
import dayjs from "dayjs";

export default function orderSummary() {
    let checkoutHtml = '';

    cart.forEach((product_incart) => {
        let productId = product_incart.productId;

        let matchingItem = getProduct(productId)

        let deliveryOPTid = getDeliveryOPtion(product_incart.deliveryOption)
        
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
                    ${deliveryopt(matchingItem, product_incart)}
                </div>
            </div>
        </div>
    `;

    })
    function deliveryopt(matchingItem, product_incart) {
        let delopt = ''

        deliveryOptions.forEach((option) => {
            const today = dayjs();
            const deliveryDate = today.add(option.deliveryDays, 'day').format('dddd, MMMM D');
            const deliveryPrice = option.priceCents === 0 ? 'FREE Shipping' : `$${Money(option.priceCents)} - Shipping`;

            const isChecked = product_incart.deliveryOption === option.deliveryId;

            delopt = delopt + `
            <div class="delivery-option-js">
                <label class="delivery-option">
                    <input type="radio" ${isChecked ? 'checked' : ''} value="${option.deliveryId}" class="delivery-option-input radio-input-js" name="delivery-option-${matchingItem.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${deliveryDate}
                        </div>
                        <div class="delivery-option-price">
                            ${deliveryPrice}
                        </div>
                    </div>
                </label>
            </div>
            
        `

        })

        return delopt
    }
    document.querySelector('.js-order-summary').innerHTML = checkoutHtml

    document.querySelectorAll('.radio-input-js').forEach((radio) => {
        let dataset = radio.closest('.js-cart-item-container').dataset.delete;
        radio.addEventListener('change', () => {
            cart.forEach((item) => {
                if (item.productId === dataset) {
                    saveDeliveryInfo(dataset);
                }
            })
            orderSummary()
            renderPriceSummary()
        });
    });



    //my code
    document.querySelectorAll('.js-delete').forEach((btn) => {
        btn.addEventListener('click', () => {
            removeProduct(btn.dataset.delete)
            renderPriceSummary()
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


}

