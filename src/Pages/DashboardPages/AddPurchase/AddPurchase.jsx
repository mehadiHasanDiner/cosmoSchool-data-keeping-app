import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import PurchaseRow from "./PurchaseRow";
import Swal from "sweetalert2";

const AddPurchase = () => {
  const { mirpurBranch } = useAuth();

  const { refetch, data: items = [] } = useQuery({
    queryKey: ["addItem", mirpurBranch],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_URL_KEY}/addItem/${mirpurBranch}`
      );
      return res.json();
    },
  });

  const handlePurchaseRowDelete = (id) => {
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
        fetch(`${import.meta.env.VITE_URL_KEY}/addItem/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your product item has been deleted.",
                icon: "success",
              });
            }
            refetch();
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto mx-3">
      <h2 className="text-center font-bold text-lg my-3 underline">
        Add Purchase Information
      </h2>
      <table className="table table-zebra border-collapse">
        {/* head */}
        <thead>
          <tr>
            <th className="border border-slate-400 text-center">SL</th>
            <th className="border border-slate-400">Item Name</th>
            <th className="border border-slate-400">Item Category</th>
            <th className="border border-slate-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <PurchaseRow
              key={item?._id}
              item={item}
              index={index}
              handlePurchaseRowDelete={handlePurchaseRowDelete}
            ></PurchaseRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddPurchase;
