// import React from "react";
import {
  Upload,
  ChevronRight,
  Briefcase,
  User,
  Building,
  FileText,
} from "lucide-react";
import PropTypes from "prop-types";
import Navigation from "./Navigation";
import { generateQuestions } from "../utils/apiUtils";

const SetupPage = ({
  resumeFile,
  setResumeFile,
  resumeSummary,
  setResumeSummary,
  selectedCompany,
  setSelectedCompany,
  selectedRole,
  setSelectedRole,
  selectedLevel,
  setSelectedLevel,
  setQuestions,
  setCurrentQ,
  setTotalQuestions,
  setCurrentQno,
  goToPrevious,
  goToNext,
  exitInterview,
  isLoading,
  setIsLoading,
}) => {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Apple",
    "Meta",
    "Netflix",
    "Tesla",
    "Uber",
  ];

  const roles = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "DevOps Engineer",
    "UX Designer",
    "Marketing Manager",
    "Business Analyst",
    "Project Manager",
  ];

  const levels = ["Technical", "HR"];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      setIsLoading(true);

      try {
        // In a real app, you'd extract text from the PDF/DOC
        // For now, we'll simulate resume processing
        setTimeout(() => {
          const mockSummary = `Professional with experience in ${
            selectedRole || "software development"
          } with strong technical skills and leadership experience. Worked on various projects involving modern technologies and frameworks.`;
          setResumeSummary(mockSummary);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error processing resume:", error);
        setIsLoading(false);
      }
    }
  };

  const handleStartInterview = async () => {
    if (!selectedCompany || !selectedRole || !selectedLevel) {
      alert("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const questionsData = await generateQuestions({
        company: selectedCompany,
        role: selectedRole,
        level: selectedLevel,
        resumeSummary: resumeSummary,
      });

      if (questionsData && questionsData.questions) {
        setQuestions(questionsData.questions);
        setCurrentQ(questionsData.questions[0]);
        setTotalQuestions(questionsData.questions.length);
        setCurrentQno(0);
        goToNext();
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = selectedCompany && selectedRole && selectedLevel;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Navigation */}
        <Navigation
          showPrevious={true}
          showNext={false}
          showExit={true}
          onPrevious={goToPrevious}
          onExit={exitInterview}
          title="Interview Setup"
        />

        <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Setup Your Interview
            </h2>
            <p className="text-gray-600">
              Configure your interview preferences to get personalized questions
            </p>
          </div>

          {/* Resume Upload */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <FileText className="inline-block h-4 w-4 mr-2" />
              Upload Resume (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
                disabled={isLoading}
              />
              <label htmlFor="resume-upload" className="cursor-pointer block">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-2">
                  {resumeFile ? (
                    <span className="text-green-600 font-medium">
                      {resumeFile.name}
                    </span>
                  ) : (
                    "Click to upload your resume (PDF, DOC, DOCX)"
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  Upload your resume to get more personalized questions
                </p>
              </label>
            </div>
            {isLoading && resumeFile && (
              <p className="text-sm text-blue-600 mt-2">Processing resume...</p>
            )}
          </div>

          {/* Company Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Building className="inline-block h-4 w-4 mr-2" />
              Target Company *
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company} value={company}>
                  {company}
                </option>
              ))}
            </select>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Briefcase className="inline-block h-4 w-4 mr-2" />
              Target Role *
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              required
            >
              <option value="">Select a role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Level Selection */}
          <div className="mb-10">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <User className="inline-block h-4 w-4 mr-2" />
              Interview Type *
            </label>
            <div className="grid grid-cols-2 gap-4">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    selectedLevel === level
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    {level === "Technical" ? (
                      <Briefcase className="h-6 w-6" />
                    ) : (
                      <User className="h-6 w-6" />
                    )}
                    <div>
                      <div className="font-semibold text-lg">{level}</div>
                      <div className="text-sm text-gray-600">
                        {level === "Technical"
                          ? "Coding & Technical Skills"
                          : "Behavioral & HR Questions"}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartInterview}
            disabled={!isFormValid || isLoading}
            className={`w-full py-4 px-8 rounded-lg font-semibold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
              isFormValid && !isLoading
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating Questions...
              </>
            ) : (
              <>
                Start Interview
                <ChevronRight className="h-6 w-6" />
              </>
            )}
          </button>

          {/* Form Requirements */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">* Required fields</p>
          </div>
        </div>
      </div>
    </div>
  );
};

SetupPage.propTypes = {
  resumeFile: PropTypes.object,
  setResumeFile: PropTypes.func.isRequired,
  resumeSummary: PropTypes.string,
  setResumeSummary: PropTypes.func.isRequired,
  selectedCompany: PropTypes.string,
  setSelectedCompany: PropTypes.func.isRequired,
  selectedRole: PropTypes.string,
  setSelectedRole: PropTypes.func.isRequired,
  selectedLevel: PropTypes.string,
  setSelectedLevel: PropTypes.func.isRequired,
  setQuestions: PropTypes.func.isRequired,
  setCurrentQ: PropTypes.func.isRequired,
  setTotalQuestions: PropTypes.func.isRequired,
  setCurrentQno: PropTypes.func.isRequired,
  goToPrevious: PropTypes.func.isRequired,
  goToNext: PropTypes.func.isRequired,
  exitInterview: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default SetupPage;
