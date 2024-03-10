import { useForm } from "react-hook-form";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className="bg-gradient-to-b from-gray-300 to-gray-200 rounded-lg p-2 my-6 mr-3">
        <h2 className="font-bold text-2xl my-4 text-center">Add a New Item</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex md:flex-row space-x-4 items-center flex-col w-full justify-around">
            <div className="flex">
              <label className="label">
                <span className="label-text mr-2">Item Name:</span>
              </label>
              <input
                {...register("itemName")}
                type="text"
                placeholder="Item Name"
                className="input input-bordered label-text w-full"
                required
              />
            </div>

            <div className="form-control">
              <div className="label justify-start">
                <span className="label-text mr-2">Item Category: </span>
                <div />
                <select
                  className="select select-bordered w-full"
                  {...register("itemCategory")}
                >
                  <option value="Cleaning Item">Cleaning Item</option>
                  <option value="Stationary Item">Stationary Item</option>
                  <option value="ELectric Item">ELectric Item</option>
                </select>
              </div>
            </div>

            <div className="form-control ">
              <div className="label justify-start">
                <span className="label-text mr-2">Branch: </span>
                <div />

                <select
                  className="select select-bordered w-full"
                  {...register("branchName")}
                >
                  <option value="Mirpur">Mirpur</option>
                  <option value="Banasree">Banasree</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end my-3 ">
              <button
                type="submit"
                className="btn btn-outline  font-bold text-red-700"
              >
                {" "}
                Add Item
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="bg-gradient-to-b from-gray-300 to-gray-200 rounded-lg p-2 my-3 mr-3">
        <h2 className="font-bold text-2xl my-4 text-center">
          Add a New Employee
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex md:flex-row space-x-4 items-center flex-col w-full justify-around">
            <div className="flex">
              <label className="label">
                <span className="label-text mr-2">Item Name:</span>
              </label>
              <input
                {...register("itemName")}
                type="text"
                placeholder="Item Name"
                className="input input-bordered label-text w-full"
                required
              />
            </div>

            <div className="form-control">
              <div className="label justify-start">
                <span className="label-text mr-2">Item Category: </span>
                <div />
                <select
                  className="select select-bordered w-full"
                  {...register("itemCategory")}
                >
                  <option value="Cleaning Item">Cleaning Item</option>
                  <option value="Stationary Item">Stationary Item</option>
                  <option value="ELectric Item">ELectric Item</option>
                </select>
              </div>
            </div>

            <div className="form-control ">
              <div className="label justify-start">
                <span className="label-text mr-2">Branch: </span>
                <div />

                <select
                  className="select select-bordered w-full"
                  {...register("branchName")}
                >
                  <option value="Mirpur">Mirpur</option>
                  <option value="Banasree">Banasree</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end my-3 ">
              <button
                type="submit"
                className="btn btn-outline  font-bold text-red-700"
              >
                {" "}
                Add Employee
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddItem;
