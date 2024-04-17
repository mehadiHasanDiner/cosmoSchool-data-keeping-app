import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
const AddPurchaseDetails = () => {
  const purchaseDetails = useLoaderData();
  const { itemName, itemCategory, branchName } = purchaseDetails;

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const itemPrice = parseFloat(data.itemPrice);
    const itemQuantity = parseFloat(data.itemQuantity);

    const itemPurchaseDetails = {
      itemName,
      itemCategory,
      branchName,
      itemPrice,
      itemQuantity,
      purchaseDate: data.purchaseDate,
      voucherNo: data.voucher,
      remarks: data.remarks,
    };
    //  send purchase data to purchaseCollection and update storeCollection
    fetch(`${import.meta.env.VITE_URL_KEY}/purchase`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(itemPurchaseDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.upsertedCount > 0 || data.modifiedCount > 0) {
          Swal.fire({
            title: "Success!",
            text: "Item purchase details has been saved successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
    reset();
  };
  return (
    <div>
      <Helmet>
        <title>Purchase Details | Cosmo School </title>
      </Helmet>
      <h2 className="text-center text-lg my-3 font-bold underline">
        Add Item Purchase Information
      </h2>
      <div className="text-black">
        <div className="card w-full max-w-2xl mx-auto shadow-2xl bg-base-100 mb-12">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Item Name</span>
                </label>
                <input
                  type="text"
                  {...register("itemName")}
                  defaultValue={itemName}
                  className="input input-bordered"
                  readOnly={true}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Item Category</span>
                </label>
                <input
                  type="text"
                  {...register("itemCategory")}
                  defaultValue={itemCategory}
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
                  defaultValue={branchName}
                  className="input input-bordered"
                  readOnly={true}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Purchase Date</span>
                </label>
                <input
                  type="date"
                  {...register("purchaseDate", { required: true })}
                  className="input input-bordered"
                />
                {errors.purchaseDate && (
                  <span className="text-red-600 mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Item Price</span>
                </label>
                <input
                  type="number"
                  step="any"
                  {...register("itemPrice", {
                    required: true,
                    pattern: {
                      value: /^-?\d*\.?\d+$/,
                      message: "Please enter a valid number",
                    },
                  })}
                  placeholder="price"
                  className="input input-bordered"
                />
                {errors.itemPrice && (
                  <span className="text-red-600 mt-1">
                    {errors.itemPrice.message}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Item quantity</span>
                </label>
                <input
                  type="number"
                  step="any"
                  {...register("itemQuantity", { required: true })}
                  placeholder="quantity"
                  className="input input-bordered"
                />
                {errors.itemQuantity && (
                  <span className="text-red-600 mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Voucher No</span>
                </label>
                <input
                  type="text"
                  {...register("voucher", { required: true })}
                  placeholder="voucher no."
                  className="input input-bordered"
                />
                {errors.voucher && (
                  <span className="text-red-600 mt-1">
                    This field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Remarks</span>
                </label>
                <input
                  type="text"
                  {...register("remarks")}
                  placeholder="remarks"
                  className="input input-bordered"
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline bg-pink-700 hover:bg-pink-500 text-white text-lg font-bold">
                Submit Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseDetails;
