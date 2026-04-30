"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Lock, Shield, Eye, EyeOff, RefreshCw } from "lucide-react";

const CAPTCHA_CHARS = ["72Q9", "X4MR", "8BNP", "K3WL", "5YTZ"];

const BENEFITS = [
  { icon: "📦", color: "bg-blue-600", title: "收藏优质资源", desc: "收藏心仪资源，建立你的专属资源库" },
  { icon: "⚡", color: "bg-indigo-600", title: "订阅更新", desc: "订阅资源更新，第一时间获取最新内容" },
  { icon: "📁", color: "bg-green-600", title: "创建专题", desc: "创建个性化专题合集，整理高效学习" },
  { icon: "📤", color: "bg-amber-600", title: "分享投稿", desc: "分享优质资源，收获认可与成长" },
];

export default function RegisterPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [captchaIdx, setCaptchaIdx] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
        style={{ background: "rgba(8,8,24,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(99,102,241,0.15)" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>🪐</div>
          <span className="font-bold text-white text-lg">资源星球</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="px-4 py-2 rounded-lg text-sm text-slate-300 border border-indigo-500/30 hover:border-indigo-500/60 transition-all">登录</Link>
          <button className="btn-primary px-4 py-2 rounded-lg text-sm text-white font-medium">注册</button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center pt-16 px-4 py-12">
        <div
          className="w-full max-w-5xl rounded-3xl overflow-hidden flex min-h-[620px]"
          style={{ background: "rgba(12,12,35,0.95)", border: "1px solid rgba(99,102,241,0.25)", boxShadow: "0 0 80px rgba(99,102,241,0.15)" }}
        >
          {/* Left — register form */}
          <div className="flex flex-col justify-center w-full md:w-[480px] flex-shrink-0 p-8 md:p-10">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold text-white">创建账号</h1>
              <span className="text-2xl">✦</span>
            </div>
            <p className="text-slate-400 text-sm mb-6">加入资源星球，开启高效探索之旅</p>

            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">用户名</label>
                <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3">
                  <User size={15} className="text-slate-400 flex-shrink-0" />
                  <input placeholder="请输入用户名（2-20个字符）" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">邮箱</label>
                <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3">
                  <Mail size={15} className="text-slate-400 flex-shrink-0" />
                  <input type="email" placeholder="请输入邮箱地址" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                </div>
              </div>
              {/* Password */}
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">密码</label>
                <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3">
                  <Lock size={15} className="text-slate-400 flex-shrink-0" />
                  <input type={showPwd ? "text" : "password"} placeholder="请输入密码（8-20位，包含字母和数字）" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                  <button onClick={() => setShowPwd(!showPwd)} className="text-slate-400 hover:text-white"><EyeOff size={15} /></button>
                </div>
              </div>
              {/* Confirm password */}
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">确认密码</label>
                <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3">
                  <Lock size={15} className="text-slate-400 flex-shrink-0" />
                  <input type={showConfirmPwd ? "text" : "password"} placeholder="请再次输入密码" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                  <button onClick={() => setShowConfirmPwd(!showConfirmPwd)} className="text-slate-400 hover:text-white"><Eye size={15} /></button>
                </div>
              </div>
              {/* Captcha */}
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">验证码</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3 flex-1">
                    <Shield size={15} className="text-slate-400 flex-shrink-0" />
                    <input placeholder="请输入右侧验证码" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                  </div>
                  <button
                    onClick={() => setCaptchaIdx((i) => (i + 1) % CAPTCHA_CHARS.length)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-indigo-500/30"
                    style={{ background: "rgba(99,102,241,0.08)" }}
                  >
                    <span className="font-mono font-bold text-indigo-300 tracking-widest text-sm">{CAPTCHA_CHARS[captchaIdx]}</span>
                    <RefreshCw size={12} className="text-slate-400" />
                  </button>
                </div>
              </div>
              {/* Agreement */}
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 accent-indigo-500" />
                <span className="text-slate-400">
                  我已阅读并同意{" "}
                  <Link href="#" className="text-indigo-400">《用户协议》</Link>
                  {" "}和{" "}
                  <Link href="#" className="text-indigo-400">《隐私政策》</Link>
                </span>
              </label>
              {/* Register button */}
              <button
                className="w-full py-3 rounded-xl text-white font-semibold text-base"
                style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.4)", opacity: agreed ? 1 : 0.6 }}
                disabled={!agreed}
              >
                注册
              </button>
              <p className="text-center text-sm text-slate-500">或</p>
              <p className="text-center text-sm text-slate-400">
                已有账号？{" "}
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">去登录</Link>
              </p>
            </div>
          </div>

          {/* Right — benefits */}
          <div
            className="hidden md:flex flex-col justify-center flex-1 p-10 relative"
            style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(139,92,246,0.04))" }}
          >
            {/* Stars */}
            {[...Array(10)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white"
                style={{ width: Math.random() * 2 + 1, height: Math.random() * 2 + 1, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: Math.random() * 0.5 + 0.1 }} />
            ))}
            {/* Planet */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full animate-[float_6s_ease-in-out_infinite]"
                  style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#312e81)", boxShadow: "0 0 50px rgba(99,102,241,0.5)" }}>
                  <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 25% 25%,rgba(255,255,255,0.15),transparent 60%)" }} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-44 h-16 rounded-full border border-indigo-400/30" style={{ transform: "rotateX(70deg)" }} />
                </div>
                {/* Floating feature icons */}
                <div className="absolute -top-4 -right-8 w-12 h-9 rounded-xl flex items-center justify-center gap-1 text-xs text-white px-2" style={{ background: "rgba(99,102,241,0.7)" }}>
                  ★ —
                </div>
                <div className="absolute top-8 -right-12 w-12 h-9 rounded-xl flex items-center justify-center text-xs text-white" style={{ background: "rgba(139,92,246,0.6)" }}>
                  📁
                </div>
                <div className="absolute -bottom-2 -right-10 w-14 h-9 rounded-xl flex items-center justify-center gap-1 text-xs text-white px-2" style={{ background: "rgba(99,102,241,0.6)" }}>
                  ★ —
                </div>
              </div>
            </div>

            {/* Benefits box */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "rgba(8,8,24,0.6)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <h3 className="font-semibold text-white text-base mb-4">注册发现更多精彩</h3>
              <div className="space-y-3">
                {BENEFITS.map((b) => (
                  <div key={b.title} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${b.color}`}>{b.icon}</div>
                    <div>
                      <div className="text-sm font-medium text-white">{b.title}</div>
                      <div className="text-xs text-slate-400">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Quote */}
              <div className="mt-4 pt-4 border-t border-indigo-500/15">
                <div className="flex gap-1">
                  <span className="text-indigo-400 text-xl leading-none">"</span>
                  <p className="text-xs text-slate-400 italic leading-relaxed">
                    在这里，每一份优质资源都能被发现，每一个想法都能被看见。
                  </p>
                  <span className="text-indigo-400 text-xl leading-none self-end">"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
