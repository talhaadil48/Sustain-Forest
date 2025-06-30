import ShowcaseBanner from "@/components/ShowcaseBanner"

export default function Home() {
  const sampleDescriptions = [
    "We planted trees that are native and used to growing in dry areas. Instead of using chemical fertilizers, we added compost and mulch to the soil. The trees were spaced well so each one could get sunlight and room to grow. They were watered during the first few weeks, and now survive mostly on rain. No fancy watering system or piping was needed at all. These trees were chosen for their strength, health benefits, and low maintenance needs. Now they stand tall with almost no effort.",
    "This orchard is more than just a place for growing fruit—it’s a place for learning. Students come here to see how food grows naturally. The trees also improve the soil and stop it from washing away in the rain. The shade makes the area cooler and more pleasant for walking. Each tree has a story and a benefit, from nutrition to tradition. It’s peaceful, useful, and easy to care for. The whole area feels like a gift from nature.",
    "Now the trees give fruits that are fresh, chemical-free, and healthy. Families and visitors enjoy picking them during the season. They help reduce food costs while improving soil and air quality. The orchard has also become a favorite spot for schools and nature lovers. Many people are surprised how strong and useful these trees are. This one patch of land now supports both people and the planet. It proves that growing food can be simple and sustainable."
  ]

  const sampleImages = [
    "/images/Picture4.jpg?height=400&width=600",
    "/images/Picture5.jpg?height=400&width=600",
    "/images/Picture4.jpg?height=400&width=600",
  ]

  const title = "Fruit Orchard"
    const titleDescription = "A vibrant fruit orchard that offers food, shade, and clean air while welcoming birds, bees, and peaceful walks through nature."

  return (
    <main>
      <ShowcaseBanner descriptions={sampleDescriptions} images={sampleImages} title={title}  titleDesription={titleDescription}/>
    </main>
  )
}