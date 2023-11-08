import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechRecognitionComponent = () => {
  const { transcript, startListening, stopListening, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const handleStartRecognition = () => {
    startListening();
  };

  const handleStopRecognition = () => {
    stopListening();
  };

  return (
    <div>
      {/* Custom voice button */}
      <button onClick={handleStartRecognition}>voice</button>
      <button onClick={handleStopRecognition}>Stop</button>

      {/* Display recognized text */}
      <div>Recognized Text: {transcript}</div>
    </div>
  );
};

export default SpeechRecognition(SpeechRecognitionComponent);
