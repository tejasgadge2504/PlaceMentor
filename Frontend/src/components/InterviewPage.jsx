/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Mic,
  MicOff,
  Pause,
  RotateCcw,
  ChevronRight,
  MessageSquare,
  Volume2,
} from "lucide-react";
import Navigation from "./Navigation";
import { generateFeedback } from "../utils/apiUtils";

const InterviewPage = ({
  questions,
  currentQ,
  currentQno,
  totalQuestions,
  userResponse,
  setUserResponse,
  currentFeedback,
  setCurrentFeedback,
  allResponses,
  setAllResponses,
  isRecording,
  setIsRecording,
  isPlaying,
  setIsPlaying,
  speechServices,
  goToPrevious,
  goToNext,
  exitInterview,
  isLoading,
  setIsLoading,
  selectedCompany,
  selectedRole,
  selectedLevel,
}) => {
  // Initialize speech recognition
  useEffect(() => {
    if (speechServices && speechServices.recognition) {
      const recognition = speechServices.recognition;

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserResponse(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };
    }
  }, [speechServices, setUserResponse, setIsRecording]);

  const startRecording = () => {
    if (speechServices && speechServices.recognition) {
      try {
        setIsRecording(true);
        setUserResponse("");
        speechServices.recognition.start();
      } catch (error) {
        console.error("Error starting recording:", error);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (speechServices && speechServices.recognition) {
      try {
        speechServices.recognition.stop();
        setIsRecording(false);
      } catch (error) {
        console.error("Error stopping recording:", error);
        setIsRecording(false);
      }
    }
  };

  const playQuestion = () => {
    if (speechServices && speechServices.synthesis && currentQ) {
      const utterance = new SpeechSynthesisUtterance(currentQ);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      speechServices.synthesis.speak(utterance);
    }
  };

  const stopPlaying = () => {
    if (speechServices && speechServices.synthesis) {
      speechServices.synthesis.cancel();
      setIsPlaying(false);
    }
  };

  const getFeedback = async () => {
    if (!userResponse.trim()) {
      alert("Please provide a response first");
      return;
    }

    setIsLoading(true);

    try {
      const feedbackData = await generateFeedback({
        question: currentQ,
        response: userResponse,
        company: selectedCompany,
        role: selectedRole,
        level: selectedLevel,
      });

      if (feedbackData && feedbackData.feedback) {
        setCurrentFeedback(feedbackData.feedback);

        // Save the response and feedback
        const responseData = {
          questionNumber: currentQno + 1,
          question: currentQ,
          response: userResponse,
          feedback: feedbackData.feedback,
          timestamp: new Date().toISOString(),
        };

        // Update allResponses array
        const newResponses = [...allResponses];
        newResponses[currentQno] = responseData;
        setAllResponses(newResponses);
      } else {
        setCurrentFeedback(
          "Thank you for your response. Consider adding more specific examples to strengthen your answer."
        );
      }
    } catch (error) {
      console.error("Error generating feedback:", error);
      setCurrentFeedback(
        "Thank you for your response. Consider adding more specific examples to strengthen your answer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (currentQno < totalQuestions - 1) {
      goToNext();
    } else {
      // Go to feedback page
      goToNext();
    }
  };

  const handlePrevious = () => {
    if (currentQno > 0) {
      goToPrevious();
    } else {
      goToPrevious(); // Go back to setup
    }
  };

  const clearResponse = () => {
    setUserResponse("");
    setCurrentFeedback("");
  };

  const progressPercentage = ((currentQno + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <Navigation
          showPrevious={true}
          showNext={currentFeedback ? true : false}
          showExit={true}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onExit={exitInterview}
          title={`Question ${currentQno + 1} of ${totalQuestions}`}
          nextLabel={
            currentQno < totalQuestions - 1
              ? "Next Question"
              : "Finish Interview"
          }
        />

        <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
          {/* Interview Info */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Interview in Progress
              </h2>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{selectedCompany}</span> •
                <span className="font-medium"> {selectedRole}</span> •
                <span className="font-medium"> {selectedLevel}</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <div className="text-lg font-semibold text-blue-600">
                {currentQno + 1} / {totalQuestions}
              </div>
              <div className="text-sm text-gray-500">Questions</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Question Section */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  Question {currentQno + 1}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={isPlaying ? stopPlaying : playQuestion}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" />
                        Stop
                      </>
                    ) : (
                      <>
                        <Volume2 className="h-4 w-4" />
                        Play
                      </>
                    )}
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                {currentQ}
              </p>
            </div>
          </div>

          {/* Recording Section */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  disabled={isLoading}
                  className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg ${
                    isRecording
                      ? "bg-red-500 text-white hover:bg-red-600 animate-pulse"
                      : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="h-6 w-6" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="h-6 w-6" />
                      Start Recording
                    </>
                  )}
                </button>

                {userResponse && (
                  <button
                    onClick={clearResponse}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </button>
                )}
              </div>

              {isRecording && (
                <div className="mt-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    Recording... Speak now
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Response */}
          {userResponse && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-green-600" />
                Your Response:
              </h4>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">{userResponse}</p>
              </div>

              {!currentFeedback && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={getFeedback}
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      isLoading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Analyzing Response...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-5 w-5" />
                        Get Feedback
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Feedback */}
          {currentFeedback && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-600" />
                AI Feedback:
              </h4>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  {currentFeedback}
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {currentQno < totalQuestions - 1 ? (
                    <>
                      Next Question
                      <ChevronRight className="h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Finish Interview
                      <ChevronRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Instructions */}
          {!userResponse && !isRecording && (
            <div className="text-center text-gray-500">
              <p className="text-sm">
                Click &quot;Start Recording&quot; to begin answering the
                question. You can also manually type your response in the text
                area below.
              </p>
              <div className="mt-4">
                <textarea
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                  placeholder="Or type your response here..."
                  className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows="4"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
InterviewPage.propTypes = {
  questions: PropTypes.array.isRequired,
  currentQ: PropTypes.string.isRequired,
  currentQno: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  userResponse: PropTypes.string.isRequired,
  setUserResponse: PropTypes.func.isRequired,
  currentFeedback: PropTypes.string.isRequired,
  setCurrentFeedback: PropTypes.func.isRequired,
  allResponses: PropTypes.array.isRequired,
  setAllResponses: PropTypes.func.isRequired,
  isRecording: PropTypes.bool.isRequired,
  setIsRecording: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setIsPlaying: PropTypes.func.isRequired,
  speechServices: PropTypes.shape({
    recognition: PropTypes.object,
    synthesis: PropTypes.object,
  }).isRequired,
  goToPrevious: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
  exitInterview: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  selectedCompany: PropTypes.string.isRequired,
  selectedRole: PropTypes.string.isRequired,
  selectedLevel: PropTypes.string.isRequired,
};

export default InterviewPage;
