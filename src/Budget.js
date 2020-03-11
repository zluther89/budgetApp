import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storage: [],
      name: '',
      amount: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBudgetSubmit = this.handleBudgetSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  // need to move to app
  handleBudgetSubmit(e) {
    e.preventDefault();
    let budgetEntry = {
      name: this.state.name,
      amount: this.state.amount
    };
    let tempStorage = this.state.storage.slice();
    tempStorage.push(budgetEntry);
    this.setState({ storage: tempStorage });
  }

  render() {
    return (
      <div>
        <table align="center">
          <tr>
            <th>Budget Item</th>
            <th>Amount</th>
          </tr>
          {this.state.storage.map(budgetItem => {
            return (
              <tr>
                <td> {budgetItem.name} </td>
                <td> {budgetItem.amount}</td>
              </tr>
            );
          })}
        </table>
        <form onSubmit={this.handleBudgetSubmit}>
          <label>
            Item
            <input
              type="text"
              id="name"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <br></br>
          <label>
            Amount
            <input
              type="number"
              id="amount"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Budget;
