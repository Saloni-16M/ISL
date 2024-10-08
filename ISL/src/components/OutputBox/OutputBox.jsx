import React from 'react';

const OutputBox = ({ outputText, handleSpeakOutputUsingAPI }) => {
  return (
    <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2">Output</h2>
      <p className="text-gray-700">{outputText || "No output yet."}</p>

      {/* Speak Output Button */}
      <button
        onClick={handleSpeakOutputUsingAPI}
        className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Speak Output
      </button>
    </div>
  );
};

export default OutputBox;
