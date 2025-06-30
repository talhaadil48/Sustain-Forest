"use client";

import ShowcaseBanner from "@/components/ShowcaseBanner";
import { useLanguage } from "@/components/LanguageProvider.";
export default function DryscapePage() {
  const { t } = useLanguage();
  return (
    <main>
      <ShowcaseBanner
        title={t("dry_escape_title")}
        titleDesription={t("dry_escape_titleDescription")}
        images={[
          "/images/AGAVE.png?height=400&width=600",
          "/images/ALOVERA.png?height=400&width=600",
          "/images/LEMONGRASSS.png?height=400&width=600",
        ]}
        descriptions={[
          t("dry_escape_descriptions_0"),
          t("dry_escape_descriptions_1"),
          t("dry_escape_descriptions_2"),
        ]}
      />
    </main>
  );
}
