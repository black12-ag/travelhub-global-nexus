import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Youtube, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Safety Information', href: '#' },
        { name: 'Cancellation Options', href: '#' },
        { name: 'Disability Support', href: '#' },
        { name: 'Report Issue', href: '#' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Become a Host', href: '#' },
        { name: 'Host Resources', href: '#' },
        { name: 'Community Forum', href: '#' },
        { name: 'Hosting Responsibly', href: '#' },
        { name: 'TravelHub Associates', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Investors', href: '#' },
        { name: 'Gift Cards', href: '#' }
      ]
    },
    {
      title: 'Destinations',
      links: [
        { name: 'Europe', href: '#' },
        { name: 'Asia', href: '#' },
        { name: 'North America', href: '#' },
        { name: 'South America', href: '#' },
        { name: 'Africa', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Newsletter & Contact */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">T</span>
                  </div>
                  <span className="text-2xl font-bold">TravelHub</span>
                </div>
                <p className="text-background/80 text-lg leading-relaxed max-w-md">
                  Your gateway to extraordinary experiences. Discover, book, and create 
                  unforgettable memories with trusted accommodations worldwide.
                </p>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
                <p className="text-background/80 mb-4">
                  Get travel tips, deals, and inspiration delivered to your inbox.
                </p>
                <div className="flex space-x-2">
                  <Input 
                    placeholder="Enter your email"
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
                  />
                  <Button className="bg-gradient-hero hover:opacity-90 text-white px-6">
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                <div className="flex items-center space-x-3 text-background/80">
                  <Phone className="h-5 w-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-background/80">
                  <Mail className="h-5 w-5" />
                  <span>support@travelhub.com</span>
                </div>
                <div className="flex items-center space-x-3 text-background/80">
                  <MapPin className="h-5 w-5" />
                  <span>123 Travel Street, Adventure City, AC 12345</span>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-background/80 hover:text-background transition-colors duration-200 text-sm"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* App Download & Features */}
          <div className="border-t border-background/20 pt-12 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center md:text-left">
                <h4 className="font-semibold text-lg mb-3">Download Our App</h4>
                <p className="text-background/80 text-sm mb-4">
                  Book on the go with our mobile app
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="border-background/30 text-background hover:bg-background/10">
                    App Store
                  </Button>
                  <Button variant="outline" className="border-background/30 text-background hover:bg-background/10">
                    Google Play
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-lg mb-3">Languages & Currency</h4>
                <div className="flex justify-center space-x-3">
                  <Button variant="outline" size="sm" className="border-background/30 text-background hover:bg-background/10">
                    <Globe className="h-4 w-4 mr-2" />
                    English (US)
                  </Button>
                  <Button variant="outline" size="sm" className="border-background/30 text-background hover:bg-background/10">
                    USD
                  </Button>
                </div>
              </div>
              <div className="text-center md:text-right">
                <h4 className="font-semibold text-lg mb-3">Follow Us</h4>
                <div className="flex justify-center md:justify-end space-x-4">
                  <Button variant="ghost" size="sm" className="text-background hover:text-background hover:bg-background/10">
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-background hover:text-background hover:bg-background/10">
                    <Twitter className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-background hover:text-background hover:bg-background/10">
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-background hover:text-background hover:bg-background/10">
                    <Youtube className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/80 text-sm">
              © 2024 TravelHub. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}