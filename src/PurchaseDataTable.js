import React from 'react';

function PurchaseDataTable(props) {
  return (
    <div className="column is-half">
      <table className="table">
        <tr>
          <th COLSPAN="4" className="tableHeader">
            Expense Log
          </th>
        </tr>
        <tbody>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
          </tr>

          {props.expenses.map(purchase => {
            return (
              <tr>
                <td>{purchase.category}</td>
                <td>{purchase.name}</td>
                <td>${purchase.price}</td>
                <td>{purchase.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseDataTable;
