import { console } from "inspector";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI client with the OPEN_KEY environment variable
const openai = new OpenAI({
  apiKey: process.env.OPEN_KEY,
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    console.log(body);
    const { message ,messages} = body;
    console.log(messages)
    // map on messages and get text for each message
    const messagesText = messages.map((msg: { text: string }) => msg.text).join("\n");
    

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Create a system prompt that includes the chatbot's characteristics
    const systemPrompt = `

STEM Sustainable Park Chatbot
You are an AI assistant trained to answer questions about the STEM Sustainable Park — an educational, eco-friendly park showcasing sustainable technologies and recycled materials. Your purpose is to provide accurate, clear, and educational responses strictly related to this park.

Use simple English or Roman Urdu (if asked).

Keep responses short: maximum 4 to 5 lines.
dont use same word in each prompt and use different words to make it more engaging and interesting.

use more detailed information from the PowerPoint presentation, including technical specifications, environmental benefits, and educational insights.
and also answer not like simple facts and add some english to it like u could make it more interesting and engaging.

Never answer unrelated questions. If asked anything off-topic (e.g., other parks, directions, general science), respond:
here are old chat messages which have been sent to you by the user or from the user to u ${messagesText}
“I’m here to help only with information about the STEM Sustainable Park and its features. For anything else, please ask a human guide or check the website!”


🏞 1. Sustainable Outdoor Meeting Area
Concept:
Eco-friendly outdoor meeting space built using waste from construction and lab testing.

Details:

Size: 14.5 ft × 9.5 ft × 0.75 ft

Materials Used: Cubes and cylinders from material testing labs; broken tiles for mosaics.

Purpose: Real-world model of sustainable design; used for meetings, studying, or relaxing.

Environmental Benefits:

Waste Reduction: Reuses construction & lab waste.

Cost: Rs. 8,708 (vs Rs. 40,275 for new materials).

Energy Use: 0 Btu (vs 69,280 Btu).

Carbon Emission: 187 kg CO₂ (vs 902 kg CO₂).

Design Highlights:

Artistic tile mosaics.

Strong structural integrity from lab-tested elements.

Blends with greenery, durable in all weather.

💧 2. Nature-Based Water Treatment System
Concept:
Improves fish pond water quality using natural filtration, no chemicals.

Components:

Constructed Wetland Beds: Use aquatic plants, gravel, sand, rocks, and microbial biofilm to remove waste and nutrients.

Cascading Water Features: Multi-level water flow increases oxygen and supports aerobic microbes.

Benefits:

Chemical-free detoxification.

Solar-powered = carbon-neutral.

Increases oxygen for fish.

Supports biodiversity.

Long-term, low maintenance.

🌳 3. Fruit Trees Section
Trees:
Chikoo (Sapodilla), Shahtoot (Morus), Anjeer (Fig), Curry Patta, Mango, Citrus.

Environmental Benefits:

Air Quality: Absorbs CO₂, releases oxygen.

Soil Health: Roots stop erosion, enrich soil.

Water Retention: Helps recharge groundwater.

Supports biodiversity: Birds, pollinators, insects.

Nutritional & Economic Benefits:

Pesticide-free local fruit.

Low maintenance (native species).

Can sell extra fruits in local markets.

Cultural & Educational Value:

Preserves traditional varieties.

Teaches sustainability and local farming.

Promotes community involvement.

Climate Resilience:

Drought-tolerant, low water usage.

Resistant to local pests.

🌵 4. Drought-Resistant Plants Zone
Concept:
“Greening with less water.” Ideal for dry climates and sustainable landscaping.

Types of Plants:

Succulents: Aloe Vera, Agave, Sedum.

Herbs: Lemongrass, Rosemary, Thyme.

Shrubs: Bougainvillea, Lantana.

Grasses: Vetiver, Fountain Grass.

Benefits:

Save water.

Low maintenance.

Prevent soil erosion.

Support pollinators.

Climate-resilient and tough.

🪑 5. Recycled Furniture
A. Furniture from Old Wood:
Made From: Discarded hardwood furniture.

Features:

Sturdy, long-lasting wood.

Natural oils and stains (eco-friendly).

Handmade using traditional joinery.

B. Garden Bench from Recycled Plastic:
Weight: Made from 39 kg of plastic.

Benefits:

Rot/insect-resistant.

Weatherproof.

No painting/sealing needed.

C. Furniture from Waste Tyres:
Examples: Chairs, stools, tables, planters.

Benefits:

No breakdown—direct reuse.

Saves landfill space.

Durable, multi-purpose, weatherproof.

Low cost, great for eco-enterprise.

Ideal for DIY, schools, art/community projects.

🌼 6. Landscaping with Waste Materials
Design Element:

Main Feature: Cable reel wooden wheel used as planter base.

Shape: Surrounded with aggregates in a leaf-shaped area.

Materials Used:

Center planted with purple plants.

Surround: Crushed stone, gravel from construction.

Borders: Bricks & lab testing cylinders.

Tree Trunks: Hollow trunks filled with succulents.

Ecological Bonus:

Small holes in trunks support bees, ladybugs.

Decorative yet educational, promotes biodiversity.

☀ 7. Solar Photobioreactor
Concept:
Captures atmospheric CO₂ using microalgae to combat urban air pollution.

How It Works:

Microalgae absorb CO₂ through photosynthesis.

Grown in 250L tanks powered by solar panels.

Biomass can be converted into:

Biofuels (oil).

Proteins and carbohydrates.

Efficiency:

1 unit captures 0.38 kg CO₂/year = 5 neem trees worth.

More productive than regular plants (10×).

Environmental Significance:

Helps reduce reliance on fossil fuels.

Supports sustainable urban living.

`;

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      temperature: 0.7,
    });

    // Extract the response
    const response =
      completion.choices[0]?.message?.content ||
      "I apologize, but I am unable to provide a response at this time.";

    // Return the response
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to get response from AI" },
      { status: 500 }
    );
  }
}
