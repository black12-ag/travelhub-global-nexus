import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Star,
  Heart,
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  Map,
  SlidersHorizontal,
  Calendar,
  Users,
  DollarSign,
  Wifi,
  Car,
  Coffee,
  Waves,
  Dumbbell,
  PawPrint,
  X,
  Check,
  ArrowUpDown,
  Eye,
  Share2
} from 'lucide-react';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  host: {
    name: string;
    avatar: string;
    superhost: boolean;
  };
  isWishlisted: boolean;
  coordinates: [number, number];
  instantBook: boolean;
  cancellationPolicy: string;
}

interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  propertyType: string[];
  amenities: string[];
  instantBook: boolean;
  superhost: boolean;
  rating: number;
  bedrooms: number;
  bathrooms: number;
}

const SearchResults: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating' | 'newest'>('recommended');
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: 'Paris, France',
    checkIn: '2024-02-15',
    checkOut: '2024-02-22',
    guests: 2,
    minPrice: 0,
    maxPrice: 1000,
    propertyType: [],
    amenities: [],
    instantBook: false,
    superhost: false,
    rating: 0,
    bedrooms: 0,
    bathrooms: 0
  });

  const propertyTypes = [
    'Entire home/apt',
    'Private room',
    'Shared room',
    'Hotel room',
    'Villa',
    'Apartment',
    'House',
    'Condo',
    'Loft',
    'Cabin'
  ];

  const amenityList = [
    { name: 'WiFi', icon: Wifi },
    { name: 'Free parking', icon: Car },
    { name: 'Kitchen', icon: Coffee },
    { name: 'Pool', icon: Waves },
    { name: 'Gym', icon: Dumbbell },
    { name: 'Pet-friendly', icon: PawPrint },
    { name: 'Air conditioning', icon: null },
    { name: 'Heating', icon: null },
    { name: 'Washer', icon: null },
    { name: 'Dryer', icon: null },
    { name: 'TV', icon: null },
    { name: 'Hot tub', icon: null }
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockProperties: Property[] = [
        {
          id: 1,
          title: 'Luxury Apartment with Eiffel Tower View',
          location: '7th Arrondissement, Paris',
          price: 180,
          rating: 4.8,
          reviewCount: 127,
          images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400'
          ],
          amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'TV'],
          propertyType: 'Entire home/apt',
          bedrooms: 2,
          bathrooms: 1,
          guests: 4,
          host: {
            name: 'Marie Dubois',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=100',
            superhost: true
          },
          isWishlisted: false,
          coordinates: [48.8566, 2.3522],
          instantBook: true,
          cancellationPolicy: 'Flexible'
        },
        {
          id: 2,
          title: 'Cozy Studio in Montmartre',
          location: 'Montmartre, Paris',
          price: 95,
          rating: 4.6,
          reviewCount: 89,
          images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
            'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=400'
          ],
          amenities: ['WiFi', 'Kitchen', 'Pet-friendly'],
          propertyType: 'Entire home/apt',
          bedrooms: 1,
          bathrooms: 1,
          guests: 2,
          host: {
            name: 'Jean Pierre',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
            superhost: false
          },
          isWishlisted: true,
          coordinates: [48.8867, 2.3431],
          instantBook: false,
          cancellationPolicy: 'Moderate'
        },
        {
          id: 3,
          title: 'Modern Loft in Le Marais',
          location: 'Le Marais, Paris',
          price: 220,
          rating: 4.9,
          reviewCount: 203,
          images: [
            'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'
          ],
          amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'Washer', 'TV'],
          propertyType: 'Loft',
          bedrooms: 2,
          bathrooms: 2,
          guests: 4,
          host: {
            name: 'Sophie Martin',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
            superhost: true
          },
          isWishlisted: false,
          coordinates: [48.8566, 2.3522],
          instantBook: true,
          cancellationPolicy: 'Strict'
        },
        // Add more mock properties...
        {
          id: 4,
          title: 'Charming House with Garden',
          location: 'Saint-Germain, Paris',
          price: 320,
          rating: 4.7,
          reviewCount: 156,
          images: [
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'
          ],
          amenities: ['WiFi', 'Free parking', 'Kitchen', 'Pool', 'Pet-friendly'],
          propertyType: 'House',
          bedrooms: 3,
          bathrooms: 2,
          guests: 6,
          host: {
            name: 'Antoine Leroy',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            superhost: true
          },
          isWishlisted: false,
          coordinates: [48.8534, 2.3488],
          instantBook: false,
          cancellationPolicy: 'Moderate'
        }
      ];

      setProperties(mockProperties);
      setLoading(false);
    };

    fetchProperties();
  }, [searchParams]);

  const toggleWishlist = (propertyId: number) => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId 
        ? { ...property, isWishlisted: !property.isWishlisted }
        : property
    ));
  };

  const getSortedProperties = () => {
    const sorted = [...properties].sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        default:
          return 0; // recommended order
      }
    });
    return sorted;
  };

  const filteredProperties = getSortedProperties().filter(property => {
    // Apply filters based on searchParams
    if (searchParams.minPrice && property.price < searchParams.minPrice) return false;
    if (searchParams.maxPrice && property.price > searchParams.maxPrice) return false;
    if (searchParams.propertyType.length > 0 && !searchParams.propertyType.includes(property.propertyType)) return false;
    if (searchParams.amenities.length > 0 && !searchParams.amenities.some(amenity => property.amenities.includes(amenity))) return false;
    if (searchParams.instantBook && !property.instantBook) return false;
    if (searchParams.superhost && !property.host.superhost) return false;
    if (searchParams.rating && property.rating < searchParams.rating) return false;
    if (searchParams.bedrooms && property.bedrooms < searchParams.bedrooms) return false;
    if (searchParams.bathrooms && property.bathrooms < searchParams.bathrooms) return false;
    return true;
  });

  const PropertyCard: React.FC<{ property: Property; isListView?: boolean }> = ({ 
    property, 
    isListView = false 
  }) => (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 ${
      isListView ? 'flex' : ''
    }`}>
      {/* Image */}
      <div className={`relative ${isListView ? 'w-80 flex-shrink-0' : 'aspect-[4/3]'} group`}>
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => toggleWishlist(property.id)}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
        >
          <Heart className={`h-4 w-4 ${property.isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <div className="absolute bottom-3 left-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/80 hover:bg-white rounded-full">
            <Eye className="h-4 w-4 text-gray-600" />
          </button>
          <button className="p-2 bg-white/80 hover:bg-white rounded-full">
            <Share2 className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        {property.instantBook && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            Instant Book
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`p-4 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{property.title}</h3>
            <p className="text-sm text-gray-600 flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </p>
          </div>
          {property.host.superhost && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium ml-2">
              Superhost
            </span>
          )}
        </div>

        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-900 ml-1">{property.rating}</span>
          <span className="text-sm text-gray-600 ml-1">({property.reviewCount} reviews)</span>
        </div>

        <div className="text-sm text-gray-600 mb-2">
          {property.guests} guests · {property.bedrooms} bedrooms · {property.bathrooms} bathrooms
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 3).map((amenity) => (
            <span key={amenity} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{property.amenities.length - 3} more</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-gray-900">${property.price}</span>
            <span className="text-gray-600 text-sm"> / night</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  const FiltersPanel = () => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button 
          onClick={() => setShowFilters(false)}
          className="lg:hidden p-1 hover:bg-gray-100 rounded"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Min price</label>
              <input
                type="number"
                value={searchParams.minPrice}
                onChange={(e) => setSearchParams(prev => ({ ...prev, minPrice: parseInt(e.target.value) || 0 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="$0"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">Max price</label>
              <input
                type="number"
                value={searchParams.maxPrice}
                onChange={(e) => setSearchParams(prev => ({ ...prev, maxPrice: parseInt(e.target.value) || 1000 }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="$1000+"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Property Type</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={searchParams.propertyType.includes(type)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSearchParams(prev => ({
                    ...prev,
                    propertyType: checked
                      ? [...prev.propertyType, type]
                      : prev.propertyType.filter(t => t !== type)
                  }));
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Amenities</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {amenityList.map((amenity) => (
            <label key={amenity.name} className="flex items-center">
              <input
                type="checkbox"
                checked={searchParams.amenities.includes(amenity.name)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSearchParams(prev => ({
                    ...prev,
                    amenities: checked
                      ? [...prev.amenities, amenity.name]
                      : prev.amenities.filter(a => a !== amenity.name)
                  }));
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700 flex items-center">
                {amenity.icon && <amenity.icon className="h-4 w-4 mr-1" />}
                {amenity.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rooms & Beds */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Rooms & Beds</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Bedrooms</label>
            <select
              value={searchParams.bedrooms}
              onChange={(e) => setSearchParams(prev => ({ ...prev, bedrooms: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
              <option value={4}>4+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Bathrooms</label>
            <select
              value={searchParams.bathrooms}
              onChange={(e) => setSearchParams(prev => ({ ...prev, bathrooms: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={0}>Any</option>
              <option value={1}>1+</option>
              <option value={2}>2+</option>
              <option value={3}>3+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Special Offers</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={searchParams.instantBook}
              onChange={(e) => setSearchParams(prev => ({ ...prev, instantBook: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Instant Book</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={searchParams.superhost}
              onChange={(e) => setSearchParams(prev => ({ ...prev, superhost: e.target.checked }))}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Superhost</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => setSearchParams({
          ...searchParams,
          minPrice: 0,
          maxPrice: 1000,
          propertyType: [],
          amenities: [],
          instantBook: false,
          superhost: false,
          rating: 0,
          bedrooms: 0,
          bathrooms: 0
        })}
        className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="aspect-[4/3] bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Summary */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Stay in {searchParams.location}
              </h1>
              <p className="text-gray-600">
                {searchParams.checkIn} - {searchParams.checkOut} · {searchParams.guests} guests
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              {/* View Mode */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Map className="h-4 w-4" />
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-28">
              <FiltersPanel />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredProperties.length} properties found
              </p>
            </div>

            {/* Results Grid */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}

            {/* Results List */}
            {viewMode === 'list' && (
              <div className="space-y-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} isListView />
                ))}
              </div>
            )}

            {/* Map View */}
            {viewMode === 'map' && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Interactive Map</h3>
                <p className="text-gray-600 mb-4">
                  Map integration would be implemented here with a service like Google Maps or Mapbox
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProperties.slice(0, 4).map((property) => (
                    <div key={property.id} className="text-left p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900">{property.title}</h4>
                      <p className="text-sm text-gray-600">{property.location}</p>
                      <p className="text-lg font-bold text-gray-900">${property.price}/night</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredProperties.length === 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria to find more properties.
                </p>
                <button
                  onClick={() => setSearchParams({
                    ...searchParams,
                    minPrice: 0,
                    maxPrice: 1000,
                    propertyType: [],
                    amenities: [],
                    instantBook: false,
                    superhost: false,
                    rating: 0,
                    bedrooms: 0,
                    bathrooms: 0
                  })}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More */}
            {filteredProperties.length > 0 && (
              <div className="mt-12 text-center">
                <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Load More Properties
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
