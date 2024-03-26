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

      <div className="overflow-x-auto mr-3">
        <table className="table table-zebra border-collapse">
          {/* head */}
          <thead className="text-black bg-gray-300">
            <tr className="text-center">
              <th className="border border-slate-400">SL</th>
              <th className="border border-slate-400">Item Name</th>
              <th className="border border-slate-400">Category</th>
              {/* <th>Price</th> */}
              <th className="border border-slate-400">Present Quantity</th>
              <th className="border border-slate-400">Last Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {storeItems.map((item, index) => (
              <tr className="text-center" key={index}>
                <th className="border border-slate-400">{index + 1}</th>
                <td className="border border-slate-400">{item?.itemName}</td>
                <td className="border border-slate-400">
                  {item?.itemCategory}
                </td>
                {/* <td>Tk.{item?.itemPrice}</td> */}
                <td className="border border-slate-400">
                  {item?.itemQuantity}
                </td>
                <td className="border border-slate-400">
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
