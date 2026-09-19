// frontend/src/components/Splatter.jsx
export default function Splatter({
  className = "",
  color = "#e60012",
  opacity = 0.5,
  ...props
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`splatter ${className}`}
      style={{ opacity }}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <g fill={color}>
        <path d="M104 16c14 1 20 14 29 21 9 7 22 6 28 15 6 9-2 20 1 30 3 10 13 16 10 26-3 10-16 12-23 20-7 8-6 21-15 27-9 6-20-1-30 2-10 3-16 14-26 12-10-2-13-15-21-22-8-7-21-7-26-17-5-10 3-20 1-30-2-10-13-17-9-27 4-10 17-11 25-18 8-7 12-19 22-23 6-2 12 3 18 4z" />
        <circle cx="176" cy="42" r="7" />
        <circle cx="188" cy="70" r="4" />
        <circle cx="24" cy="150" r="6" />
        <circle cx="14" cy="120" r="3.5" />
        <circle cx="150" cy="182" r="5" />
        <circle cx="52" cy="20" r="4.5" />
      </g>
    </svg>
  );
}
