"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if current path is login
  const isLoginPage = pathname === "/login" || pathname === "/forgot-password";

  return (
    <>
      {/* Agar login page nahi hai, tabhi Navbar dikhega */}
      {!isLoginPage && <Navbar />}

      {children}

      {/* Agar login page nahi hai, tabhi Footer dikhega */}
      {!isLoginPage && <Footer />}
    </>
  );
}
