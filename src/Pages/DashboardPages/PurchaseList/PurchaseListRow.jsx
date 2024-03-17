import moment from "moment";

const PurchaseListRow = ({ item, index }) => {
  const {
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
    </tr>
  );
};

export default PurchaseListRow;
