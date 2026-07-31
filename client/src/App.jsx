import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./ProtectedRoute/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";
import Login from "./PublicRoute/Login";
import Register from "./PublicRoute/Register";
import ResetPassword from "./PublicRoute/ResetPassword";
import Loader from "./Components/Loader";
import { useSelector } from "react-redux";
function App() {
  const { loading } = useSelector((state) => state.users);
  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
