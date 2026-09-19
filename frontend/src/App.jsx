// frontend/src/App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";

function App() {
  const [showIntro, setShowIntro] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!showIntro) return;
    const timer = setTimeout(() => setShowIntro(false), 1400);
    return () => clearTimeout(timer);
  }, [showIntro]);

  return (
    <Router>
      {/* SVG filter untuk tepi "torn" khas Persona 5 */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="p5-rough">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.015 0.09"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Page-load cut-in */}
      {showIntro && (
        <div className="p5-intro" aria-hidden="true">
          <span className="p5-intro-panel bg-accent" style={{ left: "-12%" }} />
          <span
            className="p5-intro-panel bg-base"
            style={{ left: "18%", animationDelay: "0.06s" }}
          />
          <span
            className="p5-intro-panel bg-accent"
            style={{ left: "48%", animationDelay: "0.12s" }}
          />
          <span
            className="p5-intro-panel bg-base"
            style={{ left: "78%", animationDelay: "0.18s" }}
          />
        </div>
      )}

      <div className="min-h-screen flex flex-col relative">
        {/* Tekstur latar Persona 5: halftone + speed lines */}
        <div
          aria-hidden="true"
          className="halftone-bg pointer-events-none fixed inset-0 z-0"
        />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
