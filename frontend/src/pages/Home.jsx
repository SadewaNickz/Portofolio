// frontend/src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl mx-auto text-center animate-slide-up">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 bg-accent-primary/10 border border-accent-primary/20 
                        rounded-full px-4 py-1.5 mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-gray-300">Available for work</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Hi, I'm <span className="gradient-text">Bagus Sadewa</span>
          <br />
          <span className="text-gray-400 text-4xl md:text-5xl font-medium">
            Full Stack & Game Developer
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Seorang yang mempunyai passion di dunia teknologi, khususnya dalam
          pengembangan web, mobile dan pengembangan game yang indah. Berfokus
          pada Laravel, React dan Unity untuk menciptakan solusi digital yang
          inovatif dan efisien.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/projects" className="btn-primary text-center">
            Lihat Projects →
          </Link>
          <Link to="/contact" className="btn-outline text-center">
            Hubungi Saya
          </Link>
        </div>

        {/* Tech Stack */}
        <div className="mt-20">
          <p className="text-gray-500 text-sm mb-4">Tech Stack</p>
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
              <span
                key={tech}
                className="bg-dark-800 border border-dark-700 
                                         text-gray-300 text-sm px-4 py-1.5 rounded-full
                                         hover:border-accent-primary/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
