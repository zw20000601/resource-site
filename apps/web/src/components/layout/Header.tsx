"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Menu, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "首页", href: "/" },
  { label: "资源广场", href: "/marketplace" },
  { label: "专题合集", href: "/collections" },
  { label: "排行榜", href: "/rankings" },
  { label: "投稿", href: "/submit" },
  { label: "关于", href: "/about" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(8,8,24,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(99,102,241,0.15)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              boxShadow: "0 0 12px rgba(99,102,241,0.5)",
            }}
          >
            🪐
          </div>
          <span className="font-bold text-white text-lg">资源星球</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link px-4 py-2 rounded-lg text-sm transition-colors ${
                pathname === link.href
                  ? "text-indigo-400 font-medium active"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            aria-label="切换主题"
          >
            <Moon size={18} />
          </button>
          <Link
            href="/login"
            className="hidden md:block px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white border border-indigo-500/30 hover:border-indigo-500/60 transition-all"
          >
            登录
          </Link>
          <Link
            href="/register"
            className="hidden md:block btn-primary px-4 py-2 rounded-lg text-sm text-white font-medium"
          >
            注册
          </Link>
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-indigo-500/15 py-4 px-6 flex flex-col gap-2"
          style={{ background: "rgba(8,8,24,0.95)" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-2 rounded-lg text-sm ${
                pathname === link.href
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-slate-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 mt-2">
            <Link href="/login" className="flex-1 text-center py-2 rounded-lg text-sm text-slate-300 border border-indigo-500/30">
              登录
            </Link>
            <Link href="/register" className="flex-1 text-center btn-primary py-2 rounded-lg text-sm text-white">
              注册
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
