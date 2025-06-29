"use client";

import Slider from "@/components/Slider";
import { useLanguage } from "../components/language-provider";
import { LanguageSwitcher } from "../components/language-switcher";
import Header from "@/components/Header";

export default function Page() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <Slider/>
    </>
  );
}
