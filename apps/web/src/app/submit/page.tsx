"use client";

import { useState } from "react";
import { ChevronRight, Upload, Send, ChevronDown } from "lucide-react";
import Link from "next/link";

const CATEGORIES = ["AI工具", "设计素材", "开发工具", "学习网站", "效率办公", "视频素材", "运营增长", "副业项目"];

const GUIDELINES = [
  { icon: "🚀", color: "text-purple-400", title: "原创优先", desc: "优先收录原创或独家整理的高质量资源。" },
  { icon: "⚠️", color: "text-yellow-400", title: "禁止低质重复内容", desc: "禁止提交低质、重复、无价值或已失效资源。" },
  { icon: "🔗", color: "text-blue-400", title: "资源需可正常访问", desc: "提交的链接需可稳定访问，无跳转、无广告导向。" },
  { icon: "✅", color: "text-green-400", title: "内容合规合法", desc: "禁止提交违法、侵权、涉嫌欺诈及违规内容。" },
  { icon: "⏱️", color: "text-cyan-400", title: "审核时效 1-3 个工作日", desc: "我们会尽快审核并通过站内信或邮件通知结果。" },
  { icon: "⭐", color: "text-amber-400", title: "优质投稿将获得推荐", desc: "优质资源有机会获得首页推荐与流量曝光！" },
];

const FAQS = [
  "什么样的资源更容易被审核通过？",
  "审核不通过会通知原因吗？",
  "我可以修改已提交的内容吗？",
  "确保后可以删除吗？",
];

const FLOW_STEPS = [
  { icon: "📤", label: "提交资源", desc: "填写信息并提交审核" },
  { icon: "🔍", label: "审核评估", desc: "1-3 个工作日内完成审核" },
  { icon: "✅", label: "审核通过", desc: "资源上架并发布展示" },
  { icon: "🚀", label: "持续推荐", desc: "优质资源获得更多曝光" },
];

export default function SubmitPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");

  const addTag = () => {
    const t = tagInput.trim();
    if (t && tags.length < 6 && !tags.includes(t)) {
      setTags([...tags, t]);
    }
    setTagInput("");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-6">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <Link href="/" className="hover:text-slate-300">首页</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">投稿</span>
        </nav>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3">投稿中心</h1>
            <p className="text-slate-400 text-sm max-w-2xl">
              分享优质资源，让更多人发现价值。欢迎创作者和用户投稿各类工具、网站、模板、教程与精选资源。
            </p>
          </div>
          <div className="hidden lg:flex items-center justify-center w-36 h-36">
            <div
              className="relative w-28 h-28 rounded-full flex items-center justify-center text-4xl"
              style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#3730a3)", boxShadow: "0 0 40px rgba(99,102,241,0.4)" }}
            >
              📤
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center text-lg">⭐</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: "📤", value: "2,486", sub: "本月新增投稿", badge: "较上月 ↑18.6%", color: "text-blue-400" },
            { icon: "⏱️", value: "1.6 天", sub: "平均审核时长", badge: "1-3 个工作日", color: "text-purple-400" },
            { icon: "📦", value: "12,000+", sub: "已收录资源数量", badge: "优质资源持续增长", color: "text-green-400" },
          ].map((stat, i) => (
            <div key={i} className="resource-card rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(99,102,241,0.15)" }}>
                {stat.icon}
              </div>
              <div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-white text-xs font-medium">{stat.sub}</div>
                <div className="text-slate-500 text-xs">{stat.badge}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form + sidebar */}
      <div className="max-w-[1400px] mx-auto px-6 pb-10">
        <div className="flex gap-6">
          {/* Form */}
          <div className="flex-1 min-w-0">
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-white text-lg">提交资源</h2>
                <span className="text-xs text-slate-500">* 为必填项，请认真填写以提高审核通过率</span>
              </div>

              <div className="space-y-4">
                {/* Resource name */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">
                    资源名称 <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value.slice(0, 50))}
                      placeholder="请输入资源的名称（建议 5-50 个字符）"
                      className="space-input w-full rounded-xl px-4 py-3 text-sm pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">{name.length}/50</span>
                  </div>
                </div>

                {/* URL */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">
                    资源链接 <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="请输入资源的官网或直链地址（需可正常访问）"
                    className="space-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                  <div className="text-xs text-slate-500 mt-1 pl-1">https://</div>
                </div>

                {/* Category + Tags */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">
                      分类选择 <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="space-input w-full rounded-xl px-4 py-3 text-sm appearance-none cursor-pointer"
                      >
                        <option value="">请选择资源分类</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">
                      资源标签 <span className="text-red-400">*</span>
                    </label>
                    <div className="space-input w-full rounded-xl px-3 py-2 min-h-[46px] flex flex-wrap gap-1 items-center">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                          style={{ background: "rgba(99,102,241,0.3)", color: "#a5b4fc" }}
                        >
                          {tag}
                          <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="text-slate-400 hover:text-white">×</button>
                        </span>
                      ))}
                      {tags.length < 6 && (
                        <input
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addTag()}
                          placeholder={tags.length === 0 ? "选择或输入标签，按回车添加（最多 6 个）" : ""}
                          className="flex-1 min-w-0 bg-transparent text-xs text-white placeholder-slate-500 outline-none"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">
                    资源简介 <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value.slice(0, 500))}
                      placeholder="请详细介绍该资源的功能、特点、适用场景、使用方式等（建议 20-500 字）"
                      rows={4}
                      className="space-input w-full rounded-xl px-4 py-3 text-sm resize-none"
                    />
                    <span className="absolute right-3 bottom-3 text-xs text-slate-500">{desc.length}/500</span>
                  </div>
                </div>

                {/* Cover + reason */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">
                      封面上传 <span className="text-red-400">*</span>
                    </label>
                    <div
                      className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 py-8 cursor-pointer hover:border-indigo-400/60 transition-colors"
                      style={{ borderColor: "rgba(99,102,241,0.3)", background: "rgba(99,102,241,0.05)" }}
                    >
                      <Upload size={24} className="text-indigo-400" />
                      <div className="text-center">
                        <div className="text-sm text-slate-300">点击或拖拽上传封面图</div>
                        <div className="text-xs text-slate-500 mt-1">建议尺寸 1200×630，支持 JPG/PNG，≤2MB</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-1.5">推荐理由</label>
                    <div className="relative">
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value.slice(0, 200))}
                        placeholder="为什么推荐这个资源？它能为用户解决什么问题？"
                        rows={5}
                        className="space-input w-full rounded-xl px-4 py-3 text-sm resize-none"
                      />
                      <span className="absolute right-3 bottom-3 text-xs text-slate-500">{reason.length}/200</span>
                    </div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5">
                    联系方式 <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="请输入邮箱或其他联系方式（仅用于审核联系，不公开展示）"
                    className="space-input w-full rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-500">
                    提交即表示您同意{" "}
                    <a href="#" className="text-indigo-400 hover:underline">《投稿协议》</a>
                    {" "}与{" "}
                    <a href="#" className="text-indigo-400 hover:underline">《隐私政策》</a>
                  </p>
                  <button className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium">
                    <Send size={16} />
                    提交审核
                  </button>
                </div>
              </div>
            </div>

            {/* Submission flow */}
            <div
              className="rounded-2xl p-6 mt-6"
              style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <h3 className="font-bold text-white mb-5">投稿流程</h3>
              <div className="flex items-center gap-0">
                {FLOW_STEPS.map((step, i) => (
                  <div key={i} className="flex items-center flex-1">
                    <div className="flex flex-col items-center gap-2 flex-1 text-center">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                        style={{
                          background: i === 0 ? "rgba(99,102,241,0.3)" : i === 2 ? "rgba(34,197,94,0.2)" : i === 3 ? "rgba(59,130,246,0.2)" : "rgba(99,102,241,0.15)",
                          border: `2px solid ${i === 0 ? "rgba(99,102,241,0.5)" : i === 2 ? "rgba(34,197,94,0.4)" : i === 3 ? "rgba(59,130,246,0.4)" : "rgba(99,102,241,0.2)"}`,
                        }}
                      >
                        {step.icon}
                      </div>
                      <div
                        className={`text-sm font-medium ${i === 0 ? "text-indigo-400" : i === 2 ? "text-green-400" : i === 3 ? "text-blue-400" : "text-white"}`}
                      >
                        {step.label}
                      </div>
                      <div className="text-xs text-slate-500">{step.desc}</div>
                    </div>
                    {i < FLOW_STEPS.length - 1 && (
                      <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-500/50 to-indigo-500/20 flex-shrink-0 mx-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div
              className="rounded-2xl p-6 mt-6"
              style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white">常见问题</h3>
                <button className="text-sm text-indigo-400 hover:text-indigo-300">查看全部</button>
              </div>
              <div className="space-y-2">
                {FAQS.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden"
                    style={{ border: "1px solid rgba(99,102,241,0.15)" }}
                  >
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-slate-300 hover:text-white transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ background: "rgba(15,15,40,0.6)" }}
                    >
                      <span>{faq}</span>
                      <ChevronDown size={14} className={`transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-4 py-3 text-sm text-slate-400" style={{ background: "rgba(8,8,24,0.4)" }}>
                        请参考我们的详细审核标准页面，或联系客服获取更多信息。我们会尽快为您解答。
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="hidden xl:block w-72 flex-shrink-0 space-y-4">
            {/* Guidelines */}
            <div className="sidebar-card">
              <h3 className="font-bold text-white mb-4">投稿指南</h3>
              <div className="space-y-3">
                {GUIDELINES.map((g, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: "rgba(99,102,241,0.15)" }}
                    >
                      {g.icon}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${g.color}`}>{g.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{g.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-purple-400">✨</span>
                <span className="font-semibold text-white text-sm">质量小贴士</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                {[
                  "提供清晰的资源介绍与使用场景",
                  "封面清晰美观，能准确反映资源内容",
                  "选择合适的分类与标签，便于用户发现",
                  "确保链接长期有效，避免短期或临时链接",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                    <span>{tip}</span>
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
