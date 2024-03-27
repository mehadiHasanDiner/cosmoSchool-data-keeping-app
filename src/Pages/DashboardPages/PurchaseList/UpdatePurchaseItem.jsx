import { useForm } from "react-hook-form";

const UpdatePurchaseItem = ({ editInModal, notify, setLoad, load }) => {
  const { _id, itemName, itemPrice, itemQuantity, voucherNo, remarks } =
    editInModal || {};
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const quantityNumber = parseInt(data.quantity);
    const priceNumber = parseInt(data.price);
    const voucher = data.voucher;
    const remarks = data.remark;
    const convertedData = {
      quantity: quantityNumber,
      price: priceNumber,
      voucher: voucher,
      remark: remarks,
    };
    console.log(convertedData);
    fetch(`${import.meta.env.VITE_URL_KEY}/purchase/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(convertedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          notify();
          setLoad(!load);
        }
      });
    reset();
    // window.location.reload();
  };

  return (
    <div>
      <h2 className="text-center text-lg font-bold underline">
        Update Purchase Information
      </h2>
      <h2 className="text-center font-bold pt-3 text-pink-600">
        Item: {itemName}
      </h2>
      <div>
        <div className="card w-full max-w-2xl mx-auto bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body py-1">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Item Price : {itemPrice} </span>
                </label>
                <input
                  type="number"
                  step="any"
                  {...register("price", {
                    required: true,
                    pattern: {
                      value: /^-?\d*\.?\d+$/,
                      message: "Please enter a valid number",
                    },
                  })}
                  placeholder="price"
                  className="input input-bordered"
                />
                {errors.price && (
                  <span className="text-red-600 mt-1 text-xs">
                    Click the input field or update
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Item quantity : {itemQuantity}
                  </span>
                </label>
                <input
                  type="number"
                  step="any"
                  {...register("quantity", { required: true })}
                  placeholder="quantity"
                  className="input input-bordered"
                />
                {errors.quantity && (
                  <span className="text-red-600 mt-1 text-xs">
                    Click the input field or update
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Voucher No : {voucherNo}</span>
                </label>
                <input
                  type="text"
                  {...register("voucher", { required: true })}
                  placeholder="voucher no."
                  className="input input-bordered"
                />
                {errors.voucher && (
                  <span className="text-red-600 mt-1 text-xs">
                    Click the input field or update
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Remarks</span>
                </label>
                <input
                  type="text"
                  {...register("remark", { required: true })}
                  placeholder="remarks"
                  className="input input-bordered"
                />
                {errors.remark && (
                  <span className="text-red-600 mt-1 text-xs">
                    Click the input field or update
                  </span>
                )}
              </div>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-outline bg-pink-700 hover:bg-pink-500 text-white text-lg font-bold"
              >
                Update Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePurchaseItem;
