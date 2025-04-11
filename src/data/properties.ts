
import { Property } from '@/types/property';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Lakefront House',
    price: 950000,
    address: '1234 Lakeview Dr',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    description: 'Stunning lakefront property with panoramic views and direct water access.',
    aiDescription: 'Experience waterfront luxury in this breathtaking modern residence. Floor-to-ceiling windows showcase sparkling lake views from every room, while the open-concept design creates a seamless flow between indoor and outdoor living. The chef\'s kitchen features top-of-the-line appliances and a massive island perfect for entertaining. Relax on your private dock or enjoy sunset views from multiple terraces. This is Pacific Northwest living at its finest.',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3200,
    yearBuilt: 2019,
    features: [
      { name: 'Waterfront', value: true },
      { name: 'Garage', value: 2 },
      { name: 'Pool', value: true },
      { name: 'Central AC', value: true },
      { name: 'Fireplace', value: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    featured: true,
    status: 'for-sale',
    createdAt: '2023-03-15T10:30:00Z',
    updatedAt: '2023-04-01T14:20:00Z',
    realtor: {
      id: 'r1',
      name: 'Jane Smith',
      phone: '(206) 555-1234',
      email: 'jane.smith@realestate.com',
      photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400'
    }
  },
  {
    id: '2',
    title: 'Downtown Luxury Condo',
    price: 650000,
    address: '567 Urban Ave',
    city: 'Portland',
    state: 'OR',
    zipCode: '97201',
    description: 'High-end condo in the heart of downtown with incredible city views.',
    aiDescription: 'Embrace city living at its finest in this sleek downtown condo offering breathtaking skyline views. The contemporary open floor plan is bathed in natural light thanks to floor-to-ceiling windows. Featuring premium finishes, a gourmet kitchen with waterfall countertops, and a primary suite with a spa-like bathroom. Building amenities include 24/7 concierge, fitness center, and rooftop terrace. Walking distance to top restaurants, shopping, and cultural attractions.',
    type: 'condo',
    bedrooms: 2,
    bathrooms: 2,
    area: 1450,
    yearBuilt: 2020,
    features: [
      { name: 'Doorman', value: true },
      { name: 'Elevator', value: true },
      { name: 'Gym', value: true },
      { name: 'Rooftop Deck', value: true },
      { name: 'Smart Home', value: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    featured: true,
    status: 'for-sale',
    createdAt: '2023-02-28T09:15:00Z',
    updatedAt: '2023-03-20T11:10:00Z',
    realtor: {
      id: 'r2',
      name: 'Michael Johnson',
      phone: '(503) 555-7890',
      email: 'michael.johnson@realestate.com',
      photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400'
    }
  },
  {
    id: '3',
    title: 'Charming Suburban Townhouse',
    price: 425000,
    address: '789 Maple Lane',
    city: 'Bellevue',
    state: 'WA',
    zipCode: '98004',
    description: 'Beautifully renovated townhouse in a family-friendly neighborhood.',
    aiDescription: 'Welcome to this meticulously maintained townhome in a sought-after community. Recently renovated with designer touches throughout, including hardwood floors, custom lighting, and a gourmet kitchen featuring stainless steel appliances and quartz countertops. The spacious primary bedroom offers a walk-in closet and ensuite bathroom with dual vanities. Enjoy summer evenings on your private patio overlooking communal green space. Located in top-rated school district with easy access to shopping, dining, and major highways.',
    type: 'townhouse',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    yearBuilt: 2015,
    features: [
      { name: 'Parking', value: 1 },
      { name: 'Patio', value: true },
      { name: 'Fireplace', value: true },
      { name: 'Hardwood Floors', value: true },
      { name: 'Community Pool', value: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    featured: false,
    status: 'for-sale',
    createdAt: '2023-03-05T14:00:00Z',
    updatedAt: '2023-03-25T16:45:00Z',
    realtor: {
      id: 'r3',
      name: 'Sarah Williams',
      phone: '(425) 555-4321',
      email: 'sarah.williams@realestate.com',
      photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400'
    }
  },
  {
    id: '4',
    title: 'Renovated Craftsman Bungalow',
    price: 575000,
    address: '321 Heritage Rd',
    city: 'Vancouver',
    state: 'WA',
    zipCode: '98661',
    description: 'Classic craftsman with modern updates and a large backyard.',
    aiDescription: 'Fall in love with this quintessential craftsman bungalow that perfectly blends historic charm with modern comfort. Original character details include wainscoting, built-ins, and a stone fireplace. The updated kitchen features custom cabinetry, high-end appliances, and a breakfast nook overlooking the lush backyard. Relax on the covered front porch or entertain on the back deck and patio. Located in a historic district with tree-lined streets, just minutes from downtown amenities and parks.',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 1950,
    yearBuilt: 1925,
    features: [
      { name: 'Garage', value: 1 },
      { name: 'Basement', value: true },
      { name: 'Fireplace', value: true },
      { name: 'Porch', value: true },
      { name: 'Renovated', value: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    featured: false,
    status: 'for-sale',
    createdAt: '2023-02-20T11:30:00Z',
    updatedAt: '2023-03-15T13:25:00Z',
    realtor: {
      id: 'r4',
      name: 'Robert Chen',
      phone: '(360) 555-8765',
      email: 'robert.chen@realestate.com',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400'
    }
  },
  {
    id: '5',
    title: 'Luxury Waterfront Villa',
    price: 1850000,
    address: '100 Shoreline Dr',
    city: 'Kirkland',
    state: 'WA',
    zipCode: '98033',
    description: 'Spectacular waterfront villa with private dock and panoramic lake views.',
    aiDescription: 'This breathtaking waterfront estate offers unparalleled luxury living with 180-degree lake and mountain views. The masterfully designed interior showcases soaring ceilings, walls of glass, and premium finishes throughout. The chef\'s kitchen is a culinary masterpiece with custom cabinetry, professional-grade appliances, and an expansive island. Entertain in style on multiple terraces or relax by the infinity pool overlooking the water. A private dock provides direct lake access for all your water activities.',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 5.5,
    area: 6200,
    yearBuilt: 2016,
    features: [
      { name: 'Waterfront', value: true },
      { name: 'Pool', value: true },
      { name: 'Hot Tub', value: true },
      { name: 'Wine Cellar', value: true },
      { name: 'Home Theater', value: true },
      { name: 'Smart Home', value: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    featured: true,
    status: 'for-sale',
    createdAt: '2023-03-01T08:45:00Z',
    updatedAt: '2023-03-30T15:30:00Z',
    realtor: {
      id: 'r5',
      name: 'Emily Wilson',
      phone: '(425) 555-2222',
      email: 'emily.wilson@realestate.com',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400'
    }
  },
  {
    id: '6',
    title: 'Mid-Century Modern Home',
    price: 720000,
    address: '456 Hillside Ave',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98112',
    description: 'Authentic mid-century modern house with original features and updated systems.',
    aiDescription: 'Step back in time with this impeccably preserved mid-century modern gem. Architectural features include post-and-beam construction, clerestory windows, and seamless indoor-outdoor flow. The thoughtfully updated kitchen maintains period-appropriate style while incorporating modern appliances and functionality. Walls of glass showcase verdant views of the surrounding landscape. Recent updates include new HVAC, electrical, and plumbing systems. A rare opportunity to own an architectural masterpiece in a coveted neighborhood.',
    type: 'house',
    bedrooms: 3,
    bathrooms: 2,
    area: 2200,
    yearBuilt: 1962,
    features: [
      { name: 'Carport', value: 2 },
      { name: 'Fireplace', value: true },
      { name: 'Original Hardwood', value: true },
      { name: 'Updated Systems', value: true },
      { name: 'View', value: true }
    ],
    images: [
      'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200'
    ],
    featured: false,
    status: 'for-sale',
    createdAt: '2023-02-15T13:20:00Z',
    updatedAt: '2023-03-10T10:15:00Z',
    realtor: {
      id: 'r6',
      name: 'David Park',
      phone: '(206) 555-9876',
      email: 'david.park@realestate.com',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400'
    }
  }
];
