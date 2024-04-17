import useAuth from "../../hooks/useAuth";
import { MdLogout } from "react-icons/md";
import logo from "../../assets/logo.png";
import logo2 from "../../assets/logo-2.png";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "../../Providers/ThemeProvider";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(darkMode);

  return (
    <div
      className={
        darkMode
          ? "navbar text-white sticky z-10 shadow-md shadow-slate-600"
          : "navbar bg-base-300 sticky z-10 "
      }
    >
      <div className="flex-1">
        <a className="pl-[68px] lg:pl-1">
          {darkMode ? (
            <img className="w-4/5" src={logo2} alt="" />
          ) : (
            <img className="w-4/5" src={logo} alt="" />
          )}
        </a>
      </div>

      <div className="mx-3">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={32}></Sun> : <Moon size={32}></Moon>}
        </button>
      </div>

      <div className="flex-none gap-2">
        <div className="dropdown dropdown-bottom  dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-11 rounded-full  ring-2 ring-neutral-800 ring-offset-base-100 ring-offset-2">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user
                    ? user?.photoURL
                    : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                }
              />
            </div>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content z-30 card card-compact w-64 p-2 shadow bg-white"
          >
            <div className="card-body items-center text-center">
              <img className="w-11 rounded-full " src={user?.photoURL} />
              <h3 className="card-title text-black">{user?.displayName}</h3>
              <p className="badge badge-neutral">{user?.email}</p>
              <button
                onClick={handleSignOut}
                className="btn btn-sm btn-outline"
              >
                <MdLogout />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
