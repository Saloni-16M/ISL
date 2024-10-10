import React, { useState, useEffect } from 'react';
import CameraPopup from '../CameraPopup/CameraPopup';
import CameraFeed from '../CameraFeed/CameraFeed';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import OutputBox from '../OutputBox/OutputBox';
import './MainPage.css';


const MainPage = () => {
  const [videoStream, setVideoStream] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [language, setLanguage] = useState('en');
  const [outputText, setOutputText] = useState('hello Saloni');
  const [showAccessPopup, setShowAccessPopup] = useState(true);

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  const handleCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setShowAccessPopup(false);
    } catch (error) {
      alert('Unable to access the camera. Please allow camera access.');
    }
  };

  const handleCaptureImage = () => {
    const videoElement = document.getElementById('videoElement');
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0);
    setImageSrc(canvas.toDataURL('image/png'));
  };

  const handleCaptureAnotherImage = () => {
    setImageSrc(null);
  };

  const handleSpeakOutputUsingAPI = () => {
    console.log("Output Text:", outputText);
    
    if (outputText.trim()) {
      // Always voice the output text in English
      const voice = "UK English Female"; // or any other preferred English voice
      window.responsiveVoice.speak(outputText, voice);
    } else {
      console.log("No text to speak");
    }
  };
  

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'mr', name: 'Marathi' },
  ];

  return (
    <div className=" main flex flex-col justify-center items-center h-screen  p-6 ">
      <h1 className="text-3xl font-bold mb-6 font-">Sign Language Conversion</h1>
      
      {showAccessPopup && (
        <CameraPopup handleCameraAccess={handleCameraAccess} />
      )}

      <CameraFeed
        videoStream={videoStream}
        imageSrc={imageSrc}
        handleCaptureImage={handleCaptureImage}
        handleCaptureAnotherImage={handleCaptureAnotherImage}
      />

      <LanguageSelector 
        languages={languages} 
        language={language} 
        setLanguage={setLanguage} 
      />

      <OutputBox 
        outputText={outputText} 
        handleSpeakOutputUsingAPI={handleSpeakOutputUsingAPI} 
      />
    </div>
  );
};

export default MainPage;