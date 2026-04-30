"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Database, BookOpen, BarChart3, FileText,
  Users, Shield, PieChart, Settings, ChevronLeft, ChevronRight, ChevronDown
} from "lucide-react";

const NAV = [
  { icon: LayoutDashboard, label: "控制台", href: "/admin/dashboard" },
  {
    icon: Database, label: "资源管理", href: "/admin/resources",
    children: [{ label: "资源列表", href: "/admin/resources" }, { label: "分类管理", href: "/admin/resources/categories" }],
  },
  {
    icon: BookOpen, label: "专题管理", href: "/admin/topics",
    children: [{ label: "专题列表", href: "/admin/topics" }, { label: "推荐配置", href: "/admin/topics/featured" }],
  },
  {
    icon: BarChart3, label: "排行榜管理", href: "/admin/rankings",
    children: [{ label: "榜单管理", href: "/admin/rankings" }],
  },
  { icon: FileText, label: "投稿审核", href: "/admin/submissions" },
  { icon: Users, label: "用户管理", href: "/admin/users" },
  { icon: Shield, label: "角色权限", href: "/admin/roles" },
  { icon: PieChart, label: "数据分析", href: "/admin/analytics" },
  { icon: Settings, label: "系统设置", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["资源管理", "专题管理", "排行榜管理"]);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside
      className="flex flex-col flex-shrink-0 transition-all duration-300 relative"
      style={{
        width: collapsed ? 64 : 168,
        background: "rgba(6,6,20,0.98)",
        borderRight: "1px solid rgba(99,102,241,0.15)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-14 border-b border-indigo-500/15 flex-shrink-0">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", boxShadow: "0 0 10px rgba(99,102,241,0.4)" }}>
          🪐
        </div>
        {!collapsed && <span className="font-bold text-white text-base whitespace-nowrap">资源星球</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openMenus.includes(item.label);

          return (
            <div key={item.label}>
              <div
                onClick={() => hasChildren ? toggleMenu(item.label) : undefined}
                className={`flex items-center gap-3 mx-2 mb-0.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all group ${
                  active && !hasChildren
                    ? "text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
                style={active && !hasChildren ? { background: "linear-gradient(135deg,rgba(99,102,241,0.6),rgba(139,92,246,0.4))" } : {}}
              >
                {hasChildren ? (
                  <Link href={item.href} className="flex items-center gap-3 flex-1 min-w-0" onClick={(e) => e.stopPropagation()}>
                    <Icon size={16} className="flex-shrink-0" />
                    {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                  </Link>
                ) : (
                  <Link href={item.href} className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon size={16} className="flex-shrink-0" />
                    {!collapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                  </Link>
                )}
                {!collapsed && hasChildren && (
                  <ChevronDown size={13} className={`flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                )}
              </div>
              {/* Sub-items */}
              {hasChildren && !collapsed && isOpen && (
                <div className="ml-5 mb-1">
                  {item.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all mb-0.5 ${
                        pathname === child.href
                          ? "text-indigo-400 bg-indigo-500/10"
                          : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-current flex-shrink-0" />
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center gap-2 mx-2 mb-3 px-3 py-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all text-sm"
      >
        {collapsed ? <ChevronRight size={15} /> : (
          <>
            <ChevronLeft size={15} />
            <span className="text-xs">收起菜单</span>
          </>
        )}
      </button>
    </aside>
  );
}
