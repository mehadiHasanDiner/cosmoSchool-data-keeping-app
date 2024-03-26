import { Link } from "react-router-dom";
import {
  BsFillFastForwardBtnFill,
  BsFillSkipBackwardBtnFill,
} from "react-icons/bs";
import { MdDelete } from "react-icons/md";

const AllExpenseRow = ({ expense, index, handleEmployeeDelete }) => {
  //   console.log(expense);
  const { _id, employeeName, designation, branchName } = expense || {};
  return (
    <tr className="text-center">
      <th className="border border-slate-400 p-2">{index + 1}</th>
      <td className="border border-slate-400">{employeeName}</td>
      <td className="border border-slate-400">{designation}</td>
      <td className="border border-slate-400">{branchName}</td>
      <td className="border border-slate-400 space-x-2">
        <button
          onClick={() => handleEmployeeDelete(_id)}
          className="btn btn-sm btn-outline btn-error"
        >
          <MdDelete size={18} />
          Delete
        </button>
        <Link to={`${_id}`}>
          <button className="btn btn-sm btn-outline btn-neutral">
            <BsFillFastForwardBtnFill size={18} />
            Give Item
          </button>
        </Link>
        <Link to={`backItem/${_id}`}>
          <button className="btn btn-sm btn-outline btn-neutral">
            <BsFillSkipBackwardBtnFill size={18} />
            Item Back
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default AllExpenseRow;
