// src/pages/Projects.jsx
import { useState } from 'react'

const projectsData = [
  {
    id: 1,
    title: "Cetaku",
    description:
      "Aplikasi belanja online dengan fitur cart, payment gateway, dan admin dashboard. Dibangun dengan React dan Node.js.",
    image: "https://placehold.co/600x400/1a1a1a/6366f1?text=CETAKU",
    tags: ["Javascript", "Tailwind", "PHP", "Midtrans", "MySQL", "Laravel"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com/username/project",
    status: "Completed",
  },
  {
    id: 2,
    title: "Sitama",
    description:
      "Aplikasi manajemen tugas dengan fitur drag & drop, kolaborasi tim, dan notifikasi real-time.",
    image: "https://placehold.co/600x400/1a1a1a/8b5cf6?text=SITAMA",
    tags: ["PHP", "Flutter", "MySQL", "Tailwind", "Laravel"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com/username/project",
    status: "Completed",
  },
  {
    id: 3,
    title: "Portfolio Blog",
    description:
      "Website portfolio dan blog personal dengan CMS sederhana untuk nulis artikel.",
    image: "https://placehold.co/600x400/1a1a1a/6366f1?text=Portfolio",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com/username/project",
    status: "Completed",
  },
  {
    id: 4,
    title: "LYNX",
    description:
      "Dashboard cuaca real-time dengan visualisasi data menggunakan chart dan peta interaktif.",
    image: "https://placehold.co/600x400/1a1a1a/8b5cf6?text=LYNX",
    tags: ["Unity", "C#"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com/username/project",
    status: "Completed",
  },
  {
    id: 5,
    title: "Pilah Sampah Game",
    description:
      "Dashboard cuaca real-time dengan visualisasi data menggunakan chart dan peta interaktif.",
    image: "https://placehold.co/600x400/1a1a1a/8b5cf6?text=PILAH SAMPAH",
    tags: ["Unity", "C#"],
    liveUrl: "https://project-demo.com",
    githubUrl: "https://github.com/username/project",
    status: "Completed",
  },
];

const allTags = ['All', ...new Set(projectsData.flatMap(p => p.tags))]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.tags.includes(activeFilter))

  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-20">

      <div className="mb-12 animate-slide-up">
        <h1 className="text-4xl font-bold mb-4">
          My <span className="gradient-text">Projects</span>
        </h1>
        <p className="text-gray-400">
          Kumpulan project yang pernah saya kerjakan.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
              activeFilter === tag
                ? 'bg-accent-primary text-white'
                : 'bg-dark-800 text-gray-400 border border-dark-700 hover:border-accent-primary/50'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Tidak ada project dengan teknologi ini.
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <div
      className="card group flex flex-col animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium ${
          project.status === 'Completed'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
        }`}>
          {project.status}
        </span>
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="text-xs bg-accent-primary/10 text-accent-primary px-2.5 py-1 rounded-full border border-accent-primary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-auto">        
            <a href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm flex-1 text-center" a/>
          <a>
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}