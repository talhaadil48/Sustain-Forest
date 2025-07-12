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
          ["images/3.webp", "/images/9.webp", "/images/11.webp","/images/13.webp",
           
          ],
        ]}
        title = {t("solar_photobioreactor_title")}
        titleDesription={t("solar_photobioreactor_titleDescription")}
        images={[
          "/images/new-pic8.webp?height=400&width=600",
          "/images/new-pic8.webp?height=400&width=600",
          "/images/new-pic8.webp?height=400&width=600",
          "/images/new-pic8.webp?height=400&width=600",
        ]}
        descriptions={[
          t("solar_photobioreactor_descriptions_0"),
          t("solar_photobioreactor_descriptions_1"),
          t("solar_photobioreactor_descriptions_2"),
          t("solar_photobioreactor_descriptions_3"),
        ]}
        audios={
          [
            "solar_photobioreactor_descriptions_0",
          "solar_photobioreactor_descriptions_1",
          "solar_photobioreactor_descriptions_2",
          "solar_photobioreactor_descriptions_3",
          ]
        }
      />
    </main>
  );
}
