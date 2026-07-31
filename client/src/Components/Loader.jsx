import React from "react";
import { useSelector } from "react-redux";

function Loader() {
  const { loading, loadingMessage } = useSelector((state) => state.users);

  if (!loading) return null;

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/30
      backdrop-blur-sm
      flex
      items-center
      justify-center
      z-50
      "
    >
      <div
        className="
        bg-white
        rounded-2xl
        shadow-xl
        px-8
        py-6
        flex
        flex-col
        items-center
        gap-4
        "
      >
        <div
          className="
          w-12
          h-12
          border-4
          border-blue-600
          border-t-transparent
          rounded-full
          animate-spin
          "
        ></div>

        <p className="text-gray-700 font-medium">{loadingMessage}</p>
      </div>
    </div>
  );
}

export default Loader;
