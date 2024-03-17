import { useLoaderData } from "react-router-dom";

const AddAllExpenseDetails = () => {
  const employeeExpenseDetails = useLoaderData();
  console.log(employeeExpenseDetails);
  return (
    <div>
      <p>Add All Expense Details</p>
    </div>
  );
};

export default AddAllExpenseDetails;
