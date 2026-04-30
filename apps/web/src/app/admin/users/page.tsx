"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Search, RefreshCw, Download, ChevronLeft, ChevronRight, MoreHorizontal, Calendar } from "lucide-react";

const USERS = [
  { id: "100001", name: "星际漫游者", avatar: "🧑‍🚀", role: "普通用户", roleColor: "#6366f1", reg: "2024-05-14 10:21", active: "2024-05-14 14:28", subs: 12, saves: 36, status: "正常" },
  { id: "100002", name: "DesignMaster", avatar: "🎨", role: "作者", roleColor: "#f59e0b", reg: "2024-05-13 09:14", active: "2024-05-14 13:58", subs: 56, saves: 184, status: "正常" },
  { id: "100003", name: "学习使我快乐", avatar: "📚", role: "普通用户", roleColor: "#6366f1", reg: "2024-05-13 08:45", active: "2024-05-14 12:23", subs: 8, saves: 29, status: "正常" },
  { id: "100004", name: "Office达人", avatar: "💼", role: "作者", roleColor: "#f59e0b", reg: "2024-05-12 17:33", active: "2024-05-14 11:23", subs: 32, saves: 96, status: "正常" },
  { id: "100005", name: "代码诗人", avatar: "💻", role: "作者", roleColor: "#f59e0b", reg: "2024-05-12 16:02", active: "2024-05-14 10:05", subs: 78, saves: 231, status: "正常" },
  { id: "100006", name: "资源猎人", avatar: "🎯", role: "普通用户", roleColor: "#6366f1", reg: "2024-05-11 22:18", active: "2024-05-14 09:47", subs: 3, saves: 11, status: "禁言" },
  { id: "100007", name: "AI探索者", avatar: "🤖", role: "作者", roleColor: "#f59e0b", reg: "2024-05-11 20:34", active: "2024-05-14 09:12", subs: 64, saves: 167, status: "正常" },
  { id: "100008", name: "清风明月", avatar: "🌙", role: "普通用户", roleColor: "#6366f1", reg: "2024-05-11 18:55", active: "2024-05-13 22:41", subs: 1, saves: 4, status: "封禁" },
  { id: "100009", name: "影音收藏家", avatar: "🎬", role: "普通用户", roleColor: "#6366f1", reg: "2024-05-11 16:30", active: "2024-05-13 21:19", subs: 6, saves: 22, status: "正常" },
  { id: "100000", name: "超级管理员", avatar: "👑", role: "管理员", roleColor: "#ec4899", reg: "2024-04-28 11:11", active: "2024-05-14 14:28", subs: 120, saves: 512, status: "正常" },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  正常: { bg: "rgba(34,197,94,0.15)", text: "#22c55e" },
  禁言: { bg: "rgba(234,179,8,0.15)", text: "#eab308" },
  封禁: { bg: "rgba(239,68,68,0.15)", text: "#ef4444" },
};

const SPARKLINE = "M0,18 L8,14 L16,16 L24,10 L32,12 L40,6 L48,8 L56,4 L64,2";

export default function UsersPage() {
  const [selectedStatus, setSelectedStatus] = useState("全部状态");
  const [selectedRole, setSelectedRole] = useState("全部角色");

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "radial-gradient(ellipse at 20% 50%,rgba(30,20,80,0.4),transparent 60%),#080818" }}>
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader breadcrumb="用户管理" />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-white">用户管理</h1>
            <p className="text-slate-400 text-sm mt-1">查看用户信息、行为数据与账号状态</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-56 space-input rounded-xl px-3 py-2.5">
              <Search size={14} className="text-slate-400" />
              <input placeholder="搜索用户名、UID、邮箱或手机号" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
            </div>
            <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}
              className="space-input rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none bg-transparent min-w-32">
              {["全部状态", "正常", "禁言", "封禁"].map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
            </select>
            <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}
              className="space-input rounded-xl px-3 py-2.5 text-sm text-slate-300 outline-none bg-transparent min-w-32">
              {["全部角色", "普通用户", "作者", "管理员"].map(r => <option key={r} value={r} className="bg-slate-900">{r}</option>)}
            </select>
            <div className="flex items-center gap-2 space-input rounded-xl px-3 py-2.5 text-sm text-slate-400">
              <span>开始日期</span>
              <span className="mx-1">→</span>
              <span>结束日期</span>
              <Calendar size={13} className="ml-1" />
            </div>
            <button className="px-5 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>
              ↑ 搜索
            </button>
            <button className="px-4 py-2.5 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40">重置</button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white font-medium" style={{ background: "linear-gradient(135deg,#7c3aed,#6366f1)" }}>
              <Download size={14} /> 导出用户
            </button>
          </div>

          <div className="flex gap-5">
            {/* Main content */}
            <div className="flex-1 min-w-0 space-y-4">
              {/* Stat cards */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "总用户数", value: "156,320", delta: "↑ 18.7%", color: "#6366f1", spark: SPARKLINE },
                  { label: "今日新增", value: "328", delta: "↑ 12.4%", color: "#8b5cf6", spark: SPARKLINE },
                  { label: "活跃用户", value: "23,847", delta: "↑ 21.3%", color: "#06b6d4", spark: SPARKLINE },
                  { label: "封禁账号", value: "328", delta: "↑ 6.5%", color: "#ef4444", spark: "M0,4 L8,8 L16,6 L24,12 L32,10 L40,16 L48,14 L56,18 L64,16" },
                ].map(card => (
                  <div key={card.label} className="sidebar-card flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">{card.label}</div>
                        <div className="text-2xl font-bold text-white">{card.value}</div>
                        <div className="text-xs mt-1" style={{ color: card.color }}>较上月 {card.delta}</div>
                      </div>
                      <svg width="72" height="28" viewBox="0 0 64 20" className="opacity-70">
                        <polyline points={card.spark} fill="none" stroke={card.color} strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="sidebar-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">用户列表 <span className="text-slate-400 font-normal">（共 2,531 条）</span></span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-slate-500 border-b border-white/5">
                        {["用户", "UID", "角色", "注册时间", "最近活跃", "投稿数", "收藏数", "状态", "操作"].map(h => (
                          <th key={h} className="pb-2 pr-4 font-medium whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {USERS.map((u, i) => (
                        <tr key={u.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === 0 ? "bg-indigo-500/5" : ""}`}>
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                                style={{ background: "rgba(99,102,241,0.2)" }}>{u.avatar}</div>
                              <span className="text-white text-xs font-medium">{u.name}</span>
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-slate-400 text-xs">{u.id}</td>
                          <td className="py-3 pr-4">
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: u.roleColor + "22", color: u.roleColor }}>{u.role}</span>
                          </td>
                          <td className="py-3 pr-4 text-slate-400 text-xs whitespace-nowrap">{u.reg}</td>
                          <td className="py-3 pr-4 text-slate-400 text-xs whitespace-nowrap">{u.active}</td>
                          <td className="py-3 pr-4 text-slate-300 text-xs text-center">{u.subs}</td>
                          <td className="py-3 pr-4 text-slate-300 text-xs text-center">{u.saves}</td>
                          <td className="py-3 pr-4">
                            <span className="px-2 py-0.5 rounded text-xs font-medium"
                              style={{ background: STATUS_COLORS[u.status].bg, color: STATUS_COLORS[u.status].text }}>
                              {u.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <button className="text-xs text-indigo-400 hover:text-indigo-300">查看</button>
                              <button className="text-xs text-slate-400 hover:text-white">编辑</button>
                              <button className="text-slate-500 hover:text-slate-300"><MoreHorizontal size={13} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                  <span className="text-xs text-slate-400">共 2,531 条</span>
                  <div className="flex items-center gap-1.5">
                    <select className="space-input rounded-lg px-2 py-1 text-xs text-slate-300 outline-none bg-transparent">
                      <option className="bg-slate-900">10条/页</option>
                    </select>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white border border-white/10"><ChevronLeft size={13} /></button>
                    {[1, 2, 3, 4, 5].map(p => (
                      <button key={p} className={`w-7 h-7 rounded-lg text-xs ${p === 1 ? "text-white" : "text-slate-400 hover:text-white"}`}
                        style={p === 1 ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)" } : {}}>
                        {p}
                      </button>
                    ))}
                    <span className="text-slate-500 text-xs">... 254</span>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white border border-white/10"><ChevronRight size={13} /></button>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    跳至 <input defaultValue="1" className="w-10 space-input rounded-lg px-2 py-1 text-center bg-transparent text-white outline-none text-xs" /> 页
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-56 flex-shrink-0 space-y-4">
              {/* User portrait */}
              <div className="sidebar-card">
                <h3 className="font-semibold text-white text-sm mb-3">用户画像</h3>
                <div className="flex gap-1 mb-3">
                  {["用户分布", "活跃时段"].map((t, i) => (
                    <button key={t} className={`flex-1 py-1 rounded-lg text-xs transition-all ${i === 0 ? "text-white" : "text-slate-400"}`}
                      style={i === 0 ? { background: "rgba(99,102,241,0.3)" } : {}}>
                      {t}
                    </button>
                  ))}
                </div>
                {/* Gender donut */}
                <div className="mb-3">
                  <div className="text-xs text-slate-400 mb-2">性别分布</div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <svg width="70" height="70" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#6366f1" strokeWidth="18" strokeDasharray={`${0.682 * 2 * Math.PI * 38} ${2 * Math.PI * 38}`} strokeDashoffset="0" transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#ec4899" strokeWidth="18" strokeDasharray={`${0.287 * 2 * Math.PI * 38} ${2 * Math.PI * 38}`} strokeDashoffset={`-${0.682 * 2 * Math.PI * 38}`} transform="rotate(-90 50 50)" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#334155" strokeWidth="18" strokeDasharray={`${0.031 * 2 * Math.PI * 38} ${2 * Math.PI * 38}`} strokeDashoffset={`-${0.969 * 2 * Math.PI * 38}`} transform="rotate(-90 50 50)" />
                        <text x="50" y="46" textAnchor="middle" className="text-[9px]" fill="white" fontSize="9" fontWeight="bold">156,320</text>
                        <text x="50" y="58" textAnchor="middle" fill="#94a3b8" fontSize="7">总用户</text>
                      </svg>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-indigo-500" />男 <span className="text-slate-400 ml-auto">68.2%</span></div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-pink-500" />女 <span className="text-slate-400 ml-auto">28.7%</span></div>
                      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-700" />未知 <span className="text-slate-400 ml-auto">3.1%</span></div>
                    </div>
                  </div>
                </div>
                {/* Region top5 */}
                <div className="mb-3">
                  <div className="text-xs text-slate-400 mb-2">地域分布 TOP5</div>
                  {[["广东省", 0.187], ["江苏省", 0.103], ["浙江省", 0.089], ["山东省", 0.064], ["四川省", 0.051]].map(([name, pct]) => (
                    <div key={name as string} className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-slate-300 w-12 flex-shrink-0">{name as string}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800">
                        <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(pct as number) * 100 / 0.187 * 100}%` }} />
                      </div>
                      <span className="text-xs text-slate-400 w-10 text-right">{((pct as number) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
                {/* Level distribution */}
                <div>
                  <div className="text-xs text-slate-400 mb-2">用户等级分布</div>
                  {[["LV5", 0.082, "#8b5cf6"], ["LV4", 0.226, "#6366f1"], ["LV3", 0.317, "#3b82f6"], ["LV2", 0.241, "#06b6d4"], ["LV1", 0.134, "#10b981"]].map(([lv, pct, color]) => (
                    <div key={lv as string} className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-slate-300 w-6">{lv as string}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-slate-800">
                        <div className="h-full rounded-full" style={{ width: `${(pct as number) * 100}%`, background: color as string }} />
                      </div>
                      <span className="text-xs text-slate-400 w-10 text-right">{((pct as number) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anomaly alerts */}
              <div className="sidebar-card">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">异常账号预警</h3>
                  <button className="text-xs text-indigo-400">查看全部</button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "违规搬运者", desc: "疑似批量发布违规内容", time: "2024-05-14 13:22", risk: "高风险", color: "#ef4444" },
                    { name: "广告小号_9527", desc: "疑似频繁发布广告信息", time: "2024-05-14 12:45", risk: "中风险", color: "#f59e0b" },
                    { name: "刷赞机器_001", desc: "疑似异常点赞/收藏行为", time: "2024-05-11 11:03", risk: "中风险", color: "#f59e0b" },
                    { name: "测试账号test", desc: "异常登录（异地频繁）", time: "2024-05-14 10:18", risk: "低风险", color: "#6366f1" },
                  ].map(a => (
                    <div key={a.name} className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{ background: "rgba(99,102,241,0.2)" }}>👤</div>
                          <span className="text-xs text-white font-medium">{a.name}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0" style={{ background: a.color + "22", color: a.color }}>{a.risk}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 ml-6">{a.desc}</div>
                      <div className="text-[10px] text-slate-600 ml-6">{a.time}</div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-2 text-xs text-indigo-400 hover:text-indigo-300 text-center">前往风控中心 →</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
