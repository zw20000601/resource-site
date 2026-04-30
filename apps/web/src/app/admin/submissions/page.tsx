"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Search, RefreshCw, ChevronLeft, ChevronRight, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react";

const SUBMISSIONS = [
  { name: "Midjourney 提示词大全...", cat: "学习教程", catColor: "#10b981", submitter: "星尘漫游者", level: 5, time: "2024-05-14 14:32", priority: "高", status: "待审核", selected: true },
  { name: "Figma 高级组件库 2024", cat: "设计素材", catColor: "#f59e0b", submitter: "DesignMaster", level: 6, time: "2024-05-14 13:58", priority: "中", status: "待审核", selected: false },
  { name: "Vue3 企业级后台管理模板", cat: "源码模板", catColor: "#6366f1", submitter: "前端小智", level: 4, time: "2024-05-14 12:41", priority: "高", status: "待审核", selected: false },
  { name: "PPT 商务图表合集（200+）", cat: "办公资源", catColor: "#06b6d4", submitter: "Office达人", level: 4, time: "2024-05-14 11:23", priority: "低", status: "待审核", selected: false },
  { name: "赛博朋克风格音乐包", cat: "音效音效", catColor: "#ec4899", submitter: "AudioLab", level: 5, time: "2024-05-14 10:05", priority: "中", status: "待审核", selected: false },
  { name: "AI 绘画提示词大全（英文版）", cat: "学习教程", catColor: "#10b981", submitter: "画笔星球", level: 3, time: "2024-05-14 09:42", priority: "高", status: "待审核", selected: false },
  { name: "Notion 模板：个人效率系统", cat: "办公资源", catColor: "#06b6d4", submitter: "效率控", level: 4, time: "2024-05-14 09:18", priority: "低", status: "待审核", selected: false },
  { name: "Blender 建模基础到进阶课", cat: "学习教程", catColor: "#10b981", submitter: "三维工坊", level: 5, time: "2024-05-14 08:51", priority: "中", status: "待审核", selected: false },
];

const PRIORITY_COLORS: Record<string, string> = { 高: "#ef4444", 中: "#f59e0b", 低: "#64748b" };

export default function SubmissionsPage() {
  const [selected, setSelected] = useState(0);
  const [note, setNote] = useState("");

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "radial-gradient(ellipse at 20% 50%,rgba(30,20,80,0.4),transparent 60%),#080818" }}>
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader breadcrumb="投稿审核" />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-white">投稿审核</h1>
            <p className="text-slate-400 text-sm mt-1">审核用户提交的资源并给出处理结果</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "待审核", value: "128", delta: "较昨日 +18.5%", color: "#8b5cf6", icon: "📋", spark: "M0,18 L16,14 L32,10 L48,6 L64,2" },
              { label: "今日通过", value: "56", delta: "较昨日 +21.7%", color: "#22c55e", icon: "✅", spark: "M0,18 L16,13 L32,9 L48,4 L64,2" },
              { label: "今日驳回", value: "12", delta: "较昨日 -7.1%", color: "#ef4444", icon: "❌", spark: "M0,4 L16,8 L32,10 L48,14 L64,16" },
              { label: "平均审核时长", value: "1小时 42分", delta: "较昨日 -12.3%", color: "#06b6d4", icon: "🕐", spark: "M0,4 L16,8 L32,6 L48,10 L64,8" },
            ].map(card => (
              <div key={card.label} className="sidebar-card flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: card.color + "22" }}>{card.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-slate-400 mb-0.5">{card.label}</div>
                  <div className="text-xl font-bold text-white">{card.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: card.color }}>{card.delta}</div>
                </div>
                <svg width="64" height="28" viewBox="0 0 64 20" className="flex-shrink-0 opacity-70">
                  <polyline points={card.spark} fill="none" stroke={card.color} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 min-w-48 space-input rounded-xl px-3 py-2.5">
              <Search size={14} className="text-slate-400" />
              <input placeholder="搜索资源名称或关键词" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
            </div>
            <div className="flex items-center gap-2 space-input rounded-xl px-3 py-2.5 text-sm text-slate-300">
              分类：
              <select className="bg-transparent outline-none text-slate-300 text-sm">
                <option className="bg-slate-900">全部分类</option>
              </select>
            </div>
            <div className="flex items-center gap-2 space-input rounded-xl px-3 py-2.5 text-sm text-slate-300">
              投稿者等级：
              <select className="bg-transparent outline-none text-slate-300 text-sm">
                <option className="bg-slate-900">全部等级</option>
              </select>
            </div>
            <div className="flex items-center gap-2 space-input rounded-xl px-3 py-2.5 text-sm text-slate-400">
              开始日期 → 结束日期
            </div>
            <button className="px-5 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>搜索</button>
            <button className="px-4 py-2.5 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40">重置</button>
            <button className="px-4 py-2.5 rounded-xl text-sm text-white font-medium" style={{ background: "linear-gradient(135deg,#22c55e,#10b981)" }}>批量通过</button>
          </div>

          <div className="flex gap-5">
            {/* Queue list */}
            <div className="flex-1 min-w-0">
              <div className="sidebar-card">
                <div className="text-sm font-semibold text-white mb-3">投稿队列 <span className="text-slate-400 font-normal">（共 128 条）</span></div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 border-b border-white/5">
                      {["资源名称", "分类", "投稿者", "提交时间", "优先级", "状态"].map(h => (
                        <th key={h} className="pb-2 pr-3 font-medium whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SUBMISSIONS.map((s, i) => (
                      <tr key={i} onClick={() => setSelected(i)}
                        className={`border-b border-white/5 cursor-pointer transition-colors ${i === selected ? "bg-indigo-500/10" : "hover:bg-white/3"}`}>
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: i === selected ? "#6366f1" : "transparent", border: i === selected ? "none" : "1.5px solid #475569" }} />
                            <span className="text-xs text-white max-w-36 truncate">{s.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 pr-3">
                          <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: s.catColor + "22", color: s.catColor }}>{s.cat}</span>
                        </td>
                        <td className="py-2.5 pr-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] flex-shrink-0">👤</div>
                            <div>
                              <div className="text-xs text-white">{s.submitter}</div>
                              <div className="text-[9px] text-slate-500">Lv.{s.level}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 pr-3 text-slate-400 text-xs whitespace-nowrap">{s.time}</td>
                        <td className="py-2.5 pr-3">
                          <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: PRIORITY_COLORS[s.priority] + "22", color: PRIORITY_COLORS[s.priority] }}>{s.priority}</span>
                        </td>
                        <td className="py-2.5">
                          <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8" }}>{s.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 border border-white/10"><ChevronLeft size={13} /></button>
                    {[1, 2, 4, 5].map((p, i) => (
                      <button key={p} className={`w-7 h-7 rounded-lg text-xs ${i === 0 ? "text-white" : "text-slate-400 hover:text-white"}`}
                        style={i === 0 ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)" } : {}}>
                        {p}
                      </button>
                    ))}
                    <span className="text-slate-500 text-xs">... 13</span>
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 border border-white/10"><ChevronRight size={13} /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="space-input rounded-lg px-2 py-1 text-xs text-slate-300 outline-none bg-transparent">
                      <option className="bg-slate-900">10 条/页</option>
                    </select>
                    <span className="text-xs text-slate-400">跳至</span>
                    <input defaultValue="1" className="w-10 space-input rounded-lg px-2 py-1 text-center bg-transparent text-white outline-none text-xs" />
                    <span className="text-xs text-slate-400">页</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail panel */}
            <div className="w-72 flex-shrink-0">
              <div className="sidebar-card space-y-4">
                <h3 className="text-sm font-semibold text-white">资源详情与审核</h3>

                {/* Preview */}
                <div className="rounded-xl overflow-hidden relative h-28" style={{ background: "linear-gradient(135deg,#1e1040,#0f0a30)" }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">🎨</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80">
                    <div className="text-xs text-white font-medium">Midjourney 提示词大全（5000+ 精选分类）</div>
                  </div>
                </div>

                {/* Meta */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-14 flex-shrink-0">来源链接</span>
                    <div className="flex items-center gap-1 text-indigo-400 min-w-0">
                      <span className="truncate">https://pan.quark.cn/s/abc123def456</span>
                      <ExternalLink size={10} className="flex-shrink-0" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-14 flex-shrink-0">标签</span>
                    <div className="flex flex-wrap gap-1">
                      {["Midjourney", "AI绘画", "提示词", "中文", "精选"].map(t => (
                        <span key={t} className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-14 flex-shrink-0">投稿者</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-indigo-500/20 text-[9px] flex items-center justify-center">👤</div>
                      <span className="text-white">星尘漫游者</span>
                      <span className="text-[9px] px-1 py-0.5 rounded" style={{ background: "rgba(99,102,241,0.2)", color: "#818cf8" }}>Lv.5</span>
                      <span className="text-slate-500">投稿 23 | 通过率 95%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500 w-14 flex-shrink-0">提交时间</span>
                    <span className="text-slate-300">2024-05-14 14:32</span>
                    <span className="text-slate-500 ml-auto">资源大小 12.4 MB</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="text-xs font-medium text-white mb-1">提交描述</div>
                  <div className="text-[10px] text-slate-400 leading-relaxed">整理了 5000+ Midjourney 高质量提示词，包含人物、场景、风格、光影等多种分类，适用于 AI 绘图创作，持续更新。</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-white mb-1">推荐由</div>
                  <div className="text-[10px] text-slate-400 leading-relaxed">内容质量高，分类清晰，实用性强，适合社区用户学习与创作使用。</div>
                </div>

                {/* Risk scan */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-medium text-white">风险扫描结果</div>
                    <button className="text-[10px] text-indigo-400">重新检测</button>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="rounded-lg p-1.5 text-center" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                      <CheckCircle size={12} className="text-green-400 mx-auto mb-0.5" />
                      <div className="text-[9px] text-green-400 font-medium">链接可访问</div>
                      <div className="text-[8px] text-slate-500">检测时间：2024-05-14 14:33</div>
                    </div>
                    <div className="rounded-lg p-1.5 text-center" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                      <CheckCircle size={12} className="text-green-400 mx-auto mb-0.5" />
                      <div className="text-[9px] text-green-400 font-medium">内容合规</div>
                      <div className="text-[8px] text-slate-500">未检测到违规内容</div>
                    </div>
                    <div className="rounded-lg p-1.5 text-center" style={{ background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)" }}>
                      <AlertTriangle size={12} className="text-yellow-400 mx-auto mb-0.5" />
                      <div className="text-[9px] text-yellow-400 font-medium">存在重复风险</div>
                      <div className="text-[8px] text-slate-500">相似资源 2 条（相似度 78%）</div>
                    </div>
                  </div>
                </div>

                {/* History */}
                <div>
                  <div className="text-xs font-medium text-white mb-2">历史审核记录</div>
                  <div className="space-y-1.5">
                    {[
                      { time: "2024-05-10 16:22", op: "超级管理员", action: "审核通过", result: "通过", color: "#22c55e", note: "自定义分类：AI 绘画" },
                      { time: "2024-04-28 11:08", op: "超级管理员", action: "退回修改", result: "退回", color: "#f59e0b", note: "请补充资源说明与标签" },
                    ].map((log, i) => (
                      <div key={i} className="text-[10px] text-slate-400">
                        <span className="text-slate-500">{log.time}</span> {log.op}{" "}
                        <span style={{ color: log.color }}>{log.result}</span>{" "}{log.note}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Note textarea */}
                <div>
                  <div className="text-xs font-medium text-white mb-1.5">审核备注</div>
                  <textarea
                    value={note} onChange={e => setNote(e.target.value)}
                    placeholder="请输入审核备注（选填）"
                    rows={2}
                    className="w-full space-input rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none resize-none bg-transparent"
                  />
                  <div className="text-right text-[10px] text-slate-500">{note.length} / 500</div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl text-xs text-white font-medium flex items-center justify-center gap-1.5" style={{ background: "linear-gradient(135deg,#22c55e,#10b981)" }}>
                    <CheckCircle size={12} /> 审核通过
                  </button>
                  <button className="flex-1 py-2 rounded-xl text-xs text-white font-medium flex items-center justify-center gap-1.5" style={{ background: "linear-gradient(135deg,#f59e0b,#d97706)" }}>
                    <RefreshCw size={12} /> 退回修改
                  </button>
                  <button className="flex-1 py-2 rounded-xl text-xs text-white font-medium" style={{ background: "linear-gradient(135deg,#ef4444,#dc2626)" }}>
                    驳回
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
