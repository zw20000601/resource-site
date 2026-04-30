"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Search, RefreshCw, ChevronDown } from "lucide-react";

const RANK_TABS = [
  { label: "综合榜", icon: "🏆" },
  { label: "AI 工具榜", icon: "🚀" },
  { label: "设计工具榜", icon: "✏️" },
  { label: "开发工具榜", icon: "⚙️" },
  { label: "学习网站榜", icon: "🎓" },
];

const RANKINGS = [
  { rank: 1, name: "ChatGPT", sub: "AI 对话与内容生成", category: "AI 工具", rating: 9.78, heat: "98.3K", growth: "+18.6%", status: "展示中", logo: "🤖", logoBg: "bg-green-600", statusColor: "text-green-400 bg-green-400/10" },
  { rank: 2, name: "Notion", sub: "笔记与知识管理", category: "效率工具", rating: 9.62, heat: "72.1K", growth: "+9.3%", status: "展示中", logo: "N", logoBg: "bg-gray-800", statusColor: "text-green-400 bg-green-400/10" },
  { rank: 3, name: "Midjourney", sub: "AI 绘画与图像生成", category: "AI 工具", rating: 9.48, heat: "65.4K", growth: "+22.7%", status: "展示中", logo: "🎨", logoBg: "bg-indigo-700", statusColor: "text-green-400 bg-green-400/10" },
  { rank: 4, name: "Figma", sub: "界面设计与协作", category: "设计工具", rating: 9.36, heat: "58.7K", growth: "+6.8%", status: "展示中", logo: "🎯", logoBg: "bg-purple-600", statusColor: "text-green-400 bg-green-400/10" },
  { rank: 5, name: "GitHub", sub: "代码托管与协作平台", category: "开发工具", rating: 9.24, heat: "50.2K", growth: "+4.1%", status: "展示中", logo: "🐙", logoBg: "bg-gray-900", statusColor: "text-green-400 bg-green-400/10" },
  { rank: 6, name: "Vercel", sub: "前端部署与托管平台", category: "开发工具", rating: 9.12, heat: "36.8K", growth: "+13.2%", status: "展示中", logo: "▲", logoBg: "bg-black", statusColor: "text-green-400 bg-green-400/10" },
  { rank: 7, name: "Canva", sub: "在线设计与图片编辑", category: "设计工具", rating: 9.01, heat: "34.5K", growth: "+5.2%", status: "展示中", logo: "C", logoBg: "bg-cyan-600", statusColor: "text-green-400 bg-green-400/10" },
  { rank: 8, name: "Perplexity", sub: "AI 搜索与问答", category: "AI 工具", rating: 8.92, heat: "31.2K", growth: "+15.6%", status: "待调整", logo: "🔍", logoBg: "bg-teal-600", statusColor: "text-yellow-400 bg-yellow-400/10" },
  { rank: 9, name: "Cursor", sub: "AI 编程助手", category: "开发工具", rating: 8.86, heat: "28.7K", growth: "+27.4%", status: "待调整", logo: "🖱️", logoBg: "bg-violet-700", statusColor: "text-yellow-400 bg-yellow-400/10" },
  { rank: 10, name: "Adobe Firefly", sub: "AI 生成式设计工具", category: "设计工具", rating: 8.75, heat: "24.1K", growth: "+3.7%", status: "冻结", logo: "Ae", logoBg: "bg-orange-700", statusColor: "text-slate-400 bg-slate-400/10" },
];

const TREND_DATA = [5, 8, 12, 10, 15, 18, 22, 20, 25, 30, 28, 35, 40, 38];
const HEAT_DATA = [20, 25, 30, 28, 35, 32, 38, 35, 42, 45, 40, 48, 50, 55];
const chartW = 200;
const chartH = 80;

function trendLine(data: number[], color: string) {
  const max = Math.max(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * chartW},${chartH - (v / max) * (chartH - 10) - 5}`).join(" ");
  return <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />;
}

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [weights, setWeights] = useState({ rating: 40, heat: 30, growth: 20, manual: 10 });

  const updateWeight = (key: keyof typeof weights, val: number) => {
    setWeights((prev) => ({ ...prev, [key]: val }));
  };

  const rankColors: Record<number, string> = {
    1: "linear-gradient(135deg,#f59e0b,#ef4444)",
    2: "linear-gradient(135deg,#9ca3af,#6b7280)",
    3: "linear-gradient(135deg,#cd7c2f,#a0522d)",
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader breadcrumb={["排行榜管理"]} />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-5">
            <div className="flex-1 min-w-0">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white">排行榜管理</h1>
                <p className="text-slate-400 text-sm mt-0.5">维护综合榜与分类榜的排序策略</p>
              </div>

              {/* Rank tabs */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {RANK_TABS.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === i ? "text-white" : "text-slate-400 border border-indigo-500/20 hover:border-indigo-500/40"
                    }`}
                    style={activeTab === i ? { background: "linear-gradient(135deg,rgba(99,102,241,0.8),rgba(139,92,246,0.6))", border: "1px solid rgba(99,102,241,0.5)" } : { background: "rgba(15,15,40,0.6)" }}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Controls row */}
              <div
                className="resource-card rounded-xl p-4 mb-4 flex items-center gap-4 flex-wrap"
              >
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400">更新周期</span>
                  <div className="flex items-center gap-1 space-input rounded-lg px-3 py-1.5 cursor-pointer">
                    <span className="text-white">每日更新（00:30）</span>
                    <ChevronDown size={13} className="text-slate-400" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400">权重策略</span>
                  <div className="flex items-center gap-1 space-input rounded-lg px-3 py-1.5 cursor-pointer">
                    <span className="text-white">默认策略（推荐）</span>
                    <ChevronDown size={13} className="text-slate-400" />
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-1 space-input rounded-lg px-3 py-1.5">
                  <Search size={13} className="text-slate-400" />
                  <input placeholder="搜索资源/工具名称" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                </div>
                <button className="btn-primary px-4 py-2 rounded-xl text-white text-sm flex items-center gap-1.5">
                  <RefreshCw size={13} /> 立即刷新榜单
                </button>
                <button className="px-4 py-2 rounded-xl text-white text-sm border border-indigo-500/30 hover:border-indigo-500/60 transition-all">
                  保存策略
                </button>
              </div>

              {/* Info row */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3 px-1">
                <div className="flex gap-4">
                  <span>⏰ 下次自动更新：2024-05-15 00:30</span>
                  <span>📊 数据来源：站内行为 + 外部数据</span>
                  <span>🕐 更新时间：2024-05-14 14:28</span>
                </div>
                <button className="text-indigo-400 hover:text-indigo-300">批量调整排名</button>
              </div>

              {/* Table */}
              <div className="resource-card rounded-xl overflow-hidden mb-3">
                <div className="grid grid-cols-[60px_2.5fr_90px_80px_80px_80px_90px_160px] px-4 py-2.5 text-xs text-slate-500 border-b border-indigo-500/10" style={{ background: "rgba(15,15,40,0.8)" }}>
                  <span>排名</span><span>资源/工具</span><span>分类</span>
                  <span className="flex items-center gap-0.5">评分 <span>ⓘ</span></span>
                  <span className="flex items-center gap-0.5">热度 <span>ⓘ</span></span>
                  <span className="flex items-center gap-0.5">增长率 <span>ⓘ</span></span>
                  <span>榜单状态</span><span>操作</span>
                </div>
                {RANKINGS.map((r, i) => (
                  <div key={i}
                    className="grid grid-cols-[60px_2.5fr_90px_80px_80px_80px_90px_160px] px-4 py-3 items-center border-b border-indigo-500/5 hover:bg-white/[0.02] transition-colors"
                    style={{ background: i % 2 === 0 ? "rgba(8,8,24,0.7)" : "rgba(15,15,40,0.5)" }}
                  >
                    <div className="flex items-center justify-center">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                        style={{ background: rankColors[r.rank] || "rgba(99,102,241,0.2)", color: rankColors[r.rank] ? "white" : "#94a3b8" }}
                      >
                        {r.rank}
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${r.logoBg}`}>{r.logo}</div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white truncate">{r.name}</div>
                        <div className="text-xs text-slate-500 truncate">{r.sub}</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>{r.category}</span>
                    <span className="text-sm text-white flex items-center gap-0.5">⭐ {r.rating}</span>
                    <span className="text-sm text-white">{r.heat}</span>
                    <span className="text-sm font-medium text-green-400">↑ {r.growth}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${r.statusColor}`}>{r.status}</span>
                    <div className="flex items-center gap-1 text-xs">
                      <button className="px-2 py-1 rounded-lg text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/10 transition-all">查看详情</button>
                      <button className="px-2 py-1 rounded-lg text-slate-400 border border-indigo-500/15 hover:bg-white/5 transition-all">调整排名</button>
                      <button className="px-2 py-1 rounded-lg text-red-400/70 border border-red-500/20 hover:bg-red-500/10 transition-all">移出榜单</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>ⓘ 拖拽行可调整排名顺序，调整后记得保存策略。</span>
                <div className="flex items-center gap-1">
                  <select className="space-input rounded-lg px-2 py-1.5 text-xs mr-2"><option>10 条/页</option></select>
                  <button className="page-btn">‹</button>
                  {[1, 2, 3].map((p) => <button key={p} className={`page-btn ${p === 1 ? "active" : ""}`}>{p}</button>)}
                  <button className="page-btn">›</button>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-56 flex-shrink-0 space-y-4">
              {/* Weight config */}
              <div className="sidebar-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white text-sm">权重配置</h3>
                  <button className="text-xs text-indigo-400 hover:text-indigo-300">重置为默认</button>
                </div>
                <div className="space-y-4">
                  {([
                    ["评分权重", "rating", "ⓘ", "#6366f1"],
                    ["热度权重", "heat", "ⓘ", "#8b5cf6"],
                    ["增长权重", "growth", "ⓘ", "#3b82f6"],
                    ["人工干预", "manual", "ⓘ", "#06b6d4"],
                  ] as const).map(([label, key, info, color]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-slate-400">{label} {info}</span>
                        <span className="text-sm font-bold text-white">{weights[key]} %</span>
                      </div>
                      <div className="relative">
                        <input
                          type="range" min={0} max={100} value={weights[key]}
                          onChange={(e) => updateWeight(key, Number(e.target.value))}
                          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                          style={{ background: `linear-gradient(to right, ${color} ${weights[key]}%, rgba(99,102,241,0.2) ${weights[key]}%)` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-3">权重总和为 100%，数值越高对排名影响越大</p>
                <div className="mt-3 p-2.5 rounded-lg text-[10px] text-slate-400 leading-relaxed" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}>
                  💡 推示：人工干预用于管理员对榜单的微调，避免异常波动。
                </div>
              </div>

              {/* Trend chart */}
              <div className="sidebar-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">榜单变化趋势</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400">近7天 <ChevronDown size={11} /></div>
                </div>
                <div className="flex gap-3 text-[10px] text-slate-400 mb-2">
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-blue-400 inline-block rounded" />综合榜排名变化</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-purple-400 inline-block rounded" />热度变化</span>
                </div>
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full" style={{ height: 80 }}>
                  {[0, 1, 2, 3].map((i) => <line key={i} x1="0" y1={i * 20} x2={chartW} y2={i * 20} stroke="rgba(99,102,241,0.08)" strokeWidth="1" />)}
                  {["120", "80", "40", "0"].map((label, i) => <text key={i} x={0} y={i * 20 + 5} fill="#475569" fontSize="8">{label}</text>)}
                  {trendLine(TREND_DATA, "#3b82f6")}
                  {trendLine(HEAT_DATA, "#a855f7")}
                  {["05-08", "05-09", "05-10", "05-11", "05-12", "05-13", "05-14"].map((d, i) => (
                    <text key={i} x={(i / 6) * chartW} y={chartH} fill="#475569" fontSize="7" textAnchor="middle">{d}</text>
                  ))}
                </svg>
                <p className="text-[10px] text-slate-600 mt-1">ⓘ 数据每小时更新一次</p>
              </div>

              {/* Anomaly monitoring */}
              <div className="sidebar-card">
                <h3 className="font-semibold text-white text-sm mb-3">榜单异常监控</h3>
                <div className="space-y-2">
                  {[
                    { label: "异常波动工具", count: 2, color: "text-red-400", dot: "#ef4444" },
                    { label: "数据缺失工具", count: 1, color: "text-yellow-400", dot: "#f59e0b" },
                    { label: "疑似刷量工具", count: 0, color: "text-green-400", dot: "#10b981" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <span className="w-2 h-2 rounded-full" style={{ background: item.dot }} />{item.label}
                      </span>
                      <span className={`font-bold ${item.color}`}>{item.count} 个</span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full text-xs text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1 pt-2 border-t border-indigo-500/10">
                  查看监控详情 →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
