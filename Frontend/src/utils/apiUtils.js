// Fallback for process.env
const process = {
  env: {
    REACT_APP_API_URL: "http://localhost:8000",
  },
};

// API utilities for communicating with Python backend agents
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// Default configuration for API calls
const defaultConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 seconds timeout
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const config = {
    ...defaultConfig,
    ...options,
    headers: {
      ...defaultConfig.headers,
      ...options.headers,
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Request timeout");
    }
    throw error;
  }
};

// Generate questions from your Python agent
export const generateQuestions = async (requestData) => {
  try {
    const response = await apiCall("/api/generate-questions", {
      method: "POST",
      body: JSON.stringify({
        company: requestData.company,
        role: requestData.role,
        level: requestData.level,
        resumeSummary: requestData.resumeSummary,
        questionCount: requestData.questionCount || 5,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error generating questions:", error);
    // Fallback questions if API fails
    return {
      questions: [
        `Tell me about yourself and your background in ${requestData.role}.`,
        `Why do you want to work at ${requestData.company}?`,
        `Describe a challenging project you've worked on recently.`,
        `What are your strengths and weaknesses?`,
        `Where do you see yourself in 5 years?`,
      ],
    };
  }
};

// Process resume and get summary
export const processResume = async (resumeFile) => {
  try {
    const formData = new FormData();
    formData.append("resume", resumeFile);

    const response = await fetch(`${API_BASE_URL}/api/process-resume`, {
      method: "POST",
      body: formData,
      headers: {
        // Don't set Content-Type for FormData, let browser set it
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error processing resume:", error);
    // Fallback summary if API fails
    return {
      summary:
        "Experienced professional with diverse background and strong technical skills.",
    };
  }
};

// Generate feedback from your Python agent
export const generateFeedback = async (questionData) => {
  try {
    const response = await apiCall("/api/generate-feedback", {
      method: "POST",
      body: JSON.stringify({
        question: questionData.question,
        answer: questionData.answer,
        company: questionData.company,
        role: questionData.role,
        level: questionData.level,
      }),
    });
    return response;
  } catch (error) {
    console.error("Error generating feedback:", error);
    // Fallback feedback if API fails
    return {
      feedback: {
        overallScore: 7,
        strengths: ["Clear communication", "Relevant experience mentioned"],
        improvements: [
          "Could provide more specific examples",
          "Consider adding metrics to demonstrate impact",
        ],
        detailedFeedback:
          "Your response shows good understanding of the role. Consider adding more specific examples to strengthen your answer.",
      },
    };
  }
};

// Health check for API
export const healthCheck = async () => {
  try {
    const response = await apiCall("/api/health");
    return response;
  } catch (error) {
    console.error("Health check failed:", error);
    return { status: "error", message: error.message };
  }
};
