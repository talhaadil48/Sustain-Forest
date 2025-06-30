import ShowcaseBanner from "@/components/ShowcaseBanner"

export default function Home() {
  const sampleDescriptions = [
        `We carefully picked plants that grow well in dry areas and don’t need much water. Each plant was placed in sunny spots with compost and mulch to keep the soil cool. We didn’t use any chemical fertilizers or watering pipes. After planting, we watered them a few times to help them settle. Now, they survive mostly on rain and natural soil. These plants are easy to grow and very strong. They were arranged to make the garden look both neat and colorful.`,
    `The dryscape garden looks fresh and green, even in dry weather. People are often surprised by how little care it needs. These plants also help stop the soil from blowing away in the wind. Bees, butterflies, and birds often visit, making it full of life. The garden is quiet and clean, perfect for walking or sitting nearby. Some plants also smell nice or can be used for simple medicine. It teaches visitors that less water doesn’t mean less beauty.`,
    `Because of this garden, the park now uses a lot less water than before. It helps the park stay green even when there’s no rain. People visiting the park ask about the plants and want to grow them at home too. The garden is a great example of how to care for nature in a smart way. Students learn about saving water and choosing local plants. Other parks and schools are now trying to copy this idea. This small garden is making a big difference.`
  ]

  const sampleImages = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

    const title = "DryScape Plants"
    const titleDescription = `This garden is full of strong plants that grow with very little water.
They stay green all year and help save water in a smart way.`
  return (
    <main>
      <ShowcaseBanner descriptions={sampleDescriptions} images={sampleImages} title={title}  titleDesription={titleDescription}/>
    </main>
  )
}