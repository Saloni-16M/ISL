import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Started_btn.css';

const Started_btn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/next-page'); // Replace '/next-page' with your desired route
  };

  return (
    <button
      onClick={handleClick}
      className="start_para"
    >
      Get Started
    </button>
  );
};

export default Started_btn;