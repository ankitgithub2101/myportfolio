import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import sleep from "../Utils/Sleep";
import { ShowLoading, HideLoading } from "../redux/usersSlice";

function Navbar({ children }) {
  const navigate = useNavigate();

  const [showNavbar, setShowNavbar] = useState(false);

  const { user } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const userMenu = [
    {
      name: "Home",
      icon: "bx bx-home-alt-2",
      path: "/",
    },
    {
      name: "About",
      icon: "bx bx-user",
      path: "/about",
    },
    {
      name: "Logout",
      icon: "bx bx-log-out-circle",
      path: "/logout",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      icon: "bx bx-home-alt-2",
      path: "/",
    },
    {
      name: "Logout",
      icon: "bx bx-log-out-circle",
      path: "/logout",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  const currentPath = window.location.pathname;

  const handleNavigation = async (item) => {
    if (item.path === "/logout") {
      dispatch(ShowLoading("Logging out..."));

      try {
        localStorage.removeItem("token");

        await sleep(2000); // show loader for 2 seconds

        navigate("/login");
      } finally {
        dispatch(HideLoading());
      }
    } else {
      navigate(item.path);
    }

    setShowNavbar(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">Logo</div>

          <button
            onClick={() => setShowNavbar(!showNavbar)}
            className="md:hidden"
          >
            <i
              className={
                showNavbar
                  ? "bx bx-x text-4xl text-gray-600"
                  : "bx bx-menu-alt-right text-4xl text-gray-600"
              }
            ></i>
          </button>

          <div
            className={`
              absolute md:static
              top-full left-0
              w-full md:w-auto
              bg-white md:bg-transparent
              shadow-md md:shadow-none
              transition-all duration-300
              ${showNavbar ? "block" : "hidden md:block"}
            `}
          >
            <ul className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 p-5 md:p-0">
              {menuToBeRendered.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleNavigation(item)}
                  className={`
                    flex items-center gap-2
                    cursor-pointer
                    px-3 py-2
                    rounded-lg
                    transition

                    ${
                      item.path === currentPath
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  <i className={`${item.icon} text-xl`}></i>
                  <span className="font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <main className="pt-20">{children}</main>
    </>
  );
}

export default Navbar;
