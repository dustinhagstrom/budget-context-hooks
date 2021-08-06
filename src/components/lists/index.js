import React, { useContext } from "react";
import ExpenseList from "./ExpenseList";
import IncomeList from "./IncomeList";

function Lists() {
  return (
    <div>
      <IncomeList />
      <ExpenseList />
    </div>
  );
}

export default Lists;
