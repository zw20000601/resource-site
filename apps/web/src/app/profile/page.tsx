"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Bookmark, Clock, ChevronRight, Search, Bell, TrendingUp, Send, MoreHorizontal } from "lucide-react";

const SIDEBAR_LINKS = [
  { icon: "🏠", label: "概览", href: "/profile" },
  { icon: "⭐", label: "我的收藏", href: "/profile/favorites" },
  { icon: "🕐", label: "浏览记录", href: "/profile/history" },
  { icon: "📤", label: "投稿管理", href: "/profile/submissions" },
  { icon: "📁", label: "专题管理", href: "/profile/topics" },
  { icon: "⚙️", label: "账号设置", href: "/profile/settings" },
];

const STAT_CARDS = [
  { icon: <Star size={16} className="text-yellow-400" />, label: "我的收藏", value: 248, diff: "+18", color: "text-yellow-400", bg: "rgba(245,158,11,0.15)", diffColor: "text-purple-400" },
  { icon: <Clock size={16} className="text-blue-400" />, label: "浏览历史", value: 1632, diff: "+24%", color: "text-blue-400", bg: "rgba(59,130,246,0.15)", diffColor: "text-purple-400" },
  { icon: <Send size={16} className="text-indigo-400" />, label: "已投稿资源", value: 36, diff: "+6", color: "text-indigo-400", bg: "rgba(99,102,241,0.15)", diffColor: "text-purple-400" },
  { icon: "⏳", label: "待审核", value: 7, diff: "+3", color: "text-amber-400", bg: "rgba(245,158,11,0.15)", diffColor: "text-amber-400" },
];

const RECENT_FAVORITES = [
  { name: "ChatGPT 中文镜像站", category: "AI工具", rating: 4.9, collections: 32100, logo: "🤖", logoBg: "bg-green-600", isNew: true },
  { name: "Midjourney 提示词大全", category: "设计素材", rating: 4.8, collections: 18700, logo: "🎨", logoBg: "bg-indigo-600" },
  { name: "Python 速查表（中文版）", category: "开发工具", rating: 4.7, collections: 12400, logo: "🐍", logoBg: "bg-blue-700" },
  { name: "Notion 模板库", category: "效率办公", rating: 4.6, collections: 9800, logo: "N", logoBg: "bg-gray-800" },
  { name: "React 源码解析", category: "前端框架", rating: 4.7, collections: 11200, logo: "⚛️", logoBg: "bg-cyan-700" },
];

const SUBMISSIONS = [
  { name: "Python 爬虫实战指南（附源码）", category: "开发工具", date: "2024-05-20 14:32", status: "审核中", statusColor: "text-yellow-400 bg-yellow-400/10" },
  { name: "设计师常用配色方案 2024", category: "设计素材", date: "2024-05-19 09:15", status: "已退回", statusColor: "text-red-400 bg-red-400/10" },
  { name: "高效学习方法论：从入门到精通", category: "学习网站", date: "2024-05-18 16:48", status: "已发布", statusColor: "text-green-400 bg-green-400/10" },
  { name: "效率提升工具箱合集", category: "效率办公", date: "2024-05-17 11:03", status: "审核中", statusColor: "text-yellow-400 bg-yellow-400/10" },
  { name: "前端开发常用资源汇总", category: "前端资源", date: "2024-05-15 20:21", status: "已发布", statusColor: "text-green-400 bg-green-400/10" },
];

const NOTIFICATIONS = [
  { icon: "✅", iconBg: "bg-green-500", text: "你的资源《Python 爬虫实战指南》已通过审核，正式发布", time: "2小时前" },
  { icon: "❌", iconBg: "bg-red-500", text: "你的资源《设计师常用配色方案》审核未通过，请查看退回原因", time: "1天前" },
  { icon: "🕐", iconBg: "bg-indigo-500", text: "你的资源《效率提升工具箱合集》审核中，请耐心等待", time: "2天前" },
  { icon: "🎉", iconBg: "bg-purple-500", text: "欢迎加入资源星球！完善账号信息，开启探索之旅", time: "5天前" },
];

const CONTRIBUTION_POINTS = [5, 14, 8, 22, 17, 30, 25, 40, 35, 28, 45, 38, 52, 48, 60, 55, 42, 58, 50, 65];

export default function ProfilePage() {
  const [activeSubmitTab, setActiveSubmitTab] = useState("全部");
  const [activeLink, setActiveLink] = useState("概览");

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 pt-6 pb-16">
        <div className="flex gap-5">
          {/* ─── Left Sidebar ─── */}
          <aside className="w-48 flex-shrink-0">
            {/* Profile mini */}
            <div
              className="rounded-2xl p-5 mb-4 text-center relative overflow-hidden"
              style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(circle at 50% 80%,#6366f1,transparent)" }} />
              <div className="relative">
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  👨‍🚀
                </div>
                <div className="text-sm font-semibold text-white mb-1">星海漫游者</div>
                <p className="text-xs text-slate-400">资源星球 · 创造价值</p>
                <p className="text-xs text-slate-500 mt-1">分享优质资源，帮助更多人一起探索更大的世界</p>
                <button className="mt-3 text-xs text-indigo-400 hover:text-indigo-300">了解更多</button>
              </div>
              {/* Planet deco */}
              <div className="absolute bottom-2 left-2 opacity-40">
                <div className="w-8 h-8 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1)" }} />
              </div>
            </div>

            {/* Nav */}
            <div className="sidebar-card">
              <h3 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">个人中心</h3>
              <nav className="space-y-1">
                {SIDEBAR_LINKS.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => setActiveLink(link.label)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                      activeLink === link.label
                        ? "text-white font-medium"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                    style={activeLink === link.label ? { background: "linear-gradient(135deg,rgba(99,102,241,0.5),rgba(139,92,246,0.3))" } : {}}
                  >
                    <span>{link.icon}</span>
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ─── Main ─── */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Profile banner */}
            <div
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg,rgba(15,15,40,0.9),rgba(30,20,60,0.9))", border: "1px solid rgba(99,102,241,0.25)" }}
            >
              {/* bg planet */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-60 hidden xl:block">
                <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#312e81)", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-36 h-12 rounded-full border border-indigo-400/30" style={{ transform: "rotateX(70deg)" }} />
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  👨‍🚀
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-white">你好，星海漫游者</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                      Lv.6 资源探索家
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-1">加入资源星球 186 天</p>
                  <p className="text-sm text-slate-400 italic">"分享知识，点亮灵感，连接无限可能。"</p>
                  <div className="flex gap-6 mt-3">
                    {[
                      { icon: "⭐", label: "积分", value: "1,820" },
                      { icon: "🎯", label: "贡献值", value: "560" },
                      { icon: "👥", label: "粉丝", value: "128" },
                      { icon: "👍", label: "获赞", value: "342" },
                    ].map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-sm font-bold text-white">{s.value}</div>
                        <div className="text-xs text-slate-500">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-4">
              {STAT_CARDS.map((card, i) => (
                <div key={i} className="resource-card rounded-xl p-4 relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: card.bg }}>
                      {typeof card.icon === "string" ? <span className="text-base">{card.icon}</span> : card.icon}
                    </div>
                    <span className="text-xs text-slate-400">{card.label}</span>
                  </div>
                  <div className={`text-2xl font-bold ${card.color} mb-1`}>{card.value.toLocaleString()}</div>
                  <div className="text-xs text-slate-500">较上月 <span className={card.diffColor}>{card.diff}</span></div>
                  {/* Mini sparkline */}
                  <div className="absolute bottom-0 right-0 w-20 h-10 opacity-30">
                    <svg viewBox="0 0 80 40" className="w-full h-full">
                      <polyline
                        points="0,35 15,28 30,20 45,25 60,10 80,5"
                        fill="none"
                        stroke={i === 0 ? "#f59e0b" : i === 1 ? "#3b82f6" : i === 2 ? "#6366f1" : "#f59e0b"}
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent favorites */}
            <div className="resource-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">最近收藏</h3>
                <button className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300">
                  查看全部 <ChevronRight size={14} />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {RECENT_FAVORITES.map((r) => (
                  <div key={r.name} className="flex-shrink-0 w-44 resource-card rounded-xl p-3 cursor-pointer hover:scale-105 transition-transform">
                    {r.isNew && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-medium text-white mb-2 inline-block" style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}>
                        新
                      </span>
                    )}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-2 ${r.logoBg}`}>{r.logo}</div>
                    <div className="text-xs font-medium text-white mb-0.5 line-clamp-2 leading-tight">{r.name}</div>
                    <div className="text-[10px] text-indigo-400 mb-1">{r.category}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>★ {r.rating}</span>
                      <span>📥 {(r.collections / 1000).toFixed(1)}k</span>
                      <Bookmark size={10} />
                    </div>
                  </div>
                ))}
                <button className="flex-shrink-0 w-10 flex items-center justify-center text-slate-400 hover:text-white">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Submission management */}
            <div className="resource-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">投稿管理</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm" style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    <Search size={13} className="text-slate-400" />
                    <input placeholder="搜索资源名称..." className="bg-transparent text-xs text-white placeholder-slate-500 outline-none w-32" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-slate-300" style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    全部分类 <ChevronRight size={12} className="rotate-90" />
                  </div>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex gap-1 mb-4 border-b border-indigo-500/15">
                {["全部", "审核中", "已发布", "已退回"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSubmitTab(tab)}
                    className={`px-4 py-2 text-sm border-b-2 -mb-px transition-all ${
                      activeSubmitTab === tab ? "text-indigo-400 border-indigo-400 font-medium" : "text-slate-400 border-transparent hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(99,102,241,0.15)" }}>
                <div className="grid grid-cols-[2fr_100px_140px_80px_1fr] px-4 py-2.5 text-xs text-slate-500 border-b border-indigo-500/10" style={{ background: "rgba(15,15,40,0.8)" }}>
                  <span>资源名称</span><span>分类</span><span>提交时间</span><span>状态</span><span>操作</span>
                </div>
                {SUBMISSIONS.map((s, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[2fr_100px_140px_80px_1fr] px-4 py-3 items-center border-b border-indigo-500/5 hover:bg-white/[0.02] transition-colors text-sm"
                    style={{ background: i % 2 === 0 ? "rgba(8,8,24,0.8)" : "rgba(15,15,40,0.5)" }}
                  >
                    <span className="text-white font-medium truncate pr-3">{s.name}</span>
                    <span>
                      <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>{s.category}</span>
                    </span>
                    <span className="text-slate-400 text-xs">{s.date}</span>
                    <span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${s.statusColor}`}>{s.status}</span>
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <button className="text-indigo-400 hover:text-indigo-300">
                        {s.status === "已退回" ? "查看原因" : "查看详情"}
                      </button>
                      {s.status === "审核中" && <button className="text-slate-400 hover:text-white">撤回</button>}
                      {s.status === "已退回" && <button className="text-slate-400 hover:text-white">重新提交</button>}
                      {s.status === "已发布" && <button className="text-slate-400 hover:text-white">分享</button>}
                      <button className="text-slate-500 hover:text-white"><MoreHorizontal size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 text-sm text-slate-400">
                <span>共 36 条</span>
                <div className="flex items-center gap-1">
                  <button className="page-btn">‹</button>
                  {[1, 2, 3, 4].map((p) => (
                    <button key={p} className={`page-btn ${p === 1 ? "active" : ""}`}>{p}</button>
                  ))}
                  <button className="page-btn">›</button>
                  <span className="ml-2 text-xs">10 条/页</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Right Sidebar ─── */}
          <aside className="hidden xl:block w-60 flex-shrink-0 space-y-4">
            {/* Submit entry */}
            <div
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div className="absolute -top-4 -right-4 opacity-30">
                <div className="w-20 h-20 rounded-full" style={{ background: "radial-gradient(circle,#6366f1,transparent)" }} />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1 relative">投稿入口</h3>
              <p className="text-xs text-slate-400 mb-3 relative">快速发布优质资源</p>
              <p className="text-xs text-slate-500 mb-3">与更多开发者和创作者分享你的知识成果</p>
              <Link href="/submit" className="btn-primary w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-medium mb-2">
                <Send size={14} />
                发布新资源
              </Link>
              <button className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
                📋 投稿指南
              </button>
            </div>

            {/* Notifications */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <Bell size={13} className="text-indigo-400" />
                  消息通知
                </span>
                <button className="text-xs text-indigo-400">查看全部</button>
              </div>
              <div className="space-y-3">
                {NOTIFICATIONS.map((n, i) => (
                  <div key={i} className="flex gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 ${n.iconBg}`}>{n.icon}</div>
                    <div>
                      <p className="text-xs text-slate-300 leading-relaxed">{n.text}</p>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly contribution */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">本月贡献</span>
                <span className="text-xs text-slate-500">2024年5月</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: "投稿数", value: "4", diff: "+100%" },
                  { label: "通过数", value: "2", diff: "+100%" },
                  { label: "获赞数", value: "28", diff: "+40%" },
                ].map((s) => (
                  <div key={s.label} className="text-center p-2 rounded-lg" style={{ background: "rgba(99,102,241,0.08)" }}>
                    <div className="text-lg font-bold text-white">{s.value}</div>
                    <div className="text-[10px] text-slate-500">{s.label}</div>
                    <div className="text-[10px] text-green-400">{s.diff}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="flex items-center gap-1"><TrendingUp size={11} className="text-indigo-400" />贡献趋势</span>
                </div>
                {/* Sparkline chart */}
                <div className="h-16 w-full">
                  <svg viewBox="0 0 200 60" className="w-full h-full">
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polyline
                      points={CONTRIBUTION_POINTS.map((v, i) => `${(i / (CONTRIBUTION_POINTS.length - 1)) * 200},${60 - (v / 65) * 55}`).join(" ")}
                      fill="none"
                      stroke="#6366f1"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points={[
                        ...CONTRIBUTION_POINTS.map((v, i) => `${(i / (CONTRIBUTION_POINTS.length - 1)) * 200},${60 - (v / 65) * 55}`),
                        "200,60", "0,60"
                      ].join(" ")}
                      fill="url(#grad)"
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                  <span>5/1</span>
                  <span>5/15</span>
                  <span>5/29</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
