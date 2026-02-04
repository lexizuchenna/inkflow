// src/lib/mock-data.ts

export const MOCK_ARTICLE = {
  id: "the-sun-in-the-city-lagos",
  slug: "the-sun-in-the-city-lagos",
  category: "Travel & Lifestyle",
  title: "The Sun in the City: Finding Stillness in the Heart of Lagos",
  description:
    "An exploration of the hidden corners of Nigeria's most vibrant city, and why the modern writer needs chaos to find true silence.",
  date: "Jan 18, 2026",
  readTime: "12 min",
  bannerImage:
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600",

  // Author object for the ArticleHeader and AuthorBio components
  author: {
    name: "Grace Ochinokwu",
    handle: "chaptune",
    role: "Literary UGC Creator",
    avatar: "https://i.pravatar.cc/150?u=grace",
    bio: "I am a literary UGC creator who runs Sunrisewithenoh, an established book community. I help dedicated readers find their next obsession while exploring the intersection of travel, lifestyle, and the written word.",
    socials: {
      twitter: "https://twitter.com/chaptune",
      website: "https://sunrisewithenoh.com",
    },
  },

  // HTML Content designed to test your prose-inkflow CSS overrides
  content: `
    <p>In the beating heart of Lagos, silence is a luxury that few can afford, but many desperately seek. As the sun rises over the Third Mainland Bridge, painting the sky in shades of amber and gold, the city begins its daily symphony of chaos. Yet, for the modern writer, this chaos isn't an obstacle—it's the fuel.</p>
    
    <h2 id="the-architecture-of-chaos">The Architecture of Chaos</h2>
    <p>Lagos is a city built on momentum. From the yellow 'Danfo' buses weaving through traffic like golden threads in a tapestry to the street vendors selling plantain chips under the scorching heat, everything is in motion. But within this movement, there are "islands" of stillness.</p>
    
    <blockquote>
      "To write in Lagos is to learn how to breathe underwater. You find your rhythm not by avoiding the pressure, but by embracing the depth."
    </blockquote>

    <h2 id="hidden-sanctuaries">Hidden Sanctuaries</h2>
    <p>During my 'Sun in the City' travels, I discovered that the best stories aren't found in the crowded malls, but in the quiet bookshops of Victoria Island and the art galleries in Onikan. These spaces offer a stark contrast to the humidity and noise outside.</p>
    
    <figure>
      <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1200" alt="A quiet library in Lagos" />
      <figcaption>Finding peace among the shelves in a local Lagos library.</figcaption>
    </figure>

    <h3 id="the-writer-retreat">The Writer's Retreat</h3>
    <p>For those participating in the HNG internship or building startups like Choppify, finding a 'third space' is essential. It’s where the technical logic of code meets the fluid logic of storytelling. When you are deep in the 'flow state,' the sound of the city fades into a white noise that actually aids concentration.</p>

    <h2 id="final-thoughts">Final Thoughts</h2>
    <p>Lagos will never be quiet. But as creators, we don't need the city to be silent; we just need our minds to be still. As I continue to build out InkFlow, my goal is to provide a digital version of those quiet galleries—a place where your stories can finally breathe.</p>
  `,

  // Metadata for the RelatedArticles component
  related: [
    {
      id: "minimalism-nigerian-lifestyle",
      title: "The Silent Growth of Minimalist Living in Lagos",
      category: "Lifestyle",
      readTime: "6 min",
      image:
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800",
    },
    {
      id: "building-choppify",
      title: "Lessons Learned Building a Food Marketplace Startup",
      category: "Business",
      readTime: "15 min",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800",
    },
  ],
};
