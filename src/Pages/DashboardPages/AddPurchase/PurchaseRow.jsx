import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdAddChart } from "react-icons/md";

const PurchaseRow = ({ item, handlePurchaseRowDelete, index }) => {
  const { _id, itemName, itemCategory } = item || {};
  return (
    <tr>
      <th className="border border-slate-400 p-2 text-center">{index + 1}</th>
      <td className="border border-slate-400 ">{itemName}</td>
      <td className="border border-slate-400">{itemCategory}</td>
      <td className="space-x-2 border border-slate-400">
        <button
          onClick={() => handlePurchaseRowDelete(_id)}
          className="btn btn-sm btn-outline btn-error"
        >
          <MdDelete size={18} /> Delete
        </button>
        <Link to={`${_id}`}>
          <button className="btn btn-sm btn-outline  bg-slate-100">
            <MdAddChart size={18} /> Add Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default PurchaseRow;
