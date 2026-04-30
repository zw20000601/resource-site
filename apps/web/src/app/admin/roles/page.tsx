"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Search, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const ROLES = [
  { icon: "👑", name: "超级管理员", members: 3, scope: "全平台", scopeColor: "#6366f1", data: "全部数据", dataColor: "#6366f1", status: "启用", updated: "2024-05-14 14:28" },
  { icon: "✍️", name: "内容运营", members: 6, scope: "内容相关模块", scopeColor: "#8b5cf6", data: "所属部门", dataColor: "#3b82f6", status: "启用", updated: "2024-05-14 13:58", active: true },
  { icon: "🛡️", name: "审核员", members: 4, scope: "审核相关模块", scopeColor: "#f59e0b", data: "所属部门", dataColor: "#3b82f6", status: "启用", updated: "2024-05-14 12:41" },
  { icon: "📊", name: "数据分析师", members: 3, scope: "数据分析", scopeColor: "#06b6d4", data: "所属部门", dataColor: "#3b82f6", status: "启用", updated: "2024-05-14 11:23" },
  { icon: "📝", name: "专题编辑", members: 5, scope: "专题管理", scopeColor: "#10b981", data: "所属部门", dataColor: "#3b82f6", status: "启用", updated: "2024-05-14 10:05" },
  { icon: "🎧", name: "客服专员", members: 7, scope: "用户相关模块", scopeColor: "#ec4899", data: "个人数据", dataColor: "#8b5cf6", status: "启用", updated: "2024-05-14 09:17" },
  { icon: "💰", name: "财务专员", members: 2, scope: "财务管理", scopeColor: "#ef4444", data: "所属部门", dataColor: "#3b82f6", status: "停用", updated: "2024-05-13 16:22" },
  { icon: "👁️", name: "只读访客", members: 1, scope: "查看权限", scopeColor: "#64748b", data: "个人数据", dataColor: "#8b5cf6", status: "启用", updated: "2024-05-13 14:09" },
];

const MODULES = ["资源管理", "投稿审核", "专题管理", "用户管理", "排行榜管理", "数据分析", "系统设置"];
const ACTIONS = ["查看", "新增", "编辑", "删除", "审核", "导出"];
const PERMS: Record<string, boolean[]> = {
  "资源管理": [true, true, true, true, true, true],
  "投稿审核": [true, true, true, true, true, true],
  "专题管理": [true, true, true, true, true, true],
  "用户管理": [true, true, true, true, true, true],
  "排行榜管理": [true, true, true, true, false, false],
  "数据分析": [true, false, true, false, false, false],
  "系统设置": [false, false, false, false, false, false],
};

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState(1);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "radial-gradient(ellipse at 20% 50%,rgba(30,20,80,0.4),transparent 60%),#080818" }}>
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader breadcrumb="角色权限" />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-white">角色权限</h1>
            <p className="text-slate-400 text-sm mt-1">管理后台角色、权限点与数据访问范围</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-56 space-input rounded-xl px-3 py-2.5">
              <Search size={14} className="text-slate-400" />
              <input placeholder="搜索角色名称、成员或权限关键词" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
            </div>
            <div className="flex items-center gap-2 space-input rounded-xl px-3 py-2.5 text-sm text-slate-300">
              角色状态：
              <select className="bg-transparent outline-none text-slate-300 text-sm">
                <option className="bg-slate-900">全部</option>
                <option className="bg-slate-900">启用</option>
                <option className="bg-slate-900">停用</option>
              </select>
            </div>
            <div className="flex items-center gap-2 space-input rounded-xl px-3 py-2.5 text-sm text-slate-300">
              数据权限：
              <select className="bg-transparent outline-none text-slate-300 text-sm">
                <option className="bg-slate-900">全部</option>
              </select>
            </div>
            <button className="px-5 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>搜索</button>
            <button className="px-4 py-2.5 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40">重置</button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-white font-medium" style={{ background: "linear-gradient(135deg,#7c3aed,#6366f1)" }}>
              <Plus size={14} /> 新建角色
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "角色总数", value: "12", delta: "↑ 20.0%", sub: "较上月 10", color: "#6366f1", spark: "M0,18 L16,12 L32,8 L48,6 L64,2" },
              { label: "管理员人数", value: "28", delta: "↓ 16.7%", sub: "较上月 24", color: "#f59e0b", spark: "M0,2 L16,6 L32,10 L48,8 L64,14" },
              { label: "权限分组", value: "64", delta: "↑ 14.3%", sub: "较上月 56", color: "#10b981", spark: "M0,18 L16,14 L32,8 L48,4 L64,2" },
              { label: "今日权限变更", value: "18", delta: "↓ 28.6%", sub: "较昨日 14", color: "#8b5cf6", spark: "M0,4 L16,10 L32,6 L48,12 L64,16" },
            ].map(card => (
              <div key={card.label} className="sidebar-card flex flex-col gap-1">
                <div className="text-xs text-slate-400">{card.label}</div>
                <div className="text-2xl font-bold text-white">{card.value}</div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs" style={{ color: card.color }}>{card.delta}</span>
                    <span className="text-xs text-slate-500 ml-1">{card.sub}</span>
                  </div>
                  <svg width="72" height="28" viewBox="0 0 64 20" className="opacity-70">
                    <polyline points={card.spark} fill="none" stroke={card.color} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-5">
            {/* Role table */}
            <div className="flex-1 min-w-0">
              <div className="sidebar-card">
                <div className="text-sm font-semibold text-white mb-3">角色列表 <span className="text-slate-400 font-normal">（共 12 条）</span></div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 border-b border-white/5">
                      {["角色名称", "成员数", "权限范围", "数据权限", "状态", "更新时间", "操作"].map(h => (
                        <th key={h} className="pb-2 pr-4 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ROLES.map((r, i) => (
                      <tr key={r.name} onClick={() => setSelectedRole(i)}
                        className={`border-b border-white/5 cursor-pointer transition-colors ${i === selectedRole ? "bg-indigo-500/10" : "hover:bg-white/3"}`}
                        style={i === selectedRole ? { border: "1px solid rgba(99,102,241,0.3)" } : {}}>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{r.icon}</span>
                            <span className="text-white text-xs font-medium">{r.name}</span>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-slate-300 text-xs">{r.members}</td>
                        <td className="py-3 pr-4">
                          <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: r.scopeColor + "22", color: r.scopeColor }}>{r.scope}</span>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: r.dataColor + "22", color: r.dataColor }}>{r.data}</span>
                        </td>
                        <td className="py-3 pr-4">
                          <span className="px-2 py-0.5 rounded text-xs" style={{ background: r.status === "启用" ? "rgba(34,197,94,0.15)" : "rgba(100,116,139,0.15)", color: r.status === "启用" ? "#22c55e" : "#64748b" }}>{r.status}</span>
                        </td>
                        <td className="py-3 pr-4 text-slate-400 text-xs whitespace-nowrap">{r.updated}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <button className="text-xs text-indigo-400 hover:text-indigo-300">查看</button>
                            <button className="text-xs text-slate-400 hover:text-white">编辑</button>
                            <button className="text-xs text-slate-400 hover:text-white">复制</button>
                            <button className="text-xs text-slate-500 hover:text-red-400">更多</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                  <span className="text-xs text-slate-400">共 12 条</span>
                  <div className="flex items-center gap-1.5">
                    <select className="space-input rounded-lg px-2 py-1 text-xs text-slate-300 outline-none bg-transparent">
                      <option className="bg-slate-900">10条/页</option>
                    </select>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 border border-white/10"><ChevronLeft size={13} /></button>
                    <button className="w-7 h-7 rounded-lg text-xs text-white" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>1</button>
                    <button className="w-7 h-7 rounded-lg text-xs text-slate-400">2</button>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 border border-white/10"><ChevronRight size={13} /></button>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    跳至 <input defaultValue="1" className="w-10 space-input rounded-lg px-2 py-1 text-center bg-transparent text-white outline-none text-xs" /> 页
                  </div>
                </div>
              </div>
            </div>

            {/* Right: permission config */}
            <div className="w-72 flex-shrink-0">
              <div className="sidebar-card">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(139,92,246,0.2)" }}>✍️</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">内容运营</span>
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>启用</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 leading-relaxed">角色描述：负责平台内容的运营与管理，包括资源维护、专题策划与内容发布等。成员数量：6 人</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">创建时间：2024-04-20 10:15</div>
                  </div>
                </div>

                {/* Permission tabs */}
                <div className="flex gap-1 mb-3 border-b border-white/5 pb-2">
                  {["菜单权限", "操作权限", "数据权限", "其他设置"].map((t, i) => (
                    <button key={t} className={`px-2.5 py-1 rounded-lg text-xs transition-all ${i === 0 ? "text-white" : "text-slate-400"}`}
                      style={i === 0 ? { background: "rgba(99,102,241,0.3)" } : {}}>
                      {t}
                    </button>
                  ))}
                </div>

                {/* Permission matrix */}
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="text-slate-500">
                        <th className="pb-1.5 text-left font-medium w-20">模块</th>
                        {ACTIONS.map(a => <th key={a} className="pb-1.5 font-medium text-center w-8">{a}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {MODULES.map(mod => (
                        <tr key={mod} className="border-t border-white/5">
                          <td className="py-1.5 text-slate-300">{mod}</td>
                          {ACTIONS.map((_, j) => (
                            <td key={j} className="py-1.5 text-center">
                              {PERMS[mod]?.[j] ? (
                                <span className="inline-block w-3.5 h-3.5 rounded-sm text-[8px] leading-none flex items-center justify-center" style={{ background: "rgba(99,102,241,0.3)", color: "#6366f1" }}>✓</span>
                              ) : (
                                <span className="inline-block w-3.5 h-3.5 rounded-sm" style={{ background: "rgba(255,255,255,0.05)" }}>—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Data range */}
                <div className="mb-4">
                  <div className="text-xs text-white font-medium mb-2">数据权限范围</div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    {["全部数据", "所属部门", "个人数据", "自定义范围"].map((opt, i) => (
                      <label key={opt} className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                        <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${i === 1 ? "border-indigo-500" : "border-slate-600"}`}>
                          {i === 1 && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                        </div>
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Recent changes */}
                <div className="mb-4">
                  <div className="text-xs text-white font-medium mb-2">最近权限变更记录</div>
                  <div className="space-y-1.5">
                    {[
                      { text: "更新了「专题管理」的 编辑、删除 权限", by: "超级管理员", time: "2024-05-14 13:58" },
                      { text: "新增了「用户管理」的 查看 权限", by: "超级管理员", time: "2024-05-13 16:42" },
                      { text: "调整了数据权限范围为 所属部门", by: "超级管理员", time: "2024-05-12 11:23" },
                      { text: "创建角色「内容运营」", by: "超级管理员", time: "2024-04-20 10:15" },
                    ].map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                        <div>
                          <div className="text-[10px] text-slate-300">{log.text}</div>
                          <div className="text-[9px] text-slate-500">{log.by} · {log.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl text-xs text-white font-medium" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>保存权限</button>
                  <button className="px-4 py-2 rounded-xl text-xs text-slate-300 border border-white/10 hover:border-white/20">重置</button>
                  <button className="px-4 py-2 rounded-xl text-xs text-red-400 border border-red-500/20 hover:border-red-500/40">删除角色</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
