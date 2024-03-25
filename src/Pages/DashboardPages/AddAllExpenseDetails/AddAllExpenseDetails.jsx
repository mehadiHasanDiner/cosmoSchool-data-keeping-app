import "./AddAllExpenseDetails.css";
import { useForm } from "react-hook-form";
import { useLoaderData, useLocation } from "react-router-dom";
import useStore from "../../../hooks/useStore";
import { useState } from "react";
import Swal from "sweetalert2";

const AddAllExpenseDetails = () => {
  const employeeExpenseDetails = useLoaderData();
  const [refetch, storeItems] = useStore();
  const [selectedItems, setSelectedItems] = useState({});
  const [actionType, setActionType] = useState("");

  // const itemNames = storeItems.map((obj) => obj.itemName);
  // console.log(itemNames);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const handleItemClick = (itemId, itemName, quantity) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [itemId]: {
        itemName: itemName,
        quantity: (prevState[itemId]?.quantity || 0) + quantity,
      },
    }));
  };
  // console.log(selectedItems);
  // console.log(Object.entries(selectedItems));

  const onSubmit = async (data, actionType) => {
    // console.log(actionType);
    try {
      if (!actionType) {
        console.error("Action type is not set.");
        return;
      }

      let endpoint;
      if (actionType === "takeFromStore") {
        endpoint = `${import.meta.env.VITE_URL_KEY}/takeFromStore`;
      } else if (actionType === "giveToStore") {
        endpoint = `${import.meta.env.VITE_URL_KEY}/giveToStore`;
      }

      const promises = Object.entries(selectedItems).map(
        ([itemId, itemData]) => {
          return fetch(`${endpoint}/${itemId}`, {
            method: "PUT", // Change the method to POST
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: itemData.quantity }),
          });
        }
      );
      await Promise.all(promises);
      refetch();

      // Store employee expenses
      const employeeExpensesData = {
        employeeName: data.employeeName,
        givenDate: data.givenDate,
        designation: data.designation,
        branchName: data.branchName,
        ...selectedItems,
      };

      if (actionType === "giveToStore") {
        await fetch(`${import.meta.env.VITE_URL_KEY}/employeeReturned`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeExpensesData),
        });
      } else {
        await fetch(`${import.meta.env.VITE_URL_KEY}/employeeExpense`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeExpensesData),
        });
      }

      reset();
      // Reset selected items
      setSelectedItems({});

      Swal.fire({
        position: "center",
        icon: "success",
        iconColor: "crimson",
        title: "Data inserted successfully",
        showConfirmButton: false,
        timer: 1500,
        background: "purple",
        color: "white",
      });
    } catch (error) {
      console.error("Error delivering items:", error);
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto shadow-2xl bg-base-100 mb-12">
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, actionType))}
        className="card-body"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Employee Name</span>
            </label>
            <input
              type="text"
              {...register("employeeName")}
              defaultValue={employeeExpenseDetails?.employeeName}
              className="input input-bordered"
              readOnly={true}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text"> Designation</span>
            </label>
            <input
              type="text"
              {...register("designation")}
              defaultValue={employeeExpenseDetails?.designation}
              className="input input-bordered"
              readOnly={true}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Branch Name</span>
            </label>
            <input
              type="text"
              {...register("branchName")}
              defaultValue={employeeExpenseDetails?.branchName}
              className="input input-bordered"
              readOnly={true}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Item Delivery Date</span>
            </label>
            <input
              type="date"
              {...register("givenDate", { required: true })}
              className="input input-bordered"
            />
            {errors.purchaseDate && (
              <span className="text-red-600 mt-1">This field is required</span>
            )}
          </div>
        </div>
        <div className=" bg-gradient-to-t from-base-200 to-neutral-300 p-4 rounded-lg ">
          <ul className="space-y-2">
            {storeItems.map((item) => (
              <li className=" flex items-center" key={item._id}>
                <span className="font-bold w-1/4">
                  {item.itemName} - {item.itemQuantity}:{" "}
                </span>
                <input
                  className="ml-3 w-1/4 input input-bordered no-spinners"
                  type="text"
                  value={item.itemName}
                  readOnly
                />
                <input
                  className="ml-3 w-1/4 input input-bordered no-spinners"
                  type="number"
                  placeholder="Quantity"
                  onChange={(e) =>
                    handleItemClick(
                      item._id,
                      item.itemName,
                      parseInt(e.target.value)
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </div>

        <input type="hidden" {...register("actionType")} value={actionType} />

        <div className="form-control mt-6">
          <button
            type="submit"
            onClick={() =>
              setActionType(
                location.pathname ===
                  `/dashboard/addAllExpense/backItem/${employeeExpenseDetails?._id}`
                  ? "giveToStore"
                  : "takeFromStore"
              )
            }
            className="btn btn-outline bg-green-700 hover:bg-purple-700 text-white text-lg font-bold"
          >
            {location.pathname ===
            `/dashboard/addAllExpense/backItem/${employeeExpenseDetails?._id}`
              ? "Item Returned"
              : "Item Delivered"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAllExpenseDetails;
