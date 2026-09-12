import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import WhyChoose from "../components/home/WhyChoose";
import HowItWorks from "../components/home/HowItWorks";
import Statistics from "../components/home/Statistics";
import CallToAction from "../components/home/CallToAction";
import Testimonials from "../components/home/Testimonials";
import Footer from "../components/layout/Footer";
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
  <Navbar />
  <Hero />
  <Services />
  <WhyChoose />
  <HowItWorks />
  <Statistics />
  <Testimonials />
  <CallToAction />
  <Footer />
</main>
  );
}