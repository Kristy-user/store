export const modalLayout: string = `
<div class="modal-content">
    <form class="form" action="" novalidate>
        <p class="form-title personal-title">Personal Data</p>
        <div class="form__group">
            <input type="text" class="input input-name" name="fullName" placeholder="Name">
            <div class="error-name">Please enter a valid name (NAME SURNAME) </div>
        </div>
        <div class="form__group">
            <input type="tel" minlength="9"
            maxlength="14" class="input input-number" name="number" placeholder="Phone number">
            <div class="error-number">Please enter a valid phone number (phone number length minimum 9 and maximum 14). </div>
        </div>
        <div class="form__group">
            <input type="text" class="input input-address" name="address" placeholder="Delivery address">
            <div class="error-address">Please enter a valid address (Main info: Country Region City Street 45/12) </div>
        </div>
        <div class="form__group">
            <input type="email" class="input input-email" name="email" placeholder="E-mail">
            <div class="error-email">Please enter a valid email (name@test.com) </div>
        </div>
        <p class="form-title card-title">Card data</p>
        <div class="form__group card-number-wrapper">
            <input type="text" class="input input-card-number" name="card-number" placeholder="Card number">
            <img src="./assets/bankCard.png" class="bankcard-img" width="80px" height="50px" alt="bankCard">
             </div>
         <div class="error-card-number">Please enter a valid payment card number. </div>
        <div class="card-data-wrapper">
        <div>
        <input type="text" class="input input-valid-thru" name="valid-thru" placeholder="valid thru">
            <div class="error-thru">MM/YY </div>
            </div>
            <div>
            <input type="text" class="input input-cvv" name="cvv" placeholder="CVV">
            <div class="error-cvv">XXX</div>
            </div>   
        </div>
        <button class="sumbit-btn" type="submit">
            Confirm
        </button>
    </form>
</div>
`;
