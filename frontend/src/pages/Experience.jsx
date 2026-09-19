// frontend/src/pages/Experience.jsx
import { Link } from "react-router-dom";

// Data statis dulu, bisa kamu pindah ke database nanti
const experiences = [
  {
    id: 1,
    company: "Panasonic Gobel Indonesia Service Center",
    role: " Intern Technician Service ",
    period: "June 2022 - July 2022",
    startDate: "2022-06-01", // untuk sorting
    description:
      "Internship 1 bulan belajar servis elektronik rumah tangga seperti TV, AC, kulkas, dan mesin cuci. Fokus pada troubleshooting, perbaikan hardware, dan customer service.",
    tech: ["Technician"],
    blogSlug: "belajar-dari-perusahaan-pertama", // slug blog terkait
  },
  {
    id: 2,
    company: "PT. Telkom Indonesia",
    role: "Intern Maintenance & Werehouse Staff",
    period: "July 2022 - Des 2022",
    startDate: "2022-07-01", // untuk sorting
    description:
      "Internship 6 bulan belajar maintenance jaringan dan perangkat telekomunikasi, serta manajemen inventory di warehouse.",
    tech: ["Network", "SAP"],
    blogSlug: "pengalaman-internship-startup",
  },
]

const sortedExperiences = [...experiences].sort((a, b) => 
  b.startDate.localeCompare(a.startDate))
;

export default function Experience() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-12 animate-slide-up">
        <h1 className="p5-title text-4xl mb-4 text-fg">
          Work <span className="text-accent">Experience</span>
        </h1>
        <p className="text-muted">
          Perjalanan karir saya di dunia development.
        </p>
        <div className="p5-divider w-24 mt-4" />
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Garis timeline */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-line ml-4" />

        <div className="space-y-10">
          {sortedExperiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative pl-12 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Dot timeline */}
              <div
                className="absolute left-0 top-1 w-9 h-9 bg-base border-2 border-accent 
                              rounded-full flex items-center justify-center"
              >
                <div className="w-2 h-2 bg-accent rounded-full" />
              </div>

              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                  <div>
                    <h2 className="p5-heading text-lg text-fg">{exp.role}</h2>
                    <p className="text-accent font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-muted text-sm whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <p className="text-muted text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {exp.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Tombol ke Blog */}
                {exp.blogSlug && (
                  <Link
                    to={`/blog/${exp.blogSlug}`}
                    className="p5-btn px-4 py-2 text-xs"
                  >
                    <span className="p5-label">
                      📝 Baca cerita pengalaman ini →
                    </span>
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
