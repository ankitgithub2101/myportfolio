import React from "react";
import { useSelector } from "react-redux";

function Home() {
  // getting data from reducers
  const { user } = useSelector((state) => state.users);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {user ? (
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome {user?.name}
          </h1>

          <p className="text-gray-600 text-lg">{user?.email}</p>

          <span
            className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold ${
              user?.isAdmin
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {user?.isAdmin ? "Admin" : "User"}
          </span>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700">Please Login</h1>
        </div>
      )}
    </div>
  );
}

export default Home;
