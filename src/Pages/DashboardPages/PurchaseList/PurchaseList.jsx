import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import PurchaseListRow from "./PurchaseListRow";

const PurchaseList = () => {
  const { mirpurBranch } = useAuth();
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [setSearchText, setSearchTextText] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_KEY}/purchase/${mirpurBranch}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchaseItems(data);
        console.log(data);
      });
  }, [mirpurBranch]);

  const handleSearch = () => {};

  return (
    <div>
      <p className="text-center font-bold text-xl my-3">
        Number of item purchased: {purchaseItems.length}
      </p>

      <div className="mt-3 text-center">
        <input
          className="input input-bordered input-base  w-full max-w-xs"
          type="text"
          placeholder="search by item name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-neutral ml-1">
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Purchase Date</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Voucher No.</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {purchaseItems.map((item, index) => (
              <PurchaseListRow
                key={item?._id}
                item={item}
                index={index}
              ></PurchaseListRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseList;
