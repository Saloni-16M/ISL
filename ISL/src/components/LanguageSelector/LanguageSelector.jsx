import React from 'react';

const LanguageSelector = ({ languages, language, setLanguage }) => {
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="language" className="block text-lg mb-2">Select Language:</label>
      <select 
        id="language" 
        value={language} 
        onChange={handleLanguageChange} 
        className="bg-white border border-gray-300 rounded p-2"
      >
        {languages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
