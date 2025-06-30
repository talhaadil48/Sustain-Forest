import ShowcaseBanner from "@/components/ShowcaseBanner"

export default function Home() {
  const sampleDescriptions = [
    "We collected concrete cubes and cylinders that were used in lab tests and would normally be thrown away. These blocks were arranged to form a strong foundation for the platform. On top of them, we carefully placed broken pieces of ceramic tiles to create a colorful mosaic surface. No new cement, bricks, or materials were used in building this space. It was built by hand using simple tools and creative design. Everything used was waste, which kept the cost low and reduced environmental impact. This saved money and gave new life to discarded items.",
    "A functional, shaded space for discussion and study, blending artistic reuse with civil engineering resilience.",
    "Saved 75% in cost and cut 700+ kg CO₂. It’s now a powerful learning spot for sustainability in design and reuse.",
  ]

  const sampleImages = [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ]

  const title = "Our Creation Journey"
    const titleDescription = "Discover the story behind our innovation and commitment to excellence"
  return (
    <main>
      <ShowcaseBanner descriptions={sampleDescriptions} images={sampleImages} title={title}  titleDesription={titleDescription}/>
    </main>
  )
}