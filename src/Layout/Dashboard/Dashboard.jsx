import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import { IoMdMenu } from "react-icons/io";

const Dashboard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-106px)]">
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content ml-4">
            {/* Page content here */}
            <Outlet />

            <label
              htmlFor="my-drawer-2"
              className="absolute z-30 -top-14 ml-2 left-0 drawer-button lg:hidden btn btn-outline"
            >
              <IoMdMenu size={26} />
            </label>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-56 min-h-full  bg-base-200 md:mt-16 lg:my-0 text-base-content space-y-2">
              {/* Sidebar content here */}
              <li>
                <NavLink to="additem">Add Item</NavLink>
              </li>
              <li>
                <NavLink to="addemployee">Add Employee</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
