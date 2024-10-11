import React from "react";
import { useNavigate } from "react-router-dom";

const NextPage = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/main-page"); // Replace with your actual next page route
  };

  const handlePrevious = () => {
    navigate("/"); // Replace with your actual previous page route
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800 transition duration-500 ease-in-out">
      <h1 className="font-extrabold text-3xl md:text-4xl text-black mb-8 text-center">
        Let's Get Started with Sign Language Conversion!
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl text-left next-pag-box transition-transform transform hover:scale-105 duration-300 ease-in-out border border-gray-300">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
          📹 Instructions for Sign Language Conversion
        </h2>

        <div className="space-y-6">
          <p className="text-lg text-gray-700 mb-4 transition duration-200 ease-in-out hover:translate-x-1">
            <span className="font-semibold text-blue-600">1.</span>{" "}
            <strong>Click on the "Camera" Button:</strong> To begin converting
            Indian Sign Language into text and speech.
          </p>

          <p className="text-lg text-gray-700 mb-4 transition duration-200 ease-in-out hover:translate-x-1">
            <span className="font-semibold text-blue-600">2.</span>{" "}
            <strong>Allow Camera Permissions:</strong> A pop-up will appear
            asking for permission to use your camera. Make sure to click "Allow"
            to grant access. This is necessary for capturing your image or live
            video feed for sign language conversion.
          </p>

          <p className="text-lg text-gray-700 mb-4 transition duration-200 ease-in-out hover:translate-x-1">
            <span className="font-semibold text-blue-600">3.</span>{" "}
            <strong>Capture Your Image or Video:</strong> Once the camera is
            active, position yourself within the camera view and start signing.
            You can either capture a still image or stream a video of your signs
            in real-time.
          </p>

          <p className="text-lg text-gray-700 mb-4 transition duration-200 ease-in-out hover:translate-x-1">
            <span className="font-semibold text-blue-600">4.</span>{" "}
            <strong>See the Magic Happen:</strong> After capturing your image or
            video, the system will automatically process the signs and convert
            them into text and speech. Watch as your signs are translated into
            written words and audio!
          </p>
        </div>
      </div>

      <div className="mt-8 flex space-x-4 w-full max-w-md">
        <button
          onClick={handlePrevious}
          className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out flex-1 shadow-lg transform hover:translate-y-1"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-red-600 hover:to-red-800 transition duration-300 ease-in-out flex-1 shadow-lg transform hover:translate-y-1"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NextPage;