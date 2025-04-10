
// This is a simulated AI description generator
// In a real application, you would connect to an AI service like OpenAI

type PropertyFeatures = {
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: string;
  yearBuilt: number;
  location: string;
  features: string[];
};

export const generateAIDescription = async (features: PropertyFeatures): Promise<string> => {
  console.log('Generating AI description with features:', features);
  
  // In a real implementation, this would be an API call to an AI service
  // For now, we'll simulate with a template-based approach
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const intro = getIntroByPropertyType(features.propertyType, features.location);
  const mainFeatures = getMainFeatures(features);
  const locationBenefits = getLocationBenefits(features.location);
  const conclusion = getConclusion(features.propertyType);
  
  return `${intro} ${mainFeatures} ${locationBenefits} ${conclusion}`;
};

const getIntroByPropertyType = (propertyType: string, location: string): string => {
  const intros = {
    house: [
      `Discover your dream home in this stunning ${propertyType} nestled in the heart of ${location}.`,
      `Welcome to this exceptional residence located in the prestigious ${location} area.`,
      `Experience the epitome of modern living in this remarkable ${propertyType} in ${location}.`
    ],
    apartment: [
      `Elevate your lifestyle in this sophisticated ${propertyType} in the vibrant ${location} district.`,
      `Urban luxury awaits in this stylish ${propertyType} situated in prime ${location}.`,
      `Embrace city living at its finest in this contemporary ${propertyType} in desirable ${location}.`
    ],
    condo: [
      `Indulge in luxury living in this upscale ${propertyType} in the coveted ${location} neighborhood.`,
      `Experience the perfect blend of comfort and convenience in this modern ${propertyType} in ${location}.`,
      `Welcome to your private sanctuary in this elegant ${propertyType} in the sought-after ${location} area.`
    ],
    townhouse: [
      `Charm and character define this exceptional ${propertyType} in the picturesque ${location} community.`,
      `Discover the perfect balance of space and location in this beautiful ${propertyType} in ${location}.`,
      `Welcome home to this exquisite ${propertyType} in the desirable ${location} neighborhood.`
    ],
    villa: [
      `Experience unparalleled luxury in this magnificent ${propertyType} in prestigious ${location}.`,
      `Indulge in the ultimate lifestyle in this breathtaking ${propertyType} situated in exclusive ${location}.`,
      `Opulence and elegance define this extraordinary ${propertyType} in the premier ${location} enclave.`
    ],
    land: [
      `Rare opportunity to own this pristine parcel in the coveted ${location} area.`,
      `Build your dream home on this exceptional ${propertyType} in desirable ${location}.`,
      `Unlimited potential awaits on this spectacular ${propertyType} in prime ${location}.`
    ]
  };
  
  const typeIntros = intros[propertyType as keyof typeof intros] || intros.house;
  return typeIntros[Math.floor(Math.random() * typeIntros.length)];
};

const getMainFeatures = (features: PropertyFeatures): string => {
  const bedroomText = features.bedrooms > 0 
    ? `${features.bedrooms} spacious bedroom${features.bedrooms > 1 ? 's' : ''}` 
    : '';
  
  const bathroomText = features.bathrooms > 0 
    ? `${features.bathrooms} designer bathroom${features.bathrooms > 1 ? 's' : ''}` 
    : '';
  
  const spaceText = features.squareFeet > 0 
    ? `approximately ${features.squareFeet} square feet of living space` 
    : '';
  
  const yearText = features.yearBuilt > 0 
    ? features.yearBuilt > 2000 
      ? `built in ${features.yearBuilt} with modern finishes` 
      : `built in ${features.yearBuilt} with timeless charm` 
    : '';
  
  const featuresText = features.features.length > 0 
    ? `Impressive amenities include ${features.features.slice(0, 3).join(', ')}${features.features.length > 3 ? ', and more' : ''}.`
    : '';
  
  let mainText = 'This property offers ';
  const featuresArray = [bedroomText, bathroomText, spaceText, yearText].filter(Boolean);
  
  if (featuresArray.length) {
    mainText += featuresArray.join(', ') + '. ';
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
  const conclusions = [
    `Don't miss this exceptional opportunity to make this spectacular property your own.`,
    `This property represents the perfect blend of luxury, comfort, and convenience.`,
    `A rare offering in today's market, this property won't last long.`,
    `Schedule your private showing today and experience everything this remarkable home has to offer.`
  ];
  
  return conclusions[Math.floor(Math.random() * conclusions.length)];
};
