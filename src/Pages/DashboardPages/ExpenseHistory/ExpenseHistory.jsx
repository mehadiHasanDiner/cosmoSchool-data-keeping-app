import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";

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
  // console.log(allExpense);

  const processedExpenseData = allExpense.map((entry) => {
    const { _id, employeeName, givenDate, designation, branchName } = entry;
    const items = [];

    // Iterate over the properties of each object
    for (const key in entry) {
      // Check if the property is not a reserved property
      if (
        key !== "_id" &&
        key !== "employeeName" &&
        key !== "givenDate" &&
        key !== "designation" &&
        key !== "branchName" &&
        key !== "createdAt"
      ) {
        // Destructure itemName and quantity
        const { itemName, quantity } = entry[key]; // Assign values to itemName and quantity
        // Push the ID, itemName, and quantity to the items array
        items.push({ id: key, itemName, quantity });
      }
    }

    // Return whatever you want to be the new value of this element
    return {
      _id,
      employeeName,
      givenDate,
      designation,
      branchName,
      items,
    };
  });

  return (
    <div className="mt-4 mr-3">
      <h2 className="text-center font-bold text-xl mb-3">Employee Expense History</h2>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border border-slate-400">SL</th>
            <th className="border border-slate-400">Employee Name</th>
            <th className="border border-slate-400">Designation</th>
            <th className="border border-slate-400">Given Date</th>
            <th className="border border-slate-400">Item Details</th>
          </tr>
        </thead>
        <tbody>
          {processedExpenseData.map((expense, index) => (
            <tr key={expense?._id} className="text-center w-full`">
              <td className="border border-slate-400 p-2">{index + 1}</td>
              <td className="border border-slate-400">
                {expense?.employeeName}
              </td>
              <td className="border border-slate-400">
                {expense?.designation}
              </td>
              <td className="border border-slate-400">
                {moment(expense?.givenDate, "YYYY-MM-DD").format("DD-MM-YYYY")}
              </td>

              <td className="border border-slate-400">
                {expense.items.map((item, index) => (
                  <tr className=" text-left my-2" key={index}>
                    <td className=" w-4/12">
                      <ul className="list-disc pl-10">
                        <li>{item?.itemName} =</li>
                      </ul>
                    </td>
                    <td className=" w-1/6">{item?.quantity}</td>
                  </tr>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseHistory;
