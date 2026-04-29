import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StarBackground from "@/components/ui/StarBackground";

export const metadata: Metadata = {
  title: "资源星球 - 全网优质资源，一站式发现与整合",
  description: "汇聚全网优质资源与实用工具，覆盖学习、工作、生活各个场景，让信息触手可及，助你高效成长与创造。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="min-h-screen" style={{ background: "#080818", color: "#f1f5f9" }}>
        <StarBackground />
        <div className="relative z-10">
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
