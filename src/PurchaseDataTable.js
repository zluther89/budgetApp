import React from 'react';

function PurchaseDataTable(props) {
  return (
    <div>
      <table className="expenses">
        <tr>
          <th COLSPAN="4" className="tableHeader">
            Expense Log
          </th>
        </tr>
        <tbody>
          <tr>
            <th>category</th>
            <th>name</th>
            <th>price</th>
            <th>date</th>
          </tr>

          {props.expenses.map(purchase => {
            return (
              <tr>
                <td>{purchase.category}</td>
                <td>{purchase.name}</td>
                <td>{purchase.price}</td>
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
