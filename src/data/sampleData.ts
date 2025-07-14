import { Property } from '@/components/PropertyCard';

export const addisAbabaAreas = [
  'Bole',
  'Kazanchis', 
  'Piazza',
  'Mexico',
  'Gerji',
  'CMC',
  'Lebu',
  'Kirkos'
];

export const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Sheraton Addis Hotel',
    location: 'Bole, Addis Ababa',
    price: 120,
    rating: 4.8,
    reviews: 245,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    ],
    type: 'hotel',
    amenities: ['wifi', 'parking', 'pool', 'breakfast'],
    isVerified: true,
    isSuperhost: true,
    distance: '2.1 km',
    area: 'Bole',
    description: 'Luxury hotel in the heart of Bole district with modern amenities and excellent service.',
    reviews_data: [
      { id: 1, user: 'John Doe', rating: 5, comment: 'Excellent service and beautiful rooms!', date: '2024-01-15' },
      { id: 2, user: 'Jane Smith', rating: 4, comment: 'Great location near the airport.', date: '2024-01-10' }
    ]
  },
  {
    id: '2',
    title: 'Hilton Addis Ababa',
    location: 'Kazanchis, Addis Ababa',
    price: 150,
    rating: 4.9,
    reviews: 189,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    ],
    type: 'hotel',
    amenities: ['wifi', 'parking', 'pool', 'breakfast'],
    isVerified: true,
    isSuperhost: true,
    distance: '3.5 km',
    area: 'Kazanchis',
    description: 'Premium international hotel with world-class facilities and stunning city views.',
    reviews_data: [
      { id: 3, user: 'Ahmed Ali', rating: 5, comment: 'Perfect stay with amazing breakfast!', date: '2024-01-20' },
      { id: 4, user: 'Sarah Wilson', rating: 5, comment: 'Outstanding service and facilities.', date: '2024-01-18' }
    ]
  },
  {
    id: '3',
    title: 'Radisson Blu Hotel',
    location: 'Bole, Addis Ababa',
    price: 135,
    rating: 4.7,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    ],
    type: 'hotel',
    amenities: ['wifi', 'parking', 'pool', 'breakfast'],
    isVerified: true,
    distance: '1.8 km',
    area: 'Bole',
    description: 'Modern hotel with excellent dining options and convenient location.',
    reviews_data: [
      { id: 5, user: 'Michael Chen', rating: 4, comment: 'Good hotel with nice pool area.', date: '2024-01-22' }
    ]
  },
  {
    id: '4',
    title: 'Ethiopian Skylight Hotel',
    location: 'Piazza, Addis Ababa',
    price: 85,
    rating: 4.5,
    reviews: 203,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    ],
    type: 'hotel',
    amenities: ['wifi', 'breakfast'],
    isVerified: true,
    distance: '5.2 km',
    area: 'Piazza',
    description: 'Historic hotel in the cultural heart of Addis Ababa with authentic Ethiopian hospitality.',
    reviews_data: [
      { id: 6, user: 'Almaz Tadesse', rating: 5, comment: 'Authentic Ethiopian experience!', date: '2024-01-25' }
    ]
  },
  {
    id: '5',
    title: 'Capital Hotel & Spa',
    location: 'Mexico, Addis Ababa',
    price: 95,
    rating: 4.6,
    reviews: 178,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    ],
    type: 'hotel',
    amenities: ['wifi', 'parking', 'breakfast'],
    isVerified: true,
    distance: '4.1 km',
    area: 'Mexico',
    description: 'Comfortable hotel with spa services and great value for money.',
    reviews_data: [
      { id: 7, user: 'David Brown', rating: 4, comment: 'Great spa and friendly staff.', date: '2024-01-28' }
    ]
  },
  {
    id: '6',
    title: 'Bole Skygate Hotel',
    location: 'Bole, Addis Ababa',
    price: 110,
    rating: 4.4,
    reviews: 92,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    ],
    type: 'hotel',
    amenities: ['wifi', 'parking'],
    isVerified: true,
    distance: '1.2 km',
    area: 'Bole',
    description: 'Airport hotel perfect for business travelers and transit guests.',
    reviews_data: [
      { id: 8, user: 'Lisa Johnson', rating: 4, comment: 'Convenient for airport travel.', date: '2024-01-30' }
    ]
  },
  {
    id: '7',
    title: 'Jupiter International Hotel',
    location: 'Kazanchis, Addis Ababa',
    price: 125,
    rating: 4.3,
    reviews: 145,
    images: [
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
    ],
    type: 'hotel',
    amenities: ['wifi', 'parking', 'breakfast'],
    isVerified: true,
    distance: '3.8 km',
    area: 'Kazanchis',
    description: 'Established hotel with traditional hospitality and modern comforts.',
    reviews_data: [
      { id: 9, user: 'Robert Kim', rating: 4, comment: 'Good central location.', date: '2024-02-01' }
    ]
  },
  {
    id: '8',
    title: 'Elilly International Hotel',
    location: 'Gerji, Addis Ababa',
    price: 75,
    rating: 4.2,
    reviews: 167,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    ],
    type: 'hotel',
    amenities: ['wifi', 'parking'],
    isVerified: true,
    distance: '6.5 km',
    area: 'Gerji',
    description: 'Budget-friendly hotel with clean rooms and essential amenities.',
    reviews_data: [
      { id: 10, user: 'Emma Davis', rating: 4, comment: 'Great value for money.', date: '2024-02-03' }
    ]
  },
];

export const featuredDestinations = [
  {
    id: '1',
    name: 'Bole',
    country: 'Addis Ababa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    properties: 25,
    description: 'Modern district near Bole Airport with luxury hotels'
  },
  {
    id: '2', 
    name: 'Kazanchis',
    country: 'Addis Ababa',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    properties: 18,
    description: 'Business district with international hotels'
  },
  {
    id: '3',
    name: 'Piazza',
    country: 'Addis Ababa', 
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
    properties: 12,
    description: 'Historic area with cultural attractions'
  },
  {
    id: '4',
    name: 'Mexico',
    country: 'Addis Ababa',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    properties: 15,
    description: 'Central location with government offices'
  },
];