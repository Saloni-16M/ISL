import React from "react";
import Started_btn from "../Started_btn/Started_btn";

const Message = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 p-6 lg:p-12 overflow-hidden">
      {/* Floating shapes for added background effects */}
      <div className="absolute inset-0">
        <div className="absolute bg-gradient-to-r from-pink-300 to-purple-400 opacity-30 rounded-full w-96 h-96 top-20 left-10 transform animate-pulse"></div>
        <div className="absolute bg-gradient-to-r from-blue-200 to-purple-300 opacity-30 rounded-full w-80 h-80 bottom-24 right-16 transform animate-bounce delay-2000"></div>
        <div className="absolute bg-gradient-to-r from-yellow-200 to-pink-200 opacity-20 rounded-full w-64 h-64 bottom-20 left-40 transform animate-spin-slow"></div>
      </div>

      <div className="relative text-center max-w-full lg:max-w-5xl space-y-8 shadow-xl rounded-lg p-10 bg-white/80 backdrop-blur-md transition-all duration-700 transform hover:scale-105 hover:shadow-2xl z-10">
        {/* Main Message with 3D shadow and animation */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-gray-900 mb-2 transition-all duration-500 hover:text-blue-600 transform hover:translate-z-10 animate-fadeIn tracking-wide drop-shadow-md">
          Break the Silence,
        </h1>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-blue-700 mb-8 transition-all duration-500 hover:text-gray-800 transform hover:translate-z-10 hover:scale-110 animate-fadeIn tracking-wide drop-shadow-md">
          Speak Through Signs!
        </h1>

        {/* Call to Action Button with enhanced 3D effect */}
        <div className="pt-6">
          <Started_btn />
        </div>
      </div>
    </div>
  );
};

export default Message;