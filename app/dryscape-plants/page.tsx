"use client";

import ShowcaseBanner from "@/components/ShowcaseBanner";
import { useLanguage } from "@/components/LanguageProvider.";
export default function DryscapePage() {
  const { t } = useLanguage();
  return (
    <main>
      <ShowcaseBanner
        logoImages={[
          null,
          null,
          null,
          ["/images/11.png",
            "/images/13.png"]
        ]}
        title={t("dry_escape_title")}
        titleDesription={t("dry_escape_titleDescription")}
        images={[
          "/images/realagave.webp?height=400&width=600",
          "/images/realalovera.webp?height=900&width=400",
          "/images/reallemongrass.webp?height=400&width=600",
          "/images/reallemongrass.webp?height=400&width=600",
        ]}
        descriptions={[
          t("dry_escape_descriptions_0"),
          t("dry_escape_descriptions_1"),
          t("dry_escape_descriptions_2"),
          t("dry_escape_descriptions_3"),
        ]}
        audios={
          [
            "dry_escape_descriptions_0",
            "dry_escape_descriptions_1",
            "dry_escape_descriptions_2",
          ]
        }
      />
    </main>
  );
}
