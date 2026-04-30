"use client";

import { useState } from "react";
import Link from "next/link";
import { Moon, User, Lock, Shield, Eye, EyeOff, RefreshCw } from "lucide-react";

const CAPTCHA_CHARS = ["7K2P", "3X8Q", "M5NR", "9B4W", "L2YT"];

export default function LoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [captchaIdx, setCaptchaIdx] = useState(0);

  const rotateCaptcha = () => setCaptchaIdx((i) => (i + 1) % CAPTCHA_CHARS.length);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Minimal header */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16"
        style={{ background: "rgba(8,8,24,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(99,102,241,0.15)" }}
      >
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>🪐</div>
          <span className="font-bold text-white text-lg">资源星球</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors">首页</Link>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-slate-300 border border-indigo-500/30 hover:border-indigo-500/60 transition-all"
          >
            ← 返回首页
          </Link>
          <button className="p-2 text-slate-400 hover:text-white"><Moon size={18} /></button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center pt-16 px-4 py-12">
        <div
          className="w-full max-w-4xl rounded-3xl overflow-hidden flex min-h-[560px]"
          style={{ background: "rgba(12,12,35,0.95)", border: "1px solid rgba(99,102,241,0.25)", boxShadow: "0 0 80px rgba(99,102,241,0.15)" }}
        >
          {/* Left illustration */}
          <div
            className="hidden md:flex flex-col items-center justify-center flex-1 p-10 relative"
            style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.1),rgba(139,92,246,0.05))" }}
          >
            {/* Stars */}
            {[...Array(12)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white animate-pulse"
                style={{ width: Math.random() * 3 + 1, height: Math.random() * 3 + 1, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: Math.random() * 0.6 + 0.2 }} />
            ))}
            {/* Planet */}
            <div className="relative mb-8 animate-[float_6s_ease-in-out_infinite]">
              <div className="w-40 h-40 rounded-full" style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#6366f1 50%,#312e81)", boxShadow: "0 0 60px rgba(99,102,241,0.5)" }}>
                <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 25% 25%,rgba(255,255,255,0.15),transparent 60%)" }} />
              </div>
              {/* Orbit ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-52 h-20 rounded-full border border-indigo-400/30" style={{ transform: "rotateX(70deg)" }} />
              </div>
              {/* Floating cards */}
              <div className="absolute -left-12 top-8 w-10 h-10 rounded-xl bg-indigo-600/80 flex items-center justify-center text-white text-sm">&lt;/&gt;</div>
              <div className="absolute -right-8 top-4 w-9 h-9 rounded-xl bg-purple-600/80 flex items-center justify-center text-white text-sm">🔍</div>
              <div className="absolute bottom-0 right-0 w-24 rounded-lg px-2 py-1.5 text-xs text-white" style={{ background: "rgba(99,102,241,0.7)" }}>
                优质资源 ★★★★
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white text-center mb-2">一站式发现与整合</h2>
            <h3 className="text-3xl font-bold text-center mb-3" style={{ background: "linear-gradient(135deg,#818cf8,#c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              全网优质资源
            </h3>
            <p className="text-slate-400 text-center text-sm leading-relaxed">
              汇聚全网优质资源与实用工具，<br />让信息触手可及，助你高效成长与创造。
            </p>
          </div>

          {/* Right form */}
          <div className="flex flex-col justify-center w-full md:w-[420px] flex-shrink-0 p-8 md:p-10">
            <h1 className="text-2xl font-bold text-white text-center mb-1">欢迎登录</h1>
            <p className="text-slate-400 text-sm text-center mb-7">登录资源星球，继续发现高质量资源</p>

            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3">
                <User size={16} className="text-slate-400 flex-shrink-0" />
                <input placeholder="邮箱 / 手机号" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
              </div>
              {/* Password */}
              <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3">
                <Lock size={16} className="text-slate-400 flex-shrink-0" />
                <input type={showPwd ? "text" : "password"} placeholder="密码" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                <button onClick={() => setShowPwd(!showPwd)} className="text-slate-400 hover:text-white">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Captcha */}
              <div className="flex gap-2">
                <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3 flex-1">
                  <Shield size={16} className="text-slate-400 flex-shrink-0" />
                  <input placeholder="验证码" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                </div>
                <button
                  onClick={rotateCaptcha}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl border border-indigo-500/30 group"
                  style={{ background: "rgba(99,102,241,0.08)" }}
                >
                  <span className="font-mono font-bold text-indigo-300 tracking-widest text-sm select-none" style={{ letterSpacing: "0.2em", textDecoration: "line-through wavy rgba(99,102,241,0.3)" }}>
                    {CAPTCHA_CHARS[captchaIdx]}
                  </span>
                  <RefreshCw size={13} className="text-slate-400 group-hover:text-white" />
                </button>
              </div>
              {/* Remember + forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 accent-indigo-500" />
                  <span className="text-slate-400">记住我</span>
                </label>
                <Link href="#" className="text-indigo-400 hover:text-indigo-300 text-xs">忘记密码？</Link>
              </div>
              {/* Login button */}
              <button className="w-full py-3 rounded-xl text-white font-semibold text-base" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>
                登录
              </button>
              {/* Register link */}
              <p className="text-center text-sm text-slate-400">
                还没有账号？{" "}
                <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">立即注册</Link>
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <div className="flex-1 h-px bg-slate-700" />
                或使用第三方账号登录
                <div className="flex-1 h-px bg-slate-700" />
              </div>

              {/* Third-party */}
              <div className="grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: "#07c160" }}>
                  <span>💬</span> 微信登录
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-white text-sm font-medium" style={{ background: "rgba(36,41,47,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <span>🐙</span> GitHub 登录
                </button>
                <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-medium" style={{ background: "white", color: "#374151" }}>
                  <span>G</span> Google 登录
                </button>
              </div>

              <p className="text-center text-xs text-slate-500">
                🔒 登录即代表同意{" "}
                <Link href="#" className="text-indigo-400">《用户协议》</Link>
                {" "}和{" "}
                <Link href="#" className="text-indigo-400">《隐私政策》</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
