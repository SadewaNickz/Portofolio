// frontend/src/pages/Experience.jsx
import { Link } from "react-router-dom";

// Data statis dulu, bisa kamu pindah ke database nanti
const experiences = [
  {
    id: 1,
    company: "PT. Contoh Perusahaan",
    role: "Full Stack Developer",
    period: "Jan 2023 - Sekarang",
    description:
      "Membangun dan maintain aplikasi web skala enterprise dengan tech stack React dan Node.js.",
    tech: ["React", "Node.js", "PostgreSQL", "Docker"],
    blogSlug: "belajar-dari-perusahaan-pertama", // slug blog terkait
  },
  {
    id: 2,
    company: "Startup XYZ",
    role: "Frontend Developer",
    period: "Jun 2022 - Des 2022",
    description:
      "Internship 6 bulan membangun landing page dan dashboard admin.",
    tech: ["Vue.js", "Tailwind", "Firebase"],
    blogSlug: "pengalaman-internship-startup",
  },
];

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-12 animate-slide-up">
        <h1 className="text-4xl font-bold mb-4">
          Work <span className="gradient-text">Experience</span>
        </h1>
        <p className="text-gray-400">
          Perjalanan karir saya di dunia development.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Garis timeline */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-dark-700 ml-4" />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative pl-12 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Dot timeline */}
              <div
                className="absolute left-0 top-1 w-9 h-9 bg-dark-800 border-2 border-accent-primary 
                              rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-accent-primary rounded-full" />
              </div>

              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-xl font-semibold">{exp.role}</h2>
                    <p className="text-accent-primary font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-gray-500 text-sm whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-dark-700 text-gray-300 px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Tombol ke Blog */}
                {exp.blogSlug && (
                  <Link
                    to={`/blog/${exp.blogSlug}`}
                    className="inline-flex items-center gap-2 text-sm text-accent-primary 
                               hover:text-white border border-accent-primary/30 hover:border-accent-primary
                               px-4 py-2 rounded-lg transition-all duration-200 hover:bg-accent-primary/10"
                  >
                    📝 Baca cerita pengalaman ini →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
