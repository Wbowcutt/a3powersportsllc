import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ShopTeaser from "@/components/ShopTeaser";
import About from "@/components/About";
import Booking from "@/components/Booking";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ShopTeaser />
        <About />
        <Booking />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
