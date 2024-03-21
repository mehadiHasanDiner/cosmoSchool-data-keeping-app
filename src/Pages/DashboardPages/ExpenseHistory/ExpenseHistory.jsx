import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useStore from "../../../hooks/useStore";

const ExpenseHistory = () => {
  const [allExpense, setAllExpense] = useState([]);
  const { mirpurBranch } = useAuth();
  const [, storeItems] = useStore();

  console.log(storeItems);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_KEY}/employeeExpense/${mirpurBranch}`)
      .then((res) => res.json())
      .then((data) => {
        setAllExpense(data);
        console.log(data);
      });
  }, [mirpurBranch]);
  return (
    <div>
      <p>Expense History</p>
    </div>
  );
};

export default ExpenseHistory;
