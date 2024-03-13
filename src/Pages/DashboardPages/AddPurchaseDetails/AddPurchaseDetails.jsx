import { useLoaderData } from "react-router-dom";

const AddPurchaseDetails = () => {
  const purchaseDetails = useLoaderData();
  const { itemName, itemCategory, branchName } = purchaseDetails;

  const handlePurchaseDetails = (event) => {
    event.preventDefault();
    const form = event.target;
  };
  return (
    <div>
      <h2 className="text-center text-2xl my-3 font-bold">
        {/* Service Name: {title} */}
      </h2>
      <div>
        <div className="card w-full max-w-2xl mx-auto shadow-2xl bg-base-100 mb-12">
          <form onSubmit={handlePurchaseDetails} className="card-body">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Item Name</span>
                </label>
                <input
                  type="text"
                  name="name"
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
                  name="name"
                  defaultValue={itemCategory}
                  className="input input-bordered"
                  readOnly={true}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Branch Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={branchName}
                  className="input input-bordered"
                  readOnly={true}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Purchase Date</span>
                </label>
                <input
                  type="date"
                  name="date"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  // defaultValue={user?.email}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Due Amount</span>
                </label>
                <input
                  type="text"
                  // defaultValue={"$ " + price}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary btn-block"
                type="submit"
                value="Order Confirm"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseDetails;
