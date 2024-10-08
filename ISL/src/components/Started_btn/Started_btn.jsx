import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Started_btn.css'
const Started_btn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/next-page'); // Replace '/next-page' with your desired route
  };

  return (
    <div className="flex justify-center items-center h-screen mt-0 ">
      <button
        onClick={handleClick}
        className=" text-black font-semibold py-2 px-4 rounded-full hover:bg-custom-red transition duration-300 ease-in-out mt-0 start_para"
      >
        Get Started
      </button>
    </div>
  );
};

export default Started_btn;
