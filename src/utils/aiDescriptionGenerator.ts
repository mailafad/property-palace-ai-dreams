// This is a simulated AI description generator
// In a real application, you would connect to an AI service like OpenAI

type PropertyFeatures = {
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
  propertyType: string;
  yearBuilt?: number;
  location: string;
  features?: string[];
};

export const generateAIDescription = async (features: PropertyFeatures): Promise<string> => {
  console.log('Generating AI description with features:', features);

  // Compose a prompt for Gemini
  const prompt = `
You are a real estate market expert. Given the following property details, analyze and provide strong selling points and highlights, considering current market trends and the growth of the area. Do not start your response with generic phrases like "Sure," "Here are," or "As an AI." Go straight to the highlights.

Property Details:
${typeof features.bedrooms === 'number' ? `Bedrooms: ${features.bedrooms}\n` : ''}
${typeof features.bathrooms === 'number' ? `Bathrooms: ${features.bathrooms}\n` : ''}
${typeof features.squareFeet === 'number' ? `Square Feet: ${features.squareFeet}\n` : ''}
Property Type: ${features.propertyType}
${typeof features.yearBuilt === 'number' ? `Year Built: ${features.yearBuilt}\n` : ''}
Location: ${features.location}
${features.features && features.features.length > 0 ? `Features: ${features.features.join(", ")}\n` : ''}
`;

  try {
    const res = await fetch("/api/gemini-property-highlights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: prompt,
        location: features.location
      })
    });
    const data = await res.json();
    return data.highlights || "No highlights generated.";
  } catch (e) {
    return "Failed to generate highlights.";
  }
};

const getIntroByPropertyType = (propertyType: string, location: string): string => {
  const intros = {
    'land': [
      `Discover this exceptional ${propertyType} opportunity in the prime location of ${location}.`,
      `Exceptional investment potential awaits with this pristine ${propertyType} in ${location}.`,
      `Prime ${propertyType} available in the highly sought-after ${location} area.`
    ],
    'individual-house': [
      `Welcome to this magnificent individual house nestled in the heart of ${location}.`,
      `Experience luxury living in this stunning individual house in prestigious ${location}.`,
      `Discover your dream home in this exceptional individual house in ${location}.`
    ],
    'individual-bungalow': [
      `Experience the grandeur of this luxurious bungalow in the exclusive ${location} area.`,
      `Welcome to this stately bungalow offering the perfect blend of elegance and comfort in ${location}.`,
      `Discover refined living in this distinguished bungalow in prime ${location}.`
    ],
    'flat-apartment': [
      `Elevate your lifestyle in this sophisticated apartment in the vibrant ${location} district.`,
      `Urban luxury awaits in this stylish apartment situated in prime ${location}.`,
      `Embrace city living at its finest in this contemporary apartment in desirable ${location}.`
    ],
    'villa': [
      `Experience unparalleled luxury in this magnificent villa in prestigious ${location}.`,
      `Indulge in the ultimate lifestyle in this breathtaking villa situated in exclusive ${location}.`,
      `Opulence and elegance define this extraordinary villa in the premier ${location} enclave.`
    ],
    'shop': [
      `Prime retail shop opportunity in the bustling area of ${location}.`,
      `Unlock your business potential with this well-located shop in ${location}.`,
      `Exceptional shop space available in the heart of ${location}.`
    ],
    'office': [
      `Modern office space in a strategic location at ${location}.`,
      `Elevate your business with this premium office in ${location}.`,
      `Professional office environment in the thriving area of ${location}.`
    ],
    'commercial-space': [
      `Versatile commercial space in the prime business district of ${location}.`,
      `Expand your enterprise with this outstanding commercial property in ${location}.`,
      `Exceptional commercial space available in the sought-after ${location} area.`
    ]
  };
  
  const typeIntros = intros[propertyType as keyof typeof intros] || intros['individual-house'];
  return typeIntros[Math.floor(Math.random() * typeIntros.length)];
};

const getMainFeatures = (features: PropertyFeatures): string => {
  const bedroomText = typeof features.bedrooms === 'number' && features.bedrooms > 0
    ? `${features.bedrooms} spacious bedroom${features.bedrooms > 1 ? 's' : ''}`
    : '';

  const bathroomText = typeof features.bathrooms === 'number' && features.bathrooms > 0
    ? `${features.bathrooms} designer bathroom${features.bathrooms > 1 ? 's' : ''}`
    : '';

  const spaceText = typeof features.squareFeet === 'number' && features.squareFeet > 0
    ? `approximately ${features.squareFeet} square feet of space`
    : '';

  const yearText = typeof features.yearBuilt === 'number' && features.yearBuilt > 0
    ? features.yearBuilt > 2000
      ? `built in ${features.yearBuilt} with modern finishes`
      : `built in ${features.yearBuilt} with timeless charm`
    : '';

  const featuresText = features.features && features.features.length > 0
    ? `Impressive amenities include ${features.features.slice(0, 3).join(', ')}${features.features.length > 3 ? ', and more' : ''}.`
    : '';

  let mainText = 'This property offers ';
  const featuresArray = [bedroomText, bathroomText, spaceText, yearText].filter(Boolean);

  if (featuresArray.length) {
    mainText += featuresArray.join(', ') + '. ';
  } else if (featuresText) {
    mainText += featuresText;
    return mainText;
  } else {
    return '';
  }

  return mainText + featuresText;
};

const getLocationBenefits = (location: string): string => {
  const benefits = [
    `Ideally located near shopping, dining, and entertainment options in ${location}.`,
    `Enjoy the convenience of nearby parks, schools, and major transportation routes in ${location}.`,
    `The perfect location offers easy access to all that ${location} has to offer.`,
    `Experience the best of ${location} with proximity to local attractions and amenities.`
  ];
  
  return benefits[Math.floor(Math.random() * benefits.length)];
};

const getConclusion = (propertyType: string): string => {
  const conclusions = {
    'land': [
      "This is a rare opportunity to acquire prime land in a rapidly developing area.",
      "Don't miss this chance to invest in a property with tremendous potential.",
      "Perfect for development or building your dream project."
    ],
    'individual-house': [
      "Schedule your private tour today and experience the comfort of this individual house.",
      "This thoughtfully designed home offers the perfect setting for modern living.",
      "A rare offering that combines location, comfort, and style."
    ],
    'individual-bungalow': [
      "Experience the prestige of bungalow living in this exceptional property.",
      "A truly unique opportunity to own a distinguished bungalow in a prime location.",
      "This prestigious bungalow represents the pinnacle of luxury living."
    ],
    'flat-apartment': [
      "Modern amenities and contemporary design make this apartment a must-see.",
      "Experience the convenience of apartment living in this stellar property.",
      "Don't miss this opportunity to secure your perfect urban retreat."
    ],
    'villa': [
      "This extraordinary villa represents the epitome of luxury living.",
      "A rare gem in today's market, this villa offers unparalleled elegance and comfort.",
      "Schedule your private viewing to experience this exceptional villa firsthand."
    ],
    'shop': [
      "Don't miss this chance to secure a prime retail location for your business.",
      "A rare opportunity for entrepreneurs to establish their presence in a thriving area.",
      "Take your business to the next level with this exceptional shop space."
    ],
    'office': [
      "Elevate your company's image with this outstanding office space.",
      "A strategic location for your growing business needs.",
      "Schedule a viewing to experience this professional office environment."
    ],
    'commercial-space': [
      "Unlock the potential of your business with this versatile commercial property.",
      "A unique opportunity to expand in a high-demand commercial district.",
      "Contact us today to explore this exceptional commercial space."
    ]
  };

  const typeConclusions = conclusions[propertyType as keyof typeof conclusions] || [
    "Don't miss this exceptional opportunity to make this spectacular property your own.",
    "This property represents the perfect blend of luxury, comfort, and convenience.",
    "Schedule your private showing today and experience everything this remarkable home has to offer."
  ];

  return typeConclusions[Math.floor(Math.random() * typeConclusions.length)];
};
