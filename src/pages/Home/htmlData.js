export const homeRoot = `<section class="products container">
<aside class="products__filter">
  <div class="filters__box">
    <div id="category">
      <h3>Category</h3>
      <div>
        <input
          type="checkbox"
          id="smartphones"
          name="category"
          value="smartphones"
        /><label class="filters__box-label" for="smartphones"
          >Smartphones</label
        >
      </div>
      <div>
        <input
          type="checkbox"
          id="laptops"
          name="category"
          value="laptops"
        /><label class="filters__box-label" for="laptops">Laptops</label>
      </div>
    </div>
    <div id="brand">
      <div>
        <h3>Brand</h3>
        <input type="checkbox" id="apple" name="brand" value="apple" /><label
          class="filters__box-label"
          for="apple"
          >Apple</label
        >
      </div>
      <div>
        <input
          type="checkbox"
          id="samsung"
          name="brand"
          value="samsung"
        /><label class="filters__box-label" for="samsung">Samsung</label>
      </div>
    </div>
    <div id="price">
      <h3>Price</h3>
      <div class="price__content">
        <div class="value-field">
          <label class="price__content-label">Min:</label>
          <p id="min-value-price">$0</p>
        </div>
        <div class="value-field">
          <label class="price__content-label">Max:</label>
          <p id="max-value-price">$1749</p>
        </div>
      </div>
      <div class="range-slider">
        <input
          type="range"
          class="min-price"
          value="0"
          min="0"
          max="1749"
          step="1"
        />
        <input type="range" class="max-price" value="0 min="0" max="1749"
        step="1">
      </div>
    </div>
    <div id="stock">
      <h3>Stock</h3>
      <div class="stock__content">
        <div class="value-field">
          <label class="stock__content-label">Min:</label>
          <p id="min-value-stock">0</p>
        </div>

        <div class="value-field">
          <label class="stock__content-label">Max:</label>
          <p id="max-value-stock">0</p>
        </div>
      </div>
      <div class="range-slider">
        <input
          type="range"
          class="min-stock"
          value="0"
          min="0"
          max="150"
          step="1"
        />
        <input type="range" class="max-stock" value="0 min="0" max="150"
        step="1">
      </div>
      <div id="remove">
        <button class="filters__box-remove">Remove all filters</button>
      </div>
      <div class="copy__wrapper">
        <button class="copy">Copy link</button>
      </div>
    </div>
  </div>
</aside>
<div class="products__wrapper">
<div class="sort-products">  
<div class="sort-bar">
<div class="select">
<input type="select-text" id="input" readonly placeholder="Sort options">
</div>
<div class="option-container">
<div class="option" id = "price-ASC">
    <label > Sort by price ASC </label>
</div>
<div class="option" id = "price-DESC">
    <label>Sort by price DESC</label>
</div>
<div class="option" id = "rating-ASC">
    <label>Sort by rating ASC</label>
</div>
<div class="option" id = "rating-DESC">
    <label>Sort by rating DESC</label>
</div>

</div>
</div>

<div class="stat"><p>Found:&nbsp;&nbsp;</p><p class="stat-count">4</p></div>
<div class="search-bar">
<input class="search__input" type="search" placeholder="Search.." />
</div>
<div class="view-mode">
<div class="three active"></div><div class="two"></div></div>
</div>
 <div class="products-items"></div>
</div>
</section>
`;
