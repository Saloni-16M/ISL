import React from 'react';

const CameraFeed = ({ videoStream, imageSrc, handleCaptureImage, handleCaptureAnotherImage }) => {
  return (
    <div className="w-full max-w-md mb-4 border border-gray-300 rounded-lg shadow-md bg-white p-4">
      
      {/* Display Video Stream if Image is not Captured */}
      {videoStream && !imageSrc && (
        <div className="relative w-full h-72 mb-4">
          <video
            id="videoElement"
            className="w-full h-full object-cover rounded"
            autoPlay
            playsInline
            ref={(videoElement) => {
              if (videoElement && videoStream) {
                videoElement.srcObject = videoStream;
              }
            }}
          />
        </div>
      )}

      {/* Display Captured Image */}
      {imageSrc && (
        <div className="relative w-full h-72 mb-4">
          <img src={imageSrc} alt="Captured" className="w-full h-full object-cover rounded" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        {/* Capture Image Button */}
        {!imageSrc && (
          <button
            onClick={handleCaptureImage}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Capture Image
          </button>
        )}

        {/* Capture Another Image Button */}
        {imageSrc && (
          <button
            onClick={handleCaptureAnotherImage}
            className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 ease-in-out"
          >
            Capture Another Image
          </button>
        )}
      </div>
    </div>
  );
};

export default CameraFeed;
