var {
  getExpenses,
  getBudgets,
  createExpense,
  createBudget,
  getTotalExpenses,
  deleteBudget,
  deleteLogs,
  getTotalFromAllCategories
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
    getTotal: (req, res) => {
      getTotalExpenses()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    },
    getTotalFromEachCategory: (req, res) => {
      getExpenses()
        .then(results => {
          console.log(results);
          let catObj = {};
          results.map(result => {
            if (!catObj[result.category]) {
              catObj[result.category] = result.price;
            } else {
              catObj[result.category] += result.price;
            }

            // "restaurants/bars": 75,
            // "recreation": 453,
            // "groceries": 454700929099
          });
          let responseArr = [];
          for (let key in catObj) {
            let newObj = {};
            newObj.category = key;
            newObj.price = catObj[key];
            responseArr.push(newObj);
          }

          res.send(responseArr);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    },

    delete: (req, res) => {
      deleteLogs()
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    }
  }
};
