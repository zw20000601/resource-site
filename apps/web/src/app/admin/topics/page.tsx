"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { TrendingUp, TrendingDown, Search, Edit2, Copy, Trash2, ChevronDown, GripVertical } from "lucide-react";

const STAT_CARDS = [
  { label: "专题总数", value: "86", diff: "+24.1%", up: true, icon: "📚", bg: "rgba(99,102,241,0.2)", color: "text-indigo-400" },
  { label: "推荐专题", value: "18", diff: "+12.5%", up: true, icon: "⭐", bg: "rgba(34,197,94,0.2)", color: "text-green-400" },
  { label: "草稿专题", value: "9", diff: "-10.0%", up: false, icon: "📝", bg: "rgba(59,130,246,0.2)", color: "text-blue-400" },
  { label: "本月新增", value: "6", diff: "+50.0%", up: true, icon: "🔥", bg: "rgba(245,158,11,0.2)", color: "text-amber-400" },
];

const TOPICS = [
  { name: "AI 工具全景图谱", badge: "推荐", desc: "汇集全球热门 AI 工具，覆盖写作、设计、编程...", count: 1248, owner: "星尘漫游者", heat: "12.4k", sub: "订阅 3.2k", status: "推荐中", statusColor: "text-green-400 bg-green-400/10", date: "2024-05-14 14:32", img: "🤖" },
  { name: "设计灵感库", badge: "推荐", desc: "精选 UI/UX、插画、排版等优质设计灵感与案例", count: 986, owner: "DesignMaster", heat: "8.6k", sub: "订阅 2.1k", status: "推荐中", statusColor: "text-green-400 bg-green-400/10", date: "2024-05-14 13:58", img: "🎨" },
  { name: "前端开发资源大全", badge: "", desc: "前端学习路线、框架教程、实战项目与面试资料", count: 1512, owner: "前端小智", heat: "7.9k", sub: "订阅 1.8k", status: "已发布", statusColor: "text-blue-400 bg-blue-400/10", date: "2024-05-14 12:41", img: "💻" },
  { name: "效率神器合集", badge: "", desc: "提升效率的工具、插件与方法论集合", count: 745, owner: "Office达人", heat: "5.4k", sub: "订阅 1.2k", status: "已发布", statusColor: "text-blue-400 bg-blue-400/10", date: "2024-05-14 11:23", img: "⚡" },
  { name: "数据可视化精选", badge: "", desc: "数据图表、可视化工具与优秀案例精选", count: 642, owner: "数据猎人", heat: "3.8k", sub: "订阅 856", status: "草稿", statusColor: "text-slate-400 bg-slate-400/10", date: "2024-05-14 10:30", img: "📊" },
  { name: "PPT 干货合集", badge: "", desc: "PPT 模板、技巧与演示灵感一站式合集", count: 533, owner: "演示之道", heat: "2.9k", sub: "订阅 612", status: "草稿", statusColor: "text-slate-400 bg-slate-400/10", date: "2024-05-14 09:15", img: "📑" },
  { name: "开源项目精选", badge: "", desc: "高质量开源项目与优秀开发资源收录", count: 1089, owner: "开源拾荒者", heat: "6.1k", sub: "订阅 1.5k", status: "已归档", statusColor: "text-slate-500 bg-slate-500/10", date: "2024-05-13 18:22", img: "🐙" },
  { name: "产品经理资源库", badge: "", desc: "产品思维、原型工具、需求支撑与案例", count: 468, owner: "产品汪", heat: "2.3k", sub: "订阅 489", status: "已归档", statusColor: "text-slate-500 bg-slate-500/10", date: "2024-05-13 17:05", img: "📱" },
];

const FEATURED = [
  { rank: 1, name: "AI 工具全景图谱", heat: "12.4k", img: "🤖" },
  { rank: 2, name: "设计灵感库", heat: "8.6k", img: "🎨" },
  { rank: 3, name: "前端开发资源大全", heat: "7.9k", img: "💻" },
  { rank: 4, name: "效率神器合集", heat: "5.4k", img: "⚡" },
  { rank: 5, name: "开源项目精选", heat: "6.1k", img: "🐙" },
];

const SUB_TREND = [
  { date: "04-15", new: 400, cancel: 150 },
  { date: "04-22", new: 900, cancel: 250 },
  { date: "04-29", new: 1100, cancel: 300 },
  { date: "05-06", new: 1500, cancel: 400 },
  { date: "05-14", new: 1800, cancel: 350 },
];

const maxSub = 2000;
const chartW2 = 180;
const chartH2 = 100;

function miniLine(data: typeof SUB_TREND, key: "new" | "cancel", color: string) {
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * chartW2},${chartH2 - (d[key] / maxSub) * (chartH2 - 10) - 5}`);
  return <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />;
}

export default function TopicsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader breadcrumb={["专题管理"]} />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5">
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white">专题管理</h1>
                <p className="text-slate-400 text-sm mt-0.5">管理专题合集、推荐位与分类策展</p>
              </div>

              {/* Search + actions */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl flex-1 min-w-48" style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}>
                  <Search size={14} className="text-slate-400" />
                  <input placeholder="搜索专题名称、描述、标签..." className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                </div>
                {[["状态：全部", ""], ["负责人：全部", ""], ["排序：更新时间", ""]].map(([label]) => (
                  <div key={label} className="flex items-center gap-1 space-input rounded-xl px-3 py-2 text-sm text-slate-300 cursor-pointer">
                    {label} <ChevronDown size={13} className="text-slate-400" />
                  </div>
                ))}
                <button className="btn-primary px-4 py-2 rounded-xl text-white text-sm flex items-center gap-1.5">
                  <Search size={14} /> 搜索
                </button>
                <button className="px-4 py-2 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
                  ↺ 重置
                </button>
                <button className="btn-primary px-4 py-2 rounded-xl text-white text-sm flex items-center gap-1.5">
                  + 新建专题
                </button>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {STAT_CARDS.map((c) => (
                  <div key={c.label} className="resource-card rounded-xl p-4 relative overflow-hidden">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-xs text-slate-400">{c.label}</p>
                        <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: c.bg }}>{c.icon}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {c.up ? <TrendingUp size={10} className="text-green-400" /> : <TrendingDown size={10} className="text-red-400" />}
                      <span className={c.up ? "text-green-400" : "text-red-400"}>较上月 {c.diff}</span>
                    </div>
                    {/* Sparkline */}
                    <div className="absolute bottom-0 right-0 w-20 h-8 opacity-30">
                      <svg viewBox="0 0 80 32"><polyline points={`0,28 20,${c.up ? "18" : "22"} 40,${c.up ? "12" : "25"} 60,${c.up ? "8" : "20"} 80,${c.up ? "4" : "16"}`} fill="none" stroke={c.up ? "#10b981" : "#ef4444"} strokeWidth="1.5" /></svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="resource-card rounded-xl overflow-hidden mb-3">
                <div className="grid grid-cols-[2.5fr_70px_100px_100px_80px_130px_90px] px-4 py-2.5 text-xs text-slate-500 border-b border-indigo-500/10" style={{ background: "rgba(15,15,40,0.8)" }}>
                  <span>专题名称</span><span>资源数</span><span>负责人</span><span>热度</span><span>状态</span><span>更新时间</span><span>操作</span>
                </div>
                {TOPICS.map((t, i) => (
                  <div key={i} className="grid grid-cols-[2.5fr_70px_100px_100px_80px_130px_90px] px-4 py-3 items-center border-b border-indigo-500/5 hover:bg-white/[0.02] transition-colors"
                    style={{ background: i % 2 === 0 ? "rgba(8,8,24,0.7)" : "rgba(15,15,40,0.5)" }}>
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(99,102,241,0.15)" }}>{t.img}</div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium text-white truncate">{t.name}</span>
                          {t.badge && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-orange-300" style={{ background: "rgba(249,115,22,0.2)" }}>{t.badge}</span>}
                        </div>
                        <p className="text-[10px] text-slate-500 truncate">{t.desc}</p>
                      </div>
                    </div>
                    <span className="text-sm text-white font-medium">{t.count.toLocaleString()}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>👤</div>
                      <span className="text-xs text-slate-300 truncate">{t.owner}</span>
                    </div>
                    <div>
                      <div className="text-xs text-orange-400">🔥 {t.heat}</div>
                      <div className="text-[10px] text-slate-500">{t.sub}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${t.statusColor}`}>{t.status}</span>
                    <span className="text-[10px] text-slate-500">{t.date}</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"><Edit2 size={13} /></button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"><Copy size={13} /></button>
                      <button className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-400/10"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span className="text-xs">共 86 条</span>
                <div className="flex items-center gap-1">
                  <select className="space-input rounded-lg px-2 py-1.5 text-xs mr-2"><option>10 条/页</option></select>
                  <button className="page-btn">‹</button>
                  {[1, 2, 3, 4, 5, 6].map((p) => (
                    <button key={p} onClick={() => setCurrentPage(p)} className={`page-btn ${currentPage === p ? "active" : ""}`}>{p}</button>
                  ))}
                  <span className="text-slate-500 px-1">…</span>
                  <button className="page-btn">9</button>
                  <button className="page-btn">›</button>
                  <span className="text-xs text-slate-500 ml-2">前往</span>
                  <input type="number" defaultValue={1} className="space-input w-12 rounded-lg px-2 py-1.5 text-xs text-center" />
                  <span className="text-xs text-slate-500">页</span>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-56 flex-shrink-0 space-y-4">
              {/* Featured positions */}
              <div className="sidebar-card">
                <div className="flex items-center gap-1 mb-1">
                  <h3 className="font-semibold text-white text-sm">专题展荐位</h3>
                  <span className="text-slate-500 text-xs">ⓘ</span>
                </div>
                <p className="text-[10px] text-slate-500 mb-3">拖拽调整顺序，最多展示 5 个专题</p>
                <div className="space-y-2">
                  {FEATURED.map((f) => (
                    <div key={f.rank} className="flex items-center gap-2 p-2 rounded-lg cursor-grab hover:bg-white/5 transition-all" style={{ border: "1px solid rgba(99,102,241,0.1)" }}>
                      <GripVertical size={13} className="text-slate-600 flex-shrink-0" />
                      <span className="text-xs font-bold text-slate-500 w-4 flex-shrink-0">{f.rank}</span>
                      <span className="text-sm flex-shrink-0">{f.img}</span>
                      <span className="text-xs text-slate-300 flex-1 truncate">{f.name}</span>
                      <span className="text-[10px] text-orange-400 flex-shrink-0">🔥{f.heat}</span>
                      <GripVertical size={11} className="text-slate-600 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscription trend */}
              <div className="sidebar-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">专题订阅趋势</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    近 30 天 <ChevronDown size={12} />
                  </div>
                </div>
                <div className="flex gap-3 text-[10px] text-slate-400 mb-2">
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-blue-400 inline-block rounded" />新增订阅</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-purple-400 inline-block rounded" />取消订阅</span>
                </div>
                <svg viewBox={`0 0 ${chartW2} ${chartH2}`} className="w-full" style={{ height: 100 }}>
                  {/* Grid */}
                  {[0, 1, 2, 3].map((i) => (
                    <line key={i} x1="0" y1={i * 25} x2={chartW2} y2={i * 25} stroke="rgba(99,102,241,0.08)" strokeWidth="1" />
                  ))}
                  {/* Y labels */}
                  {["2K", "1.5K", "1K", "500", "0"].map((label, i) => (
                    <text key={i} x={0} y={i * 23 + 6} fill="#475569" fontSize="8" textAnchor="start">{label}</text>
                  ))}
                  {miniLine(SUB_TREND, "new", "#3b82f6")}
                  {miniLine(SUB_TREND, "cancel", "#a855f7")}
                  {/* X labels */}
                  {SUB_TREND.map((d, i) => (
                    <text key={i} x={(i / (SUB_TREND.length - 1)) * chartW2} y={chartH2 + 2} fill="#475569" fontSize="8" textAnchor="middle">{d.date}</text>
                  ))}
                </svg>
                <div className="flex justify-between mt-3 pt-2 border-t border-indigo-500/10">
                  <div>
                    <div className="text-xs text-white font-bold">18,732</div>
                    <div className="text-[10px] text-slate-500">新增订阅</div>
                    <div className="text-[10px] text-green-400">↑ 24.5%</div>
                  </div>
                  <div>
                    <div className="text-xs text-white font-bold">3,421</div>
                    <div className="text-[10px] text-slate-500">取消订阅</div>
                    <div className="text-[10px] text-red-400">↓ 8.3%</div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-600 mt-1">数据更新：2024-05-14 14:32</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
