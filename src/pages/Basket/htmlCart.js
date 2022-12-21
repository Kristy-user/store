export const cartLayout = `
<section class="basket-page">
    <div class="container">
        <h2 class="basket__title">Cart</h2>
        <div class="basket-products">
            <div class="basket-products__name">Product</div>
            <div class="basket-products__price">Price</div>
            <div class="basket-products__amount">Amount</div>
            <div class="basket-products__total">Total</div>
        </div>
        <div ><ul class="basket-list"></ul></div>
        <div class="order">
            <div class="coupon__wrapper">
               <input type="text" class="coupon" placeholder="Enter promo code">
               <button class="coupon-btn">Apply coupon</button>
            </div>
            <div class="buy__wrapper">
                <div class="buy__total"><p>Total: </p><p class="buy__total-amount"></p></div>
                <button class="buy__order">BUY NOW</button>
            </div>
        <div>
    </div>
<section>`;
