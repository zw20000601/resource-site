import StarBackground from "@/components/ui/StarBackground";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#060614", color: "#f1f5f9" }}>
      <StarBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
