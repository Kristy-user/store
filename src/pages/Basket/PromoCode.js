import { promocodes } from './promocodes';

export default class PromoCode {
  constructor() {
    this.couponInput = document.querySelector('.coupon');
    this.couponApplyBtn = document.querySelector('.coupon-btn');
    this.appliedPromo = new Set();
  }
  // <button class="coupon-btn">Apply coupon</button>

  listener() {
    this.couponInput.addEventListener('input', () => {
      for (let promo in promocodes) {
        if (this.couponInput.value.toLowerCase() === promo) {
          this.createPromo(promo);
        } else {
          this.deletePromo(promo);
        }
      }
    });
  }

  createPromo(promo) {
    let wrapper = document.createElement('div'),
      promoElement = document.createElement('div'),
      applyPromoBtn = document.createElement('button');
    wrapper.classList.add('wrapper');
    promoElement.classList.add('find-promo');
    applyPromoBtn.classList.add('apply-promo');

    promoElement.textContent = `${promo} - ${promocodes[promo]}%`;
    applyPromoBtn.textContent = `add`;

    applyPromoBtn.addEventListener('click', () => {
      this.appliedPromo.add(promo);
      this.createList();
    });

    wrapper.append(promoElement, applyPromoBtn);
    document.querySelector('.find-coupon').append(wrapper);
  }

  deletePromo(promo) {
    let findCouponsWrapper = document.querySelector('.find-coupon');
    let findCoupon = findCouponsWrapper.querySelector('.find-promo');

    if (findCoupon && findCoupon.textContent.startsWith(promo)) {
      findCoupon.closest('.wrapper').remove();
    }
  }

  createList() {
    let appliedCoupons = document.querySelector('.applied-coupons');
    let promos = document.createElement('div');
    promos.classList.add('promos');

    let title = document.createElement('div');
    appliedCoupons.innerHTML = '';
    if (this.appliedPromo.size > 0) {
      title.classList.add('applied-promo-title');
      title.textContent = 'Applied promo';
      appliedCoupons.append(title);
    }

    const array = Array.from(this.appliedPromo);

    array.forEach((promo) => {
      let wrapper = document.createElement('div');
      let coupon = document.createElement('div');
      let drop = document.createElement('button');

      wrapper.classList.add('promo-drop__wrapper');
      coupon.classList.add('promo');
      drop.classList.add('drop');

      coupon.textContent = `${promo} - ${promocodes[promo]}%`;
      drop.textContent = 'drop';

      drop.addEventListener('click', () => {
        this.appliedPromo.delete(promo);
        this.createList();
      });

      wrapper.append(coupon, drop);
      promos.append(wrapper);
    });

    appliedCoupons.append(promos);

    this.setNewPrice();
  }

  setNewPrice() {
    if (this.appliedPromo.size) {
      document.querySelector('.buy__total-amount').classList.add('crossOut');

      const arrayPromo = Array.from(this.appliedPromo);

      const percentAmount = arrayPromo.reduce((total, promo) => {
        return (total += promocodes[promo]);
      }, 0);

      document.querySelector('.discount-price').textContent = `Total:   $ ${
        +document.querySelector('.buy__total-amount').textContent.slice(2) *
        (1 - percentAmount / 100)
      }`;
    } else {
      document.querySelector('.discount-price').innerHTML = '';
      document.querySelector('.buy__total-amount').classList.remove('crossOut');
    }
  }
}
