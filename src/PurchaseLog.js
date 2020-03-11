import React from "react";
import axios from "axios";

class PurchaseLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: 0,
      date: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

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
          <label>Date</label>
          <input
            onChange={event => this.handleChange(event, "date")}
          ></input>{" "}
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
