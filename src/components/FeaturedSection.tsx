import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { featuredDestinations } from '@/data/sampleData';

export default function FeaturedSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Explore Featured Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover amazing places around the world. From tropical paradises to bustling cities, 
            find your perfect escape.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <Card 
              key={destination.id}
              className={`group cursor-pointer overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-card hover:scale-105 animate-scale-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                {/* Property Count Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-foreground">
                    {destination.properties.toLocaleString()} properties
                  </Badge>
                </div>

                {/* Destination Info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-white/90">
                    {destination.country}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}