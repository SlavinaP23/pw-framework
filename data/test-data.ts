import 'dotenv/config';

export const testData = {
  user: {
    firstName: 'TEST',
    lastName: 'USER',
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
    address: 'Street 1, 1000, TEST TEST',
    city: 'AUSTIN',
    state: 'TEXAS',
    zipcode: '1000',
    mobileNumber: '0888888888',
  },
  payment: {
    name: 'TEST USER',
    number: process.env.CARD_NUMBER,
    cvc: process.env.CVC,
    month: '01',
    year: '2028',
  },
  orderComment: 'Please deliver to the front desk.',
  api: {
    searchTerms: ['top', 'spacesuit'],
  },
};
