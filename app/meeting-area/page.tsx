
import ShowcaseBanner from "@/components/ShowcaseBanner"

export default function Home() {
  const sampleDescriptions = [
    "We collected concrete cubes and cylinders that were used in lab tests and would normally be thrown away. These blocks were arranged to form a strong foundation for the platform. On top of them, we carefully placed broken pieces of ceramic tiles to create a colorful mosaic surface. No new cement, bricks, or materials were used in building this space. It was built by hand using simple tools and creative design. Everything used was waste, which kept the cost low and reduced environmental impact. This saved money and gave new life to discarded items.",
    "The platform is strong and big enough for a group of people to sit comfortably. It is often used for outdoor classes, small events, and peaceful breaks. The tile surface is smooth, safe, and easy to clean, even after rain. Many visitors are surprised when they find out that it was made from leftover materials. It fits naturally into the green space and doesn’t need much care. The look is both modern and artistic, without harming the environment. It shows how design and reuse can work together beautifully.",
    "This seating area helped save over 75% of the money compared to a normal cement floor. It also avoided more than 700 kilograms of carbon pollution. Now it is used every week by school groups, visitors, and families. It teaches people about recycling, low-cost construction, and climate-friendly design. Students enjoy learning in a space built with real-world reuse. The project has inspired others to build from waste as well. A simple idea became a powerful tool for learning and change."
  ]

  const sampleImages = [
    "/images/Picture2.png?height=400&width=600",
    "/images/Picture2.png?height=400&width=600",
    "/images/Picture2.png?height=400&width=600",
  ]

  const title = "Meeting Area"
    const titleDescription = "An eco-friendly seating spot made from recycled construction waste, blending beauty, comfort, and sustainability in the park."
  return (
    <main>
      <ShowcaseBanner descriptions={sampleDescriptions} images={sampleImages} title={title}  titleDesription={titleDescription}/>
    </main>
  )
}
