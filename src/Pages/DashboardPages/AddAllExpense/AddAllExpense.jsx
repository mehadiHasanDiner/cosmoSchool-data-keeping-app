import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import AllExpenseRow from "./AllExpenseRow";
import Swal from "sweetalert2";

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

  const handleEmployeeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_URL_KEY}/addEmployee/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "The selected Employee has been deleted successfully.",
                icon: "success",
              });
            }
            refetch();
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="my-3 text-center font-bold text-lg underline capitalize">
        Item delivery information to the employee
      </h2>
      <table className="table table-zebra border-collapse">
        {/* head */}
        <thead>
          <tr className="text-center">
            <th className="border border-slate-400">SL</th>
            <th className="border border-slate-400">Employee Name</th>
            <th className="border border-slate-400">Designation</th>
            <th className="border border-slate-400">Branch</th>
            <th className="border border-slate-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <AllExpenseRow
              key={expense?._id}
              index={index}
              expense={expense}
              handleEmployeeDelete={handleEmployeeDelete}
            ></AllExpenseRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddAllExpense;
