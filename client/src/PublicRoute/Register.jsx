import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/usersSlice";
import sleep from "../Utils/Sleep";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    fav_food: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[a-zA-Z0-9.]+(?:\.[a-zA-Z]{2,})+$/;

    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onFinish = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.name.trim().length < 4) {
      setError("Name must contain at least 4 characters");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    try {
      const response = await axios.post("/api/users/register", formData);

      if (response.data.success) {
        setSuccess(response.data.message);

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          dispatch(ShowLoading("Creating account..."));

          setTimeout(() => {
            dispatch(HideLoading());
            navigate("/login");
          }, 2000);
        }, 100);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white  rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">
            <span className="text-blue-500">M</span>
            <span className="text-red-500">y</span>
            <span className="text-yellow-500"> P</span>
            <span className="text-blue-500">o</span>
            <span className="text-green-500">r</span>
            <span className="text-pink-600">t</span>
            <span className="text-purple-400">f</span>
            <span className="text-black">o</span>
            <span className="text-orange-400">l</span>
            <span className="text-yellow-900">i</span>
            <span className="text-green-400">o</span>
          </h1>

          <h2 className="text-2xl font-semibold text-gray-800 mt-4">
            Create your account
          </h2>

          <p className="text-gray-500 mt-2">
            Continue to your Google-style account
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {/* {success && (
          <div className="bg-green-100 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )} */}

        <form onSubmit={onFinish}>
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="
        w-full px-4 py-3
        border border-gray-300
        rounded-lg
        outline-none
        focus:ring-2
        focus:ring-blue-500
        "
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="
        w-full px-4 py-3
        border border-gray-300
        rounded-lg
        outline-none
        focus:ring-2
        focus:ring-blue-500
        "
              />
            </div>
          </div>

          {/* Password + Favourite Food */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="
        w-full
        px-4
        py-3
        pr-12
        border
        border-gray-300
        rounded-lg
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-gray-500
        hover:text-gray-700
      "
                >
                  {showPassword ? (
                    <i className="bx bx-show text-xl"></i>
                  ) : (
                    <i className="bx bx-hide text-xl"></i>
                  )}
                </button>
              </div>
            </div>

            {/* Favourite Food */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favourite Food
              </label>

              <div className="relative">
                <input
                  type="text"
                  name="fav_food"
                  value={formData.fav_food}
                  onChange={handleChange}
                  placeholder="Your Fav Food"
                  className="
        w-full
        px-4
        py-3
        pr-12
        border
        border-gray-300
        rounded-lg
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
                />

                <i
                  className="
        bx bx-food-menu
        absolute
        right-4
        top-1/2
        -translate-y-1/2
        text-xl
        text-gray-500
      "
                ></i>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="
    w-full
    bg-blue-600
    hover:bg-blue-700
    text-white
    font-medium
    py-3
    rounded-lg
    transition
    "
          >
            Register
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-600">Already have an account?</span>

          <Link
            to="/login"
            className="
            text-blue-600
            font-medium
            ml-2
            hover:underline
            "
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
