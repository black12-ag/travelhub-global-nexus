import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon, MapPin, Users, Search } from 'lucide-react';
import { addisAbabaAreas } from '@/data/sampleData';

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
  const [type, setType] = useState<'properties' | 'hotels'>('hotels');

  const handleSubmit = () => {
    onSearch({
      location,
      checkIn,
      checkOut,
      guests,
      type
    });
  };

  return (
    <Card className={cn("p-6 shadow-card bg-gradient-card backdrop-blur-sm border-border/50", className)}>
      <div className="space-y-6">
        {/* Type Selector */}
        <div className="flex rounded-lg bg-muted p-1">
          <Button
            variant={type === 'properties' ? 'default' : 'ghost'}
            className={cn(
              "flex-1 rounded-md transition-all",
              type === 'properties' && "bg-primary text-primary-foreground shadow-sm"
            )}
            onClick={() => setType('properties')}
          >
            Properties
          </Button>
          <Button
            variant={type === 'hotels' ? 'default' : 'ghost'}
            className={cn(
              "flex-1 rounded-md transition-all",
              type === 'hotels' && "bg-primary text-primary-foreground shadow-sm"
            )}
            onClick={() => setType('hotels')}
          >
            Hotels
          </Button>
        </div>

        {/* Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Location */}
          <div className="relative lg:col-span-2">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="pl-10 h-12 border-border/50 focus:border-primary">
                <SelectValue placeholder="Select area in Addis Ababa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Areas</SelectItem>
                {addisAbabaAreas.map((area) => (
                  <SelectItem key={area} value={area.toLowerCase()}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Check-in Date */}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal border-border/50 focus:border-primary",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "MMM dd") : "Check-in"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto"
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
                    "w-full h-12 justify-start text-left font-normal border-border/50 focus:border-primary",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "MMM dd") : "Check-out"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Guests */}
          <div className="relative">
            <Select value={guests.toString()} onValueChange={(value) => setGuests(parseInt(value))}>
              <SelectTrigger className="h-12 border-border/50 focus:border-primary">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'Guest' : 'Guests'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <Button 
          onClick={handleSubmit}
          size="lg"
          className="w-full h-12 bg-gradient-hero hover:shadow-float transition-all duration-300 text-white font-medium"
        >
          <Search className="mr-2 h-5 w-5" />
          Find Hotels in Addis Ababa
        </Button>
      </div>
    </Card>
  );
}