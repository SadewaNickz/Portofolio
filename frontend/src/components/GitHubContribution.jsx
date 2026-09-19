// frontend/src/components/GitHubContribution.jsx
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];
const DAYS = ["Sen", "", "Rab", "", "Jum", "", ""];

// Gradasi warna Persona 5: hitam → merah
function getContributionColor(count, maxCount) {
  if (count === 0) return "#1a1a1a";
  const ratio = count / Math.max(maxCount, 1);
  if (ratio <= 0.25) return "#3d0a0a";
  if (ratio <= 0.5) return "#6b1010";
  if (ratio <= 0.75) return "#a30c0c";
  return "#e60012";
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const day = d.getDate();
  const month = MONTHS[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export default function GitHubContribution() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tooltip, setTooltip] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/github/contributions`);
        setData(res.data);
      } catch (err) {
        console.error("Gagal mengambil data kontribusi:", err);
        setError("Gagal memuat data kontribusi GitHub.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Hitung maxCount untuk gradasi warna
  const maxCount = data
    ? Math.max(
        ...data.weeks.flatMap((w) =>
          w.contributionDays.map((d) => d.contributionCount)
        )
      )
    : 0;

  // Hitung posisi label bulan
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

  if (loading) {
    return (
      <div className="mt-12 sm:mt-20 animate-slide-up">
        <p className="text-muted text-sm mb-6 font-display tracking-widest">
          GITHUB ACTIVITY
        </p>
        <div className="card overflow-hidden">
          {/* Skeleton grid */}
          <div className="flex gap-[3px] overflow-hidden py-4">
            {Array.from({ length: 52 }).map((_, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, di) => (
                  <div
                    key={di}
                    className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-[2px] bg-raised animate-pulse"
                    style={{ animationDelay: `${(wi * 7 + di) * 5}ms` }}
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Skeleton stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-raised rounded-lg h-16 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-12 sm:mt-20 animate-slide-up">
        <p className="text-muted text-sm mb-6 font-display tracking-widest">
          GITHUB ACTIVITY
        </p>
        <div className="card text-center py-10">
          <p className="text-muted">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const monthLabels = getMonthLabels();

  return (
    <div className="mt-12 sm:mt-20 animate-slide-up">
      <p className="text-muted text-sm mb-6 font-display tracking-widest">
        GITHUB ACTIVITY
      </p>

      <div className="card overflow-hidden relative">
        {/* Contribution Grid */}
        <div className="relative" ref={gridRef}>
          {/* Month labels */}
          <div className="flex text-[10px] text-muted mb-1 ml-8 select-none">
            {monthLabels.map((label, i) => (
              <span
                key={i}
                className="absolute"
                style={{
                  left: `calc(${label.weekIndex * (14 + 3)}px + 32px)`,
                }}
              >
                {label.month}
              </span>
            ))}
          </div>

          <div className="flex mt-5">
            {/* Day labels */}
            <div className="flex flex-col gap-[3px] mr-2 text-[10px] text-muted select-none pt-0">
              {DAYS.map((day, i) => (
                <div
                  key={i}
                  className="h-[11px] sm:h-[13px] flex items-center justify-end pr-1 leading-none"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px] overflow-x-auto overflow-y-hidden pb-1 scrollbar-thin">
              {data.weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px] flex-shrink-0">
                  {week.contributionDays.map((day, di) => (
                    <div
                      key={di}
                      className="w-[11px] h-[11px] sm:w-[13px] sm:h-[13px] rounded-[2px] cursor-pointer transition-all duration-150 hover:scale-[1.6] hover:z-10 relative border border-transparent hover:border-fg/30"
                      style={{
                        backgroundColor: getContributionColor(
                          day.contributionCount,
                          maxCount
                        ),
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

          {/* Tooltip */}
          {tooltip && (
            <div
              className="absolute pointer-events-none z-20 -translate-x-1/2 -translate-y-full"
              style={{ left: tooltip.x + 32, top: tooltip.y }}
            >
              <div className="bg-base border border-line rounded-md px-3 py-1.5 text-xs whitespace-nowrap shadow-lg">
                <span className="text-fg font-semibold">
                  {tooltip.count} kontribusi
                </span>
                <span className="text-muted ml-1">
                  · {formatDate(tooltip.date)}
                </span>
              </div>
              <div className="w-2 h-2 bg-base border-r border-b border-line rotate-45 mx-auto -mt-1" />
            </div>
          )}
        </div>

        {/* Color Legend */}
        <div className="flex items-center gap-1.5 mt-4 text-[10px] text-muted justify-end select-none">
          <span>Sedikit</span>
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <div
              key={i}
              className="w-[11px] h-[11px] rounded-[2px]"
              style={{
                backgroundColor: getContributionColor(
                  ratio * maxCount,
                  maxCount
                ),
              }}
            />
          ))}
          <span>Banyak</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div className="bg-raised rounded-lg p-4 text-center border border-line">
            <p className="text-2xl font-display text-accent font-bold">
              {data.totalContributions.toLocaleString()}
            </p>
            <p className="text-muted text-xs mt-1">Total Kontribusi</p>
          </div>
          <div className="bg-raised rounded-lg p-4 text-center border border-line">
            <p className="text-2xl font-display text-fg font-bold">
              {data.stats.currentStreak}
              <span className="text-sm text-muted ml-1">hari</span>
            </p>
            <p className="text-muted text-xs mt-1">Streak Saat Ini</p>
          </div>
          <div className="bg-raised rounded-lg p-4 text-center border border-line">
            <p className="text-2xl font-display text-fg font-bold">
              {data.stats.longestStreak}
              <span className="text-sm text-muted ml-1">hari</span>
            </p>
            <p className="text-muted text-xs mt-1">Streak Terpanjang</p>
          </div>
        </div>
      </div>
    </div>
  );
}
