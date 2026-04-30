"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { TrendingUp, TrendingDown, Eye, MoreVertical, ChevronRight } from "lucide-react";

const STAT_CARDS = [
  { label: "资源总数", value: "12,480", diff: "+12.5%", sub: "较上月 11,090", icon: "🗂️", bg: "rgba(59,130,246,0.15)", up: true },
  { label: "待审核投稿", value: "128", diff: "-8.3%", sub: "较上月 139", icon: "📋", bg: "rgba(139,92,246,0.15)", up: false },
  { label: "活跃用户", value: "156,320", diff: "+18.7%", sub: "较上月 131,789", icon: "👥", bg: "rgba(20,184,166,0.15)", up: true },
  { label: "本月新增专题", value: "86", diff: "+24.1%", sub: "较上月 69", icon: "📚", bg: "rgba(168,85,247,0.15)", up: true },
];

const CHART_DATA = [
  { date: "05-08", uv: 8200, ip: 4100 },
  { date: "05-09", uv: 14300, ip: 7200 },
  { date: "05-10", uv: 18500, ip: 9800 },
  { date: "05-11", uv: 16700, ip: 8900 },
  { date: "05-12", uv: 20100, ip: 11243 },
  { date: "05-13", uv: 19800, ip: 10500 },
  { date: "05-14", uv: 17200, ip: 9100 },
];

const CATEGORIES = [
  { name: "软件工具", count: 3245, pct: "26.0%", color: "#6366f1" },
  { name: "设计素材", count: 2340, pct: "18.8%", color: "#8b5cf6" },
  { name: "学习教程", count: 2156, pct: "17.3%", color: "#3b82f6" },
  { name: "源码模板", count: 1890, pct: "15.1%", color: "#06b6d4" },
  { name: "办公资源", count: 1324, pct: "10.6%", color: "#10b981" },
  { name: "音乐音效", count: 865, pct: "6.9%", color: "#f59e0b" },
  { name: "其他资源", count: 660, pct: "5.3%", color: "#64748b" },
];

const PENDING = [
  { label: "待审核投稿", count: 128, sub: "128 个投稿等待审核", color: "text-red-400", bg: "rgba(239,68,68,0.15)", icon: "📋" },
  { label: "举报内容", count: 6, sub: "6 个内容被用户举报", color: "text-orange-400", bg: "rgba(249,115,22,0.15)", icon: "🚨" },
  { label: "用户反馈", count: 12, sub: "12 条用户反馈待处理", color: "text-blue-400", bg: "rgba(59,130,246,0.15)", icon: "💬" },
  { label: "系统通知", count: 3, sub: "3 条系统管理信息", color: "text-purple-400", bg: "rgba(168,85,247,0.15)", icon: "🔔" },
];

const SUBMISSIONS = [
  { name: "AI 绘画提示词大全（Midjourney版）", category: "学习教程", submitter: "星尘漫游者", status: "待审核", time: "2024-05-14 14:32", logo: "🎨", logoBg: "bg-indigo-600" },
  { name: "Figma 高级组件库 2024", category: "设计素材", submitter: "DesignMaster", status: "待审核", time: "2024-05-14 13:58", logo: "🎯", logoBg: "bg-purple-600" },
  { name: "Vue3 企业级后台管理模板", category: "源码模板", submitter: "前端小智", status: "待审核", time: "2024-05-14 12:41", logo: "V", logoBg: "bg-green-600" },
  { name: "PPT 商务图表合集（200+）", category: "办公资源", submitter: "Office达人", status: "待审核", time: "2024-05-14 11:23", logo: "📊", logoBg: "bg-orange-600" },
  { name: "赛博朋克风格音乐包", category: "音乐音效", submitter: "AudioLab", status: "待审核", time: "2024-05-14 10:05", logo: "🎵", logoBg: "bg-pink-600" },
];

const ACTIVITIES = [
  { avatar: "👨‍💼", actor: "超级管理员", action: "审核通过了资源《UI 设计实战案例库》", time: "14:28", color: "bg-indigo-600" },
  { avatar: "⚙️", actor: "系统", action: "自动备份完成", time: "14:15", color: "bg-gray-600" },
  { avatar: "👩‍💻", actor: "管理员小李", action: "更新了专题《AI 工具合集》", time: "13:47", color: "bg-blue-600" },
  { avatar: "👤", actor: "用户", action: "未来己来 关注了用户 设计星球", time: "13:22", color: "bg-green-600" },
  { avatar: "👨‍💼", actor: "超级管理员", action: "处理了用户举报", time: "12:56", color: "bg-purple-600" },
];

const maxUV = Math.max(...CHART_DATA.map((d) => d.uv));
const chartH = 160;
const chartW = 500;

function polyline(data: typeof CHART_DATA, key: "uv" | "ip", color: string, fill?: string) {
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * chartW,
    y: chartH - (d[key] / maxUV) * (chartH - 20) - 10,
  }));
  const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const fillD = `${pathD} L ${chartW} ${chartH} L 0 ${chartH} Z`;
  return (
    <>
      {fill && <path d={fillD} fill={fill} opacity="0.15" />}
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} />)}
    </>
  );
}

export default function DashboardPage() {
  const [chartPeriod, setChartPeriod] = useState("近7天");

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader breadcrumb={["控制台"]} />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-white">控制台</h1>
            <p className="text-slate-400 text-sm mt-0.5">欢迎回来，今天也有很多优质资源等待你处理 ✦</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            {STAT_CARDS.map((c) => (
              <div key={c.label} className="resource-card rounded-xl p-4 relative overflow-hidden">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-slate-400">{c.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{c.value}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: c.bg }}>{c.icon}</div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  {c.up ? <TrendingUp size={12} className="text-green-400" /> : <TrendingDown size={12} className="text-red-400" />}
                  <span className={c.up ? "text-green-400" : "text-red-400"}>{c.diff}</span>
                  <span className="text-slate-500">{c.sub}</span>
                </div>
                {/* Sparkline */}
                <div className="absolute bottom-0 right-0 w-24 h-10 opacity-40">
                  <svg viewBox="0 0 96 40" className="w-full h-full">
                    <polyline points="0,35 20,25 40,30 60,15 80,20 96,10" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mb-4">
            {/* Access trend chart */}
            <div className="resource-card rounded-xl p-5 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white text-sm">平台访问趋势</h3>
                  <span className="text-slate-500 text-xs">ⓘ</span>
                </div>
                <div className="flex gap-1">
                  {["近7天", "近30天", "近90天"].map((p) => (
                    <button key={p} onClick={() => setChartPeriod(p)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-all ${chartPeriod === p ? "btn-primary text-white" : "text-slate-400 hover:text-white"}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              {/* Legend */}
              <div className="flex gap-4 mb-3 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-400 inline-block rounded" />访问量 (UV)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-purple-400 inline-block rounded" />独立访客 (IP)</span>
              </div>
              <svg viewBox={`0 0 ${chartW} ${chartH + 20}`} className="w-full" style={{ height: 180 }}>
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line key={i} x1="0" y1={10 + i * (chartH / 4)} x2={chartW} y2={10 + i * (chartH / 4)} stroke="rgba(99,102,241,0.1)" strokeWidth="1" />
                ))}
                {/* Y labels */}
                {["25K", "20K", "15K", "10K", "5K", "0"].map((label, i) => (
                  <text key={i} x={-5} y={10 + i * (chartH / 5)} fill="#64748b" fontSize="10" textAnchor="end" dominantBaseline="middle">{label}</text>
                ))}
                {polyline(CHART_DATA, "uv", "#3b82f6", "#3b82f6")}
                {polyline(CHART_DATA, "ip", "#a855f7", "#a855f7")}
                {/* X labels */}
                {CHART_DATA.map((d, i) => (
                  <text key={i} x={(i / (CHART_DATA.length - 1)) * chartW} y={chartH + 18} fill="#64748b" fontSize="10" textAnchor="middle">{d.date}</text>
                ))}
                {/* Tooltip demo */}
                <rect x={320} y={30} width={120} height={52} rx="6" fill="rgba(15,15,40,0.95)" stroke="rgba(99,102,241,0.4)" strokeWidth="1" />
                <text x={328} y={48} fill="#94a3b8" fontSize="10">05-12</text>
                <circle cx={326} cy={65} r="3" fill="#3b82f6" />
                <text x={332} y={68} fill="#cbd5e1" fontSize="10">访问量 (UV)：18,430</text>
                <circle cx={326} cy={77} r="3" fill="#a855f7" />
                <text x={332} y={80} fill="#cbd5e1" fontSize="10">独立访客 (IP)：11,243</text>
              </svg>
            </div>

            {/* Category donut */}
            <div className="resource-card rounded-xl p-5 w-72 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-white text-sm">资源分类分布</h3>
                <span className="text-slate-500 text-xs">ⓘ</span>
              </div>
              {/* Donut placeholder */}
              <div className="relative flex items-center justify-center mb-4" style={{ height: 140 }}>
                <svg viewBox="0 0 120 120" className="w-36 h-36 -rotate-90">
                  {(() => {
                    let offset = 0;
                    const total = CATEGORIES.reduce((s, c) => s + c.count, 0);
                    const circ = 2 * Math.PI * 45;
                    return CATEGORIES.map((cat) => {
                      const pct = cat.count / total;
                      const dash = pct * circ;
                      const el = (
                        <circle key={cat.name} cx="60" cy="60" r="45" fill="none"
                          stroke={cat.color} strokeWidth="18"
                          strokeDasharray={`${dash} ${circ}`}
                          strokeDashoffset={-offset}
                        />
                      );
                      offset += dash;
                      return el;
                    });
                  })()}
                </svg>
                <div className="absolute text-center">
                  <div className="text-xl font-bold text-white">12,480</div>
                  <div className="text-xs text-slate-400">总数</div>
                </div>
              </div>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                      <span className="text-slate-400">{cat.name}</span>
                    </span>
                    <div className="flex gap-2">
                      <span className="text-white">{cat.count.toLocaleString()}</span>
                      <span className="text-slate-500">({cat.pct})</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full text-xs text-indigo-400 hover:text-indigo-300 text-center flex items-center justify-center gap-1">
                查看全部分类 <ChevronRight size={12} />
              </button>
            </div>

            {/* Pending tasks */}
            <div className="resource-card rounded-xl p-5 w-64 flex-shrink-0">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-semibold text-white text-sm">待处理事项</h3>
              </div>
              <div className="space-y-3">
                {PENDING.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: item.bg }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white">{item.label}</div>
                      <div className="text-[10px] text-slate-500">{item.sub}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-sm font-bold ${item.color}`}>{item.count}</span>
                      <ChevronRight size={12} className="text-slate-500" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full text-xs text-indigo-400 hover:text-indigo-300 text-center flex items-center justify-center gap-1 pt-2 border-t border-indigo-500/10">
                查看全部待处理事项 <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex gap-4">
            {/* Latest submissions */}
            <div className="resource-card rounded-xl p-5 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-sm">最新投稿</h3>
              </div>
              <div className="w-full">
                <div className="grid grid-cols-[2fr_100px_120px_80px_120px_60px] text-xs text-slate-500 pb-2 border-b border-indigo-500/10 px-1 mb-1">
                  <span>资源名称</span><span>分类</span><span>提交者</span><span>状态</span><span>时间</span><span>操作</span>
                </div>
                {SUBMISSIONS.map((s, i) => (
                  <div key={i} className="grid grid-cols-[2fr_100px_120px_80px_120px_60px] py-3 items-center border-b border-indigo-500/5 text-sm hover:bg-white/[0.02] px-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${s.logoBg}`}>{s.logo}</div>
                      <span className="text-white text-xs truncate">{s.name}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px]" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc", width: "fit-content" }}>{s.category}</span>
                    <span className="text-xs text-slate-400 truncate">{s.submitter}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium text-yellow-300" style={{ background: "rgba(245,158,11,0.15)", width: "fit-content" }}>{s.status}</span>
                    <span className="text-xs text-slate-500">{s.time}</span>
                    <div className="flex items-center gap-1">
                      <button className="p-1 text-slate-400 hover:text-white"><Eye size={13} /></button>
                      <button className="p-1 text-slate-400 hover:text-white"><MoreVertical size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full text-sm text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1 pt-3 border-t border-indigo-500/10">
                查看全部投稿 <ChevronRight size={14} />
              </button>
            </div>

            {/* Activity feed */}
            <div className="resource-card rounded-xl p-5 w-72 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white text-sm">实时动态</h3>
              </div>
              <div className="space-y-4">
                {ACTIVITIES.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${a.color}`}>{a.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <span className="font-medium text-white">{a.actor}</span> {a.action}
                      </p>
                      <span className="text-[10px] text-slate-600">{a.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full text-sm text-indigo-400 hover:text-indigo-300 flex items-center justify-center gap-1 pt-3 border-t border-indigo-500/10">
                查看全部动态 <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
