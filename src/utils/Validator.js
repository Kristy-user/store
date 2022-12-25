export default class Validator {
    static isValidName(name) {
        const nameArray = name.split(' ');

        if (nameArray.length < 2) return false;

        return nameArray.filter(part => part.length > 2).length === nameArray.length;
    }

    static isValidPhone(number) {
        const re = /^([+]{1}[0-9]{9,30})?$/;
        return String(number).length > 0 && re.test(String(number));
    }

    static isValidAddress(address) {
        const addressArray = address.split(' ');

        if (addressArray.length < 3) return false;

        return addressArray.filter(part => part.length > 4).length === addressArray.length;
    }

    static isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    static isValidCardNumber(cardNumber) {
        const re = /^([0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4})?$/;
        return String(cardNumber).length > 0 && re.test(String(cardNumber));
    }

    static isValidValidThru(validThru) {
        const validThruArray = validThru.split('/');

        if (validThruArray.length === 1) return false;

        if (Number(validThruArray[0]) > 12) return false;
        console.log(validThruArray[0].length, validThruArray[1].length);
        return validThruArray.filter(part => part.length === 2).length === validThruArray.length;
    }

    static isValidCvv(cvv) {
        return cvv.length === 3;
    }
}
