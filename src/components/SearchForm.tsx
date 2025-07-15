import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, Users, Search, Filter, Navigation } from 'lucide-react';
import { addisAbabaAreas, nearbyLocations } from '@/data/sampleData';
import SearchFilters, { FilterOptions } from './SearchFilters';

interface SearchFormProps {
  onSearch: (data: SearchData) => void;
  className?: string;
}

export interface SearchData {
  location: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  guests: number;
  type: 'properties' | 'hotels';
}

export default function SearchForm({ onSearch, className }: SearchFormProps) {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [type, setType] = useState<'properties' | 'hotels'>('hotels');
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showNearbyLocations, setShowNearbyLocations] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setUseCurrentLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Location:', position.coords);
          setLocation('current-location');
          setUseCurrentLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setUseCurrentLocation(false);
        }
      );
    }
  };

  const handleFiltersChange = (filters: FilterOptions) => {
    console.log('Filters applied:', filters);
    // Apply filters to search results
  };

  const handleSubmit = () => {
    onSearch({
      location,
      checkIn,
      checkOut,
      guests: adults + children,
      type
    });
  };

  return (
    <Card className={cn("p-8 shadow-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl", className)}>
      <div className="space-y-6">
        {/* Type Selector - Improved styling to match image */}
        <div className="flex rounded-xl bg-gray-100 p-2">
          <Button
            variant="ghost"
            className={cn(
              "flex-1 rounded-lg text-base font-medium transition-all duration-200",
              type === 'properties' 
                ? "bg-white text-gray-800 shadow-sm" 
                : "text-gray-600 hover:text-gray-800"
            )}
            onClick={() => setType('properties')}
          >
            Properties
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "flex-1 rounded-lg text-base font-medium transition-all duration-200",
              type === 'hotels' 
                ? "bg-blue-500 text-white shadow-sm" 
                : "text-gray-600 hover:text-gray-800"
            )}
            onClick={() => setType('hotels')}
          >
            Hotels
          </Button>
        </div>

        {/* Search Fields - Improved layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
                onClick={getCurrentLocation}
                disabled={useCurrentLocation}
              >
                <Navigation className="h-4 w-4" />
              </Button>
            </div>
            <Select value={location} onValueChange={(value) => {
              setLocation(value);
              setShowNearbyLocations(!!nearbyLocations[value as keyof typeof nearbyLocations]);
            }}>
              <SelectTrigger className="pl-12 pr-12 h-14 border-gray-200 rounded-xl text-base bg-white hover:border-blue-300 focus:border-blue-500">
                <SelectValue placeholder="Select area in Addis Ababa" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-200 shadow-lg">
                <SelectItem value="all">All Areas</SelectItem>
                <SelectItem value="current-location">📍 Near Me</SelectItem>
                {addisAbabaAreas.map((area) => (
                  <SelectItem key={area} value={area.toLowerCase()}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Nearby Locations Dropdown */}
            {showNearbyLocations && nearbyLocations[location as keyof typeof nearbyLocations] && (
              <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-40 overflow-y-auto">
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 px-2 py-1">Nearby locations:</div>
                  {nearbyLocations[location as keyof typeof nearbyLocations].map((nearby, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => {
                        setLocation(nearby.toLowerCase().replace(/\s+/g, '-'));
                        setShowNearbyLocations(false);
                      }}
                    >
                      📍 {nearby}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Check-in Date */}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-14 justify-start text-left font-normal border-gray-200 rounded-xl bg-white hover:border-blue-300 focus:border-blue-500",
                    !checkIn && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5" />
                  <span className="text-base">
                    {checkIn ? format(checkIn, "MMM dd") : "Check-in"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl border-gray-200 shadow-lg" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto rounded-xl"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Check-out Date */}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-14 justify-start text-left font-normal border-gray-200 rounded-xl bg-white hover:border-blue-300 focus:border-blue-500",
                    !checkOut && "text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-3 h-5 w-5" />
                  <span className="text-base">
                    {checkOut ? format(checkOut, "MMM dd") : "Check-out"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl border-gray-200 shadow-lg" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                  initialFocus
                  className="p-3 pointer-events-auto rounded-xl"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests - Enhanced with detailed options */}
          <div className="relative">
            <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-14 justify-start text-left font-normal border-gray-200 rounded-xl bg-white hover:border-blue-300 focus:border-blue-500"
                >
                  <Users className="mr-3 h-5 w-5 text-gray-400" />
                  <span className="text-base">
                    {adults + children} {adults + children === 1 ? 'Guest' : 'Guests'}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 rounded-xl border-gray-200 shadow-lg" align="start">
                <div className="space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Adults</div>
                      <div className="text-sm text-gray-500">Ages 13 or above</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        disabled={adults <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{adults}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setAdults(Math.min(10, adults + 1))}
                        disabled={adults >= 10}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Children</div>
                      <div className="text-sm text-gray-500">Ages 2-12</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        disabled={children <= 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{children}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setChildren(Math.min(8, children + 1))}
                        disabled={children >= 8}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Rooms */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Rooms</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setRooms(Math.max(1, rooms - 1))}
                        disabled={rooms <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{rooms}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setRooms(Math.min(5, rooms + 1))}
                        disabled={rooms >= 5}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Search Actions */}
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => setFiltersOpen(true)}
            className="h-14 px-6 border-gray-200 rounded-xl text-base font-medium hover:border-blue-300"
          >
            <Filter className="mr-2 h-5 w-5" />
            Filters
          </Button>
          <Button 
            onClick={handleSubmit}
            size="lg"
            className="flex-1 h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl text-base shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Search className="mr-3 h-5 w-5" />
            Find Hotels in Addis Ababa
          </Button>
        </div>
      </div>

      {/* Search Filters Modal */}
      <SearchFilters
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onFiltersChange={handleFiltersChange}
      />
    </Card>
  );
}