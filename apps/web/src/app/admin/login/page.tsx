"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Lock, Shield, Eye, EyeOff, RefreshCw, Database, FileText, BarChart3, Users } from "lucide-react";

const CAPTCHAS = ["783K", "4X9M", "R2WP", "5BNQ", "L7YT"];

const FEATURES = [
  { icon: Database, label: "资源管理", desc: "高效管理海量资源" },
  { icon: Shield, label: "审核管控", desc: "严格审核安全合规" },
  { icon: BarChart3, label: "数据运营", desc: "洞察数据驱动增长" },
  { icon: Users, label: "团队协作", desc: "高效协同权限清晰" },
];

export default function AdminLoginPage() {
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [captchaIdx, setCaptchaIdx] = useState(0);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "radial-gradient(ellipse at 30% 60%,rgba(30,20,80,0.8),rgba(6,6,20,1))" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 0 12px rgba(99,102,241,0.5)" }}>🪐</div>
          <span className="font-bold text-white text-lg">资源星球</span>
        </Link>
        <Link href="/" className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
          ← 返回官网
        </Link>
      </div>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div
          className="w-full max-w-5xl rounded-3xl overflow-hidden flex"
          style={{ background: "rgba(10,10,30,0.85)", border: "1px solid rgba(99,102,241,0.2)", boxShadow: "0 0 100px rgba(99,102,241,0.1)", backdropFilter: "blur(20px)", minHeight: 580 }}
        >
          {/* Left — illustration */}
          <div className="hidden md:flex flex-col flex-1 p-10 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 60%,rgba(99,102,241,0.2),transparent 70%)" }} />
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute rounded-full bg-white"
                style={{ width: Math.random() * 2 + 0.5, height: Math.random() * 2 + 0.5, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, opacity: Math.random() * 0.6 + 0.1 }} />
            ))}

            <div className="relative flex-1 flex flex-col items-center justify-center">
              {/* Planet */}
              <div className="relative mb-8">
                <div className="w-44 h-44 rounded-full animate-[float_6s_ease-in-out_infinite]"
                  style={{ background: "radial-gradient(circle at 35% 35%,#818cf8,#4f46e5 50%,#1e1b4b)", boxShadow: "0 0 80px rgba(99,102,241,0.6), 0 0 40px rgba(99,102,241,0.3)" }}>
                  <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 25% 25%,rgba(255,255,255,0.15),transparent 60%)" }} />
                </div>
                {/* Orbit ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-24 rounded-full border border-indigo-400/40" style={{ transform: "rotateX(75deg)", boxShadow: "0 0 20px rgba(99,102,241,0.2)" }} />
                </div>
                {/* Floating UI cards */}
                <div className="absolute -left-16 top-4 w-28 rounded-xl p-2 text-xs" style={{ background: "rgba(20,20,60,0.9)", border: "1px solid rgba(99,102,241,0.3)" }}>
                  <div className="flex gap-1 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" /><div className="w-2 h-2 rounded-full bg-yellow-500" /><div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div className="space-y-1">
                    {[80, 60, 90].map((w, i) => (
                      <div key={i} className="h-1.5 rounded-full bg-indigo-500/60" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </div>
                <div className="absolute -right-12 top-8 w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: "rgba(99,102,241,0.8)", boxShadow: "0 0 15px rgba(99,102,241,0.4)" }}>
                  👤
                </div>
                <div className="absolute -right-16 bottom-8 w-28 rounded-xl p-2 text-xs" style={{ background: "rgba(20,20,60,0.9)", border: "1px solid rgba(99,102,241,0.3)" }}>
                  <div className="text-slate-400 mb-1">数据统计</div>
                  <div className="space-y-1">
                    {[45, 70].map((w, i) => <div key={i} className="h-1.5 rounded-full bg-purple-500/60" style={{ width: `${w}%` }} />)}
                  </div>
                </div>
                {/* Shield icon */}
                <div className="absolute -left-8 bottom-4 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(99,102,241,0.8)", boxShadow: "0 0 20px rgba(99,102,241,0.4)" }}>
                  <Shield size={18} className="text-white" />
                </div>
              </div>

              <h2 className="text-3xl font-bold text-white text-center mb-2">
                资源星球<span className="text-indigo-400">后台管理系统</span>
              </h2>
              <p className="text-slate-400 text-sm text-center mb-8">统一管理资源、专题、审核与运营数据</p>

              {/* Feature list */}
              <div className="grid grid-cols-4 gap-4 w-full">
                {FEATURES.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex flex-col items-center gap-2 text-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.2)", border: "1px solid rgba(99,102,241,0.3)" }}>
                      <Icon size={18} className="text-indigo-400" />
                    </div>
                    <div className="text-xs font-medium text-white">{label}</div>
                    <div className="text-[10px] text-slate-500">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex flex-col justify-center w-full md:w-[400px] flex-shrink-0 p-10"
            style={{ borderLeft: "1px solid rgba(99,102,241,0.15)" }}>
            <h1 className="text-2xl font-bold text-white mb-1">管理员登录</h1>
            <p className="text-slate-400 text-sm mb-7">请输入账号信息后进入后台</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">账号</label>
                <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3">
                  <User size={15} className="text-slate-400 flex-shrink-0" />
                  <input placeholder="请输入账号/用户名" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">密码</label>
                <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3">
                  <Lock size={15} className="text-slate-400 flex-shrink-0" />
                  <input type={showPwd ? "text" : "password"} placeholder="请输入密码" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                  <button onClick={() => setShowPwd(!showPwd)} className="text-slate-400 hover:text-white">
                    {showPwd ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1.5">验证码</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-3 space-input rounded-xl px-4 py-3 flex-1">
                    <Shield size={15} className="text-slate-400 flex-shrink-0" />
                    <input placeholder="请输入验证码" className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none" />
                  </div>
                  <button
                    onClick={() => setCaptchaIdx((i) => (i + 1) % CAPTCHAS.length)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl border border-indigo-500/30 hover:border-indigo-500/60 transition-all"
                    style={{ background: "rgba(99,102,241,0.08)" }}
                  >
                    <span className="font-mono font-bold text-indigo-300 tracking-widest text-sm">{CAPTCHAS[captchaIdx]}</span>
                    <span className="text-xs text-slate-400 whitespace-nowrap">换一张</span>
                    <RefreshCw size={11} className="text-slate-400" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="w-4 h-4 accent-indigo-500" />
                  <span className="text-slate-400">记住我</span>
                </label>
                <button className="text-indigo-400 hover:text-indigo-300 text-xs">忘记密码？</button>
              </div>

              <a href="/admin/dashboard">
                <button className="w-full py-3 rounded-xl text-white font-bold text-base mt-1"
                  style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 4px 25px rgba(99,102,241,0.5)" }}>
                  登录后台
                </button>
              </a>

              <div className="flex items-center gap-3 text-xs text-slate-600">
                <div className="flex-1 h-px bg-slate-800" /><span>其他登录方式</span><div className="flex-1 h-px bg-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
                  📱 短信验证码登录
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm text-slate-300 border border-indigo-500/20 hover:border-indigo-500/40 transition-all">
                  <Shield size={14} className="text-indigo-400" /> SSO 单点登录
                </button>
              </div>
              <p className="text-center text-xs text-slate-600 flex items-center justify-center gap-1">
                <Lock size={11} /> 仅限授权管理员访问
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-4 text-xs text-slate-700">
        © 2024 资源星球 · All rights reserved. 粤ICP备2024035123号-1
        <span className="mx-3 text-slate-800">|</span>安全合规
        <span className="mx-3 text-slate-800">|</span>隐私政策
      </footer>
    </div>
  );
}
