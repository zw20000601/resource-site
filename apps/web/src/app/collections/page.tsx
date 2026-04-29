"use client";

import { useState } from "react";
import { Search, ChevronRight, Flame, Clock, Star as StarIcon, LayoutGrid, List, Bell } from "lucide-react";
import Link from "next/link";
import { topicCollections, hotTags } from "@/lib/data";

const CATS = ["全部", "AI工具", "设计资源", "开发工具", "学习提升", "效率办公", "副业项目"];
const TABS = [
  { label: "热门专题", icon: <Flame size={13} /> },
  { label: "最新更新", icon: <Clock size={13} /> },
  { label: "编辑精选", icon: <StarIcon size={13} /> },
];

const TOP_TOPICS = [
  { rank: 1, title: "AI生产力工具全家桶", score: "9.8k" },
  { rank: 2, title: "设计师必备资源库", score: "9.6k" },
  { rank: 3, title: "前端开发资源精选", score: "9.5k" },
  { rank: 4, title: "运营增长工具大全", score: "9.3k" },
  { rank: 5, title: "自媒体与内容创作", score: "9.2k" },
];

export default function CollectionsPage() {
  const [activeCat, setActiveCat] = useState("全部");
  const [activeTab, setActiveTab] = useState("热门专题");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-3">专题合集</h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              精选优质资源，按主题精心策划，覆盖 AI 工具、设计灵感、开发技术、学习提升、效率办公、
              副业项目等多个领域，助你快速发现所需，高效成长。
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-36 h-36">
            <div
              className="relative w-28 h-28 rounded-full flex items-center justify-center text-4xl"
              style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#3730a3)", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}
            >
              📚
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-lg">💻</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div
          className="flex gap-2 p-1.5 rounded-2xl mt-5 max-w-2xl"
          style={{ background: "rgba(15,15,40,0.9)", border: "1px solid rgba(99,102,241,0.3)" }}
        >
          <div className="flex items-center gap-2 flex-1 px-3">
            <Search size={15} className="text-slate-400" />
            <input
              placeholder="搜索专题合集、关键词..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
            />
          </div>
          <button className="btn-primary px-5 py-2 rounded-xl text-white text-sm font-medium">搜索</button>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-xl text-sm transition-all ${
                activeCat === cat
                  ? "btn-primary text-white font-medium"
                  : "text-slate-400 hover:text-white border border-indigo-500/20 hover:border-indigo-500/40"
              }`}
              style={activeCat !== cat ? { background: "rgba(15,15,40,0.6)" } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="flex gap-6">
          {/* Left main */}
          <div className="flex-1 min-w-0">
            {/* Tabs + view toggle */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-1" style={{ background: "rgba(15,15,40,0.6)", borderRadius: "12px", padding: "4px" }}>
                {TABS.map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-all ${
                      activeTab === tab.label
                        ? "btn-primary text-white font-medium"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-indigo-500/20 text-indigo-300" : "text-slate-500 hover:text-white"}`}
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? "bg-indigo-500/20 text-indigo-300" : "text-slate-500 hover:text-white"}`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            {/* Featured banner */}
            <div
              className="relative rounded-2xl overflow-hidden mb-6 p-6 flex items-center justify-between"
              style={{
                background: "linear-gradient(135deg,rgba(99,102,241,0.3),rgba(139,92,246,0.2),rgba(59,130,246,0.1))",
                border: "1px solid rgba(99,102,241,0.3)",
              }}
            >
              <div
                className="absolute top-2 left-4 px-2 py-0.5 rounded text-xs font-medium text-white flex items-center gap-1"
                style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}
              >
                ★ 编辑精选
              </div>
              <div className="flex-1 pt-4">
                <h2 className="text-2xl font-bold text-white mb-2">AI生产力工具全家桶</h2>
                <p className="text-slate-400 text-sm mb-4 max-w-md">
                  精选 100+ 款高效实用的 AI 工具，覆盖写作、绘图、编程、视频、办公、自动化等多个场景，全面提升你的生产力。
                </p>
                <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                  <span className="flex items-center gap-1"><span>📦</span> 128个资源</span>
                  <span className="flex items-center gap-1"><span>❤️</span> 24.8k收藏</span>
                  <span className="flex items-center gap-1"><span>🕒</span> 3天前更新</span>
                </div>
                <button className="btn-primary px-5 py-2.5 rounded-xl text-white text-sm font-medium">
                  查看专题
                </button>
              </div>
              <div
                className="hidden md:flex w-48 h-36 rounded-xl items-center justify-center text-6xl flex-shrink-0"
                style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#3730a3)", boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
              >
                🤖
              </div>
            </div>

            {/* Topic grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4" : "flex flex-col gap-3"}>
              {topicCollections.map((topic) => (
                <div key={topic.id} className={`resource-card rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform ${viewMode === "list" ? "flex items-center gap-4 p-4" : ""}`}>
                  {viewMode === "grid" ? (
                    <>
                      <div
                        className="h-28 flex items-center justify-center text-4xl relative"
                        style={{ background: "rgba(15,15,40,0.8)" }}
                      >
                        <div
                          className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${topic.logoBg}`}
                        >
                          {topic.logo}
                        </div>
                        <span
                          className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs text-white"
                          style={{ background: "rgba(99,102,241,0.7)" }}
                        >
                          {topic.category}
                        </span>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-white text-sm mb-1">{topic.title}</h3>
                        <p className="text-xs text-slate-400 line-clamp-2 mb-3">{topic.description}</p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>📦 {topic.count}个资源</span>
                          <span>🕒 {topic.updateDays}天前</span>
                        </div>
                        <button className="btn-primary w-full mt-3 py-2 rounded-lg text-white text-xs font-medium">
                          查看专题
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${topic.logoBg}`}>
                        {topic.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white text-sm">{topic.title}</h3>
                          <span className="px-1.5 py-0.5 rounded text-xs" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>
                            {topic.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mb-1">{topic.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>📦 {topic.count}个资源</span>
                          <span>🕒 {topic.updateDays}天前更新</span>
                        </div>
                      </div>
                      <button className="btn-primary px-4 py-2 rounded-lg text-white text-xs flex-shrink-0">查看专题</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="hidden xl:block w-56 flex-shrink-0 space-y-4">
            {/* Hot tags */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <Flame size={13} className="text-orange-400" /> 热门标签
                </span>
                <button className="text-xs text-indigo-400">更多 &gt;</button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ["AI", "1,024"], ["设计", "876"], ["开发", "1,288"],
                  ["效率", "1,635"], ["学习", "882"], ["办公", "764"],
                  ["编程", "598"], ["自动化", "398"], ["副业", "546"],
                  ["模板", "421"], ["工具", "1,756"], ["灵感", "387"],
                ].map(([tag, count]) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs cursor-pointer hover:bg-indigo-500/30 transition-all"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc" }}
                  >
                    {tag} <span className="text-slate-500 text-[10px]">{count}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Topics leaderboard */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <StarIcon size={13} className="text-yellow-400" /> 专题榜单
                </span>
                <button className="text-xs text-indigo-400">更多 &gt;</button>
              </div>
              <div className="space-y-3">
                {TOP_TOPICS.map((topic) => (
                  <div key={topic.rank} className="flex items-center gap-2 cursor-pointer group">
                    <span
                      className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background: topic.rank <= 3 ? "linear-gradient(135deg,#f59e0b,#ef4444)" : "rgba(99,102,241,0.15)",
                        color: topic.rank <= 3 ? "white" : "#94a3b8",
                      }}
                    >
                      {topic.rank}
                    </span>
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-sm"
                      style={{ background: "rgba(99,102,241,0.2)" }}
                    >
                      🤖
                    </div>
                    <span className="text-xs text-slate-400 flex-1 truncate group-hover:text-white">{topic.title}</span>
                    <span className="text-xs text-orange-400 flex-shrink-0">
                      <Flame size={10} className="inline" />{topic.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribe */}
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Bell size={14} className="text-indigo-400" />
                <span className="text-sm font-semibold text-white">订阅专题更新</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">订阅你感兴趣的专题，第一时间获取最新资源与更新动态。</p>
              <input placeholder="输入你的邮箱地址" className="space-input w-full rounded-lg px-3 py-2 text-xs mb-2" />
              <button className="btn-primary w-full py-2 rounded-lg text-white text-xs font-medium">订阅更新</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
