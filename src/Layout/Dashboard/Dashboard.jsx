import { NavLink, Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";
import { IoMdMenu } from "react-icons/io";
import { MdDomainAdd } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdAssignmentAdd } from "react-icons/md";
import { MdOutlineListAlt } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
import { FaBalanceScale } from "react-icons/fa";

import { useState } from "react";

const Dashboard = () => {
  const [minusIcon1, setMinusIcon1] = useState(true);
  const [minusIcon2, setMinusIcon2] = useState(true);
  const handlePurchaseIcon = () => {
    setMinusIcon1(!minusIcon1);
  };
  const handleExpenseIcon = () => {
    setMinusIcon2(!minusIcon2);
  };

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
            <ul className="menu p-4 w-56 min-h-full  bg-base-200 mt-16 lg:my-0 text-base-content space-y-2">
              {/* Sidebar content here */}
              <li>
                <NavLink to="addsection">
                  <MdDomainAdd size={18} />
                  Add Section
                </NavLink>
              </li>

              <details className="collapse bg-base-200 ">
                <summary className="collapse-title  font-medium p-0 min-h-0">
                  <div className="flex justify-between my-1 items-center">
                    <div className="pl-3">
                      <div className="flex items-center">
                        <span className="mr-1">
                          <BiSolidPurchaseTag size={18} />
                        </span>
                        <span onClick={handlePurchaseIcon}>Purchase</span>
                      </div>{" "}
                    </div>
                    <span className="">
                      {minusIcon1 ? (
                        <AiOutlinePlusCircle size={20} />
                      ) : (
                        <AiOutlineMinusCircle size={20} />
                      )}
                    </span>
                  </div>
                </summary>

                <div className="collapse-content px-0 ml-4 -mb-4">
                  <li>
                    <NavLink to="addpurchase">
                      <MdAssignmentAdd size={18} />
                      Add Purchase
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="purchaselist">
                      <MdOutlineListAlt size={18} />
                      Purchase List
                    </NavLink>
                  </li>
                </div>
              </details>

              <details className="collapse bg-base-200 ">
                <summary className="collapse-title  font-medium p-0 min-h-0">
                  <div className="flex justify-between my-1 items-center">
                    <div className="pl-3">
                      <div className="flex items-center">
                        <span className="mr-1">
                          <FaShop size={18} />
                        </span>
                        <span onClick={handleExpenseIcon}>Expense</span>
                      </div>{" "}
                    </div>
                    <span className="">
                      {minusIcon2 ? (
                        <AiOutlinePlusCircle size={20} />
                      ) : (
                        <AiOutlineMinusCircle size={20} />
                      )}
                    </span>
                  </div>
                </summary>

                <div className="collapse-content px-0 ml-4 -mb-4">
                  <li>
                    <NavLink to="addAllExpense">
                      <MdAssignmentAdd size={18} />
                      Add All Expense
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="expenseHistory">
                      <MdOutlineListAlt size={18} />
                      Expense History
                    </NavLink>
                  </li>
                </div>
              </details>

              <li>
                <NavLink to="store">
                  <FaBalanceScale size={18} />
                  Store Balance
                </NavLink>
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
