"use client";
import ShowcaseBanner from "@/components/ShowcaseBanner";
import { useLanguage } from "@/components/LanguageProvider.";
export default function WaterWetlandPage() {
  const { t } = useLanguage();
  console.log(t("water_wetland_title"));
  return (
    <main>
      <ShowcaseBanner
        title={t("water_wetland_title")}
        titleDesription={t("water_wetland_titleDescription")}
        images={[
          "/images/Picture3.png?height=400&width=600",
          "/images/Picture3.png?height=400&width=600",
          "/images/Picture3.png?height=400&width=600",
        ]}
        descriptions={[
          t("water_wetland_descriptions_0"),
          t("water_wetland_descriptions_1"),
          t("water_wetland_descriptions_2"),
        ]}
      />
    </main>
  );
}
