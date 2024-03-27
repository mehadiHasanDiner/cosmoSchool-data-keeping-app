import moment from "moment";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const PurchaseListRow = ({ item, index, handleDeleteItem, handleEditItem }) => {
  const {
    _id,
    purchaseDate,
    itemName,
    itemCategory,
    itemPrice,
    itemQuantity,
    voucherNo,
    remarks,
    totalPrice,
  } = item || {};

  const formattedDate = moment(purchaseDate, "YYYY-MM-DD").format("DD-MM-YYYY");

  return (
    <tr>
      <th>{index + 1}</th>
      <td>{formattedDate}</td>
      <td>{itemName}</td>
      <td>{itemCategory}</td>
      <td>Tk.{itemPrice}</td>
      <td>{itemQuantity}</td>
      <td>{totalPrice}</td>
      <td>{voucherNo}</td>
      <td>{remarks}</td>
      <td className="flex">
        <label
          onClick={() => handleEditItem(item)}
          htmlFor="my_modal_7"
          className="btn btn-success btn-sm mr-2"
        >
          <FaRegEdit color="white" size={20} />
        </label>
        <button
          onClick={() => handleDeleteItem(_id)}
          className="btn btn-error btn-sm"
        >
          <MdOutlineDelete color="white" size={20} />
        </button>
      </td>
    </tr>
  );
};

export default PurchaseListRow;
