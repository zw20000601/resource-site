"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Bookmark, Share2, ChevronRight, ExternalLink, Flame, Check } from "lucide-react";

const RESOURCE = {
  name: "Notion",
  badge: "官方",
  rating: 9.6,
  reviews: 2800,
  tags: ["AI效率", "笔记文档", "项目管理", "团队协作"],
  description: "一体化的知识管理与协作平台，帮助团队和个人高效组织信息与项目",
  logo: "N",
  logoBg: "bg-gray-800",
  website: "notion.so",
  developer: "Notion Labs, Inc.",
  founded: "2016年",
  version: "2.45.0 (2024-05-20)",
  language: "中文、英文 等 20+ 语言",
  collections: 2100,
  likes: 5600,
  views: 120000,
};

const TABS = ["资源详情", "用户评价 2.8k", "使用教程 36", "替代方案", "常见问题"];

const HIGHLIGHTS = [
  "高度灵活的页面数据库，像乐高一样自由组建",
  "强大的模板生态，快速搭建各类工作流",
  "实时协作与权限管理，团队效率倍增",
  "跨平台同步，高访问与版本历史",
  "丰富的集成与 API，连接你常用的工具",
];

const AUDIENCES = [
  { icon: "🎓", name: "学生与研究者", desc: "整理笔记、文献与知识体系" },
  { icon: "👥", name: "团队与项目经理", desc: "项目规划、任务管理与进度跟踪" },
  { icon: "🎨", name: "产品与设计师", desc: "需求管理、设计文档与知识沉淀" },
  { icon: "💼", name: "自由职业者", desc: "个人知识库与内容创作管理" },
];

const PRICING = [
  { name: "免费版", price: "$0", desc: "个人使用，基础功能" },
  { name: "Plus", price: "$8/用户/月", desc: "无限块、文件上传等增强功能" },
  { name: "Business", price: "$15/用户/月", desc: "团队协作、高级权限与审计" },
  { name: "Enterprise", price: "定制价格", desc: "安全合规、专属支持与 SLA" },
];

const FEATURES = [
  { icon: "🧩", title: "模块化页面", desc: "通过模块化自由组合，构建专属工作空间..." },
  { icon: "🗄️", title: "强大数据库", desc: "表格、看板、日历、时间轴等多视图数据管理" },
  { icon: "🤝", title: "实时协作", desc: "多人同时编辑、评论与@提醒，沟通更高效..." },
  { icon: "📋", title: "模板生态", desc: "数千个优质模板，覆盖学习、工作与生活场景..." },
  { icon: "📱", title: "跨平台同步", desc: "支持 Web、桌面、移动端，无缝同步..." },
  { icon: "🔌", title: "集成与扩展", desc: "支持 Slack、GitHub 等集成，提供 API..." },
];

const RELATED = [
  { name: "ChatGPT", category: "AI对话", rating: 9.8, logo: "🤖", logoBg: "bg-green-600" },
  { name: "Obsidian", category: "知识管理", rating: 9.4, logo: "💎", logoBg: "bg-purple-700" },
  { name: "飞书", category: "团队协作", rating: 9.3, logo: "📋", logoBg: "bg-blue-600" },
  { name: "Microsoft Loop", category: "协作平台", rating: 9.2, logo: "🔄", logoBg: "bg-indigo-600" },
];

const SIMILAR = [
  { rank: 1, name: "Coda", sub: "文档与表格作", score: 9.5, logo: "📄", logoBg: "bg-red-600" },
  { rank: 2, name: "ClickUp", sub: "项目管理", score: 9.3, logo: "✅", logoBg: "bg-purple-600" },
  { rank: 3, name: "Anytype", sub: "本地优先的笔记应用", score: 9.2, logo: "A", logoBg: "bg-gray-700" },
  { rank: 4, name: "Mem AI", sub: "笔记与知识管理", score: 9.1, logo: "M", logoBg: "bg-blue-700" },
  { rank: 5, name: "Tana", sub: "知识管理", score: 9.0, logo: "T", logoBg: "bg-green-700" },
];

const UPDATES = [
  { version: "2.45.0", date: "2024-05-20", isNew: true, changes: ["数据库新增「时间视图」，筛选与分组", "页面加载性能优化", "修复若干问题与体验改进"] },
  { version: "2.44.0", date: "2024-04-18", isNew: false, changes: ["新增按钮属性与自动化触发器", "改进移动端编辑器体验"] },
  { version: "2.43.0", date: "2024-03-21", isNew: false, changes: ["新增图表（Chart）块", "更多集成与模板更新"] },
];

export default function ResourceDetailPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [previewIdx, setPreviewIdx] = useState(0);
  const previews = ["Acme 团队空间", "项目排期", "产品需求文档（PRD）"];

  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 pt-6 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
          <Link href="/" className="hover:text-slate-300">首页</Link>
          <ChevronRight size={11} />
          <span className="text-indigo-400">AI工具</span>
          <ChevronRight size={11} />
          <span className="text-indigo-400">ChatAI平台</span>
          <ChevronRight size={11} />
          <span className="text-slate-300">Notion</span>
        </nav>

        <div className="flex gap-6">
          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Resource header card */}
            <div className="resource-card rounded-2xl p-6 mb-5">
              <div className="flex items-start gap-5">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-bold text-white flex-shrink-0 ${RESOURCE.logoBg}`}>
                  {RESOURCE.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h1 className="text-2xl font-bold text-white">{RESOURCE.name}</h1>
                    <span className="px-2 py-0.5 rounded text-xs font-medium text-white" style={{ background: "rgba(99,102,241,0.7)" }}>{RESOURCE.badge}</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{RESOURCE.description}</p>
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <span className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-bold text-yellow-400">{RESOURCE.rating}</span>
                      <span className="text-slate-500 text-xs">（{(RESOURCE.reviews / 1000).toFixed(1)}k 评价）</span>
                    </span>
                    {RESOURCE.tags.map((tag, i) => {
                      const colors = ["bg-indigo-500/20 text-indigo-300", "bg-blue-500/20 text-blue-300", "bg-purple-500/20 text-purple-300", "bg-green-500/20 text-green-300"];
                      return (
                        <span key={tag} className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[i % colors.length]}`}>{tag}</span>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span>🌐 官方网站 <a href="#" className="text-indigo-400">{RESOURCE.website}</a></span>
                    <span>🏢 开发商 {RESOURCE.developer}</span>
                    <span>📅 成立时间 {RESOURCE.founded}</span>
                    <span>📦 当前版本 {RESOURCE.version}</span>
                    <span>🌍 语言支持 {RESOURCE.language}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 15px rgba(99,102,241,0.3)" }}>
                    <ExternalLink size={15} />
                    访问官网
                  </button>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 flex-1 justify-center py-2 rounded-xl text-sm text-slate-300 border border-indigo-500/30 hover:border-indigo-500/60 transition-all">
                      <Bookmark size={14} className="text-yellow-400" />
                      立即收藏 2.1k
                    </button>
                    <button className="flex items-center gap-1.5 flex-1 justify-center py-2 rounded-xl text-sm text-slate-300 border border-indigo-500/30 hover:border-indigo-500/60 transition-all">
                      <Share2 size={14} />
                      分享
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-5 border-b border-indigo-500/15 pb-0">
              {TABS.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2.5 text-sm transition-all border-b-2 -mb-px ${
                    activeTab === i ? "text-indigo-400 border-indigo-400 font-medium" : "text-slate-400 border-transparent hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 0 && (
              <div className="space-y-5">
                {/* 3-column info */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Intro */}
                  <div className="resource-card rounded-xl p-4">
                    <h3 className="font-semibold text-white text-sm mb-2">资源介绍</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Notion 是一款集笔记、文档、任务管理、数据库和协作于一体的全能生产力工具，通过灵活的模块化页面和强大的数据库能力，帮助个人和团队构建自己的知识库、项目管理系统和工作流，支持实时协作，多端同步与丰富的第三方集成，适用于学习、工作与生活的各类场景。
                    </p>
                    <button className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1">
                      访问官网了解更多 →
                    </button>
                  </div>
                  {/* Highlights */}
                  <div className="resource-card rounded-xl p-4">
                    <h3 className="font-semibold text-white text-sm mb-2">核心亮点</h3>
                    <ul className="space-y-2">
                      {HIGHLIGHTS.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                          <Check size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Audience + Pricing stacked */}
                  <div className="space-y-4">
                    <div className="resource-card rounded-xl p-4">
                      <h3 className="font-semibold text-white text-sm mb-2">适用人群</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {AUDIENCES.map((a) => (
                          <div key={a.name} className="flex items-start gap-2">
                            <span className="text-base">{a.icon}</span>
                            <div>
                              <div className="text-xs font-medium text-white">{a.name}</div>
                              <div className="text-[10px] text-slate-500">{a.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="resource-card rounded-xl p-4">
                      <h3 className="font-semibold text-white text-sm mb-2">价格信息</h3>
                      <div className="space-y-1.5">
                        {PRICING.map((p, i) => (
                          <div key={p.name} className="flex items-center justify-between text-xs">
                            <div>
                              <span className={`font-medium ${i === 0 ? "text-green-400" : "text-white"}`}>{p.name}</span>
                              <span className="text-slate-500 ml-1">{p.desc}</span>
                            </div>
                            <span className="text-indigo-300 font-medium">{p.price}</span>
                          </div>
                        ))}
                      </div>
                      <button className="mt-2 text-indigo-400 text-xs hover:text-indigo-300">查看完整定价 →</button>
                    </div>
                  </div>
                </div>

                {/* Screenshots */}
                <div className="resource-card rounded-xl p-4">
                  <h3 className="font-semibold text-white text-sm mb-3">界面预览</h3>
                  <div className="grid grid-cols-3 gap-3 mb-2">
                    {previews.map((p, i) => (
                      <div
                        key={i}
                        onClick={() => setPreviewIdx(i)}
                        className={`h-36 rounded-xl flex items-center justify-center cursor-pointer transition-all ${previewIdx === i ? "border-2 border-indigo-400" : "border border-indigo-500/20"}`}
                        style={{ background: "rgba(30,30,60,0.8)" }}
                      >
                        <span className="text-slate-400 text-xs">{p}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-1.5">
                    {previews.map((_, i) => (
                      <button key={i} onClick={() => setPreviewIdx(i)} className={`w-2 h-2 rounded-full transition-all ${previewIdx === i ? "bg-indigo-400" : "bg-slate-600"}`} />
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="resource-card rounded-xl p-4">
                  <h3 className="font-semibold text-white text-sm mb-3">功能特性</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {FEATURES.map((f) => (
                      <div key={f.title} className="flex gap-3 p-3 rounded-xl" style={{ background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.1)" }}>
                        <span className="text-2xl flex-shrink-0">{f.icon}</span>
                        <div>
                          <div className="text-sm font-medium text-white mb-0.5">{f.title}</div>
                          <div className="text-xs text-slate-400 leading-relaxed">{f.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related resources */}
                <div>
                  <h3 className="font-semibold text-white text-sm mb-3">相关推荐</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {RELATED.map((r) => (
                      <div key={r.name} className="resource-card rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${r.logoBg}`}>{r.logo}</div>
                        <div>
                          <div className="text-sm font-medium text-white">{r.name}</div>
                          <div className="text-xs text-slate-500">{r.category}</div>
                          <div className="text-xs text-yellow-400">★ {r.rating}</div>
                        </div>
                      </div>
                    ))}
                    <button className="resource-card rounded-xl p-3 flex items-center justify-center text-sm text-indigo-400 hover:text-indigo-300">
                      查看更多 →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 0 && (
              <div className="resource-card rounded-xl p-8 flex items-center justify-center text-slate-400 text-sm">
                该内容正在完善中，敬请期待…
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <aside className="hidden xl:block w-64 flex-shrink-0 space-y-4">
            {/* Resource info */}
            <div className="sidebar-card">
              <h3 className="font-semibold text-white text-sm mb-3">资源信息</h3>
              <div className="space-y-2 text-xs">
                {[
                  ["资源类型", "AI工具 / 知识管理"],
                  ["运行平台", "Web, Windows, macOS, iOS, Android"],
                  ["语言支持", "中文、English、日本語 等 20+ 语言"],
                  ["最近更新", "2024-05-20"],
                  ["资源大小", "—"],
                  ["官网地址", "notion.so"],
                  ["社交媒体", "Twitter / LinkedIn / YouTube"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-start justify-between gap-2">
                    <span className="text-slate-500 flex-shrink-0">{label}</span>
                    <span className={`text-right ${label === "官网地址" ? "text-indigo-400" : "text-slate-300"}`}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="sidebar-card">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-yellow-400 font-bold">{(RESOURCE.collections / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-slate-500">收藏数</div>
                </div>
                <div>
                  <div className="text-orange-400 font-bold flex items-center justify-center gap-0.5"><Flame size={12} />{(RESOURCE.likes / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-slate-500">点赞数</div>
                </div>
                <div>
                  <div className="text-blue-400 font-bold">120k+</div>
                  <div className="text-xs text-slate-500">浏览量</div>
                </div>
              </div>
            </div>

            {/* Update log */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white text-sm">更新记录</h3>
                <button className="text-xs text-indigo-400">查看全部 &gt;</button>
              </div>
              <div className="space-y-3">
                {UPDATES.map((u) => (
                  <div key={u.version}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{u.version}</span>
                      <span className="text-xs text-slate-500">{u.date}</span>
                      {u.isNew && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ background: "rgba(99,102,241,0.3)", color: "#a5b4fc" }}>最新</span>}
                    </div>
                    <ul className="space-y-0.5">
                      {u.changes.map((c, i) => (
                        <li key={i} className="text-xs text-slate-400 flex items-start gap-1">
                          <span className="text-indigo-400 mt-0.5">•</span>{c}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar */}
            <div className="sidebar-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-white text-sm">同类推荐</h3>
              </div>
              <div className="space-y-2.5">
                {SIMILAR.map((s) => (
                  <div key={s.name} className="flex items-center gap-2 cursor-pointer group">
                    <span className="w-4 text-xs text-slate-500 flex-shrink-0">{s.rank}</span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${s.logoBg}`}>{s.logo}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-white group-hover:text-indigo-300 truncate">{s.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{s.sub}</div>
                    </div>
                    <span className="text-xs text-orange-400 flex-shrink-0 flex items-center gap-0.5">
                      <Flame size={10} />{s.score}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full text-xs text-indigo-400 hover:text-indigo-300 py-1 border-t border-indigo-500/15 pt-2">
                查看全部同类资源 →
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
