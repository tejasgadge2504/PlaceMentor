// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import InterviewSetup from "./pages/dashboard/InterviewSetup";
// import ResumeUploader from "./pages/dashboard/ResumeUpload";
// import StartInterview from "./pages/dashboard/StartInterview";
// import InterviewPage from "./pages/dashboard/InterviewPage";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<InterviewSetup />} />
//         <Route path="/resume-summary" element={<ResumeUploader/>}/>
//         <Route path="/start-interview" element={<StartInterview/>} />
//         <Route path="/interview-page" element={<InterviewPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;

import About from "./components/About";
import Cta from "./components/Cta";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWork";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Team from "./components/Team";
import Testimonials from "./components/Testimonial";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      {/* <Pricing /> */}
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default App;
