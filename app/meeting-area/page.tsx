"use client";
import ShowcaseBanner from "@/components/ShowcaseBanner";
import { useLanguage } from "@/components/LanguageProvider.";

export default function MeetingAreaPage() {
  const { t } = useLanguage();
  return (
    <main>
      <ShowcaseBanner
        title={t("meeting_area_title")}
        titleDesription={t("meeting_area_titleDescription")}
        images={[
          "/images/Picture2.webp?height=400&width=600",
          "/images/Picture2.webp?height=400&width=600",
          "/images/Picture2.webp?height=400&width=600",
        ]}
        descriptions={[
          t("meeting_area_descriptions_0"),
          t("meeting_area_descriptions_1"),
          t("meeting_area_descriptions_2"),
        ]}
      />
    </main>
  );
}
