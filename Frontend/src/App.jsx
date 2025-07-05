import InterviewSetup from "./pages/dashboard/InterviewSetup";

const App = () => {
  return <div>
    <InterviewSetup/>
  </div>;
};

export default App;

// import About from "./components/About";
// import Cta from "./components/Cta";
// import FAQ from "./components/FAQ";
// import Features from "./components/Features";
// import Footer from "./components/Footer";
// import Hero from "./components/Hero";
// import Navbar from "./components/Navbar";
// import Newsletter from "./components/Newsletter";
// // import Pricing from "./components/Pricing";
// import ScrollToTop from "./components/ScrollToTop";
// import Services from "./components/Services";
// import Team from "./components/Team";
// import HowItWorks from "./components/HowItWork"
// import Sponsors from "./components/Sponsor";
// import Testimonials from "./components/Testimonial";

// import "./App.css";
// import ResumeUploader from "./pages/ResumeUpload/ResumeUploader";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <ResumeUploader/>
//       <Sponsors />
//       <About />
//       <HowItWorks />
//       <Features />
//       <Services />
//       <Cta />
//       <Testimonials />
//       <Team />
//       {/* <Pricing /> */}
//       <Newsletter />
//       <FAQ />
//       <Footer />
//       <ScrollToTop />
//     </>
//   );
// }

// export default App;

// import { useState, useEffect } from "react";

// import "./App.css";

// // Import components (you'll need to create these based on your existing code)
// import WelcomePage from "./components/WelcomePage";
// import SetupPage from "./components/SetupPage";
// import InterviewPage from "./components/InterviewPage";
// import FeedbackPage from "./components/FeedbackPage";

// // Import utilities
// import {
//   saveInterviewSession,
//   getInterviewSession,
//   clearInterviewSession,
//   saveCompleteInterviewData,
// } from "./utils/storageUtils";
// import { healthCheck } from "./utils/apiUtils";

// const App = () => {
//   // Main application state
//   const [currentPage, setCurrentPage] = useState("welcome");
//   const [resumeSummary, setResumeSummary] = useState("");
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [allResponses, setAllResponses] = useState({});
//   const [isApiConnected, setIsApiConnected] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Check API connection on app load
//   useEffect(() => {
//     const checkApiConnection = async () => {
//       try {
//         await healthCheck();
//         setIsApiConnected(true);
//       } catch (error) {
//         console.error("API connection failed:", error);
//         setIsApiConnected(false);
//       }
//     };

//     checkApiConnection();
//   }, []);

//   // Load saved interview session on app load
//   useEffect(() => {
//     const savedSession = getInterviewSession();
//     if (savedSession && savedSession.status === "active") {
//       // Restore session
//       setResumeSummary(savedSession.resumeSummary || "");
//       setSelectedCompany(savedSession.company || "");
//       setSelectedRole(savedSession.role || "");
//       setSelectedLevel(savedSession.level || "");
//       setCurrentQuestionIndex(savedSession.currentQuestionIndex || 0);

//       // If session has questions, go to interview page
//       if (savedSession.questions && savedSession.questions.length > 0) {
//         setQuestions(savedSession.questions);
//         setCurrentPage("interview");
//       } else {
//         setCurrentPage("setup");
//       }
//     }
//   }, []);

//   // Save session whenever key state changes
//   useEffect(() => {
//     if (
//       currentPage !== "welcome" &&
//       (selectedCompany || selectedRole || selectedLevel)
//     ) {
//       const sessionData = {
//         company: selectedCompany,
//         role: selectedRole,
//         level: selectedLevel,
//         resumeSummary: resumeSummary,
//         questions: questions,
//         currentQuestionIndex: currentQuestionIndex,
//         status: "active",
//       };
//       saveInterviewSession(sessionData);
//     }
//   }, [
//     selectedCompany,
//     selectedRole,
//     selectedLevel,
//     resumeSummary,
//     questions,
//     currentQuestionIndex,
//     currentPage,
//   ]);

//   // Navigation functions
//   const goToPage = (page) => {
//     setCurrentPage(page);
//   };

//   const startInterview = () => {
//     if (!resumeSummary || !selectedCompany || !selectedRole || !selectedLevel) {
//       setError(
//         "Please complete all setup steps before starting the interview."
//       );
//       return;
//     }
//     setCurrentPage("interview");
//   };

//   const goToFeedback = () => {
//     setCurrentPage("feedback");
//   };

//   const resetInterviewState = () => {
//     setCurrentPage("welcome");
//     setResumeSummary("");
//     setSelectedCompany("");
//     setSelectedRole("");
//     setSelectedLevel("");
//     setQuestions([]);
//     setCurrentQuestionIndex(0);
//     setAllResponses({});
//     setError("");
//     clearInterviewSession();
//   };

//   const exitInterview = () => {
//     if (Object.keys(allResponses).length > 0) {
//       // Save completed interview data to history
//       saveCompleteInterviewData();
//     }
//     resetInterviewState();
//   };

//   // Error handling
//   const handleError = (errorMessage) => {
//     setError(errorMessage);
//     setIsLoading(false);
//   };

//   const clearError = () => {
//     setError("");
//   };

//   // Render current page
//   const renderCurrentPage = () => {
//     switch (currentPage) {
//       case "welcome":
//         return (
//           <WelcomePage
//             onStart={() => goToPage("setup")}
//             isApiConnected={isApiConnected}
//           />
//         );

//       case "setup":
//         return (
//           <SetupPage
//             resumeSummary={resumeSummary}
//             setResumeSummary={setResumeSummary}
//             selectedCompany={selectedCompany}
//             setSelectedCompany={setSelectedCompany}
//             selectedRole={selectedRole}
//             setSelectedRole={setSelectedRole}
//             selectedLevel={selectedLevel}
//             setSelectedLevel={setSelectedLevel}
//             questions={questions}
//             setQuestions={setQuestions}
//             onStartInterview={startInterview}
//             onBack={() => goToPage("welcome")}
//             isLoading={isLoading}
//             setIsLoading={setIsLoading}
//             error={error}
//             onError={handleError}
//             onClearError={clearError}
//           />
//         );

//       case "interview":
//         return (
//           <InterviewPage
//             questions={questions}
//             currentQuestionIndex={currentQuestionIndex}
//             setCurrentQuestionIndex={setCurrentQuestionIndex}
//             allResponses={allResponses}
//             setAllResponses={setAllResponses}
//             selectedCompany={selectedCompany}
//             selectedRole={selectedRole}
//             selectedLevel={selectedLevel}
//             onComplete={goToFeedback}
//             onExit={exitInterview}
//             isLoading={isLoading}
//             setIsLoading={setIsLoading}
//             error={error}
//             onError={handleError}
//             onClearError={clearError}
//           />
//         );

//       case "feedback":
//         return (
//           <FeedbackPage
//             allResponses={allResponses}
//             setAllResponses={setAllResponses}
//             selectedCompany={selectedCompany}
//             selectedRole={selectedRole}
//             selectedLevel={selectedLevel}
//             resetInterviewState={resetInterviewState}
//             goToPage={goToPage}
//             exitInterview={exitInterview}
//           />
//         );

//       default:
//         return (
//           <WelcomePage
//             onStart={() => goToPage("setup")}
//             isApiConnected={isApiConnected}
//           />
//         );
//     }
//   };

//   return (
//     <div className="App">
//       {/* Header */}

//       {/* Main Content */}
//       <main className="container">
//         {/* Error Display */}
//         {error && (
//           <div
//             className="card"
//             style={{ backgroundColor: "#f8d7da", borderColor: "#f5c6cb" }}
//           >
//             <div style={{ color: "#721c24" }}>
//               <strong>Error:</strong> {error}
//               <button
//                 onClick={clearError}
//                 style={{
//                   float: "right",
//                   background: "none",
//                   border: "none",
//                   color: "#721c24",
//                   cursor: "pointer",
//                   fontSize: "1.2rem",
//                 }}
//               >
//                 ×
//               </button>
//             </div>
//           </div>
//         )}

//         {/* API Status */}
//         {!isApiConnected && (
//           <div
//             className="card"
//             style={{ backgroundColor: "#fff3cd", borderColor: "#ffeaa7" }}
//           >
//             <div style={{ color: "#856404" }}>
//               <span className="status-indicator warning"></span>
//               <strong>Warning:</strong> Unable to connect to the API. Some
//               features may not work properly.
//             </div>
//           </div>
//         )}

//         {/* Loading Indicator */}
//         {isLoading && (
//           <div className="loading">
//             <div className="spinner"></div>
//             <p style={{ marginLeft: "1rem" }}>Processing...</p>
//           </div>
//         )}

//         {/* Current Page Content */}
//         {renderCurrentPage()}
//       </main>

//       {/* Footer */}
//       <footer
//         style={{
//           textAlign: "center",
//           padding: "2rem",
//           color: "#6c757d",
//           borderTop: "1px solid #e9ecef",
//           marginTop: "3rem",
//         }}
//       >
//         <p>&copy; 2024 Interview Warmup Platform. Built with React and AI.</p>
//       </footer>
//     </div>
//   );
// };

// // PropTypes for development
// App.propTypes = {
//   // No props for main App component
// };

// export default App;
