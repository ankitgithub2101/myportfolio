import React, { useContext } from "react";
import { ThemeContext } from "../Book/ThemeContext";

function ThemeToggle() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <button
      className="theme-toggle"
      onClick={() => setDark(!dark)}
      aria-label="Toggle theme"
    >
      <i className={dark ? "bx bx-sun" : "bx bx-moon"}></i>
    </button>
  );
}

export default ThemeToggle;
