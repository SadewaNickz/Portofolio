// frontend/src/components/GitHubContribution.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import GitHub3DView from "./GitHub3DView";
import { GITHUB_FALLBACK_DATA } from "../data/githubFallbackData";

// Di production (Vercel), gunakan /api (serverless function)
// Di local dev, gunakan backend Express di localhost:5000
const API_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_API_URL || "http://localhost:5000/api")
  : "/api";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];
const DAYS = ["Sen", "", "Rab", "", "Jum", "", ""];

// Gradasi warna Persona 5: hitam → merah crimson
function getContributionColor(count, maxCount) {
  if (count === 0) return "#181818";
  const ratio = count / Math.max(maxCount, 1);
  if (ratio <= 0.25) return "#4a0c0e";
  if (ratio <= 0.5) return "#7c1014";
  if (ratio <= 0.75) return "#b80c12";
  return "#e60012";
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function GitHubContribution() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("2d"); // Default "2d"
  const [tooltip, setTooltip] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/github/contributions`, {
          timeout: 4000,
        });
        if (isMounted && res.data && res.data.weeks) {
          setData(res.data);
        }
      } catch (err) {
        console.warn(
          "Backend offline atau belum merespons, memuat data snapshot GitHub terbaru:",
          err.message
        );
        if (isMounted) {
          setData(GITHUB_FALLBACK_DATA);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Hitung maxCount untuk gradasi warna
  const maxCount = data
    ? Math.max(
        ...data.weeks.flatMap((w) =>
          w.contributionDays.map((d) => d.contributionCount)
        ),
        1
      )
    : 1;

  // Hitung posisi label bulan untuk mode 2D
  const getMonthLabels = () => {
    if (!data) return [];
    const labels = [];
    let lastMonth = -1;
    data.weeks.forEach((week, weekIndex) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const month = new Date(firstDay.date + "T00:00:00").getMonth();
        if (month !== lastMonth) {
          labels.push({ month: MONTHS[month], weekIndex });
          lastMonth = month;
        }
      }
    });
    return labels;
  };

  if (loading && !data) {
    return (
      <div className="mt-12 sm:mt-16 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <p className="text-muted text-xs font-display tracking-widest uppercase">
            GITHUB ACTIVITY
          </p>
        </div>
        <div className="card overflow-hidden">
          <div className="w-full h-44 sm:h-64 bg-raised rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  const monthLabels = getMonthLabels();

  return (
    <div className="mt-10 sm:mt-16 animate-slide-up">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2 h-2 bg-accent animate-pulse rounded-full inline-block shadow-[0_0_6px_#e60012]" />
            <span className="text-accent text-[11px] font-mono font-bold tracking-widest uppercase">
              LIVE CODING ACTIVITY
            </span>
          </div>
          <h2 className="p5-title text-xl sm:text-2xl text-fg">
            GITHUB PERFORMANCE MATRIX
          </h2>
        </div>

        {/* View Toggle (3D / 2D) & GitHub Link */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-surface border border-line p-1 rounded-md flex items-center gap-1 shadow-[2px_2px_0px_#000]">
            <button
              onClick={() => setViewMode("3d")}
              className={`px-3 py-1 text-xs font-mono font-bold rounded transition-all ${
                viewMode === "3d"
                  ? "bg-accent text-white shadow-[2px_2px_0px_#fff]"
                  : "text-muted hover:text-fg"
              }`}
              title="Tampilan 3D"
            >
              3D
            </button>
            <button
              onClick={() => setViewMode("2d")}
              className={`px-3 py-1 text-xs font-mono font-bold rounded transition-all ${
                viewMode === "2d"
                  ? "bg-accent text-white shadow-[2px_2px_0px_#fff]"
                  : "text-muted hover:text-fg"
              }`}
              title="Tampilan 2D"
            >
              2D
            </button>
          </div>

          <a
            href="https://github.com/SadewaNickz"
            target="_blank"
            rel="noopener noreferrer"
            className="p5-btn px-3 py-1.5 text-xs flex items-center gap-1"
            title="Kunjungi Profil GitHub"
          >
            <span className="p5-label flex items-center gap-1">
              <span>GitHub</span>
              <span className="text-[10px]">↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Main Visualizer Container */}
      {viewMode === "3d" ? (
        <GitHub3DView data={data} maxCount={maxCount} />
      ) : (
        <div className="card overflow-hidden relative p-4 sm:p-5">
          <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-line text-xs font-mono">
            <span className="text-muted tracking-wider uppercase text-[11px]">
              2D HEATMAP GRID
            </span>
            <span className="text-accent text-[11px]">53 WEEKS</span>
          </div>

          {/* Contribution Grid */}
          <div className="relative pt-1" ref={gridRef}>
            {/* Month labels */}
            <div className="flex text-[10px] text-muted mb-1 ml-7 sm:ml-8 select-none relative h-4">
              {monthLabels.map((label, i) => (
                <span
                  key={i}
                  className="absolute"
                  style={{
                    left: `calc(${label.weekIndex * (14 + 3)}px + 28px)`,
                  }}
                >
                  {label.month}
                </span>
              ))}
            </div>

            <div className="flex mt-1">
              {/* Day labels */}
              <div className="flex flex-col gap-[3px] mr-1.5 text-[9px] sm:text-[10px] text-muted select-none pt-0">
                {DAYS.map((day, i) => (
                  <div
                    key={i}
                    className="h-[11px] sm:h-[13px] flex items-center justify-end pr-1 leading-none font-mono"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex gap-[3px] overflow-x-auto overflow-y-hidden pb-2 subtle-scrollbar touch-pan-x">
                {data.weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px] flex-shrink-0">
                    {week.contributionDays.map((day, di) => (
                      <div
                        key={di}
                        className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-[2px] cursor-pointer transition-all duration-150 hover:scale-[1.7] hover:z-20 relative border border-transparent hover:border-white"
                        style={{
                          backgroundColor: getContributionColor(
                            day.contributionCount,
                            maxCount
                          ),
                          boxShadow:
                            day.contributionCount > 0
                              ? "inset 0 0 2px rgba(255,255,255,0.15)"
                              : "none",
                        }}
                        onMouseEnter={(e) => {
                          const rect = e.target.getBoundingClientRect();
                          const gridRect = gridRef.current.getBoundingClientRect();
                          setTooltip({
                            count: day.contributionCount,
                            date: day.date,
                            x: rect.left - gridRect.left + rect.width / 2,
                            y: rect.top - gridRect.top - 8,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* 2D Tooltip */}
            {tooltip && (
              <div
                className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-full"
                style={{ left: tooltip.x + 28, top: tooltip.y }}
              >
                <div className="bg-[#0a0a0a] border-2 border-accent text-fg rounded px-3 py-1.5 text-xs whitespace-nowrap shadow-[3px_3px_0px_#e60012]">
                  <span className="font-bold font-mono text-accent">
                    {tooltip.count} {tooltip.count === 1 ? "commit" : "commits"}
                  </span>
                  <span className="text-muted ml-1.5 font-sans">
                    · {formatDate(tooltip.date)}
                  </span>
                </div>
                <div className="w-2 h-2 bg-accent rotate-45 mx-auto -mt-1" />
              </div>
            )}
          </div>

          {/* Color Legend */}
          <div className="flex items-center gap-1.5 mt-3 text-[10px] text-muted justify-end select-none font-mono">
            <span>Sedikit</span>
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
              <div
                key={i}
                className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] rounded-[2px]"
                style={{
                  backgroundColor: getContributionColor(
                    ratio * maxCount,
                    maxCount
                  ),
                }}
              />
            ))}
            <span className="text-accent font-bold">Banyak</span>
          </div>
        </div>
      )}
    </div>
  );
}
