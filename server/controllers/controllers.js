var {
  getExpenses,
  getBudgets,
  createExpense,
  createBudget,
  getTotalExpenses,
  deleteBudget
} = require("../models/models.js");

module.exports = {
  budget: {
    get: (req, res) => {
      getBudgets()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    },
    post: (req, res) => {
      let budget = req.body;
      createBudget(budget)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    },

    delete: (req, res) => {
      deleteBudget()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    }
  },
  log: {
    get: (req, res) => {
      getExpenses()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    },
    post: (req, res) => {
      let log = req.body;
      createExpense(log)
        .then(() => {
          res.sendStatus(201);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    },
    getTotal: (eq, res) => {
      getTotalExpenses()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    }
  }
};
