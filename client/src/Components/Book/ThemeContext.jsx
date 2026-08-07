import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(localStorage.getItem("theme") !== "light");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        setDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
