export const cartLayout = `
<section class="basket-page">
    <div class="container">
        <h2 class="basket__title">Cart</h2>
        <div class="pagination-wrapper">
        <div class="pagination-limit"></div>
        <div class="pagination"></div>
        </div>
        <div class="basket-products">
        <div class="basket-products__name"><h4>Product</h4></div>
        <div class="basket-products__price"><h4>Price</h4></div>
        <div class="basket-products__amount"><h4>Amount</h4></div>
        <div class="basket-products__total"><h4>Total</h4></div>
        </div>
        <div ><ul class="basket-list"></ul></div>
        <div class="order">
            <div class="coupon__wrapper">
               <input type="text" class="coupon" placeholder="promo code (rss, epam)">
               <div class="find-coupon"></div>
               <div class="applied-coupons"></div>
            </div>
            <div class="buy__wrapper">
              <div class="buy__total"><div><p class="basket-amount"></p>
            </div>
                  <p>Total:&nbsp;&nbsp;</p>
                    <p class="buy__total-amount"></p>
                    <div class="discount-price"></div>
                </div>
                <button class="buy__order">BUY NOW</button>
            </div>
        <div>
    </div>
<section>`;
