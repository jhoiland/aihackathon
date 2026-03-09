// This file contains the expanded mock data
// It can be used to replace the original mockData.ts for more comprehensive destination data

// Additional Attractions for new cities:
const additionalAttractions = [
  // Athens
  {
    id: "parthenon-athens",
    cityId: "athens",
    name: "The Parthenon",
    description: "Ancient Greek temple dedicated to Athena, crowning the Acropolis",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1570077620514-4bef0e20c313?w=600&h=400&fit=crop",
    location: "Acropolis",
    tips: "Visit early morning or sunset for best light and fewer crowds. Wear comfortable hiking shoes.",
    whyRecommended: ["Ancient wonder", "Architectural masterpiece", "Historical significance"],
    tags: ["history", "culture", "art"],
    targetAgeGroups: ["25-34", "35-49", "50-64", "65+"],
  },
  {
    id: "acropolis-museum",
    cityId: "athens",
    name: "Acropolis Museum",
    description: "Modern museum showcasing ancient Greek artifacts and sculptures",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1549893472-f8b5a3b7fe32?w=600&h=400&fit=crop",
    location: "Acropolis Base",
    tips: "Allow 2-3 hours. Audio guide available. Visit late afternoon for evening light.",
    whyRecommended: ["World-class collection", "Interactive exhibits", "Modern architecture"],
    tags: ["culture", "history", "art"],
    targetAgeGroups: ["25-34", "35-49", "50-64", "65+"],
  },

  // Mexico City
  {
    id: "frida-kahlo-museum",
    cityId: "mexico-city",
    name: "Frida Kahlo Museum",
    description: "Iconic blue house museum dedicated to the legendary Mexican artist",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1585464014910-cd4628902046?w=600&h=400&fit=crop",
    location: "Coyoacán",
    tips: "Book tickets online. Best visited Tuesday-Thursday. Allow 1.5-2 hours.",
    whyRecommended: ["Artist's life story", "Authentic bohemian house", "Rich cultural insight"],
    tags: ["art", "culture", "history"],
    targetAgeGroups: ["18-24", "25-34", "35-49"],
  },

  // London
  {
    id: "british-museum",
    cityId: "london",
    name: "British Museum",
    description: "World-renowned museum with artifacts from around the globe including the Rosetta Stone",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
    location: "Bloomsbury",
    tips: "Free entry. Very large, plan 3-4 hours minimum. Consider audio guide.",
    whyRecommended: ["Vast collection", "Free entry", "World history"],
    tags: ["culture", "history", "art"],
    targetAgeGroups: ["25-34", "35-49", "50-64", "65+"],
  },
  {
    id: "tower-of-london",
    cityId: "london",
    name: "Tower of London",
    description: "Historic fortress housing the Crown Jewels and nearly 1000 years of history",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1572177812156-58036aae439c?w=600&h=400&fit=crop",
    location: "Tower Bridge",
    tips: "Book online in advance. Start with Crown Jewels early. Allow 2-3 hours.",
    whyRecommended: ["Crown Jewels", "Medieval architecture", "Historic significance"],
    tags: ["history", "culture"],
    targetAgeGroups: ["25-34", "35-49", "50-64", "65+"],
  },

  // Lisbon
  {
    id: "hieronymites-monastery",
    cityId: "lisbon",
    name: "Jerónimos Monastery",
    description: "Magnificent 16th-century monastery with stunning Manueline architecture",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1555881286-3062ee0c9a1b?w=600&h=400&fit=crop",
    location: "Belém",
    tips: "Free on Sundays until 2pm. Visit early morning. Allow 1.5 hours.",
    whyRecommended: ["Architectural masterpiece", "Cultural heritage", "UNESCO site"],
    tags: ["art", "culture", "history"],
    targetAgeGroups: ["25-34", "35-49", "50-64", "65+"],
  },

  // Sydney
  {
    id: "sydney-opera-house",
    cityId: "sydney",
    name: "Sydney Opera House",
    description: "Iconic and distinctive performing arts venue, a UNESCO World Heritage site",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1506973404073-8f96cfe49d02?w=600&h=400&fit=crop",
    location: "Bennelong Point",
    tips: "Book a show in advance. Take a guided tour. Visit at sunset.",
    whyRecommended: ["Iconic architecture", "World-class performances", "Stunning setting"],
    tags: ["art", "culture"],
    targetAgeGroups: ["18-24", "25-34", "35-49"],
  },
  {
    id: "bondi-beach",
    cityId: "sydney",
    name: "Bondi Beach",
    description: "Famous beach known for surfing, swimming, and coastal walks",
    type: "hidden-gem",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop",
    location: "Eastern Suburbs",
    tips: "Go early morning for parking and fewer crowds. Beware of rip currents. Seaweed in summer.",
    whyRecommended: ["Iconic beach", "Great surfing", "Scenic walks"],
    tags: ["adventure", "nature", "relaxation"],
    targetAgeGroups: ["18-24", "25-34", "35-49"],
  },

  // Rio de Janeiro
  {
    id: "christ-redeemer",
    cityId: "rio-de-janeiro",
    name: "Christ the Redeemer",
    description: "Colossal statue overlooking Rio with panoramic views of the city and Guanabara Bay",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1483729558449-99daa3600f5d?w=600&h=400&fit=crop",
    location: "Corcovado",
    tips: "Go early morning for best views and fewer tourists. Avoid during heavy rain.",
    whyRecommended: ["Iconic landmark", "Spectacular views", "Cultural symbol"],
    tags: ["photography", "history"],
    targetAgeGroups: ["18-24", "25-34", "35-49", "50-64"],
  },
  {
    id: "copacabana-beach",
    cityId: "rio-de-janeiro",
    name: "Copacabana Beach",
    description: "Legendary beach famous for sunbathing, swimming, and beach culture",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1500382017468-7049097e3e0b?w=600&h=400&fit=crop",
    location: "Copacabana",
    tips: "Safest during daytime. Rent beach chairs. Try açai bowls from vendors.",
    whyRecommended: ["Iconic beach", "Vibrant atmosphere", "People-watching"],
    tags: ["relaxation", "nature", "adventure"],
    targetAgeGroups: ["18-24", "25-34", "35-49"],
  },

  // Cairo
  {
    id: "pyramids-of-giza",
    cityId: "cairo",
    name: "Pyramids of Giza",
    description: "Three largest pyramids of Egypt, including the Great Pyramid, one of the Seven Wonders",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1504890957302-548466835fbc?w=600&h=400&fit=crop",
    location: "Giza Plateau",
    tips: "Hire a guide. Go early morning. Hire a camel for sunset views. Bring water and sunscreen.",
    whyRecommended: ["Ancient wonder", "Breathtaking scale", "Historical significance"],
    tags: ["history", "photography"],
    targetAgeGroups: ["25-34", "35-49", "50-64", "65+"],
  },

  // Venice
  {
    id: "st-marks-basilica",
    cityId: "venice",
    name: "St. Mark's Basilica",
    description: "Byzantine masterpiece with golden mosaics and priceless artifacts",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1514895786777-aed5f137af96?w=600&h=400&fit=crop",
    location: "St. Mark's Square",
    tips: "Dress respectfully (covered shoulders/knees). Visit early morning or evening.",
    whyRecommended: ["Architectural marvel", "Sacred art", "Historical treasure"],
    tags: ["art", "culture", "history"],
    targetAgeGroups: ["25-34", "35-49", "50-64", "65+"],
  },

  // Kyoto
  {
    id: "fushimi-inari-gates",
    cityId: "kyoto",
    name: "Fushimi Inari Shrine",
    description: "Famous shrine with thousands of vermillion torii gates winding up the mountain",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1522383750531-fde64955b2ae?w=600&h=400&fit=crop",
    location: "Fushimi Ward",
    tips: "Go very early morning (before 7am) for solitude. Wear hiking shoes. Allow 2-3 hours.",
    whyRecommended: ["Iconic imagery", "Spiritual atmosphere", "Natural setting"],
    tags: ["nature", "culture", "photography"],
    targetAgeGroups: ["18-24", "25-34", "35-49"],
  },
  {
    id: "arashiyama-bamboo",
    cityId: "kyoto",
    name: "Arashiyama Bamboo Grove",
    description: "Serene grove of towering bamboo stalks creating a peaceful, otherworldly atmosphere",
    type: "hidden-gem",
    image: "https://images.unsplash.com/photo-1522383750531-fde64955b2ae?w=600&h=400&fit=crop",
    location: "Arashiyama",
    tips: "Go early morning or dusk for fewer tourists. Avoid midday crowds.",
    whyRecommended: ["Peaceful setting", "Unique experience", "Great for photos"],
    tags: ["nature", "photography", "relaxation"],
    targetAgeGroups: ["18-24", "25-34", "35-49"],
  },

  // Madrid
  {
    id: "prado-museum",
    cityId: "madrid",
    name: "Prado Museum",
    description: "One of world's finest art museums with masterworks by Velázquez, Goya, and Bosch",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1540116651538-94a02b4dc209?w=600&h=400&fit=crop",
    location: "Barrio de las Letras",
    tips: "Free last 2 hours before closing (Tue-Sat 6pm-8pm, Sun 5pm-7pm). Allow 3-4 hours.",
    whyRecommended: ["World-class art", "Spanish masterpieces", "Cultural importance"],
    tags: ["art", "culture", "history"],
    targetAgeGroups: ["25-34", "35-49", "50-64", "65+"],
  },
  {
    id: "royal-palace-madrid",
    cityId: "madrid",
    name: "Royal Palace of Madrid",
    description: "Largest royal palace in Europe with 3,418 rooms of royal opulence",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1537431621336-d37fcda00c7f?w=600&h=400&fit=crop",
    location: "Centro",
    tips: "Book online. Consider English tour. Allow 1.5-2 hours.",
    whyRecommended: ["Architectural grandeur", "Historical insights", "Royal history"],
    tags: ["history", "culture"],
    targetAgeGroups: ["25-34", "35-49", "50-64"],
  },

  // Nice
  {
    id: "promenade-des-anglais",
    cityId: "nice",
    name: "Promenade des Anglais",
    description: "Iconic 7km seafront boulevard with stunning Mediterranean views",
    type: "must-see",
    image: "https://images.unsplash.com/photo-1499856871951-ff21da75a0c0?w=600&h=400&fit=crop",
    location: "Waterfront",
    tips: "Walk from west to east for best light. Rent bikes. Visit at sunset.",
    whyRecommended: ["Scenic walk", "Beach access", "Relaxing atmosphere"],
    tags: ["relaxation", "photography", "nature"],
    targetAgeGroups: ["18-24", "25-34", "35-49", "50-64"],
  },
  {
    id: "castle-hill-nice",
    cityId: "nice",
    name: "Castle Hill (Colline du Château)",
    description: "Historic hilltop with panoramic views of Nice, beach, and Bay of Angels",
    type: "hidden-gem",
    image: "https://images.unsplash.com/photo-1499856871951-ff21da75a0c0?w=600&h=400&fit=crop",
    location: "Old Town",
    tips: "Hike up or take elevator. Best at sunset. Bring water.",
    whyRecommended: ["Spectacular views", "Historic ruins", "Sunset spot"],
    tags: ["photography", "nature", "hiking"],
    targetAgeGroups: ["18-24", "25-34", "35-49", "50-64"],
  },
];

// Additional Restaurants for expanded cities
const additionalRestaurants = [
  // Athens
  {
    id: "taverna-psyrri-athens",
    cityId: "athens",
    name: "Taverna Psyrri",
    type: "Local Favorites",
    description: "Traditional family-run taverna with authentic Greek cuisine",
    cuisine: "Greek",
    priceLevel: "budget",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    location: "Psyrri District",
    rating: 4.6,
  },

  // Mexico City
  {
    id: "pujol-mexico",
    cityId: "mexico-city",
    name: "Pujol",
    type: "Fine-dining",
    description: "Chef's tasting menu featuring modern Mexican cuisine",
    cuisine: "Mexican Modern",
    priceLevel: "fine-dining",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    location: "Polanco",
    rating: 4.8,
  },

  // London
  {
    id: "duck-goose-london",
    cityId: "london",
    name: "The Ivy Market Grill",
    type: "Fine-dining",
    description: "Contemporary British cuisine in a historic market setting",
    cuisine: "British",
    priceLevel: "fine-dining",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    location: "Covent Garden",
    rating: 4.5,
  },

  // Lisbon
  {
    id: "Cafe-com-calma",
    cityId: "lisbon",
    name: "Café com Calma",
    type: "Budget",
    description: "Casual café famous for breakfast and fresh pastries",
    cuisine: "Portuguese",
    priceLevel: "budget",
    image: "https://images.unsplash.com/photo-1459755486867-b8d56ff8e162?w=600&h=400&fit=crop",
    location: "Bairro Alto",
    rating: 4.4,
  },

  // Sydney
  {
    id: "quay-sydney",
    cityId: "sydney",
    name: "Quay",
    type: "Fine-dining",
    description: "Chef's tasting menu with stunning Opera House views",
    cuisine: "Modern Australian",
    priceLevel: "fine-dining",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    location: "Circular Quay",
    rating: 4.7,
  },

  // Rio
  {
    id: "confeitaria-colombo-rio",
    cityId: "rio-de-janeiro",
    name: "Confeitaria Colombo",
    type: "Local Favorites",
    description: "Historic café from 1894 with traditional Brazilian treats",
    cuisine: "Brazilian",
    priceLevel: "budget",
    image: "https://images.unsplash.com/photo-1459755486867-b8d56ff8e162?w=600&h=400&fit=crop",
    location: "Downtown",
    rating: 4.5,
  },

  // Cairo
  {
    id: "koshari-nile-cairo",
    cityId: "cairo",
    name: "Koshari Nile",
    type: "Budget",
    description: "Legendary street food joint serving Egypt's favorite comfort dish",
    cuisine: "Egyptian",
    priceLevel: "budget",
    image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop",
    location: "Downtown",
    rating: 4.3,
  },

  // Venice
  {
    id: "cantina-do-momi-venice",
    cityId: "venice",
    name: "Cantina do Momi",
    type: "Local Favorites",
    description: "Small bacaro (wine bar) with cicchetti (Venetian small bites)",
    cuisine: "Venetian",
    priceLevel: "budget",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    location: "San Polo",
    rating: 4.4,
  },

  // Kyoto
  {
    id: "gion-tanto-kyoto",
    cityId: "kyoto",
    name: "Gion Tanto",
    type: "Fine-dining",
    description: "Intimate kaiseki restaurant in the historic Gion district",
    cuisine: "Japanese Kaiseki",
    priceLevel: "fine-dining",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    location: "Gion",
    rating: 4.7,
  },

  // Madrid
  {
    id: "balmoral-madrid",
    cityId: "madrid",
    name: "El Club All Day",
    type: "Budget",
    description: "Trendy café and restaurant with Spanish tapas and cocktails",
    cuisine: "Spanish",
    priceLevel: "mid-range",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    location: "Malasaña",
    rating: 4.4,
  },

  // Nice
  {
    id: "chez-pipo-nice",
    cityId: "nice",
    name: "Chez Pipo",
    type: "Local Favorites",
    description: "Family bistro famous for socca (chickpea crepes) and French Riviera cuisine",
    cuisine: "Provençal",
    priceLevel: "budget",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    location: "Old Town",
    rating: 4.5,
  },
];

// Additional Activities for expanded cities
const additionalActivities = [
  // Athens
  {
    id: "acropolis-sunset-walk",
    cityId: "athens",
    name: "Acropolis Sunset Walk",
    type: "guided-tour",
    description: "Guided walking tour ending with sunset at Acropolis viewpoint",
    duration: "4 hours",
    minAge: "all ages",
    price: "$45",
    highlights: ["Historical sites", "Sunset views", "Greek history lessons"],
  },

  // Mexico City
  {
    id: "day-trip-tenochtitlan",
    cityId: "mexico-city",
    name: "Tenochtitlan Day Trip",
    type: "guided-tour",
    description: "Explore ancient Aztec ruins and float on Lake Chapultepec",
    duration: "8 hours",
    minAge: "12+",
    price: "$65",
    highlights: ["Archaeological sites", "Aztec history", "Traditional markets"],
  },

  // London
  {
    id: "thames-river-cruise",
    cityId: "london",
    name: "Thames River Cruise",
    type: "guided-tour",
    description: "Scenic boat cruise from Westminster to Greenwich with Big Ben views",
    duration: "1-2 hours",
    minAge: "all ages",
    price: "$35",
    highlights: ["River views", "Iconic landmarks", "London story"],
  },

  // Lisbon
  {
    id: "sintra-cascais-tour",
    cityId: "lisbon",
    name: "Sintra & Cascais Day Tour",
    type: "guided-tour",
    description: "Full day tour to fairy-tale palaces and coastal cliffs",
    duration: "10 hours",
    minAge: "all ages",
    price: "$75",
    highlights: ["Pena Palace", "Cabo da Roca", "Coastal beauty"],
  },

  // Sydney
  {
    id: "bondi-to-coogee-walk",
    cityId: "sydney",
    name: "Bondi to Coogee Coastal Walk",
    type: "outdoor-activity",
    description: "Scenic 6km clifftop walk along famous Sydney beaches",
    duration: "2 hours",
    minAge: "all ages",
    price: "Free",
    highlights: ["Beach views", "Coastal scenery", "Rock pools"],
  },

  // Rio
  {
    id: "favela-tour",
    cityId: "rio-de-janeiro",
    name: "Responsible Favela Tour",
    type: "guided-tour",
    description: "Authentic community tour supporting local residents",
    duration: "3 hours",
    minAge: "14+",
    price: "$55",
    highlights: ["Local culture", "Community insight", "Street art"],
  },

  // Cairo
  {
    id: "nile-felucca-cruise",
    cityId: "cairo",
    name: "Nile Felucca Sunset Cruise",
    type: "guided-tour",
    description: "Traditional sailboat cruise on the Nile at golden hour",
    duration: "2 hours",
    minAge: "all ages",
    price: "$40",
    highlights: ["Nile views", "Sunset", "Egyptian experience"],
  },

  // Venice
  {
    id: "gondola-ride",
    cityId: "venice",
    name: "Traditional Gondola Ride",
    type: "guided-tour",
    description: "Classic 30-minute gondola ride through Venice's iconic canals",
    duration: "30 minutes",
    minAge: "all ages",
    price: "$80",
    highlights: ["Canal views", "Romantic experience", "Venetian tradition"],
  },

  // Kyoto
  {
    id: "geisha-show-dinner",
    cityId: "kyoto",
    name: "Traditional Geisha Show & Dinner",
    type: "cultural-experience",
    description: "Authentic dinner show with geisha performance and Japanese cuisine",
    duration: "2 hours",
    minAge: "18+",
    price: "$120",
    highlights: ["Geisha performance", "Traditional cuisine", "Cultural immersion"],
  },

  // Madrid
  {
    id: "flamenco-dinner-show",
    cityId: "madrid",
    name: "Flamenco Dinner Show",
    type: "cultural-experience",
    description: "Passionate flamenco performance with traditional Spanish dinner",
    duration: "2.5 hours",
    minAge: "all ages",
    price: "$90",
    highlights: ["Live flamenco", "Spanish cuisine", "Cultural experience"],
  },

  // Nice
  {
    id: "french-riviera-cooking-class",
    cityId: "nice",
    name: "French Riviera Cooking Class",
    type: "cultural-experience",
    description: "Learn to prepare Provençal dishes in a local kitchen",
    duration: "3 hours",
    minAge: "16+",
    price: "$85",
    highlights: ["Cooking skills", "Local cuisine", "Culinary culture"],
  },
];

// Additional Travel Tips for expanded cities
const additionalTravelTips = [
  {
    cityId: "athens",
    category: "transport",
    title: "Public Transport is Affordable",
    description: "Buy a multi-day ticket for metro, tram, and bus. Very reliable and cost-effective.",
  },
  {
    cityId: "mexico-city",
    category: "dining",
    title: "Street Food is Incredible",
    description: "Try tacos al pastor, elote, and tamales from street vendors. Cheap and delicious.",
  },
  {
    cityId: "london",
    category: "general",
    title: "Get an Oyster Card",
    description: "Load credit onto a contactless card for cheaper TfL fares than buying individual tickets.",
  },
  {
    cityId: "lisbon",
    category: "timing",
    title: "Visit in Shoulder Season",
    description: "April-May or September-October offer perfect weather and fewer tourists than summer.",
  },
  {
    cityId: "sydney",
    category: "safety",
    title: "Be Aware of UV Exposure",
    description: "The sun is stronger than expected. Use high SPF sunscreen even on cloudy days.",
  },
  {
    cityId: "rio-de-janeiro",
    category: "safety",
    title: "Use Registered Taxis",
    description: "Avoid unmarked taxis. Use Uber, 99 app, or registered white taxis with meter.",
  },
  {
    cityId: "cairo",
    category: "cultural",
    title: "Respect Local Customs",
    description: "Conservative dress is appreciated. Ramadan fasting affects restaurant hours.",
  },
  {
    cityId: "venice",
    category: "tourist-tip",
    title: "Buy Vaporetto Pass",
    description: "Public water bus pass is cheaper than multiple tickets if visiting multiple times.",
  },
  {
    cityId: "kyoto",
    category: "cultural",
    title: "Remove Shoes Frequently",
    description: "Many temples, restaurants, and homes require shoe removal. Wear easy-to-remove shoes.",
  },
  {
    cityId: "madrid",
    category: "dining",
    title: "Dinner Starts Late",
    description: "Restaurants rarely open before 8pm. Dinner is usually 9pm-11pm.",
  },
  {
    cityId: "nice",
    category: "general",
    title: "Learn Basic French",
    description: "English is less common here. Learning key phrases helps with locals.",
  },
];
