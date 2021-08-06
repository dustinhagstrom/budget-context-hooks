import React, { useContext } from "react";
import { ListsContext } from "../../context/context";

function ExpenseList() {
  const { expenseList, handleDeleteExpense } = useContext(ListsContext);
  return (
    <div>
      <h2>expenseList</h2>
      <ul>
        {expenseList?.map((expense, index) => {
          return (
            <li key={index}>
              <button onClick={(e) => handleDeleteExpense(index)}>
                Delete
              </button>
              <span>{expense.description}</span>
              <span>{expense.amount}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ExpenseList;
