// frontend/src/components/ProfileCard.jsx
export default function ProfileCard({
  src = "/Profile.jpg",
  alt = "Bagus Sadewa",
}) {
  return (
    <div className="relative inline-block -rotate-2">
      {/* Hard shadow merah khas Persona 5 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2 translate-y-2 bg-accent"
      />

      {/* Frame putih bertepi sobek (di belakang foto, tidak mengenai foto) */}
      <div
        aria-hidden="true"
        className="absolute -inset-1 bg-fg"
        style={{ filter: "url(#p5-rough)" }}
      />

      {/* Foto tajam di atas frame */}
      <div className="relative w-40 sm:w-48 md:w-56 aspect-[3/4] overflow-hidden bg-surface">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/game2.jpg";
          }}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
