"use client";

export default function StarBackground() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2.5 + 0.5,
    duration: `${Math.random() * 4 + 2}s`,
    delay: `${Math.random() * 4}s`,
  }));

  return (
    <div className="stars-bg" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            "--duration": star.duration,
            "--delay": star.delay,
          } as React.CSSProperties}
        />
      ))}
      {/* Gradient nebula blobs */}
      <div
        className="absolute rounded-full opacity-5"
        style={{
          width: 600,
          height: 600,
          top: "-10%",
          right: "-5%",
          background: "radial-gradient(circle, #6366f1, transparent)",
        }}
      />
      <div
        className="absolute rounded-full opacity-5"
        style={{
          width: 400,
          height: 400,
          bottom: "10%",
          left: "-5%",
          background: "radial-gradient(circle, #8b5cf6, transparent)",
        }}
      />
    </div>
  );
}
