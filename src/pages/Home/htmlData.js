export const homeRoot = `
  <section class="basket-page">
    <div class="container">
        <h2 class="basket__title">Корзина</h2>
        <div class="basket-products">
            <div class="basket-products__name">Товар</div>
            <div class="basket-products__price">Цена</div>
            <div class="basket-products__amount">Количество</div>
            <div class="basket-products__total">Всего</div>
        </div>
        <template>
            ЗДЕСЬ БУДУТ ТОВАРЫ ГЕНЕРИТЬСЯ
        </template>
        <div class="order">
            <div class="coupon__wrapper">
               <input type="text" class="coupon" placeholder="Введите купон">
               <button class="coupon-btn">Применить купон</button>
            </div>
            <div class="buy__wrapper">
                <div class="buy__total">Итого:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$129</div>
                <button class="buy__order">Оформить заказ</button>
            </div>
        <div>
    </div>
<section>
`;

// export const homeRoot = `<section class="products container"> <aside class="products__filter">
// <div class="filters__box">
//   <div id="category">
//     <h3>Category</h3>
//     <div>
//       <input
//         type="checkbox"
//         id="smartphones"
//         name="category"
//         value="smartphones"
//       /><label class="filters__box-label" for="smartphones">Smartphones</label>
//     </div>
//     <div>
//       <input
//         type="checkbox"
//         id="laptops"
//         name="category"
//         value="laptops"
//       /><label class="filters__box-label" for="laptops">Laptops</label>
//     </div>
//   </div>
//   <div id="brand">
//     <div>
//       <h3>Brand</h3>
//       <input
//         type="checkbox"
//         id="apple"
//         name="brand"
//         value="apple"
//       /><label class="filters__box-label" for="apple">Apple</label>
//     </div>
//     <div>
//       <input
//         type="checkbox"
//         id="samsung"
//         name="brand"
//         value="samsung"
//       /><label class="filters__box-label" for="samsung">Samsung</label>
//     </div>
//   </div>
//   <div id="price">
//   <h3>Price</h3>
//   <div class="price__content">
//         <div class="value-field">
//           <label class="price__content-label">Min:</label>
//           <p id="min-value">$50</p>
//         </div>

//         <div class="value-field">
//           <label class="price__content-label">Max:</label>
//           <p id="max-value">$500</p>
//         </div>
//       </div>

//         <div class="range-slider">
//           <input type="range" class="min-price" value="0" min="0"  max="1749" step="1">
//           <input type="range" class="max-price" value="0 min="0" max="1749" step="1">
//         </div>
//     </div>
//   </div>
// </div>
// </aside>

// <div class="products__wrapper"></div></section>`;
