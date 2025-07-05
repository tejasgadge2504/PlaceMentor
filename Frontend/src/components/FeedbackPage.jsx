
import PropTypes from "prop-types";
import {
  CheckCircle,
  MessageSquare,
  RotateCcw,
  Download,
  Share2,
  Star,
} from "lucide-react";
import Navigation from "./Navigation";

const FeedbackPage = ({
  allResponses,
  setAllResponses,
  selectedCompany,
  selectedRole,
  selectedLevel,
  resetInterviewState,
  goToPage,
  exitInterview,
}) => {
  const handleStartNewInterview = () => {
    resetInterviewState();
    setAllResponses([]);
    goToPage("welcome");
  };

  const handleRetakeInterview = () => {
    resetInterviewState();
    goToPage("setup");
  };

  const downloadResults = () => {
    const results = {
      company: selectedCompany,
      role: selectedRole,
      level: selectedLevel,
      date: new Date().toISOString(),
      responses: allResponses,
    };

    const dataStr = JSON.stringify(results, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `interview_results_${selectedCompany}_${selectedRole}_${new Date().toLocaleDateString()}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: "Interview Practice Results",
        text: `I just completed an interview practice session for ${selectedRole} at ${selectedCompany}!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `I just completed an interview practice session for ${selectedRole} at ${selectedCompany}!`;
      navigator.clipboard.writeText(text).then(() => {
        alert("Results copied to clipboard!");
      });
    }
  };

  const calculateOverallScore = () => {
    // Simple scoring based on response length and completion
    const completedResponses = allResponses.filter(
      (r) => r.response && r.response.trim().length > 0
    );
    const avgResponseLength =
      completedResponses.reduce((sum, r) => sum + r.response.length, 0) /
      completedResponses.length;

    let score = 0;
    if (completedResponses.length === allResponses.length) score += 40; // Completion bonus
    if (avgResponseLength > 100) score += 30; // Detail bonus
    if (avgResponseLength > 200) score += 20; // Extra detail bonus
    score += Math.min(10, completedResponses.length * 2); // Question completion

    return Math.min(100, score);
  };

  const overallScore = calculateOverallScore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Navigation */}
        <Navigation
          showPrevious={false}
          showNext={false}
          showExit={true}
          onExit={exitInterview}
          title="Interview Complete"
        />

        <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Interview Complete! 🎉
            </h2>
            <p className="text-gray-600 text-lg">
              You&apos;ve successfully completed your interview practice for{" "}
              <span className="font-semibold text-blue-600">
                {selectedRole}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-blue-600">
                {selectedCompany}
              </span>
            </p>
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Overall Performance
                </h3>
                <p className="text-gray-600">
                  Based on completion rate and response quality
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-blue-600 mb-1">
                  {overallScore}%
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(overallScore / 20)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interview Summary */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {allResponses.length}
                </div>
                <div className="text-sm text-gray-600">Questions Answered</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {
                    allResponses.filter(
                      (r) => r.response && r.response.trim().length > 0
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Completed Responses</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {selectedLevel}
                </div>
                <div className="text-sm text-gray-600">Interview Type</div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Detailed Results
            </h3>
            <div className="space-y-6">
              {allResponses.map((response, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-semibold text-lg text-gray-800 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                      Question {response.questionNumber}
                    </h4>
                    <span className="text-sm text-gray-500">
                      {new Date(response.timestamp).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-700 font-medium mb-2">
                      {response.question}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h5 className="font-medium text-gray-800 mb-2">
                      Your Response:
                    </h5>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700">
                        {response.response || "No response provided"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">
                      AI Feedback:
                    </h5>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-gray-700">
                        {response.feedback || "No feedback available"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadResults}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              Download Results
            </button>

            <button
              onClick={shareResults}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Share2 className="h-5 w-5" />
              Share Results
            </button>

            <button
              onClick={handleRetakeInterview}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="h-5 w-5" />
              Retake Interview
            </button>

            <button
              onClick={handleStartNewInterview}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              <CheckCircle className="h-5 w-5" />
              New Interview
            </button>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="font-semibold text-yellow-800 mb-2">
              💡 Tips for Improvement:
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>
                • Practice your responses with specific examples and metrics
              </li>
              <li>• Research the company values and recent news</li>
              <li>• Prepare questions to ask the interviewer</li>
              <li>• Practice with a friend or in front of a mirror</li>
              <li>• Review your feedback and work on areas for improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
FeedbackPage.propTypes = {
  allResponses: PropTypes.arrayOf(
    PropTypes.shape({
      questionNumber: PropTypes.number,
      question: PropTypes.string,
      response: PropTypes.string,
      feedback: PropTypes.string,
      timestamp: PropTypes.string,
    })
  ).isRequired,
  setAllResponses: PropTypes.func.isRequired,
  selectedCompany: PropTypes.string.isRequired,
  selectedRole: PropTypes.string.isRequired,
  selectedLevel: PropTypes.string.isRequired,
  resetInterviewState: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired,
  exitInterview: PropTypes.func.isRequired,
};

export default FeedbackPage;
