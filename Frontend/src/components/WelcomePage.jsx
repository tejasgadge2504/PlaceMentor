/* eslint-disable no-unused-vars */
import { User, ChevronRight, Target, Mic, Brain } from "lucide-react";
import PropTypes from "prop-types";

const WelcomePage = ({ onStart, isApiConnected }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        {/* Header and other content */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Interview Warmup
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Practice your interview skills with AI-powered questions and
            feedback
          </p>
          <p className="text-gray-500">
            Get ready for your dream job with personalized interview practice
          </p>
        </div>
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Tailored Questions
            </h3>
            <p className="text-sm text-gray-600">
              Questions customized for your target company and role
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mic className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Voice Practice</h3>
            <p className="text-sm text-gray-600">
              Practice speaking with speech-to-text technology
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">AI Feedback</h3>
            <p className="text-sm text-gray-600">
              Get instant feedback to improve your responses
            </p>
          </div>
        </div>
        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Interview Practice
          <ChevronRight className="h-6 w-6" />
        </button>
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            No registration required • Practice as many times as you want
          </p>
        </div>
      </div>
    </div>
  );
};

// Update PropTypes validation for the onStart prop
WelcomePage.propTypes = {
  onStart: PropTypes.func.isRequired,
  isApiConnected: PropTypes.bool,
};

export default WelcomePage;
