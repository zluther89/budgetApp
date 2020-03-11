import React from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Budget from './Budget.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      income: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }
  // Axios.get('/budget').then(data => console.log('test'));
  handleChange(event) {
    this.setState({ income: event.target.value });
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
      </div>
    );
  }
}

export default App;
