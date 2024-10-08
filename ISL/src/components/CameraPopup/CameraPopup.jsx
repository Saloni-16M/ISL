import React from 'react';

const CameraPopup = ({ handleCameraAccess }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-xl mb-4">Camera Access Required</h2>
        <p className="mb-4">Please allow camera access to capture your sign language.</p>
        <button 
          onClick={handleCameraAccess} 
          className="bg-teal-500 text-white font-semibold py-2 px-4 rounded hover:bg-teal-600 transition duration-300 ease-in-out"
        >
          Allow Camera Access
        </button>
      </div>
    </div>
  );
};

export default CameraPopup;
