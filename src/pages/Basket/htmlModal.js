export const modalLayout = `
<div class="modal-content">
    <form class="form" action="" novalidate>
        <p class="form-title personal-title">Personal Data</p>
        <div class="form__group">
            <input type="text" class="input input-name" name="fullName" placeholder="Name">
        </div>
        <div class="form__group">
            <input type="text" class="input input-number" name="number" placeholder="Phone number">
        </div>
        <div class="form__group">
            <input type="text" class="input input-address" name="address" placeholder="Delivery address">
        </div>
        <div class="form__group">
            <input type="email" class="input input-email" name="email" placeholder="E-mail">
        </div>
        <p class="form-title card-title">Card data</p>
        <div class="form__group card-number-wrapper">
            <input type="text" class="input input-card-number" name="card-number" placeholder="Card number">
            <img src="./assets/bankCard.png" class="bankcard-img" width="80px" height="50px" alt="bankCard">
        </div>
        <div class="card-data-wrapper">
            <input type="text" class="input input-valid-thru" name="valid-thru" placeholder="valid thru">
            <input type="text" class="input input-cvv" name="cvv" placeholder="CVV">
        </div>
        <button class="sumbit-btn" type="submit">
            Confirm
        </button>
    </form>
</div>
`;
