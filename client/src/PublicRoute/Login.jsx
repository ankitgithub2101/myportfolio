import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../api/axios";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/usersSlice";
import sleep from "../Utils/Sleep";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState(1);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const showToast = (message, type = "error") => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "error",
      });
    }, 3000);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[a-zA-Z0-9.]+(?:\.[a-zA-Z]{2,})+$/;

    return emailRegex.test(email);
  };

  const handleNext = async () => {
    if (step === 1) {
      if (!validateEmail(formData.email)) {
        return showToast("Enter a valid email");
      }

      setStep(2);
      return;
    }

    dispatch(ShowLoading("Signing in..."));

    try {
      await sleep(1000); // 2 seconds
      const res = await api.post("/api/users/login", formData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.data);
        navigate("/", { replace: true });
      } else {
        showToast(res.data.message);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(HideLoading());
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    dispatch(ShowLoading("Signing in with Google..."));

    try {
      const res = await api.post("/api/users/google-login", {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.data);
        navigate("/", { replace: true });
      } else {
        showToast(res.data.message);
      }
    } catch (error) {
      showToast("Google Login Failed");
    } finally {
      dispatch(HideLoading());
    }
  };

  return (
    <>
      {/* Toast */}

      {toast.show && (
        <div
          className="
      fixed
      top-5
      left-1/2
      -translate-x-1/2
      z-50
      w-[calc(100%-2rem)]
      sm:w-auto
      sm:max-w-md
    "
        >
          <div
            className="
        flex
        items-center
        gap-3
        w-full
        bg-red-500
        text-white
        px-4
        sm:px-6
        py-3
        rounded-xl
        shadow-xl
      "
          >
            <i className="bx bx-error-circle text-xl sm:text-2xl"></i>

            <span className="text-sm sm:text-base font-medium">
              {toast.message}
            </span>
          </div>
        </div>
      )}

      <div
        className="
        min-h-screen
        bg-[#f0f4f9]
        flex
        items-center
        justify-center
        px-4
        "
      >
        <div
          className="
          w-full
          max-w-4xl
          bg-white
          rounded-3xl
          shadow-xl
          p-8
          md:p-12
          flex
          flex-col
          md:flex-row
          gap-10
          "
        >
          {/* LEFT SIDE */}

          <div
            className="
            flex-1
            flex
            flex-col
            justify-center
            "
          >
            <img
              src="https://www.gstatic.com/images/branding/product/2x/gsa_512dp.png"
              alt="Google"
              className="w-12 mb-6"
            />

            <h1
              className="
              text-4xl
              font-normal
              text-gray-900
              "
            >
              Sign in
            </h1>

            <p
              className="
              mt-4
              text-gray-600
              "
            >
              Use your account
            </p>
          </div>

          {/* RIGHT SIDE */}

          <div
            className="
            flex-1
            "
          >
            {/* STEP 1 */}

            {step === 1 && (
              <>
                <input
                  type="email"
                  placeholder="Email Id"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="
                  w-full
                  h-14
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  text-gray-700
                  outline-none
                  transition
                  focus:border-blue-600
                  focus:ring-2
                  focus:ring-blue-100
                  "
                />

                <p
                  className="
                  text-sm
                  mt-10
                  text-gray-600
                  "
                >
                  Not your computer? Use Guest mode to sign in privately.
                </p>

                <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
                  {/* Google Sign In */}
                  <div className="w-full sm:w-auto flex justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => showToast("Google Login Failed")}
                      useOneTap={false}
                      use_fedcm_for_prompt={false}
                    />
                  </div>

                  {/* Create Account */}
                  <Link
                    to="/register"
                    className="text-blue-600 text-sm font-semibold hover:underline"
                  >
                    Create account
                  </Link>

                  {/* Next Button */}
                  <button
                    onClick={handleNext}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* STEP 2 */}

            {step === 2 && (
              <>
                <p
                  className="
                  border
                  rounded-full
                  inline-flex
                  px-4
                  py-2
                  text-sm
                  mb-6
                  "
                >
                  {formData.email}
                </p>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="
    w-full
    h-14
    border
    border-gray-300
    rounded-lg
    px-4
    pr-12
    outline-none
    focus:border-blue-600
    focus:ring-2
    focus:ring-blue-100
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
                    <i
                      className={
                        showPassword
                          ? "bx bx-show text-xl"
                          : "bx bx-hide text-xl"
                      }
                    ></i>
                  </button>
                </div>

                <Link
                  to="/reset-password"
                  className="
                  text-blue-600
                  text-sm
                  mt-3
                  inline-block
                  "
                >
                  Forgot password?
                </Link>

                <div
                  className="
                  flex
                  justify-between
                  items-center
                  mt-10
                  "
                >
                  <button
                    onClick={() => setStep(1)}
                    className="
                    text-blue-600
                    font-medium
                    "
                  >
                    Back
                  </button>

                  <button
                    onClick={handleNext}
                    className="
    bg-blue-600
    hover:bg-blue-700
    text-white
    font-medium
    px-8
    py-3
    rounded-full
    transition
  "
                  >
                    Sign in
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
