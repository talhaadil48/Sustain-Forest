"use client";
import ShowcaseBanner from "@/components/ShowcaseBanner";
import { useLanguage } from "@/components/LanguageProvider.";

export default function ReelLandscapePage() {
  const { t } = useLanguage();
  return (
    <main>
      <ShowcaseBanner
        title = {t("solar_photobioreactor_title")}
        titleDesription={t("solar_photobioreactor_titleDescription")}
        images={[
          "/images/new-pic8.webp?height=400&width=600",
          "/images/new-pic8.webp?height=400&width=600",
          "/images/new-pic8.webp?height=400&width=600",
        ]}
        descriptions={[
          t("solar_photobioreactor_descriptions_0"),
          t("solar_photobioreactor_descriptions_1"),
          t("solar_photobioreactor_descriptions_2"),
        ]}
        audios={
          [
            "reel_landscape_descriptions_0",
            "reel_landscape_descriptions_1",
            "reel_landscape_descriptions_2",
          ]
        }
      />
    </main>
  );
}
