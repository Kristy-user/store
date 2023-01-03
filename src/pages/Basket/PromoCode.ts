import { promocodes, TPromo } from './promocodes';

export default class PromoCode {
  private couponInput: HTMLInputElement;
  private appliedPromo: Set<string>;

  constructor() {
    this.couponInput = document.querySelector('.coupon') as HTMLInputElement;
    this.appliedPromo = new Set(JSON.parse(localStorage.getItem('coupons') as string) || []);
  }

  listener(): void {
    this.createList();
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

  createPromo(promo: string): void {
    let wrapper = document.createElement('div'),
      promoElement = document.createElement('div'),
      applyPromoBtn = document.createElement('button');
    wrapper.classList.add('wrapper');
    promoElement.classList.add('find-promo');
    applyPromoBtn.classList.add('apply-promo');
    
    promoElement.textContent = `${promo} - ${promocodes[promo as TPromo]}%`;
    applyPromoBtn.textContent = `add`;

    applyPromoBtn.addEventListener('click', () => {
      this.appliedPromo.add(promo);

      let array = JSON.parse(localStorage.getItem('coupons') as string) || [];
      array.push(promo);
      localStorage.setItem('coupons', JSON.stringify(array));

      this.createList();
    });

    wrapper.append(promoElement, applyPromoBtn);

    const findCoupon = document.querySelector('.find-coupon');
    if (findCoupon) {
      findCoupon.append(wrapper);
    }
  }

  deletePromo(promo: string): void {
    let findCouponsWrapper = document.querySelector('.find-coupon') as Element;
    let findCoupon = findCouponsWrapper.querySelector('.find-promo');
    
    if (findCoupon && (findCoupon.textContent as string).startsWith(promo)) {
      (findCoupon.closest('.wrapper') as HTMLDivElement).remove();
    }
  }

  createList(): void {
    let appliedCoupons = document.querySelector('.applied-coupons') as Element;
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

      coupon.textContent = `${promo} - ${promocodes[promo as TPromo]}%`;
      drop.textContent = 'drop';

      drop.addEventListener('click', () => {
        this.appliedPromo.delete(promo);

        let array = JSON.parse(localStorage.getItem('coupons') as string) || [];
        
        let newArray = array.filter((item: string) => item !== promo);
        localStorage.setItem('coupons', JSON.stringify(newArray));

        this.createList();
      });

      wrapper.append(coupon, drop);
      promos.append(wrapper);
    });

    appliedCoupons.append(promos);

    this.setNewPrice();
  }

  setNewPrice(): void {
    const discountPrice = document.querySelector('.discount-price') as Element;
    const buyTotalAmount = document.querySelector('.buy__total-amount') as Element;

    if (this.appliedPromo.size) {
      buyTotalAmount.classList.add('crossOut');

      const arrayPromo = Array.from(this.appliedPromo);

      const percentAmount = arrayPromo.reduce((total, promo) => {
        return (total += promocodes[promo as TPromo]);
      }, 0);

      discountPrice.textContent = `Total:   $ ${
        (+(buyTotalAmount.textContent as string).slice(2) *
        (1 - percentAmount / 100)).toFixed(2)
      }`;
    } else {
      discountPrice.innerHTML = '';
      buyTotalAmount.classList.remove('crossOut');
    }
  }
}
