import ShowcaseBanner from "@/components/ShowcaseBanner"

export default function Home() {
  const sampleDescriptions = [
   `We took a large wooden reel that was once used for holding cables. It was laid flat and filled with soil and purple-leaf plants. Around the reel, we added gravel, broken bricks, and test blocks from the lab. These were shaped into a giant leaf design using only reused materials. The edges were decorated with smooth stones and leftover tiles. We also reused a dead tree trunk to grow more plants vertically. No new material was purchased for this entire area.`,
   `The reel garden is one of the most popular parts of the park. Bees and butterflies visit the flowers every day, making it feel alive. The shape is simple but beautiful, and kids love tracing the leaf outline. The mix of textures — wood, stone, and green — makes it fun to explore. It brings together natural shapes and recycled pieces in one spot. People often ask how it was made and want to try something similar. It is both a relaxing space and a lesson in design.`,
   `This garden helped reduce construction waste while creating something beautiful. Visitors see the value of using old things in new ways. The area has inspired other parks and schools to try using waste for decoration. It teaches that art doesn’t have to be expensive — it just needs creativity. The reel landscape has become a favorite for families and school groups. People leave this space feeling inspired to reuse at home. It turns a small patch of land into a powerful teaching space.`
  ]

  const sampleImages = [
    "/images/Picture11.jpg?height=400&width=600",
    "/images/Picture11.jpg?height=400&width=600",
    "/images/Picture11.jpg?height=400&width=600",
  ]

    const title = `Reel Landscape`
    const titleDescription = `This garden uses a recycled wooden reel as a planter in the center.
It’s designed like a giant leaf using only construction waste.`
  return (
    <main>
      <ShowcaseBanner descriptions={sampleDescriptions} images={sampleImages} title={title}  titleDesription={titleDescription}/>
    </main>
  )
}