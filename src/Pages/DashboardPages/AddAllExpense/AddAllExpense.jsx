import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import AllExpenseRow from "./AllExpenseRow";

const AddAllExpense = () => {
  const { mirpurBranch } = useAuth();

  const { refetch, data: expenses = [] } = useQuery({
    queryKey: ["addEmployee", mirpurBranch],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/addEmployee/${mirpurBranch}`
      );
      return res.json();
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th>SL</th>
            <th>Employee Name</th>
            <th>Designation</th>
            <th>Branch</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <AllExpenseRow
              key={expense?._id}
              index={index}
              expense={expense}
            ></AllExpenseRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddAllExpense;
