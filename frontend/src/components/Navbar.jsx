// frontend/src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/", side: "left", position: "top-28 left-4 sm:left-8" },
  { name: "Projects", path: "/projects", side: "left", position: "top-48 left-6 sm:left-12" },
  { name: "Experience", path: "/experience", side: "right", position: "top-28 right-4 sm:right-8" },
  { name: "Contact", path: "/contact", side: "right", position: "top-48 right-6 sm:right-12" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  // Tutup menu saat ganti halaman
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Sembunyikan saat scroll ke bawah, tampilkan saat scroll ke atas
  useEffect(() => {
    let lastY = 0;
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y < 50 || y < lastY);
      lastY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Logo tengah atas — selalu terlihat */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-4 transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <Link
          to="/"
          className="p5-title inline-block text-lg text-fg hover:text-accent transition-colors"
        >
          {"<Sadewa>"}
        </Link>
      </div>

      {/* ===== DESKTOP: Menu items tersebar di kiri & kanan ===== */}
      <div
        className={`hidden md:block fixed inset-0 z-40 pointer-events-none transition-all duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                pointer-events-auto absolute ${link.position}
                p5-nav-item group
                font-display uppercase italic
                text-xl lg:text-2xl tracking-wide
                transition-all duration-300
                ${isActive
                  ? "text-accent scale-110"
                  : "text-fg/70 hover:text-accent hover:scale-110"
                }
                ${link.side === "left" ? "-rotate-6" : "rotate-6"}
              `}
              style={{
                textShadow: isActive
                  ? "3px 3px 0 rgba(230, 0, 18, 0.6), -1px -1px 0 rgba(0,0,0,0.8)"
                  : "2px 2px 0 rgba(0, 0, 0, 0.8)",
                transform: `skewX(${link.side === "left" ? "-8deg" : "8deg"}) rotate(${link.side === "left" ? "-6deg" : "6deg"})${isActive ? " scale(1.1)" : ""}`,
              }}
            >
              {/* Background slash accent */}
              <span
                className={`absolute inset-0 -z-10 transition-transform duration-300 origin-left ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
                style={{
                  background: "#e60012",
                  clipPath: link.side === "left"
                    ? "polygon(0 0, 100% 10%, 95% 90%, 0% 100%)"
                    : "polygon(5% 10%, 100% 0, 100% 100%, 0% 90%)",
                  padding: "4px 16px",
                  top: "-4px",
                  bottom: "-4px",
                  left: "-12px",
                  right: "-12px",
                }}
              />
              <span className="relative px-3 py-1">{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* ===== MOBILE: Hamburger + fullscreen menu ===== */}
      <button
        className={`md:hidden fixed top-4 right-4 z-50 text-fg p-2 transition-all duration-300 ${
          visible || menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <div className="space-y-1.5">
          <span
            className={`block w-6 h-0.5 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </div>
      </button>

      {/* Mobile fullscreen menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-base/95 backdrop-blur-md flex flex-col items-center justify-center gap-6 transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navLinks.map((link, i) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`
                font-display uppercase italic text-3xl tracking-wider
                transition-all duration-300
                ${isActive ? "text-accent" : "text-fg hover:text-accent"}
              `}
              style={{
                textShadow: isActive
                  ? "3px 3px 0 rgba(230, 0, 18, 0.6)"
                  : "2px 2px 0 rgba(0, 0, 0, 0.8)",
                transform: `skewX(-8deg) rotate(${i % 2 === 0 ? "-3" : "3"}deg)`,
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </>
  );
}
