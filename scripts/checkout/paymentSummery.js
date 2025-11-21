import { cart } from "../../data/cart.js"
import { products, getProduct } from "../../data/products.js";
import { Money } from "../utils/money.js";
import { deliveryOptions, getDeliveryOPtion } from "../../data/deliveryoptions.js";

export default function renderPriceSummary(){
    let totalProdPrice = 0;
    let totalShipingPrice = 0;
    let itemsInCart = 0

    cart.forEach((element) =>{
        itemsInCart += 1
        let productsInCart = getProduct(element.productId);
        totalProdPrice += productsInCart.priceCents * element.quantity;

        let productDeliveryOpt = getDeliveryOPtion(element.deliveryOption);
        totalShipingPrice += productDeliveryOpt.priceCents;
    });

    let total = totalProdPrice + totalShipingPrice;
    let totalTax = total * 0.1
    let totalWithTax = total + totalTax

    function price_grid(){
        const priceHtml =  `
            <div class="payment-summary-title">
                    Order Summary</
                </div>

                <div class="payment-summary-row">
                    <div>Items (${itemsInCart}):</div>
                    <div class="payment-summary-money">$${Money(totalProdPrice)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Shipping &amp; handling:</div>
                    <div class="payment-summary-money">$${Money(totalShipingPrice)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                    <div>Total before tax:</div>
                    <div class="payment-summary-money">$${Money(total)}</div>
                </div>

                <div class="payment-summary-row">
                    <div>Estimated tax (10%):</div>
                    <div class="payment-summary-money">$${Money(totalTax)}</div>
                </div>

                <div class="payment-summary-row total-row">
                    <div>Order total:</div>
                    <div class="payment-summary-money">$${Money(totalWithTax)}</div>
                </div>

                <button class="place-order-button button-primary">
                    Place your order
                </button>

        `
        return priceHtml
    }
    document.querySelector('.payment-js').innerHTML = price_grid()
}