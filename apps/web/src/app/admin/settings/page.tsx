"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { Info, Plus, Minus } from "lucide-react";

const TABS = ["基础设置", "内容审核", "通知消息", "存储与上传", "SEO 配置", "管理员与权限"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [siteName, setSiteName] = useState("资源星球");
  const [domain, setDomain] = useState("https://www.ziyuanxingqiu.com");
  const [email, setEmail] = useState("admin@ziyuanxingqiu.com");
  const [icp, setIcp] = useState("粤ICP备2023101234号-1");
  const [icpInfo, setIcpInfo] = useState("本平台仅供学习与交流使用，所有资源版权归原作者所有，如有侵权请联系我们删除。");
  const [bannerTitle, setBannerTitle] = useState("发现优质资源，探索无限可能");
  const [bannerSub, setBannerSub] = useState("精选资源高效获取、学习工作更轻松");
  const [featuredCount, setFeaturedCount] = useState(12);
  const [topicsCount, setTopicsCount] = useState(8);
  const [pageSize, setPageSize] = useState(20);
  const [showHotTags, setShowHotTags] = useState(true);
  const [autoReview, setAutoReview] = useState(true);
  const [dupCheck, setDupCheck] = useState(true);
  const [sensitiveFilter, setSensitiveFilter] = useState(true);
  const [dupThreshold, setDupThreshold] = useState(85);
  const [storageType, setStorageType] = useState("oss");
  const [allowedTypes, setAllowedTypes] = useState(["image", "doc", "zip", "video"]);

  const toggleFileType = (type: string) => {
    setAllowedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const SIDEBAR_ITEMS = [
    { icon: "⚙️", title: "基础设置", desc: "配置站点基本信息，这些信息会展示在网站页脚与相关页面中。", color: "#6366f1" },
    { icon: "🛡️", title: "内容审核", desc: "设置内容审核规则与敏感词库，保障平台内容安全合规。", color: "#8b5cf6" },
    { icon: "🔔", title: "通知消息", desc: "配置系统通知、邮件与站内消息相关参数与模板。", color: "#f59e0b" },
    { icon: "📦", title: "存储与上传", desc: "配置文件上传限制、存储方式与路径，影响用户上传体验。", color: "#10b981" },
    { icon: "🔍", title: "SEO 配置", desc: "优化站点在搜索引擎中的展现效果，提升收录与流量。", color: "#06b6d4" },
    { icon: "👤", title: "管理员与权限", desc: "管理管理员权限与访问范围，确保平台数据与操作安全。", color: "#ec4899" },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "radial-gradient(ellipse at 20% 50%,rgba(30,20,80,0.4),transparent 60%),#080818" }}>
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <AdminHeader breadcrumb="系统设置" />
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-white">系统设置</h1>
            <p className="text-slate-400 text-sm mt-1">配置平台基础信息、审核规则与权限策略</p>
          </div>

          {/* Tab navigation */}
          <div className="flex gap-1 border-b border-white/10 pb-0">
            {TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 text-sm transition-all relative ${i === activeTab ? "text-white" : "text-slate-400 hover:text-white"}`}>
                {tab}
                {i === activeTab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }} />
                )}
              </button>
            ))}
          </div>

          <div className="flex gap-5">
            {/* Main settings */}
            <div className="flex-1 min-w-0 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                {/* Site info */}
                <div className="sidebar-card space-y-4">
                  <h3 className="text-sm font-semibold text-white">站点信息</h3>
                  <div>
                    <label className="flex items-center gap-1 text-xs text-slate-300 mb-1.5">
                      站点名称 <span className="text-red-400">*</span>
                    </label>
                    <input value={siteName} onChange={e => setSiteName(e.target.value)}
                      className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none" />
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs text-slate-300 mb-1.5">
                      站点域名 <span className="text-red-400">*</span>
                    </label>
                    <input value={domain} onChange={e => setDomain(e.target.value)}
                      className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 mb-1.5 block">站点 Logo</label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                        style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>🪐</div>
                      <div>
                        <button className="px-3 py-1.5 rounded-lg text-xs text-white border border-indigo-500/40 hover:border-indigo-500/60" style={{ background: "rgba(99,102,241,0.2)" }}>
                          更换 Logo
                        </button>
                        <div className="text-[10px] text-slate-500 mt-1">建议尺寸 512×512，PNG 格式，大小不超过 1MB</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs text-slate-300 mb-1.5">
                      管理员邮箱 <span className="text-red-400">*</span>
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 mb-1.5 block">ICP 备案号</label>
                    <input value={icp} onChange={e => setIcp(e.target.value)}
                      className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 mb-1.5 block">ICP 备案/公安备案信息</label>
                    <textarea value={icpInfo} onChange={e => setIcpInfo(e.target.value)} rows={3}
                      className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none resize-none" />
                    <div className="text-right text-[10px] text-slate-500">{icpInfo.length}/200</div>
                  </div>
                </div>

                {/* Homepage config */}
                <div className="sidebar-card space-y-4">
                  <h3 className="text-sm font-semibold text-white">首页配置</h3>
                  <div>
                    <label className="flex items-center gap-1 text-xs text-slate-300 mb-1.5">
                      Banner 标题 <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input value={bannerTitle} onChange={e => setBannerTitle(e.target.value)}
                        className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none pr-16" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">{bannerTitle.length}/30</span>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-1 text-xs text-slate-300 mb-1.5">
                      Banner 副标题 <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input value={bannerSub} onChange={e => setBannerSub(e.target.value)}
                        className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none pr-16" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">{bannerSub.length}/30</span>
                    </div>
                  </div>
                  {[
                    { label: "推荐资源数量", value: featuredCount, set: setFeaturedCount },
                    { label: "专题展示数量", value: topicsCount, set: setTopicsCount },
                  ].map(item => (
                    <div key={item.label}>
                      <label className="flex items-center gap-1 text-xs text-slate-300 mb-1.5">
                        {item.label} <span className="text-red-400">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input value={item.value} onChange={e => item.set(Number(e.target.value))} type="number"
                          className="flex-1 space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none" />
                        <button onClick={() => item.set(v => v - 1)} className="w-8 h-9 rounded-lg flex items-center justify-center text-slate-400 border border-white/10 hover:border-white/20"><Minus size={13} /></button>
                        <button onClick={() => item.set(v => v + 1)} className="w-8 h-9 rounded-lg flex items-center justify-center text-slate-400 border border-white/10 hover:border-white/20"><Plus size={13} /></button>
                      </div>
                    </div>
                  ))}
                  <div>
                    <label className="text-xs text-slate-300 mb-1.5 block">默认排序方式</label>
                    <select className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-slate-300 bg-transparent outline-none">
                      <option className="bg-slate-900">最新发布</option>
                      <option className="bg-slate-900">最多下载</option>
                      <option className="bg-slate-900">最高评分</option>
                    </select>
                    <div className="text-[10px] text-slate-500 mt-1">影响首页、列表页默认排序方式</div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 mb-1.5 block">列表每页数量</label>
                    <div className="flex items-center gap-2">
                      <input value={pageSize} onChange={e => setPageSize(Number(e.target.value))} type="number"
                        className="flex-1 space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none" />
                      <button onClick={() => setPageSize(v => Math.max(1, v - 1))} className="w-8 h-9 rounded-lg flex items-center justify-center text-slate-400 border border-white/10"><Minus size={13} /></button>
                      <button onClick={() => setPageSize(v => v + 1)} className="w-8 h-9 rounded-lg flex items-center justify-center text-slate-400 border border-white/10"><Plus size={13} /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-300">是否显示热门标签</label>
                    <button onClick={() => setShowHotTags(!showHotTags)}
                      className="relative w-10 h-5 rounded-full transition-all flex-shrink-0"
                      style={{ background: showHotTags ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.1)" }}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${showHotTags ? "left-5" : "left-0.5"}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {/* Audit rules */}
                <div className="sidebar-card space-y-3">
                  <h3 className="text-sm font-semibold text-white">投稿审核规则</h3>
                  {[
                    { label: "开启自动审核（低风险内容）", value: autoReview, set: setAutoReview },
                    { label: "重复内容检测", value: dupCheck, set: setDupCheck },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">{item.label}</span>
                      <button onClick={() => item.set(!item.value)}
                        className="relative w-10 h-5 rounded-full transition-all flex-shrink-0"
                        style={{ background: item.value ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.1)" }}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${item.value ? "left-5" : "left-0.5"}`} />
                      </button>
                    </div>
                  ))}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-slate-300">重复内容阈值</span>
                      <span className="text-xs font-bold text-white">{dupThreshold} %</span>
                    </div>
                    <input type="range" min={50} max={100} value={dupThreshold} onChange={e => setDupThreshold(Number(e.target.value))}
                      className="w-full accent-indigo-500 h-1.5 rounded-full"
                      style={{ background: `linear-gradient(to right, #6366f1 ${dupThreshold - 50}%, rgba(255,255,255,0.1) ${dupThreshold - 50}%)` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">敏感词过滤</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSensitiveFilter(!sensitiveFilter)}
                        className="relative w-10 h-5 rounded-full transition-all"
                        style={{ background: sensitiveFilter ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.1)" }}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${sensitiveFilter ? "left-5" : "left-0.5"}`} />
                      </button>
                      <button className="text-xs text-indigo-400 hover:text-indigo-300">管理敏感词</button>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 mb-1.5">默认审核时效（SLA）</div>
                    <select className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-slate-300 bg-transparent outline-none">
                      <option className="bg-slate-900">24 小时内</option>
                      <option className="bg-slate-900">48 小时内</option>
                      <option className="bg-slate-900">72 小时内</option>
                    </select>
                  </div>
                  <div className="p-2.5 rounded-xl text-[10px] text-slate-400 leading-relaxed" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                    <Info size={10} className="inline mr-1 text-indigo-400" />
                    自动审核通过的内容仍会进行抽检，违规内容将被撤回并处理。
                  </div>
                </div>

                {/* Upload settings */}
                <div className="sidebar-card space-y-3">
                  <h3 className="text-sm font-semibold text-white">上传设置</h3>
                  <div>
                    <div className="text-xs text-slate-300 mb-1.5">单张图片最大尺寸</div>
                    <select className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-slate-300 bg-transparent outline-none">
                      <option className="bg-slate-900">10 MB</option>
                      <option className="bg-slate-900">5 MB</option>
                      <option className="bg-slate-900">20 MB</option>
                    </select>
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 mb-1.5">单个文件最大大小</div>
                    <select className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-slate-300 bg-transparent outline-none">
                      <option className="bg-slate-900">100 MB</option>
                      <option className="bg-slate-900">50 MB</option>
                      <option className="bg-slate-900">200 MB</option>
                    </select>
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 mb-1.5">允许的文件类型</div>
                    <div className="space-y-1.5">
                      {[
                        { key: "image", label: "图片 (jpg, png, gif, webp)" },
                        { key: "doc", label: "文档 (pdf, doc, docx, txt)" },
                        { key: "zip", label: "压缩包 (zip, rar, 7z)" },
                        { key: "video", label: "视频 (mp4, mov, webm)" },
                        { key: "audio", label: "音频 (mp3, wav, m4a)" },
                      ].map(ft => (
                        <label key={ft.key} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={allowedTypes.includes(ft.key)} onChange={() => toggleFileType(ft.key)}
                            className="w-3.5 h-3.5 accent-indigo-500" />
                          <span className="text-xs text-slate-300">{ft.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 mb-1.5">存储方式</div>
                    <div className="space-y-1.5">
                      {[{ key: "local", label: "本地存储" }, { key: "oss", label: "对象存储（OSS/S3）" }].map(opt => (
                        <label key={opt.key} className="flex items-center gap-2 cursor-pointer">
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${storageType === opt.key ? "border-indigo-500" : "border-slate-600"}`}>
                            {storageType === opt.key && <div className="w-2 h-2 rounded-full bg-indigo-500" />}
                          </div>
                          <span className="text-xs text-slate-300" onClick={() => setStorageType(opt.key)}>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-300 mb-1.5">存储路径前缀</div>
                    <input defaultValue="uploads/" className="w-full space-input rounded-xl px-3 py-2.5 text-sm text-white bg-transparent outline-none" />
                    <div className="text-[10px] text-slate-500 mt-1">用于本地存储或对象存储的路径前缀</div>
                  </div>
                </div>

                {/* Admin permissions summary */}
                <div className="sidebar-card space-y-3">
                  <h3 className="text-sm font-semibold text-white">管理员与权限</h3>
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="text-slate-500 border-b border-white/5">
                        {["角色", "成数", "资源管理", "投稿审核", "用户管理", "系统设置", "数据分析"].map(h => (
                          <th key={h} className="pb-1.5 text-left font-medium pr-1">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { role: "超级管理员", n: 1, perms: [true, true, true, true, true] },
                        { role: "内容运营", n: 3, perms: [true, true, false, false, true] },
                        { role: "审核员", n: 6, perms: [false, true, false, false, false] },
                      ].map(r => (
                        <tr key={r.role} className="border-b border-white/5">
                          <td className="py-1.5 pr-1 text-slate-300 whitespace-nowrap">{r.role}</td>
                          <td className="py-1.5 pr-1 text-slate-400 text-center">{r.n}</td>
                          {r.perms.map((p, i) => (
                            <td key={i} className="py-1.5 text-center">
                              {p ? (
                                <span className="text-green-400">●</span>
                              ) : (
                                <span className="text-slate-700">—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="w-full py-2 rounded-xl text-xs text-indigo-400 border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
                    管理角色与权限
                  </button>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="w-52 flex-shrink-0">
              <div className="sidebar-card">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-sm font-semibold text-white">配置说明</span>
                  <Info size={12} className="text-slate-500" />
                </div>
                <div className="space-y-2">
                  {SIDEBAR_ITEMS.map((item, i) => (
                    <div key={item.title} onClick={() => setActiveTab(i)}
                      className={`flex gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all ${i === activeTab ? "border border-indigo-500/30" : "hover:bg-white/3"}`}
                      style={i === activeTab ? { background: "rgba(99,102,241,0.1)" } : {}}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0" style={{ background: item.color + "22" }}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-medium text-white">{item.title}</div>
                        <div className="text-[9px] text-slate-500 leading-relaxed mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action bar */}
          <div className="flex items-center gap-3 pt-2">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm text-white font-medium" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              💾 保存设置
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40">
              ↺ 重置
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
