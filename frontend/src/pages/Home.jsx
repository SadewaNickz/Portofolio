// frontend/src/pages/Home.jsx
import { Link } from "react-router-dom";
import Splatter from "../components/Splatter";
import GitHubContribution from "../components/GitHubContribution";

const marqueeItems = [
  "Full Stack Developer",
  "Game Developer",
  "React",
  "Unity",
  "Laravel",
  "C#",
];

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
      {/* Splatter dekoratif */}
      <Splatter
        className="w-28 h-28 -top-4 -left-2 md:w-44 md:h-44"
        opacity={0.18}
      />
      <Splatter
        className="w-16 h-16 bottom-10 right-4 md:w-28 md:h-28"
        color="#f5f5f5"
        opacity={0.08}
      />

      {/* Speed lines dekoratif */}
      <div
        aria-hidden="true"
        className="speed-lines pointer-events-none absolute inset-y-0 right-0 w-32 md:w-56 opacity-20"
      />
      <div
        aria-hidden="true"
        className="speed-lines pointer-events-none absolute inset-y-0 left-0 w-16 opacity-10"
      />

      <div className="w-full min-w-0 max-w-4xl mx-auto text-center animate-slide-up relative">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-surface border-2 border-accent
                        px-4 py-1.5 mb-8 -rotate-1"
        >
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-sm text-muted">Need an internship please </span>
        </div>

        {/* Heading */}
        <h1 className="mb-6 leading-tight">
          <span className="p5-title block text-4xl sm:text-5xl md:text-7xl text-fg">
            Hi, I'm <span className="text-accent">Bagus Sadewa</span>
          </span>
          <span className="block text-muted text-xl sm:text-2xl md:text-4xl font-sans font-semibold mt-3">
            Full Stack & Game Developer
          </span>
        </h1>

        {/* Description */}
        <p className="text-muted text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Seorang yang mempunyai passion di dunia teknologi, khususnya dalam
          pengembangan web, mobile dan pengembangan game yang indah. Berfokus
          pada Laravel, React dan Unity untuk menciptakan solusi digital yang
          inovatif dan efisien.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link to="/projects" className="p5-btn p5-btn-solid px-7 py-3 text-sm">
            <span className="p5-label">Lihat Projects →</span>
          </Link>
          <Link to="/contact" className="p5-btn px-7 py-3 text-sm">
            <span className="p5-label">Hubungi Saya</span>
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="mt-12 sm:mt-20">
          <p className="text-muted text-sm mb-4 font-display tracking-widest">
            TECH STACK
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "React",
              "Node.js",
              "TypeScript",
              "MySQL",
              "Tailwind",
              "Unity",
              "Laravel",
              "C#",
            ].map((tech) => (
              <span key={tech} className="p5-btn px-4 py-1.5 text-[11px]">
                <span className="p5-label">{tech}</span>
              </span>
            ))}
          </div>
        </div>

        {/* GitHub Contribution Graph */}
        <GitHubContribution />

        {/* Marquee band */}
        <div className="mt-10 sm:mt-16 w-full min-w-0 overflow-hidden border-y-2 border-accent bg-surface/60 py-2 -rotate-1">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap font-display text-sm text-accent">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-8">
                {item}
                <span className="text-fg">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
