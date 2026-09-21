// frontend/src/data/projectsData.js
// Data project terpusat — dipakai oleh halaman Projects dan background DiagonalPhotoGrid

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
    mediaUrl: "/projects/Lynx.png",
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

  {
    id: 9,
    title: "45-Siege",
    description:
      "Game sejarah pertempuran 5 hari di semarang yang dibangun menggunakan Unity dan C#.",
    mediaType: "image",
    mediaUrl: "/projects/45Siege.png",
    fallbackImage: "https://placehold.co/600x400/141414/e60012?text=45+SIEGE",
    tags: ["Unity", "C#"],
    githubUrl: "https://github.com/SadewaNickz/Semarang-45-The-Five-Day-Siege",
    status: "Completed",
  },
];

export default projectsData;

/**
 * Helper: Ambil daftar gambar untuk background grid di Home.
 * Untuk project bertipe video, ambil thumbnail-nya. Kalau tidak ada,
 * gunakan fallbackImage.
 */
export function getProjectImages() {
  return projectsData.map((p) => {
    if (p.mediaType === "video" || p.mediaType === "youtube") {
      return p.thumbnail || p.fallbackImage;
    }
    return p.mediaUrl || p.fallbackImage;
  });
}
