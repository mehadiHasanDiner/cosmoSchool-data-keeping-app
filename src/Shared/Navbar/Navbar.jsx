import useAuth from "../../hooks/useAuth";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-300 sticky z-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold">Cosmo School</a>
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
              <img className="w-11 rounded-full " src={user.photoURL} />
              <h3 className="card-title">{user?.displayName}</h3>
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
