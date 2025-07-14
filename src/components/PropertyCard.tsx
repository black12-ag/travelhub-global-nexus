import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  type: 'property' | 'hotel';
  amenities: string[];
  isVerified?: boolean;
  isSuperhost?: boolean;
}

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
  className?: string;
}

const amenityIcons: { [key: string]: any } = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
  pool: Waves,
};

export default function PropertyCard({ property, onClick, className }: PropertyCardProps) {
  return (
    <Card 
      className={cn(
        "group cursor-pointer overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card hover:scale-[1.02]",
        className
      )}
      onClick={() => onClick(property)}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.isVerified && (
            <Badge className="bg-success text-success-foreground">
              Verified
            </Badge>
          )}
          {property.isSuperhost && (
            <Badge className="bg-warning text-warning-foreground">
              Superhost
            </Badge>
          )}
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {property.type === 'hotel' ? 'Hotel' : 'Property'}
          </Badge>
        </div>

        {/* Favorite Button */}
        <Button
          size="sm"
          variant="ghost"
          className="absolute bottom-3 right-3 h-8 w-8 p-0 bg-white/90 hover:bg-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </Button>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Rating and Location */}
        <div className="flex items-start justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </div>
          <div className="flex items-center text-sm font-medium">
            <Star className="h-4 w-4 mr-1 fill-warning text-warning" />
            {property.rating}
            <span className="text-muted-foreground ml-1">({property.reviews})</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        {/* Amenities */}
        <div className="flex items-center gap-3">
          {property.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity.toLowerCase()];
            return Icon ? (
              <div key={amenity} className="flex items-center text-muted-foreground">
                <Icon className="h-4 w-4" />
              </div>
            ) : null;
          })}
          {property.amenities.length > 4 && (
            <span className="text-xs text-muted-foreground">
              +{property.amenities.length - 4} more
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-2">
          <div>
            <span className="text-xl font-bold text-foreground">${property.price}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}