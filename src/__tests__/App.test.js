// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const mongoose = require('mongoose');
const { Budget, Log, db } = require('../../db');
const budgetData = { income: 1000, bills: 300, savings: 0 };
const logData = {
  category: 'transportation',
  name: 'subway',
  price: 30,
  date: '05-14-2020',
};

describe('Budget Model Test', () => {
  // It's just so easy to connect to the MongoDB Memory Server
  // By using mongoose.connect
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  it('create & save budget successfully', async () => {
    const validBudget = new Budget(budgetData);
    const savedBudget = await validBudget.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedBudget.income).toBe(1000);
    expect(savedBudget.bills).toBe(300);
    expect(savedBudget.savings).toBe(0);
  });

  it('create & save logs successfully', async () => {
    const validLog = new Log(logData);
    const savedLog = await validLog.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedLog.category).toBe('transportation');
    expect(savedLog.name).toBe('subway');
    expect(savedLog.price).toBe(30);
    expect(savedLog.date).toBe('05-14-2020');
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  // it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
  //   const userWithInvalidField = new UserModel({
  //     name: 'TekLoon',
  //     gender: 'Male',
  //     nickname: 'Handsome TekLoon',
  //   });
  //   const savedUserWithInvalidField = await userWithInvalidField.save();
  //   expect(savedUserWithInvalidField._id).toBeDefined();
  //   expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  // });

  // Test Validation is working!!!
  // It should us told us the errors in on gender field.
  // it('create user without required field should failed', async () => {
  //   const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
  //   let err;
  //   try {
  //     const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
  //     error = savedUserWithoutRequiredField;
  //   } catch (error) {
  //     err = error;
  //   }
  //   expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  //   expect(err.errors.gender).toBeDefined();
  // });
});
