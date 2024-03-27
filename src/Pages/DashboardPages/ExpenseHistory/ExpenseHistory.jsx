import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import { IoSearchSharp } from "react-icons/io5";

const ExpenseHistory = () => {
  const [allExpense, setAllExpense] = useState([]);
  const [searchByText, setSearchByText] = useState("");
  const { mirpurBranch } = useAuth();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_KEY}/employeeExpense/${mirpurBranch}`)
      .then((res) => res.json())
      .then((data) => {
        setAllExpense(data);
      });
  }, [mirpurBranch]);
  // console.log(allExpense);

  const handleSearchByText = () => {
    const url = `${
      import.meta.env.VITE_URL_KEY
    }/employeeExpenseByName/${mirpurBranch}/${searchByText}`;
    // console.log(searchByText);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAllExpense(data);
      });
  };

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
      <h2 className="text-center font-bold text-xl mb-3">
        Employee Expense History
      </h2>
      <div className="mt-3 text-right  mr-3 my-3">
        <input
          className="input input-bordered input-base  w-full max-w-xs"
          type="text"
          placeholder="search by employee name"
          onChange={(e) => setSearchByText(e.target.value)}
        />
        <button onClick={handleSearchByText} className="btn btn-neutral ml-1">
          <IoSearchSharp size={18} />
        </button>
      </div>

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
                  <ul className=" list-disc text-left pl-10 flex" key={index}>
                    <li className="mr-1">{item?.itemName} = </li>

                    <span className="">{item?.quantity}</span>
                  </ul>
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
