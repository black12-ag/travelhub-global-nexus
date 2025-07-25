import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Star, 
  MapPin, 
  Calendar,
  Users,
  Upload,
  DollarSign,
  MoreHorizontal
} from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  type: string;
  location: string;
  price: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  status: 'active' | 'inactive' | 'pending';
  rating: number;
  reviews: number;
  bookings: number;
  earnings: number;
  images: string[];
  amenities: string[];
  description: string;
  lastUpdated: string;
}

export default function PropertyManagement() {
  const { formatPrice } = useCurrency();
  const { toast } = useToast();
  
  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Modern Studio in Bole',
      type: 'Apartment',
      location: 'Bole, Addis Ababa',
      price: 85,
      guests: 2,
      bedrooms: 1,
      bathrooms: 1,
      status: 'active',
      rating: 4.8,
      reviews: 23,
      bookings: 15,
      earnings: 1275,
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'],
      amenities: ['wifi', 'parking', 'kitchen'],
      description: 'Beautiful modern studio in the heart of Bole district.',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'Luxury Apartment Kazanchis',
      type: 'Apartment',
      location: 'Kazanchis, Addis Ababa',
      price: 150,
      guests: 4,
      bedrooms: 2,
      bathrooms: 2,
      status: 'active',
      rating: 4.9,
      reviews: 31,
      bookings: 22,
      earnings: 3300,
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'],
      amenities: ['wifi', 'parking', 'pool', 'gym'],
      description: 'Spacious luxury apartment with premium amenities.',
      lastUpdated: '2024-01-20'
    },
    {
      id: '3',
      title: 'Cozy Room Near Airport',
      type: 'Room',
      location: 'Bole, Addis Ababa',
      price: 45,
      guests: 1,
      bedrooms: 1,
      bathrooms: 1,
      status: 'inactive',
      rating: 4.6,
      reviews: 12,
      bookings: 8,
      earnings: 360,
      images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop'],
      amenities: ['wifi', 'breakfast'],
      description: 'Perfect for travelers needing airport proximity.',
      lastUpdated: '2024-01-10'
    }
  ]);

  const [showAddProperty, setShowAddProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [newProperty, setNewProperty] = useState({
    title: '',
    type: '',
    location: '',
    price: 0,
    guests: 1,
    bedrooms: 1,
    bathrooms: 1,
    description: '',
    amenities: [] as string[]
  });

  const handleAddProperty = () => {
    if (!newProperty.title || !newProperty.type || !newProperty.location) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const property: Property = {
      id: Date.now().toString(),
      ...newProperty,
      status: 'pending',
      rating: 0,
      reviews: 0,
      bookings: 0,
      earnings: 0,
      images: ['https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop'],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setProperties([...properties, property]);
    setNewProperty({
      title: '',
      type: '',
      location: '',
      price: 0,
      guests: 1,
      bedrooms: 1,
      bathrooms: 1,
      description: '',
      amenities: []
    });
    setShowAddProperty(false);
    
    toast({
      title: "Property added",
      description: "Your property has been submitted for review.",
    });
  };

  const togglePropertyStatus = (id: string) => {
    setProperties(properties.map(property => 
      property.id === id 
        ? { ...property, status: property.status === 'active' ? 'inactive' : 'active' }
        : property
    ));
    
    toast({
      title: "Status updated",
      description: "Property status has been changed.",
    });
  };

  const deleteProperty = (id: string) => {
    setProperties(properties.filter(property => property.id !== id));
    toast({
      title: "Property deleted",
      description: "Property has been removed from your listings.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Properties</h2>
          <p className="text-muted-foreground">Manage your property listings</p>
        </div>
        <Dialog open={showAddProperty} onOpenChange={setShowAddProperty}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Property</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  value={newProperty.title}
                  onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                  placeholder="Enter property title"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Property Type</Label>
                  <Select value={newProperty.type} onValueChange={(value) => setNewProperty({ ...newProperty, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="House">House</SelectItem>
                      <SelectItem value="Room">Room</SelectItem>
                      <SelectItem value="Villa">Villa</SelectItem>
                      <SelectItem value="Studio">Studio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="price">Price per night</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProperty.price}
                    onChange={(e) => setNewProperty({ ...newProperty, price: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newProperty.location}
                  onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                  placeholder="Enter location"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="guests">Max Guests</Label>
                  <Input
                    id="guests"
                    type="number"
                    value={newProperty.guests}
                    onChange={(e) => setNewProperty({ ...newProperty, guests: Number(e.target.value) })}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={newProperty.bedrooms}
                    onChange={(e) => setNewProperty({ ...newProperty, bedrooms: Number(e.target.value) })}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={newProperty.bathrooms}
                    onChange={(e) => setNewProperty({ ...newProperty, bathrooms: Number(e.target.value) })}
                    min="1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProperty.description}
                  onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                  placeholder="Describe your property"
                  rows={3}
                />
              </div>

              <Button onClick={handleAddProperty} className="w-full">
                Add Property
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <Badge className={`absolute top-3 left-3 ${getStatusColor(property.status)}`}>
                {property.status}
              </Badge>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setEditingProperty(property)}>
                  <Edit className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="secondary">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  {property.location}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span>{property.type}</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-warning text-warning" />
                  {property.rating > 0 ? property.rating : 'New'}
                  {property.reviews > 0 && ` (${property.reviews})`}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {property.guests} guests
                </div>
                <div>{property.bedrooms} bed</div>
                <div>{property.bathrooms} bath</div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{formatPrice(property.price)}/night</div>
                  <div className="text-sm text-muted-foreground">
                    Total: {formatPrice(property.earnings)}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium">{property.bookings} bookings</div>
                  <div className="text-muted-foreground">this year</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={property.status === 'active'}
                    onCheckedChange={() => togglePropertyStatus(property.id)}
                  />
                  <span className="text-sm">Active</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteProperty(property.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {properties.length === 0 && (
        <Card className="p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
          <p className="text-muted-foreground mb-4">
            Start earning by adding your first property listing
          </p>
          <Button onClick={() => setShowAddProperty(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Property
          </Button>
        </Card>
      )}
    </div>
  );
}
