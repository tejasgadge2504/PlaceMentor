// Speech utilities for handling speech-to-text and text-to-speech

export const initializeSpeechServices = () => {
  const services = {
    recognition: null,
    synthesis: null,
    isSupported: {
      recognition: false,
      synthesis: false,
    },
  };

  // Initialize Speech Recognition
  if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    services.recognition = new SpeechRecognition();

    // Configure recognition settings
    services.recognition.continuous = true;
    services.recognition.interimResults = true;
    services.recognition.lang = "en-US";
    services.recognition.maxAlternatives = 1;

    services.isSupported.recognition = true;
  } else {
    console.warn("Speech Recognition not supported in this browser");
  }

  // Initialize Speech Synthesis
  if ("speechSynthesis" in window) {
    services.synthesis = window.speechSynthesis;
    services.isSupported.synthesis = true;
  } else {
    console.warn("Speech Synthesis not supported in this browser");
  }

  return services;
};

export const getAvailableVoices = () => {
  if ("speechSynthesis" in window) {
    return window.speechSynthesis.getVoices();
  }
  return [];
};

export const speakText = (text, options = {}) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Apply options
    utterance.rate = options.rate || 0.8;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    utterance.lang = options.lang || "en-US";

    // Set voice if specified
    if (options.voice) {
      utterance.voice = options.voice;
    }

    // Add event listeners if provided
    if (options.onStart) utterance.onstart = options.onStart;
    if (options.onEnd) utterance.onend = options.onEnd;
    if (options.onError) utterance.onerror = options.onError;

    window.speechSynthesis.speak(utterance);

    return utterance;
  }

  console.warn("Speech Synthesis not supported");
  return null;
};

export const stopSpeech = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

export const startRecording = (recognition, callbacks = {}) => {
  if (!recognition) {
    console.error("Speech recognition not available");
    return false;
  }

  try {
    // Set up event handlers
    recognition.onstart = callbacks.onStart || (() => {});
    recognition.onend = callbacks.onEnd || (() => {});
    recognition.onerror =
      callbacks.onError ||
      ((event) => {
        console.error("Speech recognition error:", event.error);
      });
    recognition.onresult =
      callbacks.onResult ||
      ((event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        console.log("Transcript:", transcript);
      });

    recognition.start();
    return true;
  } catch (error) {
    console.error("Error starting speech recognition:", error);
    return false;
  }
};

export const stopRecording = (recognition) => {
  if (recognition) {
    try {
      recognition.stop();
      return true;
    } catch (error) {
      console.error("Error stopping speech recognition:", error);
      return false;
    }
  }
  return false;
};

export const checkSpeechSupport = () => {
  const support = {
    recognition:
      "webkitSpeechRecognition" in window || "SpeechRecognition" in window,
    synthesis: "speechSynthesis" in window,
  };

  return support;
};

// Error handling for speech recognition
export const handleSpeechError = (error) => {
  const errorMessages = {
    "no-speech": "No speech detected. Please try again.",
    "audio-capture":
      "No microphone found. Please check your microphone settings.",
    "not-allowed": "Microphone access denied. Please allow microphone access.",
    network: "Network error. Please check your internet connection.",
    "language-not-supported": "Language not supported.",
    "service-not-allowed": "Speech service not allowed.",
    "bad-grammar": "Grammar error in speech recognition.",
    aborted: "Speech recognition aborted.",
  };

  return (
    errorMessages[error] || "An unknown error occurred with speech recognition."
  );
};

// Get preferred voice for speech synthesis
export const getPreferredVoice = (lang = "en-US") => {
  const voices = getAvailableVoices();

  // Try to find a voice that matches the language
  const preferredVoice = voices.find((voice) => voice.lang === lang);

  if (preferredVoice) {
    return preferredVoice;
  }

  // Fallback to first available voice
  return voices[0] || null;
};
