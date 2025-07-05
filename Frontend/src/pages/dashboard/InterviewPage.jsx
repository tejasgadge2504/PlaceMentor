import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";

const InterviewPage = () => {
  const location = useLocation();
  const questionData = location.state; // ✅ Received from navigate state

  const [userAnswer, setUserAnswer] = useState(""); // ✅ Final saved answer
  const [loading, setLoading] = useState(false); // 🔄 Loading state for submit button
  const [feedbackRes, setFeedbackRes] = useState(null); // ✅ Store API response properly

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div className="text-center mt-10">Your browser does not support speech recognition.</div>;
  }

  const feedbackAnalysis = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/evaluate-answer", {
        question: questionData.question,
        user_answer: userAnswer,
      });

      setFeedbackRes(response.data);
      console.log("Feedback Response:", response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartListening = () => {
    resetTranscript(); // Clear previous
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setUserAnswer(transcript); // Save transcript to variable
  };

  if (!questionData || !questionData.question) {
    return <div className="text-center mt-10">No question data found.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa] flex flex-col items-center justify-center p-4 space-y-6">
      {/* 🧾 Question Card */}
      <Card className="max-w-2xl w-full shadow-xl">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-semibold text-center">Interview Question</h1>
          <p className="text-lg text-gray-800">
            <strong>Question:</strong> {questionData.question}
          </p>
          <div className="text-sm text-gray-500">
            <p><strong>Topic:</strong> {questionData.topic}</p>
            <p><strong>Difficulty:</strong> {questionData.difficulty}</p>
            <p><strong>Why this question:</strong> {questionData.why_this_question}</p>
          </div>
        </CardContent>
      </Card>

      {/* 🎙️ Microphone Controls */}
      <div className="flex gap-4">
        <Button onClick={handleStartListening} disabled={listening}>
          🎤 Start Speaking
        </Button>
        <Button onClick={handleStopListening} variant="destructive" disabled={!listening}>
          🛑 Stop & Save Answer
        </Button>
      </div>

      {/* 🗣️ Transcript Display */}
      <div className="max-w-2xl w-full mt-4 bg-white p-4 rounded shadow">
        <h2 className="font-semibold text-lg mb-2">Your Spoken Answer:</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{transcript || "Start speaking to see transcript..."}</p>
      </div>

      {/* ✅ Final Saved Answer */}
      {userAnswer && (
        <>
          <div className="max-w-2xl w-full bg-green-50 p-4 rounded border border-green-300 mt-2">
            <h2 className="font-semibold text-green-700">Saved Answer:</h2>
            <p className="text-green-800 whitespace-pre-wrap">{userAnswer}</p>
          </div>

          {/* 🚀 Submit Button */}
          <div className="submit-answer">
            <Button onClick={feedbackAnalysis} disabled={listening || loading}>
              {loading ? "Submitting..." : "Submit Answer"}
            </Button>
          </div>
        </>
      )}

      {/* 🧠 Feedback Results */}
      {feedbackRes && (
        <div className="max-w-2xl w-full mt-6 bg-blue-50 p-6 rounded-lg border border-blue-300 shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">AI Feedback Summary</h2>

          {feedbackRes.correctedAnswer ? (
            <>
              <p className="mb-2 font-medium">✅ <strong>Corrected Answer:</strong></p>
              <p className="text-gray-800 mb-4 whitespace-pre-wrap">{feedbackRes.correctedAnswer}</p>
            </>
          ) : (
            <p className="text-gray-500">No corrected answer received.</p>
          )}

          {feedbackRes.feedback ? (
            <>
              <p className="mb-2 font-medium">🧠 <strong>Feedback:</strong></p>
              <p className="text-gray-800 mb-4 whitespace-pre-wrap">{feedbackRes.feedback}</p>
            </>
          ) : (
            <p className="text-gray-500">No feedback provided.</p>
          )}

          <p className="text-sm text-gray-700">
            <strong>Repeat Required:</strong>{" "}
            {feedbackRes.repeatStatus !== undefined ? (feedbackRes.repeatStatus ? "Yes" : "No") : "N/A"}
          </p>

          <p className="text-sm text-gray-700">
            <strong>Score:</strong> {feedbackRes.score !== undefined ? `${feedbackRes.score} / 10` : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
