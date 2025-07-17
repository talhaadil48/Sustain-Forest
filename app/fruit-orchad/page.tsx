"use client";
import ShowcaseBanner from "@/components/ShowcaseBanner";
import { useLanguage } from "@/components/LanguageProvider.";

export default function FruitOrchardPage() {
  const { t } = useLanguage();
  return (
    <main>
      <ShowcaseBanner
          logoImages={[
          null,
          null,
          null,
          ["/images/3.webp",
            "/images/11.webp",
              "/images/13.webp",]
        ]}
        title={t("fruit_orchard_title")}
        titleDesription={t("fruit_orchard_titleDescription")}
        images={[
          "/images/Picture4.webp?height=400&width=600",
          "/images/Picture5.webp?height=400&width=600",
          "/images/pic1.webp?height=400&width=600",
          "/images/Picture5.webp?height=400&width=600",
        ]}
        descriptions={[
          t("fruit_orchard_descriptions_0"),
          t("fruit_orchard_descriptions_1"),
          t("fruit_orchard_descriptions_2"),
          t("fruit_orchard_descriptions_3"),
        ]}
        audios= {
          
            "fruit_orchard_descriptions"
    
     
        }
      />
    </main>
  );
}
