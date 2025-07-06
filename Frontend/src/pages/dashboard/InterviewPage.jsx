/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";

const InterviewPage = () => {
  const location = useLocation();
  const questionData = location.state;
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackRes, setFeedbackRes] = useState(null);
  const navigate = useNavigate();
  const Qcount = parseInt(localStorage.getItem("QuestionCount"), 10);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="text-center mt-10">
        Your browser does not support speech recognition.
      </div>
    );
  }

  const feedbackAnalysis = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/evaluate-answer",
        {
          question: questionData.question,
          user_answer: userAnswer,
        }
      );
      setFeedbackRes(response.data);
      console.log("Feedback Response:", response.data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true });
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
    setUserAnswer(transcript);
  };

  const repeatQuestion =async()=>{
   setLoading(true);
    try {
      const storedPlan = localStorage.getItem("InterviewPlan");
      if (!storedPlan) {
        throw new Error("No InterviewPlan found in localStorage.");
      }
      const parsedPlan = JSON.parse(storedPlan);
      const response = await axios.post("http://127.0.0.1:5000/get-question", {
        sr_no: Qcount,
        interview_plan: {
          interview_plan: parsedPlan,
        },
      });
      navigate("/interview-page", { state: response.data });
   // Wait a moment then reload
    setTimeout(() => {
      window.location.reload();
    }, 100); // 100ms delay to allow navigation to complete

    } catch (error) {
      console.error("Error starting interview:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const nextQuestion =async()=>{
   setLoading(true);
    try {
      const storedPlan = localStorage.getItem("InterviewPlan");
      if (!storedPlan) {
        throw new Error("No InterviewPlan found in localStorage.");
      }
      const parsedPlan = JSON.parse(storedPlan);
      const newCount = Qcount + 1;
      const response = await axios.post("http://127.0.0.1:5000/get-question", {
        sr_no: newCount,
        interview_plan: {
          interview_plan: parsedPlan,
        },
      });

      localStorage.setItem("QuestionCount", newCount.toString());
      navigate("/interview-page", { state: response.data });

      // Wait a moment then reload
    setTimeout(() => {
      window.location.reload();
    }, 100); // 100ms delay to allow navigation to complete

    } catch (error) {
      console.error("Error starting interview:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  if (!questionData || !questionData.question) {
    return <div className="text-center mt-10">No question data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 pt-10">
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto p-6">
        <div className="w-full lg:w-1/2 space-y-6">
          <Card className="w-full shadow-lg rounded-xl">
            <CardContent className="p-6 space-y-6">
              <h1 className="text-2xl font-bold text-center text-gray-800">
                Interview Question
              </h1>
              <div className="space-y-4">
                <p className="text-lg text-gray-800 font-medium">
                  <strong>Question:</strong> {questionData.question}
                </p>
                <div className="flex gap-2">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Topic: {questionData.topic}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Difficulty: {questionData.difficulty}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="font-semibold text-xl mb-4 text-gray-800">
              Your Spoken Answer:
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap p-4 bg-gray-50 rounded-lg">
              {transcript || "Start speaking to see transcript..."}
            </p>
          </div>

          {userAnswer && (
            <div className="bg-green-50 p-6 rounded-xl border border-green-300">
              <h2 className="font-semibold text-xl text-green-800 mb-2">
                Saved Answer:
              </h2>
              <p className="text-green-800 whitespace-pre-wrap p-4 bg-green-100 rounded-lg">
                {userAnswer}
              </p>
            </div>
          )}

          <div className="flex justify-center gap-6 mt-6">
            <Button
              onClick={handleStartListening}
              disabled={listening}
              className="h-12 text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              🎤 Start Speaking
            </Button>
            <Button
              onClick={handleStopListening}
              variant="destructive"
              disabled={!listening}
              className="h-12 text-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              🛑 Stop & Save Answer
            </Button>
          </div>

          {userAnswer && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={feedbackAnalysis}
                disabled={listening || loading}
                className="h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {loading ? "Submitting..." : "Submit Answer"}
              </Button>
            </div>
          )}
        </div>

        {feedbackRes && (
          <div className="w-full lg:w-1/2 bg-blue-50 p-6 rounded-xl border border-blue-300 shadow-md">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">
              AI Feedback Summary
            </h2>
            <div className="space-y-4">
              {feedbackRes.feedback && (
                <div className="bg-white p-4 rounded-lg">
                  <p className="mb-2 font-semibold text-lg text-blue-700">
                    🧠 Feedback:
                  </p>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {feedbackRes.feedback}
                  </p>
                </div>
              )}
              {feedbackRes.correctedAnswer && (
                <div className="bg-white p-4 rounded-lg">
                  <p className="mb-2 font-semibold text-lg text-blue-700">
                    ✅ Corrected Answer:
                  </p>
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {feedbackRes.correctedAnswer}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 text-gray-700">
                <p className="bg-white p-4 rounded-lg">
                  <strong>Repeat Required:</strong>{" "}
                  {feedbackRes.repeatStatus !== undefined
                    ? feedbackRes.repeatStatus
                      ? "Yes"
                      : "No"
                    : "N/A"}
                </p>
                <p className="bg-white p-4 rounded-lg">
                  <strong>Score:</strong>{" "}
                  {feedbackRes.score !== undefined
                    ? `${feedbackRes.score} / 10`
                    : "N/A"}
                </p>
              </div>
              <div className="flex gap-4 justify-around">
                <Button
                
                onClick={repeatQuestion}
                disabled={feedbackRes.repeatStatus && feedbackRes.score>=4 ? true:false}
                className="cursor-pointer h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Repeat
              </Button>
              <Button
                onClick={nextQuestion}
                disabled={feedbackRes.repeatStatus&& feedbackRes.score>=4 ? false:true}
                className="cursor-pointer h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Next Question
              </Button>
              </div>
              <p className="text-red-500">* you can move to next question only when score if greater than equals to 6</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
