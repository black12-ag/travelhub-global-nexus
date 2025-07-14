import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Globe, User, Heart, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Properties', href: '/properties' },
    { name: 'Hotels', href: '/hotels' },
    { name: 'Experiences', href: '/experiences' },
    { name: 'Become a Host', href: '/host' },
  ];

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border/50", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold text-foreground">TravelHub</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Globe className="h-4 w-4 mr-2" />
              EN
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Calendar className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 pl-4 border-l border-border">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm" className="bg-gradient-hero text-white">
                Sign Up
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* User Profile Section */}
                  <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
                    <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Welcome!</p>
                      <p className="text-sm text-muted-foreground">Sign in to your account</p>
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-3 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart className="h-4 w-4 mr-3" />
                      Wishlist
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-3" />
                      My Bookings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-3" />
                      Language: English
                    </Button>
                  </div>

                  {/* Auth Buttons */}
                  <div className="space-y-3 pt-4 border-t border-border">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                    <Button className="w-full bg-gradient-hero text-white">
                      Sign Up
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}