import React, { useContext } from "react";
import { HeaderContext } from "../../context/context";

function Header() {
  //   const headerContextValue = useContext(HeaderContext);
  //   console.log(headerContextValue);

  const { income, expense } = useContext(HeaderContext);

  return (
    <div>
      <h1>Current Budget</h1>
      <p>Total: {income + expense}</p>
      <br />
      <p>Income: {income}</p>
      <p>Expense: {expense}</p>
    </div>
  );
}

export default Header;
