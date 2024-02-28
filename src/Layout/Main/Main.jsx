import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-violet-400 to-fuchsia-400 flex justify-center items-center">
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
