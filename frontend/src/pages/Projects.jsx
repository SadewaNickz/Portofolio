// src/pages/Projects.jsx
import { useState, useEffect } from 'react'

/**
 * PANDUAN MENAMBAHKAN FOTO ATAU VIDEO:
 * 1. FOTO:
 *    - Simpan file gambar di: `frontend/public/projects/nama-file.jpg` (atau .png, .webp)
 *    - Set `mediaType: "image"`
 *    - Set `mediaUrl: "/projects/nama-file.jpg"`
 * 
 * 2. VIDEO (MP4 / WebM):
 *    - Simpan video di: `frontend/public/videos/nama-video.mp4`
 *    - Set `mediaType: "video"`
 *    - Set `mediaUrl: "/videos/nama-video.mp4"`
 *    - (Opsional) `thumbnail: "/projects/cover.jpg"` sebagai gambar preview saat loading
 * 
 * 3. VIDEO YOUTUBE:
 *    - Set `mediaType: "youtube"`
 *    - Set `mediaUrl: "https://www.youtube.com/watch?v=..."` atau cukup masukkan ID videonya
 */
const projectsData = [
  {
    id: 1,
    title: "Cetaku",
    description:
      "Aplikasi percetakan online dengan fitur cart, payment gateway, dan admin dashboard. Dibangun dengan React dan Node.js.",
    mediaType: "image",
    mediaUrl: "/projects/cetaku.png",
    fallbackImage: "https://placehold.co/600x400/141414/e60012?text=CETAKU",
    tags: ["JavaScript", "Tailwind", "PHP", "Midtrans", "MySQL", "Laravel"],
    githubUrl: "https://github.com/SadewaNickz/Cetaku",
    status: "Completed",
  },
  {
    id: 2,
    title: "Sitama",
    description:
      "Aplikasi manajemen tugas akhir mahasiswa dengan fitur upload dokumen, notifikasi dan penjadwalan bimbingan. Dibangun dengan Flutter untuk mobile dan Laravel untuk backend.",
    mediaType: "image",
    mediaUrl: "/projects/sitama.png",
    fallbackImage: "https://placehold.co/600x400/141414/e60012?text=SITAMA",
    tags: ["PHP", "Flutter", "MySQL", "Tailwind", "Laravel"],
    githubUrl: "https://github.com/SadewaNickz/sitama_mobile",
    status: "Completed",
  },
  {
    id: 3,
    title: "Portfolio Blog",
    description:
      "Website portfolio dan blog personal dengan CMS sederhana untuk nulis artikel.",
    mediaType: "image",
    mediaUrl: "/projects/portfolio.png",
    fallbackImage: "https://placehold.co/600x400/141414/e60012?text=PORTOFOLIO",
    tags: ["React", "Node.js", "MongoDB", "Tailwind", "JavaScript"],
    githubUrl: "https://github.com/SadewaNickz/Portofolio",
    status: "On Progress",
  },
  {
    id: 4,
    title: "LYNX",
    description:
      "Game metroidvania dengan mekanisme dan jalan cerita sederhana dan melawan musuh dan boss yang menantang, dibangun menggunakan Unity dan C#.",
    mediaType: "image",
    // Menggunakan contoh foto game2.jpg yang sudah tersedia di folder public/projects/
    mediaUrl: "/projects/game2.jpg",
    fallbackImage: "https://placehold.co/600x400/141414/e60012?text=LYNX",
    tags: ["Unity", "C#"],
    githubUrl: "https://github.com/SadewaNickz/LYNX",
    status: "Completed",
  },
  {
    id: 5,
    title: "Pilah Sampah Game",
    description:
      "Game interaktif dengan mekanisme permainan pilah sampah sederhana, dibangun menggunakan Unity dan C#.",
    mediaType: "video",
    // Contoh untuk video: simpan file mp4 di frontend/public/videos/pilah-sampah.mp4
    mediaUrl: "/videos/pilah-sampah.mp4",
    thumbnail: "/projects/game2.jpg",
    fallbackImage: "https://placehold.co/600x400/141414/e60012?text=PILAH+SAMPAH",
    tags: ["Unity", "C#"],
    githubUrl: "https://github.com/SadewaNickz/Game-Pilah-Sampah",
    status: "Completed",
  },
  {
    id: 6,
    title: "Hockey Game",
    description:
      "Game interaktif dengan mekanisme permainan hockey sederhana, dibangun menggunakan Unity dan C#.",
    mediaType: "image",
    mediaUrl: "/projects/game2.jpg",
    fallbackImage: "https://placehold.co/600x400/141414/e60012?text=HOCKEY+GAME",
    tags: ["Unity", "C#"],
    githubUrl: "https://github.com/SadewaNickz/hockeyGame",
    status: "Completed",
  },
  {
    id: 7,
    title: "Face Detection",
    description:
      "Dashboard deteksi wajah menggunakan OpenCV dan Python.",
    mediaType: "image",
    mediaUrl: "/projects/face-detection.png",
    fallbackImage: "https://placehold.co/600x400/141414/e60012?text=FACE+DETECTION",
    tags: ["Python", "OpenCV"],
    githubUrl: "https://github.com/SadewaNickz/Face_detection",
    status: "Completed",
  },
  {
    id: 8,
    title: "Deteksi Parkir",
    description:
      "Dashboard deteksi parkir otomatis dengan pengenalan kendaraan menggunakan OpenCV.",
    mediaType: "image",
    mediaUrl: "/projects/deteksi-parkir.png",
    fallbackImage: "https://placehold.co/600x400/141414/e60012?text=DETEKSI+PARKIR",
    tags: ["Python", "OpenCV"],
    githubUrl: "https://github.com/SadewaNickz/Deteksi_Parkir",
    status: "Completed",
  },
];

const allTags = ['All', ...new Set(projectsData.flatMap(p => p.tags))];

// Helper untuk deteksi tipe media secara otomatis
function detectMediaType(url = '') {
  if (!url) return 'image';
  const clean = url.toLowerCase();
  if (clean.endsWith('.mp4') || clean.endsWith('.webm') || clean.endsWith('.ogg')) {
    return 'video';
  }
  if (clean.includes('youtube.com') || clean.includes('youtu.be')) {
    return 'youtube';
  }
  return 'image';
}

// Helper untuk ekstrak YouTube ID
function extractYouTubeId(url = '') {
  if (!url) return '';
  if (url.length === 11 && !url.includes('/') && !url.includes('.')) return url;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : '';
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  // Tutup modal dengan tombol Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setSelectedProject(null);
    }
    if (selectedProject) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const filtered = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.tags.includes(activeFilter));

  return (
    <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-32 pb-16 sm:pb-20">
      <div className="mb-12 animate-slide-up">
        <h1 className="p5-title text-4xl mb-4 text-fg">
          My <span className="text-accent">Projects</span>
        </h1>
        <p className="text-muted">
          Kumpulan project web, game, dan sistem yang pernah saya kembangkan. Klik foto/video untuk melihat preview penuh.
        </p>
        <div className="p5-divider w-24 mt-4" />
      </div>

      {/* Filter Kategori */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`p5-btn px-4 py-1.5 text-[11px] ${
              activeFilter === tag ? 'p5-btn-solid' : ''
            }`}
          >
            <span className="p5-label">{tag}</span>
          </button>
        ))}
      </div>

      {/* Grid Kartu Project */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpenPreview={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted">
          Tidak ada project dengan teknologi ini.
        </div>
      )}

      {/* Modal Preview Media Fullscreen / Lightbox */}
      {selectedProject && (
        <MediaModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

function ProjectCard({ project, index, onOpenPreview }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const mediaType = project.mediaType || detectMediaType(project.mediaUrl || project.image);
  const currentUrl = project.mediaUrl || project.image;
  const fallback = project.fallbackImage || `https://placehold.co/600x400/141414/e60012?text=${encodeURIComponent(project.title)}`;

  return (
    <div
      className="card group flex flex-col animate-slide-up hover:border-accent hover:-translate-y-1 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Area Media (Foto atau Video) */}
      <div
        onClick={onOpenPreview}
        className="relative overflow-hidden rounded-md mb-4 bg-raised border border-line cursor-pointer aspect-video group/thumb"
        title="Klik untuk melihat media lebih besar"
      >
        {/* Kasus 1: Video File */}
        {mediaType === 'video' && !videoFailed ? (
          <video
            src={currentUrl}
            poster={project.thumbnail || fallback}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
          />
        ) : mediaType === 'youtube' ? (
          /* Kasus 2: Video YouTube */
          <div className="w-full h-full relative">
            <img
              src={
                project.thumbnail ||
                `https://img.youtube.com/vi/${extractYouTubeId(currentUrl || project.youtubeId)}/hqdefault.jpg`
              }
              alt={project.title}
              onError={(e) => { e.currentTarget.src = fallback; }}
              className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white shadow-lg group-hover/thumb:scale-110 transition-transform">
                ▶
              </div>
            </div>
          </div>
        ) : (
          /* Kasus 3: Foto / Gambar */
          <img
            src={imgFailed ? fallback : currentUrl}
            alt={project.title}
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
          />
        )}

        {/* Badge Tipe Media (Video / YouTube) */}
        {(mediaType === 'video' || mediaType === 'youtube') && (
          <span className="absolute bottom-2.5 left-2.5 z-10 bg-base/80 backdrop-blur-sm border border-line text-[10px] font-mono text-accent px-2 py-0.5 rounded flex items-center gap-1.5 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {mediaType === 'youtube' ? 'YOUTUBE' : 'VIDEO'}
          </span>
        )}

        {/* Overlay Hover Icon Preview */}
        <div className="absolute inset-0 bg-base/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <span className="p5-btn p5-btn-solid text-[10px] px-3 py-1 scale-90 group-hover/thumb:scale-100 transition-transform shadow-lg">
            <span className="p5-label flex items-center gap-1">
              🔍 Preview Media
            </span>
          </span>
        </div>

        {/* Badge Status */}
        <span
          className={`absolute top-3 right-3 text-xs px-2.5 py-1 font-display z-10 ${
            project.status === 'Completed'
              ? 'bg-accent text-white'
              : 'bg-fg text-base'
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Informasi Project */}
      <div className="flex flex-col flex-grow">
        <h3 className="p5-heading text-lg mb-2 text-fg group-hover:text-accent transition-colors">
          {project.title}
        </h3>

        <p className="text-muted text-sm leading-relaxed mb-4 flex-grow">
          {project.description}
        </p>

        {/* Tags Teknologi */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map(tag => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p5-btn w-full px-4 py-2.5 text-xs text-center"
          >
            <span className="p5-label">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// Komponen Modal Lightbox untuk melihat Foto / Video dalam resolusi penuh
function MediaModal({ project, onClose }) {
  const mediaType = project.mediaType || detectMediaType(project.mediaUrl || project.image);
  const currentUrl = project.mediaUrl || project.image;
  const youtubeId = mediaType === 'youtube' ? extractYouTubeId(currentUrl || project.youtubeId) : null;
  const fallback = project.fallbackImage || `https://placehold.co/800x500/141414/e60012?text=${encodeURIComponent(project.title)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative bg-surface border-2 border-accent rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-line bg-raised">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-accent rounded-full animate-pulse" />
            <h3 className="p5-heading text-lg text-fg truncate">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-accent text-xl font-bold p-1 transition-colors leading-none"
            aria-label="Tutup preview"
          >
            ✕
          </button>
        </div>

        {/* Media Container */}
        <div className="relative bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
          {mediaType === 'video' ? (
            <video
              src={currentUrl}
              controls
              autoPlay
              playsInline
              className="w-full max-h-[60vh] object-contain"
            />
          ) : mediaType === 'youtube' && youtubeId ? (
            <div className="w-full aspect-video max-h-[60vh]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
                title={project.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <img
              src={currentUrl}
              alt={project.title}
              onError={(e) => { e.currentTarget.src = fallback; }}
              className="w-full max-h-[60vh] object-contain"
            />
          )}
        </div>

        {/* Deskripsi & Link di Modal */}
        <div className="p-5 overflow-y-auto">
          <p className="text-muted text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="chip text-xs">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-3 border-t border-line">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p5-btn w-full sm:w-auto px-5 py-2.5 text-xs text-center"
              >
                <span className="p5-label">Lihat di GitHub</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
