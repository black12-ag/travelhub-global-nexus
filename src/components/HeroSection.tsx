import SearchForm, { SearchData } from './SearchForm';
import heroImage from '@/assets/hero-travel.jpg';

interface HeroSectionProps {
  onSearch: (data: SearchData) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury tropical resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/20 rounded-full animate-float animation-delay-1000 hidden lg:block"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-warning/20 rounded-full animate-float animation-delay-2000 hidden lg:block"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Text */}
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
              Discover Your
              <span className="block bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                Perfect Stay
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              From luxury resorts to cozy properties, find accommodations that match your dreams. 
              Book with confidence and create unforgettable memories.
            </p>
          </div>

          {/* Search Form */}
          <div className="animate-slide-up animation-delay-500">
            <SearchForm onSearch={onSearch} className="max-w-5xl mx-auto" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-slide-up animation-delay-1000">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">2M+</div>
              <div className="text-sm text-white/80">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">50K+</div>
              <div className="text-sm text-white/80">Hotels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">100M+</div>
              <div className="text-sm text-white/80">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">195+</div>
              <div className="text-sm text-white/80">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}