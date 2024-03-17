import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch(`${import.meta.env.VITE_URL_KEY}/addEmployee`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            // iconColor: "green",
            title: "Employee has been added successfully",
            showConfirmButton: false,
            timer: 2000,
            background: "white",
            color: "black",
          });
        }
        reset();
      });
  };

  return (
    <div className="bg-gradient-to-b from-gray-300 to-gray-200 rounded-lg p-2 my-6 mr-3">
      <h2 className="font-bold text-2xl my-4 text-center">
        Add a New Employee
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex md:flex-row space-x-4 items-center flex-col w-full justify-around">
          <div className="flex">
            <label className="label">
              <span className="label-text mr-2">Employee Name:</span>
            </label>
            <input
              {...register("employeeName")}
              type="text"
              placeholder="Item Name"
              className="input input-bordered label-text w-full"
              required
            />
          </div>

          <div className="form-control">
            <div className="label justify-start">
              <span className="label-text mr-2">Employee Type: </span>
              <div />
              <select
                defaultValue={"Select"}
                className="select select-bordered w-full"
                {...register("designation")}
              >
                <option value="Select" disabled>
                  Select one
                </option>
                <option value="Admin">Admin</option>
                <option value="Teacher">Teacher</option>
                <option value="Principal">Principal</option>
                <option value="Vice Principal">Vice Principal</option>
                <option value="Management">Management</option>
              </select>
            </div>
          </div>

          <div className="form-control ">
            <div className="label justify-start">
              <span className="label-text mr-2">Branch: </span>
              <div />

              <select
                defaultValue={"Select"}
                className="select select-bordered w-full"
                {...register("branchName")}
              >
                <option value="Select" disabled>
                  Select one
                </option>
                <option value="Mirpur">Mirpur</option>
                <option value="Banasree">Banasree</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end my-3 ">
            <button type="submit" className="btn btn-outline font-bold">
              {" "}
              Add Employee
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
