// frontend/src/components/DiagonalPhotoGrid.jsx
// Background grid diagonal dengan foto project yang berjalan sesuai diagonal, looping infinite
// Menggunakan gambar dari data project yang sama dengan halaman Projects

import { getProjectImages } from "../data/projectsData";

const projectImages = getProjectImages();

const ROWS = 40;
const COLS = 10;
const CELL_W = 150;
const CELL_H = 110;
const GAP = 8;

export default function DiagonalPhotoGrid() {
  const gridWidth = COLS * (CELL_W + GAP);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0"
      style={{ opacity: 0.15 }}
    >
      <div
        className="absolute"
        style={{
          top: "-100vmax",
          left: "-100vmax",
          width: "300vmax",
          height: "300vmax",
          transform: "rotate(-20deg)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: `${GAP}px`,
          }}
        >
          {Array.from({ length: ROWS }).map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="flex"
              style={{
                gap: `${GAP}px`,
                animation: `rowSlide${rowIdx % 2} ${20 + (rowIdx % 3) * 5}s linear infinite`,
              }}
            >
              {/* 3x duplicate untuk seamless tanpa blink */}
              {Array.from({ length: COLS * 3 }).map((_, colIdx) => {
                const imgIdx = (rowIdx * COLS + colIdx) % projectImages.length;
                return (
                  <div
                    key={colIdx}
                    className="flex-shrink-0 overflow-hidden rounded-sm border border-white/10"
                    style={{
                      width: `${CELL_W}px`,
                      height: `${CELL_H}px`,
                    }}
                  >
                    <img
                      src={projectImages[imgIdx]}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes rowSlide0 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${gridWidth}px); }
        }
        @keyframes rowSlide1 {
          0% { transform: translateX(-${gridWidth}px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
