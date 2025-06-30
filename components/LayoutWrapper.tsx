"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import { FloatingIcons } from "./FloatingIcons";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/admin") || pathname.startsWith("/login");

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <FloatingIcons/>}
    </>
  );
}
