import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useStore from "../../../hooks/useStore";

const AddAllExpenseDetails = () => {
  const employeeExpenseDetails = useLoaderData();
  const [, storeItems] = useStore();
  // console.log(storeItems);

  // const itemNames = storeItems.map((obj) => obj.itemName);
  // console.log(itemNames);

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm();

  // console.log(employeeExpenseDetails);
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="card w-full max-w-2xl mx-auto shadow-2xl bg-base-100 mb-12">
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
              <span className="label-text">Purchase Date</span>
            </label>
            <input
              type="date"
              {...register("purchaseDate", { required: true })}
              className="input input-bordered"
            />
            {errors.purchaseDate && (
              <span className="text-red-600 mt-1">This field is required</span>
            )}
          </div>

          {storeItems.map((item, index) => (
            <div className="grid" key={index}>
              <label className="label">
                <span className="label-text">{item?.itemName}</span>
              </label>
              <input
                type="number"
                defaultValue={item?.itemQuantity}
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
          ))}

          {/* <div className="form-control">
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
              <span className="text-red-600 mt-1">This field is required</span>
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
           */}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-outline bg-pink-700 hover:bg-pink-500 text-white text-lg font-bold">
            Submit Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAllExpenseDetails;
