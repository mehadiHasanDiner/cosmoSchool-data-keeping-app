import { Link } from "react-router-dom";

const AllExpenseRow = ({ expense, index }) => {
  //   console.log(expense);
  const { _id, employeeName, designation, branchName } = expense || {};
  return (
    <tr className="text-center">
      <th>{index + 1}</th>
      <td>{employeeName}</td>
      <td>{designation}</td>
      <td>{branchName}</td>
      <td className="space-x-2">
        <button className="btn btn-sm btn-outline btn-primary">Edit</button>
        <Link to={`${_id}`}>
          <button className="btn btn-sm btn-outline btn-neutral">
            Give Item
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default AllExpenseRow;
