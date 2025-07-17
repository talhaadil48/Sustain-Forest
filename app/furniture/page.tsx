"use client";

import ShowcaseBanner from "@/components/ShowcaseBanner";
import { useLanguage } from "@/components/LanguageProvider.";
export default function UpcycledFurniturePage() {
  const { t } = useLanguage();
  return (
    <main>
      <ShowcaseBanner
         logoImages={[
          null,
          null,
          null,
          ["/images/11.webp",
            "/images/12.webp",
              "/images/13.webp",]
        ]}
        title={t("upcycled_furniture_title")}
        titleDesription={t("upcycled_furniture_titleDescription")}
        images={[
          "/images/new-pic6.webp?height=400&width=600",
          "/images/Picture10.webp?height=400&width=600",
          "/images/new-pic13.webp?height=400&width=600",
          "/images/Picture10.webp?height=400&width=600",
        ]}
        descriptions={[
          t("upcycled_furniture_descriptions_0"),
          t("upcycled_furniture_descriptions_1"),
          t("upcycled_furniture_descriptions_2"),
          t("upcycled_furniture_descriptions_3"),
        ]}
        audios={
          
            "upcycled_furniture_descriptions"
            
          
        }
      />
    </main>
  );
}
