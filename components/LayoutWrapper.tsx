"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HIDDEN_LAYOUT_ROUTES = ["/login", "/forgot-password", "/reset-password"];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideLayout = useMemo(() => {
    return HIDDEN_LAYOUT_ROUTES.includes(pathname);
  }, [pathname]);

  return (
    <>
      {!hideLayout && <Navbar />}

      <main>{children}</main>

      {!hideLayout && <Footer />}
    </>
  );
}
