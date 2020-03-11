import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Budget from "./Budget.js";
import PurchaseLog from "./PurchaseLog.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.postPurchase = this.postPurchase.bind(this);
    this.submitPurchase = this.submitPurchase.bind(this);
  }

  // Axios.get('/budget').then(data => console.log('test'));
  handleChange(event) {
    this.setState({ income: event.target.value });
  }

  //submit button for purchases on purchaselog component
  submitPurchase(purchaseObj) {
    //note need to chain a get request onto this after submitting purchase to recieve updated total purchases
    this.postPurchase(purchaseObj);
  }

  //posts purchase log to server
  postPurchase(purchase) {
    return axios
      .post("/log", purchase)
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
        <Budget />
        <PurchaseLog handler={this.submitPurchase} />
      </div>
    );
  }
}

export default App;
