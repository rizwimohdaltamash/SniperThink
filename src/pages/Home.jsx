import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../sections/HeroSection";
import StrategyFlowSection from "../sections/StrategyFlowSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <HeroSection />
        <StrategyFlowSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
