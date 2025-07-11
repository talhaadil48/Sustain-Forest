"use client";
import ShowcaseBanner from "@/components/ShowcaseBanner";
import { useLanguage } from "@/components/LanguageProvider.";

export default function ReelLandscapePage() {
  const { t } = useLanguage();
  return (
    <main>
      <ShowcaseBanner
        logoImages={[
          null,
          null,
          null,
          ["images/11.png", "/images/12.png", "/images/13.png",
           
          ],
        ]}
        title={t("reel_landscape_title")}
        titleDesription={t("reel_landscape_titleDescription")}
        images={[
          "/images/Picture11.webp?height=400&width=600",
          "/images/new-pic16.webp?height=400&width=600",
          "/images/Picture11.webp?height=400&width=600",
          "/images/new-pic16.webp?height=400&width=600",
        ]}
        descriptions={[
          t("reel_landscape_descriptions_0"),
          t("reel_landscape_descriptions_1"),
          t("reel_landscape_descriptions_2"),
          t("reel_landscape_descriptions_3"),
        ]}
        audios={[
          "reel_landscape_descriptions_0",
          "reel_landscape_descriptions_1",
          "reel_landscape_descriptions_2",
        ]}
      />
    </main>
  );
}
