"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { TrendingUp, TrendingDown, Search, RefreshCw, ChevronRight, Eye, Edit2, MoreVertical } from "lucide-react";

const STAT_CARDS = [
  { label: "资源总数", value: "12,480", diff: "+12.5%", up: true, icon: "🗂️", bg: "rgba(59,130,246,0.15)" },
  { label: "待上架", value: "128", diff: "-8.3%", up: false, icon: "⏳", bg: "rgba(245,158,11,0.15)" },
  { label: "已下架", value: "86", diff: "+15.2%", up: true, icon: "🔴", bg: "rgba(239,68,68,0.15)" },
  { label: "草稿", value: "254", diff: "+5.6%", up: true, icon: "📝", bg: "rgba(168,85,247,0.15)" },
];

const RESOURCES = [
  { name: "AI 绘画提示词大全（Midjourney版）", version: "v2.1", category: "学习教程", source: "平台原创", author: "星尘漫游者", views: 18430, collections: 1243, status: "已上架", statusColor: "text-green-400 bg-green-400/10", date: "2024-05-14 14:32", logo: "🎨", logoBg: "bg-indigo-600" },
  { name: "Figma 高级组件库 2024", version: "v1.0", category: "设计素材", source: "用户投稿", author: "DesignMaster", views: 12850, collections: 986, status: "已上架", statusColor: "text-green-400 bg-green-400/10", date: "2024-05-14 13:58", logo: "🎯", logoBg: "bg-purple-600" },
  { name: "Vue3 企业级后台管理模板", version: "v3.2.0", category: "源码模板", source: "平台原创", author: "前端小智", views: 9764, collections: 742, status: "已上架", statusColor: "text-green-400 bg-green-400/10", date: "2024-05-14 12:41", logo: "V", logoBg: "bg-green-600" },
  { name: "PPT 商务图表合集（200+）", version: "v1.3", category: "办公资源", source: "用户投稿", author: "Office达人", views: 7215, collections: 512, status: "待审核", statusColor: "text-yellow-400 bg-yellow-400/10", date: "2024-05-14 11:23", logo: "📊", logoBg: "bg-orange-600" },
  { name: "赛博朋克风格音乐包", version: "v1.0", category: "音乐音效", source: "平台原创", author: "AudioLab", views: 5632, collections: 398, status: "已下架", statusColor: "text-red-400 bg-red-400/10", date: "2024-05-14 10:05", logo: "🎵", logoBg: "bg-pink-600" },
  { name: "Python 爬虫实战项目合集", version: "v2.0", category: "学习教程", source: "用户投稿", author: "代码工匠", views: 4981, collections: 321, status: "已上架", statusColor: "text-green-400 bg-green-400/10", date: "2024-05-13 22:17", logo: "🐍", logoBg: "bg-blue-700" },
  { name: "高清风景摄影素材包（8K）", version: "v1.1", category: "图片素材", source: "平台原创", author: "光影捕手", views: 3876, collections: 287, status: "草稿", statusColor: "text-slate-400 bg-slate-400/10", date: "2024-05-13 19:46", logo: "📷", logoBg: "bg-teal-600" },
  { name: "AE 视频特效预设包", version: "v1.5", category: "设计素材", source: "用户投稿", author: "MotionCube", views: 3245, collections: 241, status: "待审核", statusColor: "text-yellow-400 bg-yellow-400/10", date: "2024-05-13 18:30", logo: "Ae", logoBg: "bg-violet-700" },
];

const OVERVIEW = [
  { name: "学习教程", count: 3245, pct: "26.0%", color: "#6366f1" },
  { name: "设计素材", count: 2340, pct: "18.8%", color: "#8b5cf6" },
  { name: "源码模板", count: 2156, pct: "17.3%", color: "#3b82f6" },
  { name: "办公资源", count: 1890, pct: "15.1%", color: "#06b6d4" },
  { name: "图片素材", count: 1324, pct: "10.6%", color: "#10b981" },
  { name: "音乐音效", count: 865, pct: "6.9%", color: "#f59e0b" },
  { name: "其他资源", count: 660, pct: "5.3%", color: "#64748b" },
];

const TOP5 = [
  { rank: 1, name: "学习教程", count: 3245 },
  { rank: 2, name: "设计素材", count: 2340 },
  { rank: 3, name: "源码模板", count: 2156 },
  { rank: 4, name: "办公资源", count: 1890 },
  { rank: 5, name: "图片素材", count: 1324 },
];

export default function ResourcesPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1248;

  const toggleSelect = (i: number) => setSelected((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);
  const toggleAll = () => setSelected(selected.length === RESOURCES.length ? [] : RESOURCES.map((_, i) => i));

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader breadcrumb={["资源管理"]} />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white">资源管理</h1>
                <p className="text-slate-400 text-sm mt-0.5">统一管理平台内全部资源内容</p>
              </div>

              {/* Search bar */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-48" style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}>
                  <Search size={14} className="text-slate-400" />
                  <input placeholder="搜索资源名称、关键词、作者..." className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                </div>
                {[["全部分类", ""], ["全部状态", ""], ["全部来源类型", ""]].map(([label]) => (
                  <select key={label} className="space-input rounded-xl px-3 py-2 text-sm text-slate-300 cursor-pointer">
                    <option>{label}</option>
                  </select>
                ))}
                <button className="btn-primary px-4 py-2 rounded-xl text-white text-sm flex items-center gap-1.5">
                  <Search size={14} /> 搜索
                </button>
                <button className="px-4 py-2 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
                  重置
                </button>
                <button className="px-4 py-2 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40 transition-all flex items-center gap-1.5">
                  ↓ 批量导出
                </button>
                <button className="btn-primary px-4 py-2 rounded-xl text-white text-sm flex items-center gap-1.5">
                  + 新增资源
                </button>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {STAT_CARDS.map((c) => (
                  <div key={c.label} className="resource-card rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: c.bg }}>{c.icon}</div>
                    <div>
                      <p className="text-xs text-slate-400">{c.label}</p>
                      <p className="text-xl font-bold text-white">{c.value}</p>
                      <div className="flex items-center gap-1 text-xs">
                        {c.up ? <TrendingUp size={10} className="text-green-400" /> : <TrendingDown size={10} className="text-red-400" />}
                        <span className={c.up ? "text-green-400" : "text-red-400"}>{c.diff}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bulk actions + count */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">已选择 {selected.length} 项</span>
                  <button className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-indigo-500/20">批量上架</button>
                  <button className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-indigo-500/20">批量下架</button>
                  <button className="text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-500/20">批量删除</button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  共 12,480 条 <button className="text-slate-500 hover:text-white"><RefreshCw size={12} /></button>
                </div>
              </div>

              {/* Table */}
              <div className="resource-card rounded-xl overflow-hidden mb-3">
                <div className="grid grid-cols-[36px_2.5fr_80px_70px_90px_70px_60px_70px_120px_100px] px-4 py-2.5 text-xs text-slate-500 border-b border-indigo-500/10" style={{ background: "rgba(15,15,40,0.8)" }}>
                  <input type="checkbox" className="accent-indigo-500" checked={selected.length === RESOURCES.length} onChange={toggleAll} />
                  <span>资源名称</span><span>分类</span><span>来源</span><span>作者/投稿者</span>
                  <span>浏览量</span><span>收藏</span><span>状态</span><span>更新时间</span><span>操作</span>
                </div>
                {RESOURCES.map((r, i) => (
                  <div key={i} className="grid grid-cols-[36px_2.5fr_80px_70px_90px_70px_60px_70px_120px_100px] px-4 py-3 items-center border-b border-indigo-500/5 hover:bg-white/[0.02] transition-colors text-sm"
                    style={{ background: i % 2 === 0 ? "rgba(8,8,24,0.7)" : "rgba(15,15,40,0.5)" }}>
                    <input type="checkbox" className="accent-indigo-500" checked={selected.includes(i)} onChange={() => toggleSelect(i)} />
                    <div className="flex items-start gap-2 min-w-0 pr-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${r.logoBg}`}>{r.logo}</div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white truncate">{r.name}</div>
                        <span className="text-[10px] text-slate-500">{r.version}</span>
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>{r.category}</span>
                    <span className="text-xs text-slate-400">{r.source}</span>
                    <span className="text-xs text-slate-300 truncate">{r.author}</span>
                    <span className="text-xs text-white">{r.views.toLocaleString()}</span>
                    <span className="text-xs text-white">{r.collections}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${r.statusColor}`}>{r.status}</span>
                    <span className="text-[10px] text-slate-500">{r.date}</span>
                    <div className="flex items-center gap-1 text-xs">
                      <button className="text-indigo-400 hover:text-indigo-300">查看</button>
                      <button className="text-slate-400 hover:text-white">编辑</button>
                      <button className="text-slate-400 hover:text-white flex items-center"><MoreVertical size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <select className="space-input rounded-lg px-2 py-1.5 text-xs">
                    <option>10条/页</option><option>20条/页</option><option>50条/页</option>
                  </select>
                </div>
                <div className="flex items-center gap-1">
                  <button className="page-btn">‹</button>
                  {[1, 2, 3, 4, 5].map((p) => (
                    <button key={p} onClick={() => setCurrentPage(p)} className={`page-btn ${currentPage === p ? "active" : ""}`}>{p}</button>
                  ))}
                  <span className="text-slate-500 px-1">…</span>
                  <button className="page-btn">{totalPages}</button>
                  <button className="page-btn">›</button>
                  <span className="text-xs text-slate-500 ml-2">前往</span>
                  <input type="number" defaultValue={1} className="space-input w-12 rounded-lg px-2 py-1.5 text-xs text-center" />
                  <span className="text-xs text-slate-500">页</span>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-56 flex-shrink-0 space-y-4">
              {/* Donut overview */}
              <div className="sidebar-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">资源概览</h3>
                </div>
                <div className="relative flex items-center justify-center mb-3" style={{ height: 120 }}>
                  <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
                    {(() => {
                      let offset = 0;
                      const total = OVERVIEW.reduce((s, c) => s + c.count, 0);
                      const circ = 2 * Math.PI * 38;
                      return OVERVIEW.map((cat) => {
                        const pct = cat.count / total;
                        const dash = pct * circ;
                        const el = <circle key={cat.name} cx="50" cy="50" r="38" fill="none" stroke={cat.color} strokeWidth="16" strokeDasharray={`${dash} ${circ}`} strokeDashoffset={-offset} />;
                        offset += dash;
                        return el;
                      });
                    })()}
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-base font-bold text-white">12,480</div>
                    <div className="text-[10px] text-slate-400">总资源数</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {OVERVIEW.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />{cat.name}
                      </span>
                      <span className="text-slate-500">{cat.pct}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-2 w-full text-xs text-indigo-400 flex items-center justify-center gap-1">查看全部分类 <ChevronRight size={11} /></button>
              </div>

              {/* Health */}
              <div className="sidebar-card">
                <h3 className="font-semibold text-white text-sm mb-3">资源健康度</h3>
                <div className="space-y-3">
                  {[
                    { label: "正常资源", value: 11236, pct: "90.0%", color: "#10b981" },
                    { label: "待处理问题", value: 812, pct: "6.5%", color: "#f59e0b" },
                    { label: "已下架资源", value: 432, pct: "3.5%", color: "#ef4444" },
                  ].map((h) => (
                    <div key={h.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <span className="w-2 h-2 rounded-full" style={{ background: h.color }} />{h.label}
                        </span>
                        <div className="flex gap-2">
                          <span className="text-white">{h.value.toLocaleString()}</span>
                          <span className="text-slate-500">{h.pct}</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800">
                        <div className="h-full rounded-full" style={{ width: h.pct, background: h.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source donut */}
              <div className="sidebar-card">
                <h3 className="font-semibold text-white text-sm mb-3">来源分布</h3>
                <div className="relative flex items-center justify-center mb-3" style={{ height: 100 }}>
                  <svg viewBox="0 0 100 100" className="w-28 h-28 -rotate-90">
                    {[
                      { pct: 0.49, color: "#6366f1" },
                      { pct: 0.435, color: "#8b5cf6" },
                      { pct: 0.075, color: "#3b82f6" },
                    ].reduce<React.ReactElement[]>((acc, s, i, arr) => {
                      const circ = 2 * Math.PI * 38;
                      const offset = arr.slice(0, i).reduce((sum, x) => sum + x.pct * circ, 0);
                      acc.push(<circle key={i} cx="50" cy="50" r="38" fill="none" stroke={s.color} strokeWidth="16" strokeDasharray={`${s.pct * circ} ${circ}`} strokeDashoffset={-offset} />);
                      return acc;
                    }, [])}
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-sm font-bold text-white">12,480</div>
                    <div className="text-[10px] text-slate-400">总资源数</div>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  {[["平台原创", "6,120 (49.0%)", "#6366f1"], ["用户投稿", "5,430 (43.5%)", "#8b5cf6"], ["合作资源", "930 (7.5%)", "#3b82f6"]].map(([label, val, color]) => (
                    <div key={label as string} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-400"><span className="w-2 h-2 rounded-full" style={{ background: color as string }} />{label}</span>
                      <span className="text-slate-500">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top5 */}
              <div className="sidebar-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">近期活跃分类 TOP5</h3>
                </div>
                <div className="space-y-2">
                  {TOP5.map((t) => (
                    <div key={t.name} className="flex items-center gap-2">
                      <span className="w-5 text-xs text-center font-bold" style={{ color: t.rank <= 3 ? "#f59e0b" : "#64748b" }}>{t.rank}</span>
                      <span className="flex-1 text-xs text-slate-300">{t.name}</span>
                      <span className="text-xs text-slate-500">{t.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-2 w-full text-xs text-indigo-400 flex items-center justify-center gap-1">查看完整统计 <ChevronRight size={11} /></button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
