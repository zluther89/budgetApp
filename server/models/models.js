var { Log, Budget } = require("../../db");

module.exports = {
  // retrieves expense documents
  getExpenses: () => {
    return Log.find({});
  },

  //retrieves total of price column from log documents
  getTotalExpenses: () => {
    return Log.aggregate([
      { $group: { _id: null, amount: { $sum: "$price" } } }
    ]);
  },

  ///////////////////////////////////////////////
  //     ADD GET TOTAL FROM CATEGORY FUNC      //
  //////////////////////////////////////////////

  // retrieves the budget documents
  getBudgets: () => {
    return Budget.find({});
  },

  // creates an expense document
  createExpense: expense => {
    let newExpense = new Log(expense);
    console.log(newExpense);
    return newExpense.save();
  },

  deleteBudget: () => {
    return Budget.deleteMany({});
  },

  // creates a new budget document
  createBudget: budget => {
    let newBudget = new Budget(budget);
    return newBudget.save();
  },

  // return expense logs by category
  getExpensesByCategory: category => {
    return Log.find({ category: category }).exec();
  }
};
