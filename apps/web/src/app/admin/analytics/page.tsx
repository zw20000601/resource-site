"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Download, RefreshCw, Info, ChevronRight } from "lucide-react";

const PV_POINTS = [40, 50, 45, 65, 60, 70, 55, 72, 68, 80, 74, 82, 76, 90, 86, 92, 88, 95, 88, 96, 90, 100, 94, 100, 95, 99, 92, 95, 96, 100];
const UV_POINTS = [20, 28, 25, 35, 30, 38, 32, 40, 36, 45, 40, 48, 42, 52, 48, 55, 52, 58, 54, 60, 56, 62, 58, 62, 59, 62, 58, 60, 61, 62];
const DATES = ["04-15", "04-19", "04-23", "04-27", "05-01", "05-05", "05-09", "05-13"];

const makePath = (pts: number[], w: number, h: number) => {
  const maxV = 100, minV = 0;
  const steps = pts.length - 1;
  return pts.map((v, i) => {
    const x = (i / steps) * w;
    const y = h - ((v - minV) / (maxV - minV)) * h;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
};

const CATS = ["学习教程", "设计素材", "源码模板", "办公资源", "图片素材", "音效音效"];
const BAR_DATA = [
  [95, 78, 64], [88, 62, 55], [92, 70, 60], [75, 55, 42], [65, 50, 38], [48, 35, 26],
];
const DONUT_SEGS = [
  { pct: 0.355, color: "#6366f1", label: "直接访问", val: "456,210 (35.5%)" },
  { pct: 0.293, color: "#f59e0b", label: "搜索引擎", val: "376,842 (29.3%)" },
  { pct: 0.150, color: "#10b981", label: "社交分享", val: "192,964 (15.0%)" },
  { pct: 0.111, color: "#06b6d4", label: "专题页", val: "142,381 (11.1%)" },
  { pct: 0.091, color: "#8b5cf6", label: "外部推荐", val: "118,033 (9.1%)" },
];

const TOP10 = [
  { name: "Python 爬虫实战项目全集", cat: "源码模板", pv: "48,921", dl: "12,643", conv: "25.8%" },
  { name: "Figma 高效组件库 2024", cat: "设计素材", pv: "45,231", dl: "9,876", conv: "21.9%" },
  { name: "AI 绘画提示词大全（Midjourney）", cat: "学习教程", pv: "42,178", dl: "8,934", conv: "21.2%" },
  { name: "Vue3 企业级后台管理模板", cat: "源码模板", pv: "35,642", dl: "7,521", conv: "21.1%" },
  { name: "PPT 商务图表合集（200+）", cat: "办公资源", pv: "29,875", dl: "6,218", conv: "20.8%" },
];
const CAT_COLORS: Record<string, string> = { 源码模板: "#6366f1", 设计素材: "#f59e0b", 学习教程: "#10b981", 办公资源: "#06b6d4" };

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("近 30 天");

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "radial-gradient(ellipse at 20% 50%,rgba(30,20,80,0.4),transparent 60%),#080818" }}>
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader breadcrumb="数据分析" />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Title + controls */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">数据分析</h1>
              <p className="text-slate-400 text-sm mt-1">洞察平台资源增长、用户活跃与运营表现</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-xl overflow-hidden border border-indigo-500/20">
                {["近 7 天", "近 30 天", "近 90 天"].map(p => (
                  <button key={p} onClick={() => setPeriod(p)}
                    className={`px-4 py-2 text-sm transition-all ${period === p ? "text-white" : "text-slate-400 hover:text-white"}`}
                    style={period === p ? { background: "linear-gradient(135deg,#6366f1,#8b5cf6)" } : {}}>
                    {p}
                  </button>
                ))}
              </div>
              <select className="space-input rounded-xl px-3 py-2 text-sm text-slate-300 outline-none bg-transparent">
                <option className="bg-slate-900">分类：全部</option>
              </select>
              <select className="space-input rounded-xl px-3 py-2 text-sm text-slate-300 outline-none bg-transparent">
                <option className="bg-slate-900">来源：全部</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40">
                <Download size={14} /> 导出报表
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                <RefreshCw size={14} /> 刷新数据
              </button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "总访问量", value: "1,286,430", delta: "+22.4%", sub: "较上期 1,050,382", color: "#6366f1", spark: "M0,18 L16,14 L32,10 L48,6 L64,2" },
              { label: "活跃用户", value: "156,320", delta: "+18.7%", sub: "较上期 131,789", color: "#8b5cf6", spark: "M0,16 L16,12 L32,10 L48,7 L64,2" },
              { label: "资源下载", value: "82,640", delta: "+24.1%", sub: "较上期 66,636", color: "#06b6d4", spark: "M0,18 L16,13 L32,9 L48,5 L64,2" },
              { label: "转化率", value: "18.7%", delta: "+2.9%", sub: "较上期 15.8%", color: "#10b981", spark: "M0,14 L16,12 L32,8 L48,5 L64,3" },
            ].map(c => (
              <div key={c.label} className="sidebar-card">
                <div className="text-xs text-slate-400 mb-1">{c.label}</div>
                <div className="text-2xl font-bold text-white mb-1">{c.value}</div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium" style={{ color: c.color }}>{c.delta}</span>
                    <span className="text-xs text-slate-500 ml-1">{c.sub}</span>
                  </div>
                  <svg width="64" height="24" viewBox="0 0 64 20">
                    <polyline points={c.spark} fill="none" stroke={c.color} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Row 1: Trend + Donut + Device */}
          <div className="grid grid-cols-3 gap-4">
            {/* Trend chart */}
            <div className="sidebar-card col-span-1" style={{ gridColumn: "span 1" }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-white">访问趋势分析</span>
                  <Info size={12} className="text-slate-500" />
                </div>
                <select className="space-input rounded-lg px-2 py-1 text-xs text-slate-300 outline-none bg-transparent">
                  <option className="bg-slate-900">按天</option>
                </select>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-3 h-0.5 bg-indigo-400 inline-block rounded" />访问量 (PV)</div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400"><span className="w-3 h-0.5 bg-purple-400 inline-block rounded" />独立访客 (UV)</div>
              </div>
              <div className="relative" style={{ height: 160 }}>
                {/* Y labels */}
                <div className="absolute left-0 top-0 bottom-4 flex flex-col justify-between text-[10px] text-slate-600 w-8">
                  {["100K", "80K", "60K", "40K", "20K", "0"].map(v => <span key={v}>{v}</span>)}
                </div>
                <svg className="absolute left-8 right-0 top-0 bottom-4" style={{ width: "calc(100% - 2rem)", height: "calc(100% - 1rem)" }} viewBox="0 0 400 130" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[0, 26, 52, 78, 104, 130].map(y => (
                    <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}
                  <polyline points={makePath(PV_POINTS, 400, 130)} fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points={makePath(UV_POINTS, 400, 130)} fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {/* X labels */}
                <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] text-slate-600">
                  {DATES.map(d => <span key={d}>{d}</span>)}
                </div>
              </div>
            </div>

            {/* Traffic source donut */}
            <div className="sidebar-card">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-sm font-semibold text-white">流量来源分布</span>
                <Info size={12} className="text-slate-500" />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <svg width="120" height="120" viewBox="0 0 100 100">
                    {(() => {
                      let offset = 0;
                      const circ = 2 * Math.PI * 35;
                      return DONUT_SEGS.map((s, i) => {
                        const el = (
                          <circle key={i} cx="50" cy="50" r="35" fill="none" stroke={s.color} strokeWidth="18"
                            strokeDasharray={`${s.pct * circ} ${circ}`} strokeDashoffset={-offset}
                            transform="rotate(-90 50 50)" />
                        );
                        offset += s.pct * circ;
                        return el;
                      });
                    })()}
                    <text x="50" y="47" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">1,286,430</text>
                    <text x="50" y="59" textAnchor="middle" fill="#94a3b8" fontSize="7">总访问量</text>
                  </svg>
                </div>
                <div className="flex-1 space-y-1.5">
                  {DONUT_SEGS.map(s => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-[10px] text-slate-300 flex-1">{s.label}</span>
                      <span className="text-[10px] text-slate-400">{s.val.split(" ")[1]?.replace(/[()]/g, "")}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button className="mt-2 text-xs text-indigo-400 flex items-center gap-1">查看全部来源 <ChevronRight size={11} /></button>
            </div>

            {/* Device distribution */}
            <div className="sidebar-card">
              <div className="text-sm font-semibold text-white mb-3">设备分布</div>
              <div className="space-y-4">
                {[
                  { icon: "🖥️", name: "桌面端", pct: 62.3, val: "800,654", color: "#6366f1" },
                  { icon: "📱", name: "移动端", pct: 33.6, val: "431,866", color: "#8b5cf6" },
                  { icon: "📟", name: "平板", pct: 4.1, val: "53,910", color: "#3b82f6" },
                ].map(d => (
                  <div key={d.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{d.icon}</span>
                        <span className="text-sm text-slate-300">{d.name}</span>
                      </div>
                      <span className="text-sm font-bold text-white">{d.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, background: d.color }} />
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 text-right">{d.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Bar chart + Funnel */}
          <div className="grid grid-cols-3 gap-4">
            {/* Category bar chart */}
            <div className="sidebar-card col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-white">分类表现分析</span>
                  <Info size={12} className="text-slate-500" />
                  <div className="flex items-center gap-3 ml-2">
                    {[["#6366f1", "浏览量 (PV)"], ["#8b5cf6", "下载量"], ["#06b6d4", "收藏数"]].map(([c, l]) => (
                      <div key={l} className="flex items-center gap-1 text-[10px] text-slate-400">
                        <span className="w-2 h-2 rounded-sm inline-block" style={{ background: c }} />{l}
                      </div>
                    ))}
                  </div>
                </div>
                <select className="space-input rounded-lg px-2 py-1 text-xs text-slate-300 outline-none bg-transparent">
                  <option className="bg-slate-900">按分类</option>
                </select>
              </div>
              <div className="relative" style={{ height: 160 }}>
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-slate-600 w-10">
                  {["200K", "150K", "100K", "50K", "0"].map(v => <span key={v}>{v}</span>)}
                </div>
                <svg className="absolute left-10 right-0 top-0 bottom-6" style={{ width: "calc(100% - 2.5rem)", height: "calc(100% - 1.5rem)" }} viewBox="0 0 360 130" preserveAspectRatio="none">
                  {[0, 32.5, 65, 97.5, 130].map(y => (
                    <line key={y} x1="0" y1={y} x2="360" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  ))}
                  {BAR_DATA.map((bars, gi) => {
                    const gx = gi * 60 + 5;
                    return bars.map((v, bi) => {
                      const colors = ["#6366f1", "#8b5cf6", "#06b6d4"];
                      const h = (v / 100) * 130;
                      return <rect key={`${gi}-${bi}`} x={gx + bi * 15} y={130 - h} width="12" height={h} rx="2" fill={colors[bi]} opacity="0.85" />;
                    });
                  })}
                </svg>
                <div className="absolute bottom-0 left-10 right-0 flex justify-around text-[10px] text-slate-500">
                  {CATS.map(c => <span key={c}>{c}</span>)}
                </div>
              </div>
            </div>

            {/* Conversion funnel */}
            <div className="sidebar-card">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-sm font-semibold text-white">用户转化漏斗</span>
                <Info size={12} className="text-slate-500" />
              </div>
              <div className="space-y-1 mb-2">
                {[
                  { step: "访问首页", val: "1,286,430", pct: null, color: "#6366f1", w: 100 },
                  { step: "浏览资源", val: "512,630", pct: "39.9%", color: "#8b5cf6", w: 80 },
                  { step: "收藏资源", val: "162,845", pct: "31.8%", color: "#a78bfa", w: 60 },
                  { step: "下载资源", val: "82,640", pct: "50.1%", color: "#06b6d4", w: 42 },
                  { step: "注册用户", val: "24,361", pct: "29.5%", color: "#10b981", w: 24 },
                ].map(f => (
                  <div key={f.step} className="flex items-center gap-2">
                    <div className="flex-1 flex items-center justify-center py-1.5 rounded" style={{ background: f.color + "33", width: `${f.w}%`, marginLeft: `${(100 - f.w) / 2}%` }}>
                      <span className="text-[10px] text-white">{f.step}</span>
                    </div>
                    <div className="w-20 flex-shrink-0 text-right">
                      <div className="text-xs text-white font-medium">{f.val}</div>
                      {f.pct && <div className="text-[10px] text-slate-500">{f.pct}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <span className="text-xs text-slate-400">总体转化率 </span>
                <span className="text-sm font-bold text-indigo-400">1.89%</span>
              </div>
            </div>
          </div>

          {/* Row 3: Top10 + Region + Insights */}
          <div className="grid grid-cols-3 gap-4">
            {/* Top 10 */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">热门资源 TOP10</span>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-500 border-b border-white/5">
                    {["资源名称", "分类", "浏览量(PV)", "下载量", "转化率"].map(h => (
                      <th key={h} className="pb-1.5 text-left font-medium pr-2 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TOP10.map((r, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-1.5 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center flex-shrink-0"
                            style={{ background: i < 3 ? "linear-gradient(135deg,#f59e0b,#ef4444)" : "rgba(99,102,241,0.2)", color: "white" }}>
                            {i + 1}
                          </span>
                          <span className="text-slate-300 truncate max-w-28">{r.name}</span>
                        </div>
                      </td>
                      <td className="py-1.5 pr-2">
                        <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: (CAT_COLORS[r.cat] || "#6366f1") + "22", color: CAT_COLORS[r.cat] || "#6366f1" }}>{r.cat}</span>
                      </td>
                      <td className="py-1.5 pr-2 text-slate-300">{r.pv}</td>
                      <td className="py-1.5 pr-2 text-slate-300">{r.dl}</td>
                      <td className="py-1.5 text-green-400">{r.conv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="mt-2 text-xs text-indigo-400 flex items-center gap-1">查看完整 TOP10 列表 <ChevronRight size={11} /></button>
            </div>

            {/* Region top5 */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">地域访问 TOP5</span>
              </div>
              <table className="w-full text-xs mb-2">
                <thead>
                  <tr className="text-slate-500 border-b border-white/5">
                    <th className="pb-1.5 text-left font-medium pr-2">排名</th>
                    <th className="pb-1.5 text-left font-medium pr-2">地区</th>
                    <th className="pb-1.5 text-left font-medium">访问量占比</th>
                  </tr>
                </thead>
                <tbody>
                  {[["广东省", 12.8], ["江苏省", 9.6], ["浙江省", 8.3], ["山东省", 6.7], ["四川省", 5.4]].map(([name, pct], i) => (
                    <tr key={name as string} className="border-b border-white/5">
                      <td className="py-2 pr-2">
                        <span className="w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center"
                          style={{ background: i < 3 ? "linear-gradient(135deg,#f59e0b,#6366f1)" : "rgba(99,102,241,0.2)", color: "white" }}>
                          {i + 1}
                        </span>
                      </td>
                      <td className="py-2 pr-2 text-slate-300">{name as string}</td>
                      <td className="py-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-slate-800">
                            <div className="h-full rounded-full bg-indigo-500" style={{ width: `${(pct as number) / 12.8 * 100}%` }} />
                          </div>
                          <span className="text-slate-400 w-8 text-right">{pct as number}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="text-xs text-indigo-400 flex items-center gap-1">查看完整地域分布 <ChevronRight size={11} /></button>
            </div>

            {/* Operational insights */}
            <div className="sidebar-card">
              <div className="flex items-center gap-1.5 mb-3">
                <span className="text-sm font-semibold text-white">运营洞察</span>
                <Info size={12} className="text-slate-500" />
              </div>
              <div className="space-y-3">
                {[
                  { icon: "📈", title: "搜索流量持续增长", color: "#6366f1", desc: "搜索引擎带来的访问量占比 29.3%，较上期提升 3.6 个百分点，建议持续优化 SEO 关键词布局。" },
                  { icon: "🎓", title: "学习教程下载表现突出", color: "#10b981", desc: "学习教程分类下载量点比 38.2%，远超其他分类，建议加大优质教程内容供给。" },
                  { icon: "📱", title: "移动端增长显著", color: "#8b5cf6", desc: "移动端访问占比 33.6%，较上期提升 4.1 个百分点，建议优先优化移动端体验。" },
                ].map(ins => (
                  <div key={ins.title} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: ins.color + "22" }}>
                      {ins.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white mb-0.5">{ins.title}</div>
                      <div className="text-[10px] text-slate-400 leading-relaxed">{ins.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
