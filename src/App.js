import React, { useState, useEffect } from "react";
import { Header, Lists, Inputs } from "./components";

import { v4 as uuidv4 } from "uuid";

import { InputContext, HeaderContext, ListsContext } from "./context/context";
import "./App.css";

function App() {
  const [income, setIncome] = useState(getHeaderInitialValue("income"));
  const [expense, setExpense] = useState(getHeaderInitialValue("expense"));

  const [option, setOption] = useState("+");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const [incomeArray, setIncomeArray] = useState(
    getListInitialValue("incomeArray")
  );
  const [expenseList, setExpenseList] = useState(
    getListInitialValue("expenseList")
  );

  function getListInitialValue(value) {
    return localStorage.getItem(value)
      ? JSON.parse(localStorage.getItem(value))
      : [];
  }

  function getHeaderInitialValue(value) {
    return localStorage.getItem(value)
      ? Number(localStorage.getItem(value))
      : 0;
  }

  function setLocalStorage() {
    localStorage.setItem("income", income);
    localStorage.setItem("expense", expense);
    localStorage.setItem("incomeArray", JSON.stringify(incomeArray));
    localStorage.setItem("expenseList", JSON.stringify(expenseList));
  }

  useEffect(() => {
    setLocalStorage();
  }, [income, expense, incomeArray, expenseList]);

  function handleOption(value) {
    setOption(value);
  }

  function handleDescription(value) {
    setDescription(value);
  }

  function handleAmount(value) {
    setAmount(value);
  }

  function handleDeleteIncome(index) {
    //if I click the delete button then it will remove the item
    //from respective list. either expenseList or incomeArray
    //if it is in the expense category then it will look at the
    //amount and add that to the Expense in the header and to the /////total in the header. if it is in the income category then it
    //will look at the amount and subtract that from the the Income
    //in the header and it will subtract that from the total in the
    //header.
    let incomeToBeDeleted = incomeArray[index];
    setIncome(income - incomeToBeDeleted.amount);
    let newIncomeArray = [...incomeArray];
    newIncomeArray.splice(index, 1);
    setIncomeArray(newIncomeArray);
    console.log(incomeArray);
  }
  function handleDeleteExpense(index) {
    let expenseToBeDeleted = expenseList[index];
    setExpense(expense - expenseToBeDeleted.amount);
    //insert here to handle maths

    let newExpenseList = [...expenseList];
    newExpenseList.splice(index, 1);
    setExpenseList(newExpenseList);
  }

  const inputContextValue = {
    option,
    description,
    amount,
    handleOption,
    handleDescription,
    handleAmount,
    handleSubmit,
  };

  const listContextValue = {
    incomeArray,
    expenseList,
    handleDeleteIncome,
    handleDeleteExpense,
  };

  const headerContextValue = {
    income,
    expense,
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (amount === 0) return;

    if (option === "+") {
      setIncome(income + parseFloat(amount));
      console.log(incomeArray);
      setIncomeArray([...incomeArray, { description, amount, id: uuidv4() }]);
    } else {
      setExpense(expense - parseFloat(amount));
      console.log(expenseList);
      setExpenseList([...expenseList, { description, amount, id: uuidv4() }]);
    }

    reset();
  }

  function reset() {
    setAmount(0);
    setDescription("");
  }

  function showHeader() {
    return (
      <HeaderContext.Provider value={headerContextValue}>
        <Header />
      </HeaderContext.Provider>
    );
  }
  function showInputs() {
    return (
      <InputContext.Provider value={inputContextValue}>
        <Inputs />
      </InputContext.Provider>
    );
  }
  function showLists() {
    return (
      <ListsContext.Provider value={listContextValue}>
        <Lists />
      </ListsContext.Provider>
    );
  }

  return (
    <div className="App">
      {showHeader()}
      {showInputs()}
      {showLists()}
    </div>
  );
}

export default App;
