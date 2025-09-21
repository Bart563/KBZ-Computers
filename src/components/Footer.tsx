import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Smartphone,
  Laptop,
  Tablet,
  Gamepad2,
  Headphones,
  Cable
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const categories = [
    { id: 'phones', label: 'Phones', icon: Smartphone },
    { id: 'laptops', label: 'Laptops', icon: Laptop },
    { id: 'tablets', label: 'Tablets', icon: Tablet },
    { id: 'gaming', label: 'Gaming Consoles', icon: Gamepad2 },
    { id: 'accessories', label: 'Accessories', icon: Cable },
    { id: 'headphones', label: 'Headphones', icon: Headphones }
  ];

  const customerService = [
    { label: 'Contact Us', page: 'contact' },
    { label: 'FAQ', page: 'faq' },
    { label: 'Track Your Order', page: 'track-order' },
    { label: 'Returns & Exchanges', page: 'returns' },
    { label: 'Warranty', page: 'warranty' },
    { label: 'Trade-in Program', page: 'trade-in' }
  ];

  const company = [
    { label: 'About KBZ', page: 'about' },
    { label: 'Careers', page: 'careers' },
    { label: 'Press', page: 'press' },
    { label: 'Partners', page: 'partners' },
    { label: 'Affiliates', page: 'affiliates' }
  ];

  const legal = [
    { label: 'Privacy Policy', page: 'privacy' },
    { label: 'Terms of Service', page: 'terms' },
    { label: 'Cookie Policy', page: 'cookies' },
    { label: 'Accessibility', page: 'accessibility' }
  ];

  return (
    <footer className="bg-muted/30 border-t mt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter Signup */}
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get the latest deals, product launches, and tech news delivered to your inbox.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">KB</span>
              </div>
              <span className="font-bold text-lg">KBZ Computers</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Ghana's premier technology retailer, bringing you the latest in computers, 
              smartphones, gaming, and accessories.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>+1 (646) 719 719 6</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>hello@kbzcomputers.gh</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>Accra, Kumasi, Tamale</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-3 mt-4">
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Shop by Category</h3>
            <ul className="space-y-2">
              {categories.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-3 h-3" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              {customerService.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map(({ label, page }) => (
                <li key={page}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 KBZ Computers. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>We accept:</span>
            <div className="flex items-center gap-2">
              <div className="px-2 py-1 bg-background rounded border text-xs font-mono">
                MTN MoMo
              </div>
              <div className="px-2 py-1 bg-background rounded border text-xs font-mono">
                AIRTEL
              </div>
              <div className="px-2 py-1 bg-background rounded border text-xs font-mono">
                TELECEL
              </div>
              <div className="px-2 py-1 bg-background rounded border text-xs font-mono">
                VISA
              </div>
              <div className="px-2 py-1 bg-background rounded border text-xs font-mono">
                MC
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-8 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-xs">SSL</span>
            </div>
            <span>Secure Shopping</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">4W</span>
            </div>
            <span>4-Week Warranty</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-xs">24/7</span>
            </div>
            <span>Customer Support</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-xs">FREE</span>
            </div>
            <span>Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}