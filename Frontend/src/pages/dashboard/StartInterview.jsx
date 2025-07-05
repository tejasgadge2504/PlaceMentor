import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";

const StartInterview = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Qcount = localStorage.getItem("QuestionCount");
//   console.log(Qcount);
  const handleStart = async () => {
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



      // ✅ pass response directly via state (no localStorage)
      navigate("/interview-page", { state: response.data });

    } catch (error) {
      console.error("Error starting interview:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#f4f6fa]">
      <Button onClick={handleStart} disabled={loading}>
        {loading ? "Starting..." : "Start Interview"}
      </Button>
    </div>
  );
};

export default StartInterview;
