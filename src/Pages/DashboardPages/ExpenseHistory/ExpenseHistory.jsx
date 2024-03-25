import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const ExpenseHistory = () => {
  const [allExpense, setAllExpense] = useState([]);
  const { mirpurBranch } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_KEY}/employeeExpense/${mirpurBranch}`)
      .then((res) => res.json())
      .then((data) => {
        setAllExpense(data);
      });
  }, [mirpurBranch]);

  console.log(allExpense);

  // let updateExpenseData = [...allExpense];

  // if (updateExpenseData.length > 0) {
  //   const allKeys = updateExpenseData.reduce((keys, item) => {
  //     Object.keys(item).forEach((key) => {
  //       if (
  //         key !== "_id" &&
  //         key !== "branchName" &&
  //         key !== "designation" &&
  //         key !== "employeeName" &&
  //         key !== "givenDate" &&
  //         key !== "createdAt"
  //       ) {
  //         keys.add(key);
  //       }
  //     });
  //     return keys;
  //   }, new Set());
  //   console.log(allKeys);
  // }

  const expense = [
    {
      _id: "6601148d8271438392ebc4c5",
      employeeName: "Md. Shorif Hossain",
      givenDate: "2024-03-25",
      designation: "Admin",
      branchName: "Mirpur",
      "65f5495a22d4bc1c778d63cd": {
        itemName: "Harpic",
        quantity: "8",
      },
      "65f5492222d4bc1c778d09d4": {
        itemName: "Marker",
        quantity: "5",
      },
      "65f6696ece6fb222bdc9e0cf": {
        itemName: "Pen",
        quantity: "5",
      },
      "65f5485222d4bc1c778b9e63": {
        itemName: "Tenis Ball",
        quantity: "5",
      },
    },
  ];

  return (
    <div>
      <p>Expense History</p>
    </div>
  );
};

export default ExpenseHistory;
