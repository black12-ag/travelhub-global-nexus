import { Property } from '@/components/PropertyCard';

export const sampleProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Ocean View Villa with Infinity Pool',
    location: 'Santorini, Greece',
    price: 450,
    rating: 4.9,
    reviews: 127,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    ],
    type: 'property',
    amenities: ['wifi', 'pool', 'parking', 'breakfast'],
    isVerified: true,
    isSuperhost: true
  },
  {
    id: '2',
    title: 'Boutique Hotel in Historic District',
    location: 'Paris, France',
    price: 280,
    rating: 4.7,
    reviews: 89,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'
    ],
    type: 'hotel',
    amenities: ['wifi', 'breakfast', 'parking'],
    isVerified: true
  },
  {
    id: '3',
    title: 'Modern Beachfront Apartment',
    location: 'Miami, Florida',
    price: 320,
    rating: 4.8,
    reviews: 156,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80'
    ],
    type: 'property',
    amenities: ['wifi', 'pool', 'parking'],
    isVerified: true
  },
  {
    id: '4',
    title: 'Mountain Resort & Spa',
    location: 'Aspen, Colorado',
    price: 520,
    rating: 4.9,
    reviews: 203,
    images: [
      'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80'
    ],
    type: 'hotel',
    amenities: ['wifi', 'pool', 'parking', 'breakfast'],
    isVerified: true,
    isSuperhost: true
  },
  {
    id: '5',
    title: 'Charming Countryside Cottage',
    location: 'Tuscany, Italy',
    price: 180,
    rating: 4.6,
    reviews: 74,
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
    ],
    type: 'property',
    amenities: ['wifi', 'parking'],
    isVerified: true
  },
  {
    id: '6',
    title: 'Urban Luxury Hotel Suite',
    location: 'Tokyo, Japan',
    price: 380,
    rating: 4.8,
    reviews: 167,
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'
    ],
    type: 'hotel',
    amenities: ['wifi', 'breakfast', 'parking'],
    isVerified: true
  },
  {
    id: '7',
    title: 'Desert Glamping Experience',
    location: 'Marrakech, Morocco',
    price: 240,
    rating: 4.7,
    reviews: 92,
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80'
    ],
    type: 'property',
    amenities: ['wifi', 'breakfast'],
    isVerified: true
  },
  {
    id: '8',
    title: 'Overwater Bungalow Paradise',
    location: 'Maldives',
    price: 850,
    rating: 5.0,
    reviews: 284,
    images: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80'
    ],
    type: 'hotel',
    amenities: ['wifi', 'pool', 'breakfast', 'parking'],
    isVerified: true,
    isSuperhost: true
  }
];

export const featuredDestinations = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    properties: 1250
  },
  {
    id: '2',
    name: 'Bali',
    country: 'Indonesia', 
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&q=80',
    properties: 890
  },
  {
    id: '3',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&q=80',
    properties: 2340
  },
  {
    id: '4',
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80',
    properties: 1670
  },
  {
    id: '5',
    name: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&q=80',
    properties: 320
  },
  {
    id: '6',
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
    properties: 980
  }
];