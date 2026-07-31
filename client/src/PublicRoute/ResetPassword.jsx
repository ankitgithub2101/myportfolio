import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    fav_food: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!formData.email) {
      setError("Email is required");
      return;
    }

    if (!formData.fav_food.trim()) {
      setError("Favourite food is required");
      return;
    }

    if (!formData.newPassword) {
      setError("New password is required");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/users/reset-password", {
        email: formData.email,
        fav_food: formData.fav_food,
        newPassword: formData.newPassword,
      });

      if (response.data.success) {
        setSuccess(response.data.message);

        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div
        className="
        bg-white
        rounded-2xl
        shadow-lg
        p-8
        "
      >
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Reset Password
        </h1>

        <hr className="my-6" />

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 text-green-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={onFinish}>
          {/* Email + Favourite Food */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        w-full
        px-4
        py-3
        border
        border-gray-300
        rounded-lg
        outline-none
        focus:ring-2
        focus:ring-blue-500
        "
              />
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
                  placeholder="Favourite food"
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

          {/* New Password + Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* New Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="New password"
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
          hover:text-blue-600
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

            {/* Confirm Password */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-500
          hover:text-blue-600
          "
                >
                  {showConfirmPassword ? (
                    <i className="bx bx-show text-xl"></i>
                  ) : (
                    <i className="bx bx-hide text-xl"></i>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-5 gap-5">
            <Link
              to="/login"
              className="
      text-blue-600
      font-medium
      hover:underline
      "
            >
              Back to Login
            </Link>

            <button
              type="submit"
              className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      font-medium
      px-6
      py-3
      rounded-lg
      transition
      "
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
