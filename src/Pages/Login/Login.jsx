import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const { user, loading, loggedInByGoogle } = useAuth();
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  console.log(user);

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    reset();
  };

  const handleGoogleLogin = () => {
    loggedInByGoogle()
      .then((result) => {
        toast.success("user logged in successfully");
        const loggedUser = result.user;
        navigate("/dashboard");
        console.log(loggedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 className="text-4xl mb-2 font-bold text-center">Please Login</h1>
      <div className="">
        <div className="card  w-80 max-w-sm  shadow-2xl bg-gray-200">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: true,
                })}
                type="email"
                placeholder="email"
                className="input input-bordered"
              />
              {errors.email && (
                <p className="text-red-600 mt-1">Field must not be empty.</p>
              )}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
              />
              <p
                onClick={() => handleShowPassword()}
                className="absolute right-4 top-[51px] cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </p>
              {errors.password && (
                <p className="text-red-600 mt-1">Field must not be empty.</p>
              )}

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <span className="text-warning text-center"></span>
            <div className="form-control">
              <button className="btn bg-pink-800 hover:bg-black text-white capitalize text-lg">
                {/* {loading ? (
                  <>
                    <ImSpinner9
                      className="m-auto animate-spin"
                      size={24}
                      color="white"
                    />
                  </>
                ) : (
                  "Sign in"
                )} */}
                Sign in
              </button>
            </div>

            <label className="label">
              <span>
                New User?
                <Link
                  to="/signup"
                  className="text-center label-text-alt link link-hover font-bold text-lg text-pink-600"
                >
                  {" "}
                  Sign Up!
                </Link>
              </span>
            </label>
          </form>
          <div className="text-center mb-2 form-control px-8 pb-5">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-neutral capitalize text-md"
            >
              {loading ? (
                <>
                  <ImSpinner9
                    className="m-auto animate-spin"
                    size={24}
                    color="white"
                  />
                </>
              ) : (
                <>
                  <FcGoogle className="text-2xl" /> Sign In with Google
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
