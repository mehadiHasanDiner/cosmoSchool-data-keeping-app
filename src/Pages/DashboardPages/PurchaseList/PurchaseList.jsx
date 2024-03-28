import { useEffect } from "react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import PurchaseListRow from "./PurchaseListRow";
import { IoSearchSharp } from "react-icons/io5";
import Swal from "sweetalert2";
import UpdatePurchaseItem from "./UpdatePurchaseItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";

const PurchaseList = () => {
  const { mirpurBranch } = useAuth();
  const [purchaseItems, setPurchaseItems] = useState([]);
  const [searchByText, setSearchByText] = useState("");
  const [searchByDate, setSearchByDate] = useState("");
  const [editInModal, setEditInModal] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_KEY}/purchase/${mirpurBranch}`)
      .then((res) => res.json())
      .then((data) => {
        setPurchaseItems(data);
        // console.log(data);
      });
  }, [mirpurBranch, load]);

  const handleDeleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_URL_KEY}/purchase/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "The selected product item deleted successfully.",
                icon: "success",
              });
            }
            setLoad(!load);
          });
      }
    });
  };
  const handleEditItem = (item) => {
    setEditInModal(item);
  };

  const handleSearchByText = () => {
    const url = `${
      import.meta.env.VITE_URL_KEY
    }/purchasedItem/${mirpurBranch}/${searchByText}`;
    // console.log(searchByText);
    fetch(url)
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

  const notify = () =>
    toast.success("Product Item updated successfully", {
      theme: "colored",
    });

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
      <Helmet>
        <title>All Purchased Data | Cosmo School </title>
      </Helmet>
      <p className="text-center font-bold text-xl my-3 underline">
        All Purchased Information
      </p>

      <div className=" flex justify-end items-center">
        <div className="mt-3 text-center flex mr-3">
          <input
            className="input input-bordered input-base  w-full max-w-xs"
            type="text"
            placeholder="search by name/category"
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {itemsWithTotalPrice.map((item, index) => (
              <PurchaseListRow
                key={item?._id}
                item={item}
                index={index}
                handleDeleteItem={handleDeleteItem}
                handleEditItem={handleEditItem}
              ></PurchaseListRow>
            ))}
          </tbody>
        </table>
      </div>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className={"modal"} role="dialog">
        <div className="modal-box">
          <UpdatePurchaseItem
            load={load}
            setLoad={setLoad}
            editInModal={editInModal}
            notify={notify}
          ></UpdatePurchaseItem>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PurchaseList;
