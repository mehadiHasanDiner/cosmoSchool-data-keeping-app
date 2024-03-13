import { Link } from "react-router-dom";

const PurchaseRow = ({ item, index }) => {
  const { _id, itemName, itemCategory } = item || {};
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{itemName}</td>
      <td>{itemCategory}</td>
      <td className="space-x-2">
        <button className="btn btn-sm btn-outline btn-primary">Edit</button>
        <Link to={`${_id}`}>
          <button className="btn btn-sm btn-outline btn-neutral">
            Add Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default PurchaseRow;
