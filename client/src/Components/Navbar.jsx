import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import sleep from "../Utils/Sleep";
import { ShowLoading, HideLoading, ClearUser } from "../redux/usersSlice";

import ThemeToggle from "./Book/ThemeToggle";
import "./Navbar.css";

function Navbar({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);

  const [active, setActive] = useState("home");

  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  const menu = [
    {
      name: "Home",
      icon: "bx bx-home-alt-2",
      path: "home",
    },

    {
      name: "About",
      icon: "bx bx-user",
      path: "about",
    },

    {
      name: "Experience",
      icon: "bx bx-time-five",
      path: "experience",
    },

    {
      name: "Projects",
      icon: "bx bx-briefcase",
      path: "projects",
    },

    {
      name: "Services",
      icon: "bx bx-code-alt",
      path: "services",
    },

    {
      name: "Contact",
      icon: "bx bx-envelope",
      path: "contact",
    },

    {
      name: "Logout",
      icon: "bx bx-log-out-circle",
      path: "logout",
    },
  ];

  // sync with book scroll
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width:768px)").matches;

    const pageMap = isMobile
      ? {
          0: "home",
          1: "about",
          3: "experience",
          4: "projects",
          5: "services",
          8: "contact",
          9: "thankyou",
        }
      : {
          0: "home",
          1: "about",
          3: "experience",
          4: "projects",
          5: "services",
          8: "contact",
        };

    const updateActive = (e) => {
      if (isAutoScrolling) {
        return;
      }
      const page = e.detail;

      if (pageMap[page]) {
        setActive(pageMap[page]);
      }
    };

    window.addEventListener("bookPageChange", updateActive);

    return () => {
      window.removeEventListener("bookPageChange", updateActive);
    };
  }, [isAutoScrolling]);

  const handleLogout = async () => {
    dispatch(ShowLoading("Logging out..."));

    try {
      dispatch(ClearUser());

      localStorage.removeItem("token");

      await sleep(1000);

      navigate("/login");
    } finally {
      dispatch(HideLoading());
    }
  };

  const handleNavigation = (item) => {
    if (item.path === "logout") {
      handleLogout();
      return;
    }

    const isMobile = window.matchMedia("(max-width:768px)").matches;

    setActive(item.path);

    let scrollY = 0;

    if (isMobile) {
      const mobilePages = {
        home: 0,
        about: 1,
        experience: 3,
        projects: 4,
        services: 5,
        contact: 8,
      };

      const trigger = window.bookTrigger;

      if (!trigger) {
        console.log("Book trigger not ready");
        return;
      }

      const page = mobilePages[item.path];

      const progress = page / 9;

      scrollY = trigger.start + (trigger.end - trigger.start) * progress;
    } else {
      const desktopPages = {
        home: 0,
        about: 1,
        experience: 2,
        projects: 2.4,
        services: 3.2,
        contact: 4.4,
      };

      const page = desktopPages[item.path];

      scrollY = window.innerHeight * page;
    }

    setIsAutoScrolling(true);

    gsap.to(window, {
      scrollTo: {
        y: scrollY,
      },

      duration: 0.8,

      ease: "power2.inOut",

      onComplete: () => {
        setTimeout(() => {
          setIsAutoScrolling(false);
        }, 200);
      },
    });
  };

  return (
    <>
      <aside className="book-navbar">
        <ul className="book-menu">
          {menu.map((item, index) => (
            <li
              key={index}
              onClick={() => handleNavigation(item)}
              className={active === item.path ? "active" : ""}
            >
              <i className={item.icon}></i>

              <span>{item.name}</span>
            </li>
          ))}
          <ThemeToggle />
        </ul>

        {user && (
          <div className="book-user">
            <strong>{user.name}</strong>
          </div>
        )}
      </aside>

      <main className="book-content">{children}</main>
    </>
  );
}

export default Navbar;
