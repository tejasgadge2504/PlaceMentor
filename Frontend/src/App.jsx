import About from "./components/About";
import Cta from "./components/Cta";
import FAQ from "./components/FAQ";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Newsletter from "./components/Newsletter";
// import Pricing from "./components/Pricing";
import ScrollToTop from "./components/ScrollToTop";
import Services from "./components/Services";
import Team from "./components/Team";
import HowItWorks from "./components/HowItWork"
import Sponsors from "./components/Sponsor";
import Testimonials from "./components/Testimonial";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Sponsors />
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
}

export default App;
