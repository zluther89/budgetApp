import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Budget from "./Budget.js";
import PurchaseLog from "./PurchaseLog.js";
import Axios from "axios";
import PurchaseDataTable from "./PurchaseDataTable";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 0,
      budget: 0,
      totalPurchases: 0,
      moneyLeft: 0,
      expensesArray: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.postPurchase = this.postPurchase.bind(this);
    this.submitPurchase = this.submitPurchase.bind(this);
    this.submitBudget = this.submitBudget.bind(this);
    this.getPurchasesTotal = this.getPurchasesTotal.bind(this);
    this.getPurchasesArr = this.getPurchasesArr.bind(this);
  }
  componentDidMount() {
    this.getPurchasesTotal().then(res => {
      if (res.data.amount) {
        this.setState({ totalPurchases: res.data[0].amount });
        console.log(this.state);
      }
    });
    this.getPurchasesArr().then(res =>
      this.setState({ expensesArray: res.data })
    );
  }
  getPurchasesArr() {
    return Axios.get("/log");
  }
  //get request for total purchases
  getPurchasesTotal() {
    return Axios.get("/log/expenses");
  }

  // Axios.get('/budget').then(data => console.log('test'));
  handleChange(event) {
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
      .catch(err => console.log(err));
  }

  //post budget to server
  postBudget(budget) {
    return axios.post("/budget", budget);
  }
  //posts purchase log to server
  postPurchase(purchase) {
    return axios.post("/log", purchase);
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Income
            <input
              type="number"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Budget handler={this.submitBudget} income={this.state.income} />
        <PurchaseLog handler={this.submitPurchase} />
        <PurchaseDataTable expenses={this.state.expensesArray} />
      </div>
    );
  }
}

export default App;
