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
  const [outputText, setOutputText] = useState('');
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
    const imgDataURL = canvas.toDataURL('image/png')
    setImageSrc(imgDataURL);
    sendImgToAPI(imgDataURL)
    updateOutputTextFromApi()
  };

const sendImgToAPI = (imgData) =>{

  // Convert base64 to binary format (raw image file)

  const blob = dataURItoBlob(imgData);

  // Create FormData to send the image to the server
  const formData = new FormData();
  formData.append('image', blob);


  fetch('http://localhost:5118/ISL', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    console.log('Image successfully uploaded:', data);
  })
  .catch(error => {
    console.error('Error uploading image:', error);
  });
};

// Helper function to convert base64 image data to a Blob
const dataURItoBlob = function(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString ;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

const updateOutputTextFromApi = async () => {
    try {
      const response = await fetch('http://localhost:5118/ISL'); // Make the API call (replace with your endpoint)
      const data = await response.json(); // Assuming the backend returns JSON
      setOutputText(data.message); // Update state with the returned text
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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