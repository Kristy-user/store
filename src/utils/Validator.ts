export default class Validator {
  static isValidName(name: string) {
    const nameArray = name.split(' ');
    if (nameArray.length < 2) return false;
    return (
      nameArray.filter((part) => part.length > 2).length === nameArray.length
    );
  }

  static isValidPhone(number: string) {
    const re = /^([+ ]{2}[0-9]{9,14})?$/;
    return String(number).length > 0 && re.test(String(number));
  }

  static isValidAddress(address: string) {
    const addressArray = address.split(' ');
    if (addressArray.length < 3) return false;
    return (
      addressArray.filter((part) => part.length > 3).length ===
      addressArray.length
    );
  }

  static isValidEmail(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static isValidCardNumber(cardNumber: string) {
    const re = /^([0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4}[ ]{1}[0-9]{4})?$/;
    return (
      String(cardNumber).length > 0 &&
      re.test(String(cardNumber)) &&
      this.isCreditCardNumber(cardNumber)
    );
  }

  static isValidValidThru(validThru: string) {
    const validThruArray = validThru.split('/');

    if (validThruArray.length === 1) return false;

    if (Number(validThruArray[0]) > 12) return false;
    return (
      validThruArray.filter((part) => part.length === 2).length ===
      validThruArray.length
    );
  }

  static isValidCvv(cvv: string) {
    return cvv.length === 3;
  }
  static isCreditCardNumber(ccn: string) {
    const cnnArr = ccn
      .toString()
      .split('')
      .filter((n) => n !== ' ');

    const result = cnnArr.map((item, i) => {
      let itemNumber: number = Number(item);
      if (
        (i % 2 === 0 && cnnArr.length % 2 === 0) ||
        (i % 2 && cnnArr.length % 2)
      ) {
        return itemNumber * 2 > 9 ? itemNumber * 2 - 9 : itemNumber * 2;
      }
      return Number(item);
    });
    return result.reduce((prev, curr) => prev + curr, 0) % 10 === 0;
  }
}
