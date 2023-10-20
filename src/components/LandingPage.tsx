import Hero from "./Hero";
import Feature from "./Feature";
import Pricing from "./Pricing";
import Testimonial from "./Testimonial";
import FAQ from "./FAQ";

export default function LandingPage() {
  return (
    <div className="bg-white">
        <Hero />
        <Feature />
        <Testimonial />
        <Pricing />
        <FAQ />
    </div>
  );
}
