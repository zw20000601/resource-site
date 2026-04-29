import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="relative mt-16"
      style={{
        background: "rgba(8,8,24,0.95)",
        borderTop: "1px solid rgba(99,102,241,0.15)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
              >
                🪐
              </div>
              <span className="font-bold text-white">资源星球</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              致力于发现和整合全网优质资源，让信息触手可及，让成长更高效。
            </p>
            <div className="flex gap-3 mt-4 text-slate-400">
              {["微", "☁", "微博", "知"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs hover:text-white hover:bg-indigo-500/20 transition-all border border-indigo-500/20"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">导航</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              {["首页", "资源广场", "专题合集", "排行榜"].map((item) => (
                <li key={item}>
                  <Link href="/" className="hover:text-slate-300 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">帮助</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              {["投稿指南", "审核标准", "常见问题", "联系我们", "意见反馈"].map((item) => (
                <li key={item}>
                  <Link href="/" className="hover:text-slate-300 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">关于</h4>
            <ul className="space-y-2 text-xs text-slate-500">
              {["关于我们", "用户协议", "隐私政策", "版权声明"].map((item) => (
                <li key={item}>
                  <Link href="/" className="hover:text-slate-300 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">订阅更新</h4>
            <p className="text-xs text-slate-500 mb-3">
              订阅我们的更新，第一时间获取最新资源
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="输入你的邮箱地址"
                className="space-input flex-1 rounded-lg px-3 py-2 text-xs min-w-0"
              />
              <button className="btn-primary px-3 py-2 rounded-lg text-white text-xs whitespace-nowrap">
                订阅
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-indigo-500/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <span>© 2024 资源星球 · All rights reserved.</span>
          <span>粤ICP备2024001234号-1</span>
        </div>
      </div>
    </footer>
  );
}
