"use client";

interface PlanetDecorationProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PlanetDecoration({ size = "lg", className = "" }: PlanetDecorationProps) {
  const sizes = {
    sm: { planet: 160, ring: 240 },
    md: { planet: 220, ring: 320 },
    lg: { planet: 280, ring: 420 },
  };
  const s = sizes[size];

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: s.ring, height: s.ring }}>
      {/* Outer glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: s.planet * 1.4,
          height: s.planet * 1.4,
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />
      {/* Ring / Orbit */}
      <div
        className="absolute rounded-full border border-indigo-500/30"
        style={{
          width: s.ring * 0.9,
          height: s.ring * 0.35,
          transform: "rotateX(70deg)",
          borderColor: "rgba(129,140,248,0.4)",
          boxShadow: "0 0 20px rgba(99,102,241,0.3)",
        }}
      />
      {/* Planet sphere */}
      <div
        className="relative rounded-full animate-[float_6s_ease-in-out_infinite]"
        style={{
          width: s.planet,
          height: s.planet,
          background: "radial-gradient(circle at 35% 35%, #818cf8, #6366f1 40%, #3730a3 70%, #1e1b4b)",
          boxShadow: "0 0 60px rgba(99,102,241,0.5), inset -20px -20px 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Surface shimmer */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.15), transparent 60%)",
          }}
        />
        {/* Continent-like patches */}
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: "40%",
            height: "30%",
            top: "30%",
            left: "15%",
            background: "rgba(167,139,250,0.6)",
            filter: "blur(8px)",
          }}
        />
        <div
          className="absolute rounded-full opacity-15"
          style={{
            width: "25%",
            height: "20%",
            top: "55%",
            left: "55%",
            background: "rgba(196,181,253,0.4)",
            filter: "blur(6px)",
          }}
        />
      </div>
      {/* Decorative sparkles */}
      {[
        { top: "10%", left: "80%", size: 6, delay: "0s" },
        { top: "70%", left: "90%", size: 4, delay: "1s" },
        { top: "20%", left: "10%", size: 5, delay: "2s" },
        { top: "80%", left: "20%", size: 3, delay: "0.5s" },
      ].map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-[twinkle_3s_ease-in-out_infinite]"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
          }}
        />
      ))}
      {/* Search / feature icons floating near planet */}
      <div
        className="absolute w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
        style={{
          top: "5%",
          right: "5%",
          background: "rgba(99,102,241,0.8)",
          boxShadow: "0 4px 15px rgba(99,102,241,0.4)",
        }}
      >
        🔍
      </div>
      <div
        className="absolute w-9 h-9 rounded-xl flex items-center justify-center text-white text-base"
        style={{
          bottom: "10%",
          left: "5%",
          background: "rgba(139,92,246,0.8)",
          boxShadow: "0 4px 15px rgba(139,92,246,0.4)",
        }}
      >
        ✕
      </div>
    </div>
  );
}
