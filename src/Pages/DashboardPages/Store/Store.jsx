import moment from "moment";
import useStore from "../../../hooks/useStore";

const Store = () => {
  const [, storeItems] = useStore();
  console.log(storeItems);

  return (
    <div>
      <p className="text-center font-bold text-xl my-3 capitalize">
        store summary
      </p>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>SL</th>
              <th>Item Name</th>
              <th>Category</th>
              {/* <th>Price</th> */}
              <th>Present Quantity</th>
              <th>Last Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {storeItems.map((item, index) => (
              <tr className="text-center" key={index}>
                <th>{index + 1}</th>
                <td>{item?.itemName}</td>
                <td>{item?.itemCategory}</td>
                {/* <td>Tk.{item?.itemPrice}</td> */}
                <td>{item?.itemQuantity}</td>
                <td>
                  {moment(item?.purchaseDate, "YYYY-MM-DD").format(
                    "DD-MM-YYYY"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Store;
