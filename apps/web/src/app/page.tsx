import { Search, Star, Bookmark, Flame, RefreshCw, ChevronRight, Zap, Bot, Pencil, Code2, TrendingUp, Briefcase } from "lucide-react";
import Link from "next/link";
import PlanetDecoration from "@/components/ui/PlanetDecoration";
import { featuredResources, hotRankings, categories, featuredTopics } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

const HOT_SEARCHES = ["ChatGPT", "Midjourney", "PPT模板", "小红书运营", "数据分析", "Notion模板", "Python教程", "高清壁纸"];

const QUICK_CATS = [
  { label: "AI工具", icon: <Bot size={16} />, color: "text-purple-400" },
  { label: "设计灵感", icon: <Pencil size={16} />, color: "text-pink-400" },
  { label: "前端资源", icon: <Code2 size={16} />, color: "text-blue-400" },
  { label: "运营增长", icon: <TrendingUp size={16} />, color: "text-green-400" },
  { label: "副业项目", icon: <Briefcase size={16} />, color: "text-amber-400" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ─── Hero Section ─── */}
      <section className="relative max-w-[1400px] mx-auto px-6 pt-12 pb-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Left content */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium text-indigo-300 border"
                style={{ background: "rgba(99,102,241,0.1)", borderColor: "rgba(99,102,241,0.3)" }}
              >
                发现 · 整合 · 提效
              </span>
            </div>
            {/* Headline */}
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              全网优质资源，
              <br />
              一站式发现与整合
            </h1>
            <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg">
              汇聚全网优质资源与实用工具，覆盖学习、工作、生活各个场景，
              <br className="hidden sm:block" />
              让信息触手可及，助你高效成长与创造。
            </p>

            {/* Search bar */}
            <div
              className="flex gap-2 p-1.5 rounded-2xl mb-4"
              style={{
                background: "rgba(15,15,40,0.9)",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 4px 30px rgba(99,102,241,0.1)",
              }}
            >
              <div className="flex items-center gap-2 flex-1 px-3">
                <Search size={16} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="搜索资源、工具、网站或关键词..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                />
              </div>
              <select
                className="px-3 py-2 rounded-xl text-sm text-slate-300 outline-none cursor-pointer"
                style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.2)" }}
              >
                <option>全部</option>
                <option>AI工具</option>
                <option>设计素材</option>
                <option>开发工具</option>
              </select>
              <button className="btn-primary px-5 py-2 rounded-xl text-white text-sm font-medium">
                搜索
              </button>
            </div>

            {/* Hot searches */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-500 text-xs">热门搜索：</span>
              {HOT_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs text-slate-400 hover:text-indigo-300 transition-colors"
                  style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Quick categories */}
            <div className="flex flex-wrap gap-3 mt-6">
              {QUICK_CATS.map((cat) => (
                <Link
                  key={cat.label}
                  href="/marketplace"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
                  style={{
                    background: "rgba(15,15,40,0.8)",
                    border: "1px solid rgba(99,102,241,0.2)",
                  }}
                >
                  <span className={cat.color}>{cat.icon}</span>
                  <span className="text-slate-300">{cat.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right planet */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0">
            <PlanetDecoration size="lg" />
          </div>
        </div>
      </section>

      {/* ─── Stats Row ─── */}
      <section className="max-w-[1400px] mx-auto px-6 mb-10">
        <div
          className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style={{ background: "rgba(99,102,241,0.15)" }}
        >
          {[
            { icon: "📦", value: "12,000+", label: "优质资源", sub: "持续收录全网优质资源", color: "text-purple-400" },
            { icon: "📚", value: "580+", label: "专题合集", sub: "精心整理专题推荐", color: "text-indigo-400" },
            { icon: <Zap size={20} className="text-yellow-400" />, value: "每日更新", label: "紧跟热点", sub: "持续更新最新资源", color: "text-yellow-400" },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-5"
              style={{ background: "rgba(8,8,24,0.9)" }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "rgba(99,102,241,0.15)" }}
              >
                {typeof stat.icon === "string" ? stat.icon : stat.icon}
              </div>
              <div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-white text-sm font-medium">{stat.label}</div>
                <div className="text-slate-500 text-xs">{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Main content + sidebar ─── */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex gap-6">
          {/* Left main content */}
          <div className="flex-1 min-w-0">
            {/* Featured Resources */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="section-title pl-4 text-xl font-bold text-white">精选资源</h2>
                <Link href="/marketplace" className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300">
                  查看全部 <ChevronRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {featuredResources.map((res) => (
                  <div
                    key={res.id}
                    className="resource-card rounded-2xl overflow-hidden flex flex-col"
                  >
                    {/* Card header */}
                    <div
                      className={`relative h-24 bg-gradient-to-br ${res.bgColor} flex items-center justify-center`}
                    >
                      {res.badge && (
                        <span
                          className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium text-white"
                          style={{ background: "linear-gradient(135deg,#f59e0b,#ef4444)" }}
                        >
                          {res.badge}
                        </span>
                      )}
                      <span className="text-white font-bold text-lg">{res.logoText}</span>
                    </div>
                    {/* Card body */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-white text-sm mb-1">{res.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-3 flex-1">{res.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {res.tags.map((tag, i) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{
                              background: i === 0 ? "rgba(99,102,241,0.2)" : "rgba(139,92,246,0.2)",
                              color: i === 0 ? "#a5b4fc" : "#c4b5fd",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Star size={11} className="text-yellow-400 fill-yellow-400" />
                          {res.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bookmark size={11} />
                          {formatNumber(res.collections)}
                        </span>
                      </div>
                      <button className="btn-primary w-full py-2 rounded-xl text-white text-xs font-medium">
                        查看详情
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Category Section */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="section-title pl-4 text-xl font-bold text-white">资源分类</h2>
                <Link href="/marketplace" className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300">
                  浏览全部分类 <ChevronRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href="/marketplace"
                    className="resource-card rounded-xl p-3 flex flex-col items-center gap-2 text-center hover:scale-105 transition-transform"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ background: "rgba(99,102,241,0.1)" }}
                    >
                      {cat.icon}
                    </div>
                    <div className="text-xs font-medium text-white">{cat.name}</div>
                    <div className="text-xs text-slate-500">{cat.count}+</div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Featured Topics */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="section-title pl-4 text-xl font-bold text-white">
                  <span className="text-yellow-400 mr-1">★</span> 专题推荐
                </h2>
                <button className="text-slate-400 hover:text-white">
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    href="/collections"
                    className="resource-card rounded-2xl overflow-hidden group hover:scale-105 transition-transform"
                  >
                    <div className={`h-28 bg-gradient-to-br ${topic.color} relative flex flex-col justify-end p-4`}>
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.3),transparent)]" />
                      <div className="text-3xl mb-1">{topic.icon}</div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-white text-sm mb-1">{topic.title}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-2">{topic.description}</p>
                      <span className="text-xs text-slate-500">{topic.count} 个资源</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar — Hot Rankings */}
          <aside className="hidden xl:block w-72 flex-shrink-0">
            <div className="sidebar-card sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Flame size={16} className="text-orange-400" />
                  <span className="font-semibold text-white text-sm">热门排行榜</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-300 transition-colors">
                  <RefreshCw size={12} />
                  换一换
                </button>
              </div>
              <div className="space-y-3">
                {hotRankings.map((item) => (
                  <div key={item.rank} className="flex items-center gap-3 group cursor-pointer">
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{
                        background:
                          item.rank <= 3
                            ? `linear-gradient(135deg,${["#f59e0b,#ef4444", "#9ca3af,#6b7280", "#cd7c2f,#a0522d"][item.rank - 1]})`
                            : "rgba(99,102,241,0.15)",
                        color: item.rank <= 3 ? "white" : "#94a3b8",
                      }}
                    >
                      {item.rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white font-medium truncate group-hover:text-indigo-300 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500">{item.category}</div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-orange-400 flex-shrink-0">
                      <Flame size={11} />
                      {item.score}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/rankings"
                className="mt-4 flex items-center justify-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 pt-3 border-t border-indigo-500/15"
              >
                查看完整排行榜 <ChevronRight size={14} />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
