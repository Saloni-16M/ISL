import React from "react";
import { useNavigate } from "react-router-dom";
import './NextPage.css'

const NextPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/main-page'); // Replace with your actual next page route
  };

  const handlePrevious = () => {
    navigate('/'); // Replace with your actual previous page route
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-6 next_page">
      <h1 className="text-4xl font-bold text-center mb-8 text-white-600">
        Let's Get Started with Sign Language Conversion!
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl text-left next-pag-box">
        <p className="text-lg text-black-700 mb-4">
          1. <strong>Click on the "Camera" Button:</strong> To begin converting Indian Sign Language into text and speech.
        </p>
        <p className="text-lg text-black-700 mb-4">
          2. <strong>Allow Camera Permissions:</strong> A pop-up will appear asking for permission to use your camera. Make sure to click "Allow" to grant access. This is necessary for capturing your image or live video feed for sign language conversion.
        </p>
        <p className="text-lg text-black-700 mb-4">
          3. <strong>Capture Your Image or Video:</strong> Once the camera is active, position yourself within the camera view and start signing. You can either capture a still image or stream a video of your signs in real-time.
        </p>
        <p className="text-lg text-black-700 mb-4">
          4. <strong>See the Magic Happen:</strong> After capturing your image or video, the system will automatically process the signs and convert them into text and speech. Watch as your signs are translated into written words and audio!
        </p>
      </div>
      <div className="mt-6 flex space-x-4">
        <button 
          onClick={handlePrevious} 
          className="bg-gray-600 text-white font-semibold py-2 px-4 rounded hover:bg-gray-700 transition duration-300 ease-in-out flex-1"
        >
          Previous
        </button>
        <button 
          onClick={handleNext} 
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out flex-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NextPage;
