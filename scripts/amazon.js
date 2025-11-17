import { addProductToCart, cart } from "../data/cart.js"
import { products } from "../data/products.js"
import { Money } from "./utils/money.js";

let products_string = ''

// amazon.js or a separate ratings.js helper
const ratingImages = {
  0: new URL("../images/ratings/rating-0.png", import.meta.url).href,
  5: new URL("../images/ratings/rating-05.png", import.meta.url).href,
  10: new URL("../images/ratings/rating-10.png", import.meta.url).href,
  15: new URL("../images/ratings/rating-15.png", import.meta.url).href,
  20: new URL("../images/ratings/rating-20.png", import.meta.url).href,
  25: new URL("../images/ratings/rating-25.png", import.meta.url).href,
  30: new URL("../images/ratings/rating-30.png", import.meta.url).href,
  35: new URL("../images/ratings/rating-35.png", import.meta.url).href,
  40: new URL("../images/ratings/rating-40.png", import.meta.url).href,
  45: new URL("../images/ratings/rating-45.png", import.meta.url).href,
  50: new URL("../images/ratings/rating-50.png", import.meta.url).href,
};


products.forEach((product) => {
    products_string = products_string + `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${ratingImages[product.rating.stars * 10]}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${Money(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
})

function updateCartQuantity() {
    let totalCartQuantity = 0;
    cart.forEach((elem) => {
        totalCartQuantity += elem.quantity
    })

    document.querySelector('.js-cart-quantity').innerHTML = totalCartQuantity
}

document.querySelector('.products-grid').innerHTML = products_string

document.querySelectorAll('.js-button').forEach((btn) => {
    btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        addProductToCart(productId)
        updateCartQuantity()
    })
})
