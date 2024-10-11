import React from "react";
import { useNavigate } from "react-router-dom";
import "./Started_btn.css";

const Started_btn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/next-page"); // Replace '/next-page' with your desired route
  };

  return (
    <button
      className="bg-blue-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition duration-500 hover:bg-blue-400 hover:scale-110 hover:shadow-2xl"
      onClick={handleClick}
    >
      Get Started
    </button>
  );
};

export default Started_btn;
