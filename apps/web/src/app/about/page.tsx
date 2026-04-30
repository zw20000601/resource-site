import Link from "next/link";
import PlanetDecoration from "@/components/ui/PlanetDecoration";

const MILESTONES = [
  { date: "2023.03", title: "项目启动", desc: "资源星球项目正式启动，确立资源聚合与推荐方向。", icon: "🚀", color: "bg-purple-600" },
  { date: "2023.08", title: "产品打磨", desc: "完成产品原型与核心功能，开始小范围内测。", icon: "</>", color: "bg-blue-600" },
  { date: "2024.01", title: "平台上线", desc: "资源星球正式上线，开启资源探索之旅。", icon: "🪐", color: "bg-indigo-600" },
  { date: "2024.03", title: "收录突破 10000+", desc: "优质资源数量突破一万，感谢每一位用户的支持。", icon: "📦", color: "bg-violet-600" },
  { date: "2024.05", title: "专题突破 500+", desc: "专题合集数量突破五百，持续丰富内容生态。", icon: "⭐", color: "bg-pink-600" },
];

const TEAM = [
  { role: "产品", icon: "👨‍🚀", color: "from-blue-600 to-indigo-600", desc: "专注用户体验与产品规划，打造简洁、易用的资源探索平台。" },
  { role: "运营", icon: "🤖", color: "from-green-600 to-teal-600", desc: "内容运营与用户增长，挖掘优质资源，连接用户与价值内容。" },
  { role: "开发", icon: "👨‍💻", color: "from-purple-600 to-violet-600", desc: "负责平台研发与技术架构，保障系统稳定性与性能，持续优化体验。" },
  { role: "内容策展", icon: "👨‍🎨", color: "from-orange-600 to-amber-600", desc: "人工筛选与内容策展，确保每一条资源都值得被推荐。" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1
              className="text-5xl font-bold mb-4 leading-tight"
              style={{
                background: "linear-gradient(135deg,#818cf8,#c084fc,#60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              关于资源星球
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed">
              我们致力于发现和整合全网优质资源，<br />
              让信息触手可及，助力每一次学习、工作与创造。
            </p>
          </div>
          <div className="hidden lg:block flex-shrink-0">
            <PlanetDecoration size="md" />
          </div>
        </div>
      </div>

      {/* ─── 4 Info Cards ─── */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Brand intro */}
          <div className="resource-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(99,102,241,0.2)" }}>🪐</div>
              <span className="font-semibold text-white">品牌介绍</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              资源星球是一个专注于优质互联网资源聚合与推荐的平台，涵盖 AI 工具、设计素材、开发资源、学习资料、效率工具等多个领域，帮助用户快速找到高质量资源，提升效率与创造力。
            </p>
          </div>
          {/* Mission */}
          <div className="resource-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(59,130,246,0.2)" }}>🚀</div>
              <span className="font-semibold text-white">我们的使命</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              发现优质资源 · 整合价值信息
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mt-2">
              降低信息获取成本，打破信息壁垒，让每个人都能专注于学习、工作与创造本身，实现更多可能。
            </p>
          </div>
          {/* Core values */}
          <div className="resource-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(139,92,246,0.2)" }}>💎</div>
              <span className="font-semibold text-white">核心价值</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><span className="text-indigo-400 font-medium">精选优质：</span>严格筛选，保证质量</li>
              <li><span className="text-blue-400 font-medium">全面覆盖：</span>多领域资源，一站获取</li>
              <li><span className="text-purple-400 font-medium">持续更新：</span>每日更新，紧跟趋势</li>
              <li><span className="text-pink-400 font-medium">用户至上：</span>体验优先，持续优化</li>
            </ul>
          </div>
          {/* Why choose us */}
          <div className="resource-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(245,158,11,0.2)" }}>⚡</div>
              <span className="font-semibold text-white">为什么选择我们</span>
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              {["全网优质资源，一站式聚合", "专业团队运营，内容人工筛选", "每日更新，紧跟行业最新动态", "简洁体验，快速找到所需资源"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Site Stats ─── */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <h2 className="font-bold text-white text-lg mb-5">网站数据</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "12,000+", label: "收录资源数量", sub: "覆盖多个热门领域", icon: "📦", color: "text-blue-400" },
              { value: "580+", label: "专题合集数量", sub: "精心整理的专题内容", icon: "📚", color: "text-purple-400" },
              { value: "320+", label: "每日更新资源数", sub: "持续为你发现好资源", icon: "⚡", color: "text-green-400" },
              { value: "150,000+", label: "活跃用户数", sub: "来自全球的资源探索者", icon: "👥", color: "text-pink-400" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(99,102,241,0.15)" }}>
                  {stat.icon}
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-white text-xs font-medium">{stat.label}</div>
                  <div className="text-slate-500 text-xs">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-600 mt-4">数据统计时间：截至 2024-05-20</p>
        </div>
      </div>

      {/* ─── Timeline ─── */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
        <div
          className="rounded-2xl p-6"
          style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
        >
          <h2 className="font-bold text-white text-lg mb-6">发展历程</h2>
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute top-5 left-5 right-5 h-0.5"
              style={{ background: "linear-gradient(90deg,rgba(99,102,241,0.8),rgba(99,102,241,0.2))" }}
            />
            <div className="grid grid-cols-5 gap-4 relative">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  {/* Node */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${m.color} flex-shrink-0 z-10 mb-3 border-2`}
                    style={{ borderColor: "rgba(99,102,241,0.4)" }}
                  >
                    {m.icon === "</>" ? <span className="text-xs font-bold text-white">&lt;/&gt;</span> : m.icon}
                  </div>
                  <div className="text-indigo-400 text-xs font-bold mb-1">{m.date}</div>
                  <div className="text-white text-sm font-semibold mb-1">{m.title}</div>
                  <div className="text-slate-400 text-xs leading-relaxed">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Team + Contact ─── */}
      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        <div className="flex gap-6">
          {/* Team */}
          <div
            className="flex-1 rounded-2xl p-6"
            style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            <h2 className="font-bold text-white text-lg mb-5">团队与角色</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TEAM.map((member) => (
                <div key={member.role} className="resource-card rounded-xl p-4 flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 bg-gradient-to-br ${member.color}`}
                  >
                    {member.icon}
                  </div>
                  <div className="font-semibold text-white text-sm mb-2">{member.role}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div
            className="w-72 flex-shrink-0 rounded-2xl p-6 relative overflow-hidden"
            style={{ background: "rgba(15,15,40,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}
          >
            {/* bg decoration */}
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-20" style={{ background: "radial-gradient(circle,#6366f1,transparent)" }} />
            <h2 className="font-bold text-white text-lg mb-5">联系我们</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "rgba(59,130,246,0.2)" }}>📧</div>
                <div>
                  <div className="text-xs text-slate-400">邮箱联系</div>
                  <div className="text-sm text-indigo-400">hello@ziyuanxingqiu.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "rgba(34,197,94,0.2)" }}>💬</div>
                <div>
                  <div className="text-xs text-slate-400">微信公众号</div>
                  <div className="text-sm text-white">资源星球（ziyuanxingqiu）</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "rgba(139,92,246,0.2)" }}>🤝</div>
                <div>
                  <div className="text-xs text-slate-400">合作交流</div>
                  <div className="text-sm text-slate-300">商务合作、资源投稿、内容共建</div>
                </div>
              </div>
              <Link
                href="mailto:hello@ziyuanxingqiu.com"
                className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-medium mt-2"
              >
                联系我们 →
              </Link>
            </div>
            {/* Planet decoration */}
            <div className="absolute bottom-4 right-4 opacity-60">
              <div className="w-12 h-12 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#3730a3)", boxShadow: "0 0 15px rgba(99,102,241,0.4)" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
