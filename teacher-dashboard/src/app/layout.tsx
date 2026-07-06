import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "教務ダッシュボード",
  description: "中学校教師向けの教務効率化ダッシュボード",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      {/* 背景を美しい淡いパステルグラデーションに変更 */}
      <body className={`${inter.className} bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 min-h-screen text-slate-800`}>
        
        {/* ヘッダーを「すりガラス（Apple風）」に */}
        <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-xl border-b border-white/60 px-6 py-4 shadow-[0_4px_30px_rgb(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto flex items-center">
            <h1 className="text-xl font-extrabold tracking-tight text-slate-700 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              教務ダッシュボード
            </h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6 md:p-10">
          {children}
        </main>
        
      </body>
    </html>
  );
}