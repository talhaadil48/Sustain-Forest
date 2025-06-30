import ShowcaseBanner from "@/components/ShowcaseBanner"

export default function Home() {
  const sampleDescriptions = [
    "We dug a shallow area near the pond and filled it with gravel, sand, and plants that live in water. These plants help clean dirty water by trapping waste and absorbing it through their roots. A simple stone cascade was added to let the water flow gently, which also adds oxygen. We didn’t use any pumps or electrical tools to run it. The whole system works naturally and doesn’t require much care. Only solar energy and plant power make it work every day. It is easy to build, beautiful to look at, and useful all year.",
    "This wetland does more than clean water—it supports wildlife and improves the park’s beauty. Birds, frogs, and butterflies often visit the area. Students enjoy learning about how the system works during science lessons. The plants grow fast without needing fertilizers. The gentle sound of the waterfall makes it a relaxing place. It fits naturally into the landscape, like a stream in the forest. This one spot adds so much value to the park experience.",
    "Thanks to this system, the pond water stays clean without any machines. There is less smell, fewer algae, and healthier fish inside the pond. We save electricity and avoid using harmful chemicals. Visitors are amazed to see that it works on its own. It helps people understand that nature has its own ways of solving problems. Now this small stream teaches big lessons about sustainability. It’s simple, silent, and smart."
  ]

  const sampleImages = [
    "/images/Picture3.png?height=400&width=600",
    "/images/Picture3.png?height=400&width=600",
    "/images/Picture3.png?height=400&width=600",
  ]

  const title = "Water Wetland"
    const titleDescription = "A self-cleaning natural wetland that purifies pond water using plants, sunlight, and gravity—no machines, just nature at work."
  return (
    <main>
      <ShowcaseBanner descriptions={sampleDescriptions} images={sampleImages} title={title}  titleDesription={titleDescription}/>
    </main>
  )
}