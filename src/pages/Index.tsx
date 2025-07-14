import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PropertyCard from '@/components/PropertyCard';
import FeaturedSection from '@/components/FeaturedSection';
import Footer from '@/components/Footer';
import { SearchData } from '@/components/SearchForm';
import { sampleProperties } from '@/data/sampleData';
import { Property } from '@/components/PropertyCard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [searchResults, setSearchResults] = useState<Property[]>(sampleProperties);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (searchData: SearchData) => {
    setIsSearching(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter hotels based on location
    const filtered = sampleProperties.filter(property => {
      if (searchData.location === 'all' || !searchData.location) return true;
      return property.area?.toLowerCase() === searchData.location.toLowerCase();
    });
    
    setSearchResults(filtered);
    setIsSearching(false);
    
    toast({
      title: "Hotels Found",
      description: `Found ${filtered.length} hotels in ${searchData.location === 'all' ? 'Addis Ababa' : searchData.location}`
    });
  };

  const handlePropertyClick = (property: Property) => {
    // Navigate to hotel detail page
    window.location.href = `/hotel/${property.id}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />
      
      {/* Featured Destinations */}
      <FeaturedSection />
      
      {/* Property Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {isSearching ? 'Finding Hotels...' : 'Top Hotels in Addis Ababa'}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the best hotels across Addis Ababa's prime locations
            </p>
          </div>

          {isSearching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-lg h-48 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={handlePropertyClick}
                  className={`animate-scale-in delay-[${index * 100}ms]`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
