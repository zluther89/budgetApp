import React from 'react';
import logo from './logo.svg';
// import './App.css';
import axios from 'axios';
import Budget from './Budget.js';
import PurchaseLog from './PurchaseLog.js';
import Axios from 'axios';
import PurchaseDataTable from './PurchaseDataTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 0,
      budgetTotal: 0,
      totalPurchases: 0,
      moneyLeft: 0,
      expensesArray: [],
      renderIncomeForm: true,
      renderBillForm: false,
      renderPurchaseLogForm: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.postPurchase = this.postPurchase.bind(this);
    this.submitPurchase = this.submitPurchase.bind(this);
    this.submitBudget = this.submitBudget.bind(this);
    this.getPurchasesTotal = this.getPurchasesTotal.bind(this);
    this.getPurchasesArr = this.getPurchasesArr.bind(this);
    this.toggleIncomeForm = this.toggleIncomeForm.bind(this);
    this.toggleBillForm = this.toggleBillForm.bind(this);
    this.getBudget = this.getBudget.bind(this);
    this.calculateBudget = this.calculateBudget.bind(this);
  }

  componentDidMount() {
    //gets the sum of all purchases made, then
    //gets the budget obj from db, computesr total budget, then
    //subtracts total purchases from budget to computer money leftover
    this.getPurchasesTotal()
      .then(res => {
        console.log(res.data.length);
        if (res.data.length > 0) {
          this.setState({ totalPurchases: res.data[0].amount });
        }
      })
      .then(this.calculateBudget); //here;

    this.getPurchasesArr().then(res =>
      this.setState({ expensesArray: res.data })
    );
  }

  //gets an array of the purchase history
  getPurchasesArr() {
    return Axios.get('/log');
  }

  //get request for total purchases
  getPurchasesTotal() {
    return Axios.get('/log/expenses');
  }
  //get request for budget
  getBudget() {
    return Axios.get('/budget');
  }

  //gets budget props, calculates, and sets state with new budget calcs
  calculateBudget() {
    this.getBudget()
      .then(res => {
        console.log('budget response', res);
        if (res.data.length > 0) {
          this.setState({
            renderIncomeForm: false,
            renderBillForm: false,
            renderPurchaseLogForm: true
          });
          let computeedBudget = res.data[0].income - res.data[0].bills;
          this.setState({ budgetTotal: computeedBudget });
        }
      })
      .then(() => {
        let moneyLeft = this.state.budgetTotal - this.state.totalPurchases;
        this.setState({ moneyLeft: moneyLeft });
        console.log(this.state);
      });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ income: event.target.value });
  }

  //submit button for purchases on purchaselog component
  submitPurchase(event, purchaseObj) {
    //event.preventDefault();
    //note need to chain a get request onto this after submitting purchase to recieve updated total purchases
    this.postPurchase(purchaseObj)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  //submit button handler for posting budget
  submitBudget(event, state) {
    event.preventDefault();
    let budgetObj = {};
    budgetObj.income = this.state.income;
    budgetObj.bills = state.total;
    this.postBudget(budgetObj)
      .then(res => console.log(res))
      .then(this.calculateBudget)
      .catch(err => console.log(err));
  }

  /// A few functions that toggle components based on button clicks //
  toggleIncomeForm(event) {
    event.preventDefault();
    this.setState({ renderIncomeForm: false });
    this.setState({ renderBillForm: true });
  }

  toggleBillForm(event) {
    event.preventDefault();
    this.setState({ renderBillForm: false });
    this.setState({ renderPurchaseLogForm: true });
  }

  ///////////////////////////////////////////////////////////////////////////

  //post budget to server
  postBudget(budget) {
    return axios.post('/budget', budget);
  }
  //posts purchase log to server
  postPurchase(purchase) {
    return axios.post('/log', purchase);
  }

  render() {
    return (
      <div className="App">
        {this.state.renderIncomeForm ? (
          <form className="form">
            <label className="label">
              <div className="title">Total Income: </div>
              <br></br>
              <input
                className="input"
                type="number"
                value={this.state.value}
                onChange={event => this.handleChange(event)}
              />
            </label>
            <button className="button" onClick={this.toggleIncomeForm}>
              Submit Income
            </button>
          </form>
        ) : null}
        {this.state.renderBillForm ? (
          <Budget
            render={this.toggleBillForm}
            handler={this.submitBudget}
            income={this.state.income}
          />
        ) : null}
        {this.state.renderPurchaseLogForm ? (
          <div>
            <PurchaseLog
              render={this.togglePurchaseLogForm}
              handler={this.submitPurchase}
            />
            <div id="remainder">
              <div>Monthly budget after bills: ${this.state.budgetTotal}</div>
              <div>Remaining funds: ${this.state.moneyLeft}</div>
            </div>
          </div>
        ) : null}

        <PurchaseDataTable expenses={this.state.expensesArray} />
      </div>
    );
  }
}

export default App;
