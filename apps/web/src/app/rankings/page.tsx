"use client";

import { useState } from "react";
import { Search, Star, Flame, TrendingUp, ChevronRight, RefreshCw } from "lucide-react";
import { rankingsData, trendingResources } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

const RANK_TABS = ["综合榜", "AI工具榜", "设计工具榜", "开发工具榜", "效率办公榜", "学习网站榜"];

export default function RankingsPage() {
  const [activeTab, setActiveTab] = useState("综合榜");
  const [currentPage, setCurrentPage] = useState(1);
  const top3 = rankingsData.slice(0, 3);
  const rest = rankingsData.slice(3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-3">排行榜</h1>
            <p className="text-slate-400 text-sm">发现最热门、最高评分的优质工具与资源，看看大家都在用什么</p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-36 h-36">
            <div
              className="relative w-28 h-28 rounded-full flex items-center justify-center text-4xl"
              style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#3730a3)", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}
            >
              🏆
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          className="flex gap-2 p-1.5 rounded-2xl mt-5 max-w-xl"
          style={{ background: "rgba(15,15,40,0.9)", border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <div className="flex items-center gap-2 flex-1 px-3">
            <Search size={15} className="text-slate-400" />
            <input placeholder="搜索工具、资源或关键词..." className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
          </div>
          <button className="btn-primary px-5 py-2 rounded-xl text-white text-sm font-medium">搜索</button>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="flex gap-6">
          {/* Left content */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex items-center justify-between mb-6">
              <div
                className="flex gap-1 flex-wrap p-1 rounded-xl"
                style={{ background: "rgba(15,15,40,0.6)" }}
              >
                {RANK_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      activeTab === tab
                        ? "btn-primary text-white font-medium"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <RefreshCw size={11} />
                每周一 00:00 更新
              </div>
            </div>

            {/* Top 3 podium */}
            <div className="grid grid-cols-3 gap-4 mb-6 items-end">
              {/* Rank 2 — left */}
              <div
                className="resource-card rounded-2xl p-5 flex flex-col items-center text-center"
                style={{ marginTop: "20px" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3"
                  style={{ background: "linear-gradient(135deg,#9ca3af,#6b7280)", color: "white" }}
                >
                  2
                </div>
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-3 ${top3[1].logoBg}`}
                >
                  {top3[1].logo}
                </div>
                <h3 className="font-bold text-white mb-1">{top3[1].name}</h3>
                <div className="flex flex-wrap justify-center gap-1 mb-2">
                  {top3[1].tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{top3[1].description}</p>
                <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" />{top3[1].rating}</span>
                  <span className="flex items-center gap-1">📥 {formatNumber(top3[1].heat)}</span>
                  <span className="text-green-400">↑</span>
                </div>
                <button className="btn-primary w-full py-2 rounded-xl text-white text-xs font-medium">查看详情</button>
              </div>

              {/* Rank 1 — center, elevated */}
              <div
                className="resource-card rounded-2xl p-5 flex flex-col items-center text-center relative"
                style={{
                  border: "1px solid rgba(245,158,11,0.4)",
                  boxShadow: "0 0 30px rgba(245,158,11,0.15)",
                }}
              >
                <div className="absolute -top-5 text-4xl">👑</div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold mb-3 mt-4"
                  style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)", color: "white" }}
                >
                  1
                </div>
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-3 ${top3[0].logoBg}`}>
                  {top3[0].logo}
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{top3[0].name}</h3>
                <div className="flex flex-wrap justify-center gap-1 mb-2">
                  {top3[0].tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{top3[0].description}</p>
                <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" />{top3[0].rating}</span>
                  <span className="flex items-center gap-1">📥 {formatNumber(top3[0].heat)}</span>
                  <span className="text-green-400">↑</span>
                </div>
                <button className="btn-primary w-full py-2 rounded-xl text-white text-sm font-medium">查看详情</button>
              </div>

              {/* Rank 3 — right */}
              <div
                className="resource-card rounded-2xl p-5 flex flex-col items-center text-center"
                style={{ marginTop: "40px" }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-3"
                  style={{ background: "linear-gradient(135deg,#cd7c2f,#a0522d)", color: "white" }}
                >
                  3
                </div>
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-3 ${top3[2].logoBg}`}>
                  {top3[2].logo}
                </div>
                <h3 className="font-bold text-white mb-1">{top3[2].name}</h3>
                <div className="flex flex-wrap justify-center gap-1 mb-2">
                  {top3[2].tags.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mb-3">{top3[2].description}</p>
                <div className="flex items-center gap-3 text-sm text-slate-400 mb-3">
                  <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" />{top3[2].rating}</span>
                  <span className="flex items-center gap-1">📥 {formatNumber(top3[2].heat)}</span>
                  <span className="text-green-400">↑</span>
                </div>
                <button className="btn-primary w-full py-2 rounded-xl text-white text-xs font-medium">查看详情</button>
              </div>
            </div>

            {/* Rankings table (4-10) */}
            <div
              className="rounded-2xl overflow-hidden mb-6"
              style={{ border: "1px solid rgba(99,102,241,0.2)" }}
            >
              {/* Table header */}
              <div
                className="grid grid-cols-[60px_1fr_120px_80px_100px_80px_100px] px-4 py-3 text-xs text-slate-500 border-b border-indigo-500/10"
                style={{ background: "rgba(15,15,40,0.8)" }}
              >
                <span>排名</span>
                <span>工具/资源</span>
                <span>分类</span>
                <span>评分</span>
                <span>热度</span>
                <span>趋势</span>
                <span className="text-right">操作</span>
              </div>
              {rest.map((item, idx) => (
                <div
                  key={item.rank}
                  className="grid grid-cols-[60px_1fr_120px_80px_100px_80px_100px] px-4 py-4 items-center border-b border-indigo-500/5 hover:bg-white/[0.02] transition-colors"
                  style={{ background: idx % 2 === 0 ? "rgba(8,8,24,0.8)" : "rgba(15,15,40,0.5)" }}
                >
                  <span className="font-bold text-slate-400 text-sm">{item.rank}</span>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${item.logoBg}`}>
                      {item.logo}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-white text-sm truncate">{item.name}</div>
                      <div className="text-xs text-slate-500 truncate">{item.description}</div>
                    </div>
                  </div>
                  <span>
                    <span className="px-2 py-0.5 rounded text-xs" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
                      {item.category}
                    </span>
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white">{item.rating}</span>
                  </span>
                  <span className="flex items-center gap-1 text-sm text-slate-400">
                    📥 {formatNumber(item.heat)}
                  </span>
                  <span className="text-green-400 text-sm font-medium">↑ {item.trend}</span>
                  <div className="flex justify-end">
                    <button className="btn-primary px-3 py-1.5 rounded-lg text-white text-xs">查看详情</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="page-btn">‹</button>
              {[1, 2, 3, 4, 5].map((p) => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`page-btn ${currentPage === p ? "active" : ""}`}>{p}</button>
              ))}
              <span className="text-slate-500 text-sm px-1">…</span>
              <button className="page-btn">125</button>
              <button className="page-btn">›</button>
              <span className="text-sm text-slate-500 ml-2">跳至</span>
              <input type="number" defaultValue={1} className="space-input w-14 rounded-lg px-2 py-1.5 text-sm text-center" />
              <span className="text-sm text-slate-500">页</span>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="hidden xl:block w-60 flex-shrink-0 space-y-4">
            {/* Trending */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <TrendingUp size={13} className="text-green-400" /> 本周上升最快
                </span>
                <button className="text-xs text-indigo-400">更多 &gt;</button>
              </div>
              <div className="space-y-3">
                {trendingResources.map((item) => (
                  <div key={item.rank} className="flex items-center gap-2 cursor-pointer group">
                    <span
                      className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: item.rank <= 3 ? "linear-gradient(135deg,#f59e0b,#ef4444)" : "rgba(99,102,241,0.15)",
                        color: item.rank <= 3 ? "white" : "#94a3b8",
                      }}
                    >
                      {item.rank}
                    </span>
                    <div className="w-6 h-6 rounded flex items-center justify-center text-sm" style={{ background: "rgba(99,102,241,0.2)" }}>📋</div>
                    <span className="text-xs text-slate-400 flex-1 truncate group-hover:text-white">{item.name}</span>
                    <span className="text-xs text-green-400 font-medium flex-shrink-0">↑ {item.change}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot tags */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <Flame size={13} className="text-orange-400" /> 热门标签
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ["AI工具", "1,024"], ["设计", "876"], ["开发", "1,288"],
                  ["效率", "1,635"], ["协作", "892"], ["教育", "764"],
                  ["SaaS", "612"], ["创作", "598"], ["编程", "546"],
                  ["模板", "421"], ["自动化", "398"], ["学习", "387"],
                ].map(([tag, count]) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-xs cursor-pointer" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc" }}>
                    {tag} <span className="text-slate-500 text-[10px]">{count}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Ranking description */}
            <div className="sidebar-card">
              <div className="flex items-center gap-1 mb-3">
                <span className="text-indigo-400">📊</span>
                <span className="text-sm font-semibold text-white">榜单说明</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                {[
                  "综合榜综合考虑工具的评分、热度、用户增长等多维度数据进行排序",
                  "热度基于工具的访问量、收藏量和讨论度计算",
                  "每周一 00:00 更新排名数据",
                  "如对榜单有疑问或建议，欢迎联系我们反馈",
                ].map((text, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-indigo-400 mt-0.5 flex-shrink-0">◦</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
