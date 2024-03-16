import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";

const Store = () => {
  const { mirpurBranch } = useAuth();
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_KEY}/store/${mirpurBranch}`)
      .then((res) => res.json())
      .then((data) => {
        setStoreItems(data);
        console.log(data);
      });
  }, [mirpurBranch]);

  //   const formattedDate = moment(purchaseDate, "YYYY-MM-DD").format("DD-MM-YYYY");

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
              <th>Price</th>
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
                <td>Tk.{item?.itemPrice}</td>
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
