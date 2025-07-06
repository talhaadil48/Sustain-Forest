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
          "/images/new-pic1.webp?height=400&width=600",
          "/images/new-pic3.webp?height=400&width=600",
          "/images/new-pic4.webp?height=400&width=600",
        ]}
        descriptions={[
          t("water_wetland_descriptions_0"),
          t("water_wetland_descriptions_1"),
          t("water_wetland_descriptions_2"),
        ]}

        audios={
          [
            "water_wetland_descriptions_0",
            "water_wetland_descriptions_1",
            "water_wetland_descriptions_2",
          ]
        }
      />
    </main>
  );
}
