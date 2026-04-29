"use client";

import { useState } from "react";
import { Search, ChevronRight, LayoutGrid, List, Flame, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import ResourceCard from "@/components/ui/ResourceCard";
import { marketplaceResources, hotTags } from "@/lib/data";

const FILTER_TABS = ["全部", "热门", "最新", "免费", "AI", "前端", "设计", "开发", "效率", "运营"];
const SORT_TABS = ["综合排序", "收藏最多", "最近更新"];
const CATEGORIES = [
  { name: "AI工具", count: 324 },
  { name: "设计素材", count: 486 },
  { name: "开发工具", count: 652 },
  { name: "学习网站", count: 318 },
  { name: "效率办公", count: 287 },
  { name: "视频素材", count: 196 },
  { name: "运营增长", count: 153 },
  { name: "商业项目", count: 70 },
];
const SCENES = ["学习提升", "设计创作", "开发编程", "内容创作", "运营推广", "团队协作"];
const SCENE_COUNTS = [856, 623, 712, 498, 364, 281];
const PLATFORMS = ["Web", "Windows", "Mac", "iOS", "Android"];
const PLATFORM_COUNTS = [2021, 678, 642, 386, 352];

const TODAY_HOT = [
  { rank: 1, name: "Figma", score: 9.8 },
  { rank: 2, name: "Notion", score: 9.6 },
  { rank: 3, name: "GitHub", score: 9.5 },
  { rank: 4, name: "Hugging Face", score: 9.4 },
  { rank: 5, name: "Vercel", score: 9.3 },
];

const RECOMMENDED = [
  { name: "星刀 Mockplus", category: "设计 · 原型", rating: 4.7, logo: "🗡️", logoBg: "bg-red-600" },
  { name: "Midjourney", category: "AI · 绘画", rating: 4.8, logo: "🎨", logoBg: "bg-indigo-600" },
  { name: "Claude", category: "AI · 聊天", rating: 4.7, logo: "🤖", logoBg: "bg-orange-600" },
  { name: "Linear", category: "开发 · 项目管理", rating: 4.6, logo: "📐", logoBg: "bg-purple-600" },
  { name: "LottieFiles", category: "设计 · 动效", rating: 4.6, logo: "✨", logoBg: "bg-blue-600" },
];

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState("全部");
  const [activeSort, setActiveSort] = useState("综合排序");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [priceType, setPriceType] = useState("全部");
  const [selectedScenes, setSelectedScenes] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 125;

  const toggleScene = (s: string) =>
    setSelectedScenes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  const togglePlatform = (p: string) =>
    setSelectedPlatforms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <nav className="flex items-center gap-2 text-xs text-slate-500 mb-3">
              <Link href="/" className="hover:text-slate-300">首页</Link>
              <ChevronRight size={12} />
              <span className="text-slate-300">资源广场</span>
            </nav>
            <h1 className="text-4xl font-bold text-white mb-3">资源广场</h1>
            <p className="text-slate-400 text-sm max-w-xl">
              汇聚全网优质资源，按分类、场景、平台等多维度检索，快速找到你需要的工具与素材。
            </p>
          </div>
          <div className="hidden lg:block">
            <div
              className="relative w-32 h-32 rounded-full flex items-center justify-center text-5xl"
              style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#3730a3)", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}
            >
              🔍
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
              placeholder="搜索资源、工具、网站或关键词..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
            />
          </div>
          <button className="btn-primary px-5 py-2 rounded-xl text-white text-sm font-medium">搜索</button>
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="flex gap-6">
          {/* Left sidebar */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            {/* Category filter */}
            <div className="sidebar-card mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white flex items-center gap-1">
                  <span className="text-yellow-400">★</span> 资源分类
                </span>
                <button className="text-xs text-indigo-400">全部分类</button>
              </div>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCat(selectedCat === cat.name ? null : cat.name)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm transition-all ${
                      selectedCat === cat.name
                        ? "bg-indigo-500/20 text-indigo-300"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-500">{cat.count}</span>
                  </button>
                ))}
              </div>
              <button className="mt-2 w-full text-xs text-slate-500 hover:text-indigo-300 py-1 flex items-center justify-center gap-1">
                展开更多 <ChevronRight size={12} className="rotate-90" />
              </button>
            </div>

            {/* Usage scene */}
            <div className="sidebar-card mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">使用场景</span>
                <ChevronRight size={14} className="text-slate-500 rotate-90" />
              </div>
              <div className="space-y-2">
                {SCENES.map((scene, i) => (
                  <label key={scene} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedScenes.includes(scene)}
                        onChange={() => toggleScene(scene)}
                        className="w-3.5 h-3.5 accent-indigo-500"
                      />
                      <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{scene}</span>
                    </div>
                    <span className="text-xs text-slate-600">{SCENE_COUNTS[i]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price type */}
            <div className="sidebar-card mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">价格类型</span>
                <ChevronRight size={14} className="text-slate-500 rotate-90" />
              </div>
              <div className="space-y-2">
                {[["全部", "2,486"], ["免费", "1,635"], ["付费", "612"], ["订阅制", "239"]].map(([label, count]) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer group">
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        priceType === label ? "border-indigo-400" : "border-slate-600"
                      }`}
                      onClick={() => setPriceType(label)}
                    >
                      {priceType === label && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      )}
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-white transition-colors flex-1">{label}</span>
                    <span className="text-xs text-slate-600">{count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Platform */}
            <div className="sidebar-card mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">平台</span>
                <span className="text-xs text-slate-500">全部平台</span>
              </div>
              <div className="space-y-2">
                {PLATFORMS.map((p, i) => (
                  <label key={p} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPlatforms.includes(p)}
                        onChange={() => togglePlatform(p)}
                        className="w-3.5 h-3.5 accent-indigo-500"
                      />
                      <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{p}</span>
                    </div>
                    <span className="text-xs text-slate-600">{PLATFORM_COUNTS[i]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-white">标签</span>
              </div>
              <input
                placeholder="输入标签关键词"
                className="space-input w-full rounded-lg px-3 py-1.5 text-xs mb-3"
              />
              <div className="flex flex-wrap gap-1.5">
                {["AI", "设计", "开发", "效率", "免费", "开源", "SaaS", "协作", "创作", "自动化"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-xs cursor-pointer transition-all"
                    style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Filter tabs */}
            <div
              className="flex items-center gap-1 flex-wrap mb-4 p-1 rounded-xl"
              style={{ background: "rgba(15,15,40,0.6)" }}
            >
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    activeFilter === tab
                      ? "btn-primary text-white font-medium"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button className="px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-white flex items-center gap-1 ml-auto">
                <SlidersHorizontal size={13} />
                更多筛选
              </button>
            </div>

            {/* Sort + count + view */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1">
                {SORT_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSort(tab)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                      activeSort === tab
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">
                  找到 <span className="text-white font-medium">2,486</span> 个资源
                </span>
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
            </div>

            {/* Resource grid/list */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6" : "flex flex-col gap-3 mb-6"}>
              {marketplaceResources.map((res) => (
                <ResourceCard key={res.id} resource={res} variant={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              <button className="page-btn">‹</button>
              {[1, 2, 3, 4, 5].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`page-btn ${currentPage === p ? "active" : ""}`}
                >
                  {p}
                </button>
              ))}
              <span className="text-slate-500 text-sm px-1">…</span>
              <button className="page-btn">125</button>
              <button className="page-btn">›</button>
              <span className="text-sm text-slate-500 ml-2">跳至</span>
              <input
                type="number"
                defaultValue={1}
                className="space-input w-14 rounded-lg px-2 py-1.5 text-sm text-center"
              />
              <span className="text-sm text-slate-500">页</span>
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
                <button className="text-xs text-indigo-400 hover:text-indigo-300">更多</button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  ["AI", "1,024"], ["设计", "876"], ["开发", "1,288"],
                  ["免费", "1,635"], ["开源", "892"], ["效率", "764"],
                  ["SaaS", "612"], ["协作", "598"], ["创作", "546"],
                  ["模板", "421"], ["自动化", "398"], ["学习", "387"],
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

            {/* Recommended */}
            <div className="sidebar-card">
              <div className="flex items-center gap-1 mb-3">
                <span className="text-purple-400">🎯</span>
                <span className="text-sm font-semibold text-white">猜你喜欢</span>
              </div>
              <div className="space-y-3">
                {RECOMMENDED.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${item.logoBg}`}>
                      {item.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white truncate group-hover:text-indigo-300">{item.name}</div>
                      <div className="text-[10px] text-slate-500">{item.category}</div>
                    </div>
                    <span className="text-xs text-yellow-400">★{item.rating}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Today hot */}
            <div className="sidebar-card">
              <div className="flex items-center gap-1 mb-3">
                <span className="text-orange-400">🔥</span>
                <span className="text-sm font-semibold text-white">今日热门</span>
              </div>
              <div className="space-y-2.5">
                {TODAY_HOT.map((item) => (
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
                    <span className="text-xs text-slate-400 flex-1 group-hover:text-white truncate">{item.name}</span>
                    <span className="text-xs text-orange-400 flex-shrink-0">
                      <Flame size={10} className="inline" />{item.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
