"use client";

import { Search, Bell, Globe, Sun, ChevronDown, Command } from "lucide-react";

interface AdminHeaderProps {
  breadcrumb: string | string[];
}

export default function AdminHeader({ breadcrumb }: AdminHeaderProps) {
  const crumbs = Array.isArray(breadcrumb) ? breadcrumb : [breadcrumb];
  return (
    <header
      className="h-14 flex items-center px-5 gap-4 flex-shrink-0"
      style={{ borderBottom: "1px solid rgba(99,102,241,0.15)", background: "rgba(6,6,20,0.9)", backdropFilter: "blur(10px)" }}
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400 flex-shrink-0">
        <span>后台</span>
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-slate-600">/</span>
            <span className={i === crumbs.length - 1 ? "text-white font-medium" : "text-slate-400"}>{crumb}</span>
          </span>
        ))}
      </div>

      {/* Search */}
      <div
        className="flex items-center gap-2 flex-1 max-w-sm px-3 py-2 rounded-xl mx-4"
        style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
      >
        <Search size={14} className="text-slate-400 flex-shrink-0" />
        <input
          placeholder="搜索资源、用户、专题等..."
          className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
        />
        <div className="flex items-center gap-1 text-slate-600 text-xs flex-shrink-0">
          <Command size={11} />
          <span>K</span>
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Bell */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <Bell size={17} />
          <span
            className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
            style={{ background: "linear-gradient(135deg,#ef4444,#f97316)" }}
          >
            12
          </span>
        </button>
        {/* Globe */}
        <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <Globe size={17} />
        </button>
        {/* Theme */}
        <button className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <Sun size={17} />
        </button>
        {/* User */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer hover:bg-white/5 transition-all ml-1">
          <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
            👨‍💼
          </div>
          <span className="text-sm text-white font-medium">超级管理员</span>
          <ChevronDown size={13} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}
