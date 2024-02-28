import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = (formData) => {
    if (formData.password !== formData.confirmPassword) {
      setError("Password & Confirm Password didn't match");
    }
    console.log(formData);
    reset();
  };

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center">Please Sign Up</h1>
      <div className="m-auto hero-content flex-col lg:flex-row-reverse ">
        <div className="card w-96 max-w-sm shadow-2xl bg-gray-300">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body -mb-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", {
                  required: true,
                })}
                type="text"
                placeholder="Name"
                className="input input-bordered"
              />
              {errors.name && (
                <p className="text-red-600 mt-1">Please check the Name.</p>
              )}
            </div>
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
                <p className="text-red-600 mt-1">Please check the Email.</p>
              )}
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])/,
                })}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="input input-bordered"
              />
              <p
                onClick={() => handlePassword()}
                className="absolute right-4 bottom-[13px] cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </p>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}

            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have 1 uppercase, 1 lowercase, and 1 special
                character
              </p>
            )}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                {...register("confirmPassword", { required: true })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="confirm password"
                className="input input-bordered"
              />
              <p
                onClick={() => handleConfirmPassword()}
                className="absolute right-4 bottom-[13px] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <FaRegEye size={20} />
                ) : (
                  <FaRegEyeSlash size={20} />
                )}
              </p>
            </div>
            <p className="text-red-600 text-center">{error}</p>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                {...register("url", { required: true })}
                type="url"
                placeholder="Photo Url"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-4">
              <button className="btn bg-pink-800 hover:bg-black text-white  capitalize text-lg">
                Sign Up
              </button>
            </div>

            {/* <span className="text-success text-center"> success</span> */}

            <label className="label">
              <span>
                Already have an account?
                <Link
                  to="/login"
                  className="text-center label-text-alt link link-hover font-bold text-lg text-pink-700"
                >
                  {" "}
                  Sign In!
                </Link>
              </span>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
