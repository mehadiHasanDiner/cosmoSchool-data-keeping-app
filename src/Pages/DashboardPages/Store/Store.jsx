import moment from "moment";
import useStore from "../../../hooks/useStore";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const Store = () => {
  const [, storeItems] = useStore();
  const { mirpurBranch } = useAuth();
  const [searchByText, setSearchByText] = useState("");
  const [storeAllItems, setStoreAllItems] = useState(storeItems);
  // console.log(storeAllItems);

  useEffect(() => {
    setStoreAllItems(storeItems);
  }, [storeItems, searchByText]);

  const handleSearchByText = () => {
    const url = `${
      import.meta.env.VITE_URL_KEY
    }/storeItemByName/${mirpurBranch}/${searchByText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStoreAllItems(data);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Store Balance | Cosmo School </title>
      </Helmet>
      <p className="text-center font-bold text-xl my-3 capitalize">
        store summary
      </p>

      <div className="mt-3 text-right  mr-3 my-3">
        <input
          className="input input-bordered input-base  w-full max-w-xs"
          type="text"
          placeholder="search by item name or category"
          onChange={(e) => setSearchByText(e.target.value)}
        />
        <button onClick={handleSearchByText} className="btn btn-neutral ml-1">
          <IoSearchSharp size={18} />
        </button>
      </div>

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
            {storeAllItems.map((item, index) => (
              <tr className="text-center" key={index}>
                <th
                  className={
                    item?.itemQuantity === 0
                      ? "border border-slate-400 bg-red-600 text-white"
                      : "border border-slate-400"
                  }
                >
                  {index + 1}
                </th>

                <td
                  className={
                    item?.itemQuantity === 0
                      ? "border border-slate-400 bg-red-600 text-white"
                      : "border border-slate-400"
                  }
                >
                  {item?.itemName}
                </td>
                <td
                  className={
                    item?.itemQuantity === 0
                      ? "border border-slate-400 bg-red-600 text-white"
                      : "border border-slate-400"
                  }
                >
                  {item?.itemCategory}
                </td>
                {/* <td>Tk.{item?.itemPrice}</td> */}
                <td
                  className={
                    item?.itemQuantity === 0
                      ? "border border-slate-400 bg-red-600 text-white"
                      : "border border-slate-400"
                  }
                >
                  {item?.itemQuantity}
                </td>
                <td
                  className={
                    item?.itemQuantity === 0
                      ? "border border-slate-400 bg-red-600 text-white"
                      : "border border-slate-400"
                  }
                >
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
