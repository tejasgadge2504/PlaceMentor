import { BrowserRouter, Routes, Route } from "react-router-dom";
import InterviewSetup from "./pages/dashboard/InterviewSetup";
import ResumeUploader from "./pages/dashboard/ResumeUpload";
import StartInterview from "./pages/dashboard/StartInterview";
import InterviewPage from "./pages/dashboard/InterviewPage";
import HomePage from "./pages/dashboard/HomePage";
import './App.css';
const App = () => {
  return (
    <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<HomePage/>} />
        <Route path="/interview-setup" element={<InterviewSetup />} />
        <Route path="/resume-summary" element={<ResumeUploader/>}/>
        <Route path="/start-interview" element={<StartInterview/>} />
        <Route path="/interview-page" element={<InterviewPage />} />
      </Routes> 
    </BrowserRouter> 
  );
};

export default App;
