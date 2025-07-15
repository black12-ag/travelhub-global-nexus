import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Filter, Star, Wifi, Car, Coffee, Dumbbell, Waves } from 'lucide-react';

export interface FilterOptions {
  priceRange: [number, number];
  starRating: number[];
  amenities: string[];
  propertyType: string[];
  districtPreference: string;
  sortBy: string;
}

interface SearchFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen: boolean;
  onClose: () => void;
}

const amenitiesList = [
  { id: 'wifi', label: 'Free WiFi', icon: Wifi },
  { id: 'parking', label: 'Free Parking', icon: Car },
  { id: 'breakfast', label: 'Breakfast Included', icon: Coffee },
  { id: 'gym', label: 'Fitness Center', icon: Dumbbell },
  { id: 'pool', label: 'Swimming Pool', icon: Waves },
  { id: 'spa', label: 'Spa Services', icon: Star },
  { id: 'restaurant', label: 'Restaurant', icon: Coffee },
  { id: 'airport', label: 'Airport Shuttle', icon: Car },
  { id: 'bar', label: 'Bar/Lounge', icon: Coffee },
  { id: 'laundry', label: 'Laundry Service', icon: Star },
];

const propertyTypes = [
  'Hotel', 'Apartment', 'Guest House', 'Villa', 'Resort', 'Hostel', 'Lodge'
];

const sortOptions = [
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'distance', label: 'Distance from Center' },
  { value: 'popular', label: 'Most Popular' },
];

export default function SearchFilters({ onFiltersChange, isOpen, onClose }: SearchFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const [starRating, setStarRating] = useState<number[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string[]>([]);
  const [districtPreference, setDistrictPreference] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const handleStarRatingChange = (rating: number) => {
    setStarRating(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const handleAmenityChange = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handlePropertyTypeChange = (type: string) => {
    setPropertyType(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([50, 500]);
    setStarRating([]);
    setAmenities([]);
    setPropertyType([]);
    setDistrictPreference('');
    setSortBy('popular');
  };

  const applyFilters = () => {
    onFiltersChange({
      priceRange,
      starRating,
      amenities,
      propertyType,
      districtPreference,
      sortBy,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl">
        <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold">Search Filters</h2>
          </div>
          <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Sort By */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Sort By</h3>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">
              Price Range: ${priceRange[0]} - ${priceRange[1]} per night
            </h3>
            <Slider
              value={priceRange}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              max={1000}
              min={10}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>$10</span>
              <span>$1000+</span>
            </div>
          </div>

          <Separator />

          {/* Star Rating */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Star Rating</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  variant={starRating.includes(rating) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStarRatingChange(rating)}
                  className="flex items-center space-x-1"
                >
                  <span>{rating}</span>
                  <Star className="h-3 w-3 fill-current" />
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Property Type */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Property Type</h3>
            <div className="flex flex-wrap gap-2">
              {propertyTypes.map((type) => (
                <Button
                  key={type}
                  variant={propertyType.includes(type) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePropertyTypeChange(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {amenitiesList.map((amenity) => {
                const Icon = amenity.icon;
                return (
                  <div
                    key={amenity.id}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => handleAmenityChange(amenity.id)}
                  >
                    <Checkbox
                      checked={amenities.includes(amenity.id)}
                      className="data-[state=checked]:bg-blue-600"
                    />
                    <Icon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm">{amenity.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Active Filters */}
          {(starRating.length > 0 || amenities.length > 0 || propertyType.length > 0) && (
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {starRating.map((rating) => (
                  <Badge key={`star-${rating}`} variant="secondary" className="flex items-center space-x-1">
                    <span>{rating}</span>
                    <Star className="h-3 w-3 fill-current" />
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleStarRatingChange(rating)}
                    />
                  </Badge>
                ))}
                {amenities.map((amenity) => (
                  <Badge key={`amenity-${amenity}`} variant="secondary" className="flex items-center space-x-1">
                    <span>{amenitiesList.find(a => a.id === amenity)?.label}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handleAmenityChange(amenity)}
                    />
                  </Badge>
                ))}
                {propertyType.map((type) => (
                  <Badge key={`type-${type}`} variant="secondary" className="flex items-center space-x-1">
                    <span>{type}</span>
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => handlePropertyTypeChange(type)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white p-6 border-t flex space-x-3 rounded-b-2xl">
          <Button variant="outline" onClick={clearAllFilters} className="flex-1">
            Clear All
          </Button>
          <Button onClick={applyFilters} className="flex-1 bg-blue-600 hover:bg-blue-700">
            Apply Filters
          </Button>
        </div>
      </Card>
    </div>
  );
}