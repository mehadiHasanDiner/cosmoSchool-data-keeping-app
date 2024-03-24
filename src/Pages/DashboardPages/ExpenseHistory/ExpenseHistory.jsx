import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useStore from "../../../hooks/useStore";

const ExpenseHistory = () => {
  const [allExpense, setAllExpense] = useState([]);
  const [storeDetails, setStoreDetails] = useState([]);
  const { mirpurBranch } = useAuth();
  const [, storeItems] = useStore();


  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_KEY}/employeeExpense/${mirpurBranch}`)
      .then((res) => res.json())
      .then((data) => {
        setAllExpense(data);
      });
  }, [mirpurBranch]);

  useEffect(() => {
    if (storeItems.length > 0 && allExpense.length > 0) {
      const filteredStoreDetails = [];
      allExpense.forEach((expense) => {
        Object.keys(expense).forEach((key) => {
          const storeDetail = storeItems.find((item) => item._id === key);
          if (storeDetail) {
            filteredStoreDetails.push(storeDetail);
          }
        });
      });
      setStoreDetails(filteredStoreDetails);
    }
  }, [storeItems, allExpense]);

  console.log(storeDetails);

  return (
    <div>
      <p>Expense History</p>
    </div>
  );
};

export default ExpenseHistory;
