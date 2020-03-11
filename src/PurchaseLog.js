import React from "react";
import axios from "axios";

class PurchaseLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      date: Date.now(),
      category: "restaurants/bars"
    };
    this.handleChange = this.handleChange.bind(this);
  }
  //handles change to input form
  handleChange(e, stateProp) {
    let value = e.target.value;
    if (stateProp === "price") {
      value = Number(value);
    }
    let stateObj = {};
    stateObj[stateProp] = value;
    this.setState(stateObj);
    console.log(this.state);
  }
  //handles change to drop down select element
  handleSelect(event) {
    this.setState({ category: event.target.value });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div>Purchase log</div>
        <form>
          <label>Purchase name</label>
          <input onChange={event => this.handleChange(event, "name")}></input>
          <br />
          <label>Cost of purchase</label>
          <input
            type="number"
            onChange={event => this.handleChange(event, "price")}
          ></input>
          <br />
          <label for="category">Purchase category</label>
          <select
            onChange={e => this.handleSelect(e)}
            id="category"
            name="category"
          >
            <option value="restaurants/bars">restaurants/bars</option>
            <option value="groceries">groceries</option>
            <option value="transportation">transportation</option>
            <option value="recreation">recreation</option>
            <option value="other">other</option>
          </select>
          <br />
          <button onClick={event => this.props.handler(event, this.state)}>
            Submit Purchase
          </button>
        </form>
      </div>
    );
  }
}

export default PurchaseLog;
