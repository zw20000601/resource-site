import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-16">
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-300">首页</Link>
          <ChevronRight size={12} />
          <span className="text-slate-300">关于我们</span>
        </nav>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">关于资源星球</h1>
          <p className="text-slate-400 leading-relaxed mb-8">
            资源星球是一个致力于发现、整合和推荐全网优质资源的平台。我们汇聚了超过 12,000 个经过筛选的工具、网站和资源，覆盖 AI 工具、设计素材、开发工具、学习网站等多个领域，帮助你高效找到所需，节省信息筛选的时间成本。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { value: "12,000+", label: "收录资源", icon: "📦" },
              { value: "580+", label: "专题合集", icon: "📚" },
              { value: "每日更新", label: "资源维护", icon: "⚡" },
            ].map((stat) => (
              <div key={stat.label} className="resource-card rounded-xl p-5 text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-indigo-400">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="resource-card rounded-2xl p-6 mb-6">
            <h2 className="font-bold text-white text-lg mb-3">我们的使命</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              在信息爆炸的时代，优质资源往往淹没在海量内容中。资源星球的使命是成为互联网优质资源的「灯塔」——帮助创作者、开发者、设计师、运营人员快速发现真正有价值的工具与内容，让信息触手可及，让成长更高效。
            </p>
          </div>

          <div className="flex gap-4">
            <Link href="/submit" className="btn-primary px-6 py-3 rounded-xl text-white font-medium">
              投稿资源
            </Link>
            <Link href="/marketplace" className="px-6 py-3 rounded-xl text-slate-300 border border-indigo-500/30 hover:border-indigo-500/60 transition-all">
              浏览资源
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
