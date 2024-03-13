import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import PurchaseRow from "./PurchaseRow";

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

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>SL</th>
            <th>Item Name</th>
            <th>Item Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <PurchaseRow
              key={item?._id}
              item={item}
              index={index}
            ></PurchaseRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddPurchase;
