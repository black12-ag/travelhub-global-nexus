import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee, 
  Waves,
  Users,
  Heart,
  Share2,
  Calendar,
  Clock,
  Shield,
  Award,
  ChevronLeft,
  ChevronRight,
  Play,
  Camera,
  Map,
  Phone,
  Mail,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { sampleProperties } from '@/data/sampleData';
import { Property } from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import ReviewSystem from '@/components/ReviewSystem';
import PhotoGallery from '@/components/PhotoGallery';
import VirtualTour from '@/components/VirtualTour';
import RecommendedProperties from '@/components/RecommendedProperties';

const amenityIcons: { [key: string]: any } = {
  wifi: Wifi,
  parking: Car,
  breakfast: Coffee,
  pool: Waves,
  security: Shield,
};

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { formatPrice } = useCurrency();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  useEffect(() => {
    // Find property by ID
    const foundProperty = sampleProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
      // Check if property is in wishlist (simulate)
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsWishlisted(wishlist.includes(id));
    } else {
      navigate('/404');
    }
  }, [id, navigate]);

  const toggleWishlist = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add properties to your wishlist.",
        variant: "destructive"
      });
      return;
    }

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let newWishlist;
    
    if (isWishlisted) {
      newWishlist = wishlist.filter((propertyId: string) => propertyId !== id);
      toast({
        title: "Removed from wishlist",
        description: "Property has been removed from your wishlist.",
      });
    } else {
      newWishlist = [...wishlist, id];
      toast({
        title: "Added to wishlist",
        description: "Property has been added to your wishlist.",
      });
    }
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
  };

  const shareProperty = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property?.title,
          text: property?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Property link has been copied to your clipboard.",
      });
    }
  };

  const nextImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-20">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold">Property not found</h1>
            <Button onClick={() => navigate('/')} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-20 pb-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {property.isVerified && (
                <Badge className="bg-success text-success-foreground">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
              {property.isSuperhost && (
                <Badge className="bg-warning text-warning-foreground">
                  <Award className="w-3 h-3 mr-1" />
                  Superhost
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{property.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 fill-warning text-warning" />
                <span className="font-medium">{property.rating}</span>
                <span className="ml-1">({property.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={shareProperty}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleWishlist}
              className={isWishlisted ? 'text-red-500 border-red-500' : ''}
            >
              <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
              {isWishlisted ? 'Saved' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8 rounded-2xl overflow-hidden">
          <div className="md:col-span-2 relative group">
            <img
              src={property.images[currentImageIndex]}
              alt={property.title}
              className="w-full h-64 md:h-96 object-cover cursor-pointer"
              onClick={() => setShowPhotoGallery(true)}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-4 bg-white/80 hover:bg-white"
              onClick={() => setShowPhotoGallery(true)}
            >
              <Camera className="w-4 h-4 mr-2" />
              View all photos
            </Button>
            
            {property.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
          
          <div className="md:col-span-2 grid grid-cols-2 gap-2">
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative group cursor-pointer" onClick={() => setShowPhotoGallery(true)}>
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="w-full h-20 md:h-[calc(50%-4px)] object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </div>
            ))}
            <Button
              variant="outline"
              className="relative overflow-hidden"
              onClick={() => setShowVirtualTour(true)}
            >
              <Play className="w-4 h-4 mr-2" />
              Virtual Tour
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>About this property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{property.description}</p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>Up to 4 guests</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Check-in: 3:00 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>Check-out: 11:00 AM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>What this place offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity) => {
                    const IconComponent = amenityIcons[amenity] || Wifi;
                    return (
                      <div key={amenity} className="flex items-center">
                        <IconComponent className="w-4 h-4 mr-3 text-muted-foreground" />
                        <span className="capitalize">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="w-5 h-5 mr-2" />
                  Where you'll be
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <Map className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive map would be here</p>
                    <p className="text-sm">Showing {property.location}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Located in the heart of {property.area}, this property offers easy access to major attractions and transportation.
                </p>
              </CardContent>
            </Card>

            {/* Reviews */}
            <ReviewSystem 
              propertyId={property.id}
              reviews={property.reviews_data || []}
              overallRating={property.rating}
              totalReviews={property.reviews}
            />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        {formatPrice(property.price)}
                        <span className="text-lg font-normal text-muted-foreground"> / night</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Star className="w-4 h-4 mr-1 fill-warning text-warning" />
                        <span className="font-medium">{property.rating}</span>
                        <span className="mx-1">·</span>
                        <span className="text-muted-foreground">{property.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <BookingForm 
                    property={property}
                    onBookingComplete={(bookingData) => {
                      toast({
                        title: "Booking request sent!",
                        description: "You'll receive a confirmation email shortly.",
                      });
                    }}
                  />
                </CardContent>
              </Card>

              {/* Host Information */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Meet your host</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">Abraham Tekle</h4>
                      <p className="text-sm text-muted-foreground">Superhost · 3 years hosting</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">98%</span>
                      <p className="text-muted-foreground">Response rate</p>
                    </div>
                    <div>
                      <span className="font-medium">1 hour</span>
                      <p className="text-muted-foreground">Response time</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call host
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact host
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Recommended Properties */}
        <div className="mt-12">
          <RecommendedProperties currentPropertyId={property.id} />
        </div>
      </div>

      <Footer />

      {/* Modals */}
      <PhotoGallery 
        isOpen={showPhotoGallery}
        onClose={() => setShowPhotoGallery(false)}
        images={property.images}
        title={property.title}
      />
      
      <VirtualTour 
        isOpen={showVirtualTour}
        onClose={() => setShowVirtualTour(false)}
        propertyTitle={property.title}
      />
    </div>
  );
}
