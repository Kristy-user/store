import Sort from '../src/utils/Sort';
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
  it('directSort should do a direct sort of an array of objects using one key', () => {
    const testCases = [
      {
        arr: [
          {
            title: 'Samsung Universe 9',
            description:
              "Samsung's new variant which goes beyond Galaxy to the Universe",
            price: 1249,
            discountPercentage: 15.46,
            rating: 4.09,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'iPhone 9',
            description: 'An apple mobile which is nothing like apple',
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'iPhone X',
            description:
              'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
            price: 899,
            discountPercentage: 17.94,
            rating: 4.44,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
        ],
        expected: [
          {
            title: 'iPhone 9',
            description: 'An apple mobile which is nothing like apple',
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'iPhone X',
            description:
              'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
            price: 899,
            discountPercentage: 17.94,
            rating: 4.44,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'Samsung Universe 9',
            description:
              "Samsung's new variant which goes beyond Galaxy to the Universe",
            price: 1249,
            discountPercentage: 15.46,
            rating: 4.09,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
        ],
      },
      {
        arr: [
          {
            title: 'Microsoft Surface Laptop 4',
            description:
              'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
            price: 1499,
            discountPercentage: 10.23,
            rating: 4.43,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'OPPOF19',
            description: 'OPPO F19 is officially announced on April 2021.',
            price: 280,
            discountPercentage: 17.91,
            rating: 4.3,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'Huawei P30',
            description:
              'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
            price: 499,
            discountPercentage: 10.58,
            rating: 4.09,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
        ],
        expected: [
          {
            title: 'OPPOF19',
            description: 'OPPO F19 is officially announced on April 2021.',
            price: 280,
            discountPercentage: 17.91,
            rating: 4.3,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'Huawei P30',
            description:
              'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
            price: 499,
            discountPercentage: 10.58,
            rating: 4.09,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'Microsoft Surface Laptop 4',
            description:
              'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
            price: 1499,
            discountPercentage: 10.23,
            rating: 4.43,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
        ],
      },
    ];
    testCases.forEach(({ arr, expected }) => {
      const result = Sort.directSort(arr, 'price');
      expect(result).toEqual(expected);
    });
  });
  it('reverseSort should do a reverse sort of an array of objects using one key', () => {
    const testCases = [
      {
        arr: [
          {
            title: 'Samsung Universe 9',
            description:
              "Samsung's new variant which goes beyond Galaxy to the Universe",
            price: 1249,
            discountPercentage: 15.46,
            rating: 4.09,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'iPhone 9',
            description: 'An apple mobile which is nothing like apple',
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'iPhone X',
            description:
              'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
            price: 899,
            discountPercentage: 17.94,
            rating: 4.44,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
        ],
        expected: [
          {
            title: 'iPhone 9',
            description: 'An apple mobile which is nothing like apple',
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'iPhone X',
            description:
              'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
            price: 899,
            discountPercentage: 17.94,
            rating: 4.44,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'Samsung Universe 9',
            description:
              "Samsung's new variant which goes beyond Galaxy to the Universe",
            price: 1249,
            discountPercentage: 15.46,
            rating: 4.09,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
        ],
      },
      {
        arr: [
          {
            title: 'Microsoft Surface Laptop 4',
            description:
              'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
            price: 1499,
            discountPercentage: 10.23,
            rating: 4.43,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'OPPOF19',
            description: 'OPPO F19 is officially announced on April 2021.',
            price: 280,
            discountPercentage: 17.91,
            rating: 4.3,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'Huawei P30',
            description:
              'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
            price: 499,
            discountPercentage: 10.58,
            rating: 4.09,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
        ],
        expected: [
          {
            title: 'Microsoft Surface Laptop 4',
            description:
              'Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.',
            price: 1499,
            discountPercentage: 10.23,
            rating: 4.43,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'OPPOF19',
            description: 'OPPO F19 is officially announced on April 2021.',
            price: 280,
            discountPercentage: 17.91,
            rating: 4.3,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
          {
            title: 'Huawei P30',
            description:
              'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
            price: 499,
            discountPercentage: 10.58,
            rating: 4.09,
            id: 1,
            stock: 68,
            brand: 'Microsoft Surface',
            category: 'laptops',
            thumbnail: 'https://i.dummyjson.com/data/products/8/thumbnail.jpg',
            images: [
              'https://i.dummyjson.com/data/products/8/1.jpg',
              'https://i.dummyjson.com/data/products/8/2.jpg',
            ],
          },
        ],
      },
    ];
    testCases.forEach(({ arr, expected }) => {
      const result = Sort.reverseSort(arr, 'rating');
      expect(result).toEqual(expected);
    });
  });
});
