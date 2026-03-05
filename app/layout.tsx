import "./globals.css";
import type { Metadata } from "next";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "Reiseinspirator",
  description: "Oppdag byer og få alders- og interessebaserte anbefalinger.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body className="min-h-dvh bg-neutral-950 text-neutral-50">
        <div className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col">
          <AppHeader />
          <main className="flex-1 px-4 pb-20 pt-4">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
