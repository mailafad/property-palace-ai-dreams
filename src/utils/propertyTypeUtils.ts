import { Property } from '@/types/property';

export const formatPropertyType = (property: Property) => {
  if (!property?.type) {
    return 'Unknown Type';
  }

  const mainTypeMap = {
    'land': 'Land / Plot',
    'individual-house': 'Individual House',
    'individual-bungalow': 'Individual Bungalow',
    'flat-apartment': 'Flat / Apartment',
    'villa': 'Villa',
    'shop': 'Shop',
    'office': 'Office',
    'commercial-space': 'Commercial Space'
  };

  const subTypeMap = {
    // Land subtypes
    'residential': 'Residential',
    'commercial': 'Commercial',
    'industrial': 'Industrial',
    'agricultural': 'Agricultural',
    // Flat/Apartment subtypes
    'studio': 'Studio',
    'duplex': 'Duplex',
    'penthouse': 'Penthouse',
    // Villa subtypes
    'individual': 'Individual Villa',
    'twin': 'Twin Villa',
    'row-house': 'Row House Villa',
    'semi-independent': 'Semi Independent Villa',
    'beach': 'Beach Villa'
  };

  const mainTypeDisplay = mainTypeMap[property.type.mainType] || 'Unknown Type';
  const subTypeDisplay = property.type.subType ? subTypeMap[property.type.subType] : null;

  return subTypeDisplay ? `${mainTypeDisplay} - ${subTypeDisplay}` : mainTypeDisplay;
};