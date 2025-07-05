/* eslint-disable no-unused-vars */
// Local storage utilities for persisting interview data

// Storage keys
const STORAGE_KEYS = {
  INTERVIEW_SESSION: "interview_session",
  RESUME_SUMMARY: "resume_summary",
  QUESTIONS: "interview_questions",
  RESPONSES: "interview_responses",
  FEEDBACK: "interview_feedback",
  USER_PREFERENCES: "user_preferences",
  INTERVIEW_HISTORY: "interview_history",
};

// Check if localStorage is available
const isLocalStorageAvailable = () => {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

// Generic storage functions
export const setItem = (key, value) => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available");
    return false;
  }

  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    return true;
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    return false;
  }
};

export const getItem = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available");
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available");
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing from localStorage:", error);
    return false;
  }
};

export const clearAll = () => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available");
    return false;
  }

  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing localStorage:", error);
    return false;
  }
};

// Interview session management
export const saveInterviewSession = (sessionData) => {
  const session = {
    id: sessionData.id || Date.now().toString(),
    company: sessionData.company,
    role: sessionData.role,
    level: sessionData.level,
    resumeSummary: sessionData.resumeSummary,
    startTime: sessionData.startTime || new Date().toISOString(),
    status: sessionData.status || "active",
    currentQuestionIndex: sessionData.currentQuestionIndex || 0,
    ...sessionData,
  };

  return setItem(STORAGE_KEYS.INTERVIEW_SESSION, session);
};

export const getInterviewSession = () => {
  return getItem(STORAGE_KEYS.INTERVIEW_SESSION);
};

export const clearInterviewSession = () => {
  return removeItem(STORAGE_KEYS.INTERVIEW_SESSION);
};

export const updateInterviewSession = (updates) => {
  const currentSession = getInterviewSession();
  if (!currentSession) {
    console.error("No active interview session found");
    return false;
  }

  const updatedSession = {
    ...currentSession,
    ...updates,
    lastUpdated: new Date().toISOString(),
  };

  return saveInterviewSession(updatedSession);
};

// Resume summary management
export const saveResumeSummary = (summary) => {
  return setItem(STORAGE_KEYS.RESUME_SUMMARY, {
    summary,
    timestamp: new Date().toISOString(),
  });
};

export const getResumeSummary = () => {
  const data = getItem(STORAGE_KEYS.RESUME_SUMMARY);
  return data ? data.summary : null;
};

// Questions management
export const saveQuestions = (questions) => {
  return setItem(STORAGE_KEYS.QUESTIONS, {
    questions,
    timestamp: new Date().toISOString(),
  });
};

export const getQuestions = () => {
  const data = getItem(STORAGE_KEYS.QUESTIONS);
  return data ? data.questions : [];
};

// Responses management
export const saveResponse = (questionIndex, question, answer) => {
  const responses = getResponses();
  responses[questionIndex] = {
    question,
    answer,
    timestamp: new Date().toISOString(),
  };

  return setItem(STORAGE_KEYS.RESPONSES, responses);
};

export const getResponses = () => {
  return getItem(STORAGE_KEYS.RESPONSES, {});
};

export const getResponse = (questionIndex) => {
  const responses = getResponses();
  return responses[questionIndex] || null;
};

// Feedback management
export const saveFeedback = (questionIndex, feedback) => {
  const allFeedback = getAllFeedback();
  allFeedback[questionIndex] = {
    feedback,
    timestamp: new Date().toISOString(),
  };

  return setItem(STORAGE_KEYS.FEEDBACK, allFeedback);
};

export const getAllFeedback = () => {
  return getItem(STORAGE_KEYS.FEEDBACK, {});
};

export const getFeedback = (questionIndex) => {
  const allFeedback = getAllFeedback();
  return allFeedback[questionIndex]
    ? allFeedback[questionIndex].feedback
    : null;
};

// User preferences
export const saveUserPreferences = (preferences) => {
  return setItem(STORAGE_KEYS.USER_PREFERENCES, {
    ...preferences,
    timestamp: new Date().toISOString(),
  });
};

export const getUserPreferences = () => {
  return getItem(STORAGE_KEYS.USER_PREFERENCES, {
    speechRate: 1,
    speechPitch: 1,
    speechVolume: 1,
    autoPlay: true,
    darkMode: false,
  });
};

// Interview history
export const saveToHistory = (interviewData) => {
  const history = getInterviewHistory();
  const historyItem = {
    id: interviewData.id || Date.now().toString(),
    company: interviewData.company,
    role: interviewData.role,
    level: interviewData.level,
    date: interviewData.date || new Date().toISOString(),
    questionsCount: interviewData.questionsCount || 0,
    completedQuestions: interviewData.completedQuestions || 0,
    averageScore: interviewData.averageScore || 0,
    duration: interviewData.duration || 0,
    status: interviewData.status || "completed",
  };

  history.unshift(historyItem);

  // Keep only last 10 interviews
  if (history.length > 10) {
    history.splice(10);
  }

  return setItem(STORAGE_KEYS.INTERVIEW_HISTORY, history);
};

export const getInterviewHistory = () => {
  return getItem(STORAGE_KEYS.INTERVIEW_HISTORY, []);
};

export const clearInterviewHistory = () => {
  return removeItem(STORAGE_KEYS.INTERVIEW_HISTORY);
};

// Complete interview data management
export const saveCompleteInterviewData = () => {
  const session = getInterviewSession();
  if (!session) {
    console.error("No active interview session found");
    return false;
  }

  const questions = getQuestions();
  const responses = getResponses();
  const feedback = getAllFeedback();

  const completedQuestions = Object.keys(responses).length;
  const totalQuestions = questions.length;

  // Calculate average score
  const feedbackScores = Object.values(feedback).map(
    (f) => f.feedback?.overallScore || 0
  );
  const averageScore =
    feedbackScores.length > 0
      ? feedbackScores.reduce((a, b) => a + b, 0) / feedbackScores.length
      : 0;

  const interviewData = {
    ...session,
    questionsCount: totalQuestions,
    completedQuestions,
    averageScore,
    endTime: new Date().toISOString(),
    status: "completed",
  };

  return saveToHistory(interviewData);
};

// Export storage keys for reference
export { STORAGE_KEYS };
