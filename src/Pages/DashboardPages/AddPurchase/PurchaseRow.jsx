const PurchaseRow = ({ item, index }) => {
  const { itemName, itemCategory } = item || {};
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{itemName}</td>
      <td>{itemCategory}</td>
      <td>Blue</td>
    </tr>
  );
};

export default PurchaseRow;
