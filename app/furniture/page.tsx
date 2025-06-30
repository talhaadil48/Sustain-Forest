import ShowcaseBanner from "@/components/ShowcaseBanner"

export default function Home() {
  const sampleDescriptions = [
    `We collected old tyres, wooden furniture pieces, and plastic waste from nearby sources. Each tyre was cleaned, painted, and shaped into chairs and stools. Old hardwood was used to build tables and backrests, and recycled plastic was shaped into long seat planks. All pieces were designed by hand and made to last in sun and rain. We didn’t use any new materials to build this furniture. Everything was repaired, reused, and finished with natural oil. The results were strong, safe, and ready to use.`,
    `The furniture looks unique and brings color to every corner of the park. Some pieces are round, others square, and many have bright paint or fun patterns. People often smile when they learn they’re sitting on recycled tyres or old wood. The benches are placed under trees, beside flowers, or near learning spots. They are useful for resting, eating lunch, or reading a book. These seats invite people to stay longer in the park. They also inspire ideas for building reused furniture at home.`,
    `This furniture project helped reduce waste and gave it new life. It kept tyres, plastic, and broken wood out of landfills. The park saved money by not buying new seats, and it still got strong, long-lasting furniture. Visitors now ask how they can build similar things. Schools nearby have started trying reuse projects of their own. The furniture adds learning to every place it sits. It proves that even waste can be part of a better, greener future.`
  ]

  const sampleImages = [
    "/images/Picture10.png?height=400&width=600",
    "/images/pic3.jpg?height=400&width=600",
    "/images/pic1.png?height=400&width=600",
  ]

    const title = "Upcycled Furniture"
    const titleDescription = `All the benches and chairs are made from old tyres, wood, and plastic.
They are strong, colorful, and built from waste to inspire others.`
  return (
    <main>
      <ShowcaseBanner descriptions={sampleDescriptions} images={sampleImages} title={title}  titleDesription={titleDescription}/>
    </main>
  )
}