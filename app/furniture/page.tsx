"use client";

import ShowcaseBanner from "@/components/ShowcaseBanner";
import { useLanguage } from "@/components/LanguageProvider.";
export default function UpcycledFurniturePage() {
  const { t } = useLanguage();
  return (
    <main>
      <ShowcaseBanner
        title={t("upcycled_furniture_title")}
        titleDesription={t("upcycled_furniture_titleDescription")}
        images={[
          "/images/new-pic6.webp?height=400&width=600",
          "/images/Picture10.webp?height=400&width=600",
          "/images/pic3.webp?height=400&width=600",
        ]}
        descriptions={[
          t("upcycled_furniture_descriptions_0"),
          t("upcycled_furniture_descriptions_1"),
          t("upcycled_furniture_descriptions_2"),
        ]}
      />
    </main>
  );
}
