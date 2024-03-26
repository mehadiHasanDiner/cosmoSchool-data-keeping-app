import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import PurchaseListRow from "./PurchaseListRow";
import { IoSearchSharp } from "react-icons/io5";

const PurchaseList = () => {
  const { mirpurBranch } = useAuth();
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [searchByText, setSearchByText] = useState("");
  const [searchByDate, setSearchByDate] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_KEY}/purchase/${mirpurBranch}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchaseItems(data);
        // console.log(data);
      });
  }, [mirpurBranch]);

  const handleSearchByText = () => {
    // console.log(searchByText);
    fetch(
      `${
        import.meta.env.VITE_URL_KEY
      }/purchasedItem/${mirpurBranch}/${searchByText}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPurchaseItems(data);
      });
  };
  const handleSearchByDate = () => {
    const url = `${
      import.meta.env.VITE_URL_KEY
    }/purchasedDate/${mirpurBranch}/${searchByDate}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPurchaseItems(data);
      });
  };

  const calculateTotalPrice = (item) => {
    return item.map((itemsArray) => {
      const totalPrice = itemsArray.itemPrice * itemsArray.itemQuantity;
      return { ...itemsArray, totalPrice };
    });
  };

  const itemsWithTotalPrice = calculateTotalPrice(purchaseItems);
  // console.log(itemsWithTotalPrice);

  return (
    <div>
      <p className="text-center font-bold text-xl my-3 underline">
        All Purchased Information
      </p>

      <div className=" flex justify-end items-center">
        <div className="mt-3 text-center flex mr-3">
          <input
            className="input input-bordered input-base  w-full max-w-xs"
            type="text"
            placeholder="search by item name"
            onChange={(e) => setSearchByText(e.target.value)}
          />
          <button onClick={handleSearchByText} className="btn btn-neutral ml-1">
            <IoSearchSharp size={18} />
          </button>
        </div>

        <div className="mt-3 text-center flex">
          <input
            className="input input-bordered input-base  w-full max-w-xs"
            type="date"
            placeholder="search by item name"
            onChange={(e) => setSearchByDate(e.target.value)}
          />
          <button onClick={handleSearchByDate} className="btn btn-neutral ml-1">
            <IoSearchSharp size={18} />
          </button>
        </div>
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
              <th>Total Price</th>
              <th>Voucher No.</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {itemsWithTotalPrice.map((item, index) => (
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
