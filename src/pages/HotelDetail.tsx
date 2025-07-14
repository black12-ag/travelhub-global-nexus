import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Wifi, Car, Coffee, Waves, ArrowLeft, Phone, Mail } from 'lucide-react';
import { sampleProperties } from '@/data/sampleData';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const amenityIcons: { [key: string]: any } = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
  pool: Waves,
};

export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  const hotel = sampleProperties.find(p => p.id === id);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Hotel Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Hotels</Button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    toast({
      title: "Booking Initiated",
      description: `Redirecting to book ${hotel.title}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Hotels
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{hotel.title}</h1>
              <div className="flex items-center text-muted-foreground mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                {hotel.location}
                {hotel.distance && <span className="ml-2">• {hotel.distance} from you</span>}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-warning text-warning" />
                  <span className="font-medium">{hotel.rating}</span>
                  <span className="text-muted-foreground ml-1">({hotel.reviews} reviews)</span>
                </div>
                {hotel.isVerified && (
                  <Badge className="bg-success text-success-foreground">Verified</Badge>
                )}
                {hotel.isSuperhost && (
                  <Badge className="bg-warning text-warning-foreground">Top Rated</Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground">${hotel.price}</div>
              <div className="text-sm text-muted-foreground">per night</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Images */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={hotel.images[selectedImage]}
                  alt={hotel.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {hotel.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${hotel.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">About this hotel</h3>
                <p className="text-muted-foreground">{hotel.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity.toLowerCase()];
                    return (
                      <div key={amenity} className="flex items-center">
                        {Icon && <Icon className="h-5 w-5 mr-3 text-primary" />}
                        <span className="capitalize">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Guest Reviews</h3>
                <div className="space-y-4">
                  {hotel.reviews_data?.map((review) => (
                    <div key={review.id} className="border-b border-border pb-4 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.user}</span>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  )) || (
                    <p className="text-muted-foreground">No reviews yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">${hotel.price}</div>
                    <div className="text-sm text-muted-foreground">per night</div>
                  </div>
                  
                  <Separator />
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full h-12 bg-gradient-hero hover:shadow-float transition-all duration-300 text-white font-medium"
                  >
                    Book Now
                  </Button>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      <span>+251 11 123 4567</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      <span>info@{hotel.title.toLowerCase().replace(/\s+/g, '')}.com</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-xs text-muted-foreground text-center">
                    Free cancellation until 24 hours before check-in
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}