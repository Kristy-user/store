import Validator from '../src/utils/Validator';

describe('Tests for our app', () => {
  it('Checks if the name is valid', () => {
    const testCases = [
      { name: 'Nikita Kovalyov', expected: true },
      { name: 'Nikita K', expected: false },
    ];

    testCases.forEach(({ name, expected }) => {
      const result = Validator.isValidName(name);
      expect(result).toBe(expected);
    });
  });
  it('Checks if the phone is valid', () => {
    const testCases = [
      { phone: '+ 375333586116', expected: true },
      { phone: '+ 123123', expected: false },
      { phone: '+ 9999999999', expected: true },
    ];

    testCases.forEach(({ phone, expected }) => {
      const result = Validator.isValidPhone(phone);
      expect(result).toBe(expected);
    });
  });
  it('Checks if the address is valid', () => {
    const testCases = [
      { address: 'Улица Правильный Этот', expected: true },
      { address: 'Неправильный Адресс', expected: false },
      { address: 'Некорректный ад', expected: false },
    ];

    testCases.forEach(({ address, expected }) => {
      const result = Validator.isValidAddress(address);
      expect(result).toEqual(expected);
    });
  });
  it('Checks if the email is valid', () => {
    const testCases = [
      { email: 'nikitakemper555@gmail.com', expected: true },
      { email: 'nikitakemper555gmail.com', expected: false },
      { email: 'nikitakemper555@gmailcom', expected: false },
    ];

    testCases.forEach(({ email, expected }) => {
      const result = Validator.isValidEmail(email);
      expect(result).toBe(expected);
    });
  });
  it('Checks if the expiration date is valid', () => {
    const testCases = [
      { date: '12/34', expected: true },
      { date: '1234', expected: false },
      { date: '21/34', expected: false },
    ];

    testCases.forEach(({ date, expected }) => {
      const result = Validator.isValidValidThru(date);
      expect(result).toEqual(expected);
    });
  });
  it('Checks if the cvv code is valid', () => {
    const testCases = [
      { cvv: '124', expected: true },
      { cvv: '1234', expected: false },
      { cvv: '21/34', expected: false },
    ];

    testCases.forEach(({ cvv, expected }) => {
      const result = Validator.isValidCvv(cvv);
      expect(result).toEqual(expected);
    });
  });
  it('Checks if the credit card is valid', () => {
    const testCases = [
      { card: '4111 1111 1111 1111', expected: true },
      { card: '5100 0000 0000 0008', expected: true },
      { card: '5555 5555 5555 5599', expected: true },
      { card: '5555 5555 55555599', expected: false },
    ];

    testCases.forEach(({ card, expected }) => {
      const result = Validator.isValidCardNumber(card);
      expect(result).toEqual(expected);
    });
  });
  it('isCreditCardNumber should validate CCN', () => {
    const testCases = [
      { ccn: '4012888888881881', expected: true },
      { ccn: '5123456789012346', expected: true },
      { ccn: '4571234567890111', expected: false },
      { ccn: '4916123456789012', expected: false },
    ];
    testCases.forEach(({ ccn, expected }) => {
      const result = Validator.isCreditCardNumber(ccn);
      expect(result).toEqual(expected);
    });
  });
});
