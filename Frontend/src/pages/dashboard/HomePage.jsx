
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWork";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Cta from "@/components/CTA";
import Testimonials from "@/components/Testimonial";
import Team from "@/components/Team";
import Newsletter from "@/components/Newsletter";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";


const HomePage = () => {
  return (
    <>
      <Navbar/>
      <Hero/>
      <About />
      <HowItWorks />
      <Features/>
      <Services/>
      <Cta />
      <Testimonials />
      <Team/>
      {/* <Pricing /> */}
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default HomePage