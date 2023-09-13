import React from "react";

function AuthButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-mainGreen w-[60%] mx-auto px-3 py-2 rounded-lg text-mainWhite uppercase font-medium transition-all duration-300 hover:scale-105"
    >
      {label}
    </button>
  );
}

export default AuthButton;
