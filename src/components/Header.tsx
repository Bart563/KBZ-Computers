import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from './ui/sheet';
import { 
  Search, 
  Heart, 
  GitCompare, 
  ShoppingCart, 
  User, 
  Menu,
  Smartphone,
  Laptop,
  Tablet,
  Gamepad2,
  Headphones,
  Cable
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, productId?: string, searchQuery?: string) => void;
  cartItemCount: number;
  wishlistCount: number;
  compareCount: number;
}

export function Header({ 
  currentPage, 
  onNavigate, 
  cartItemCount, 
  wishlistCount, 
  compareCount 
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'phones', label: 'Phones', icon: Smartphone },
    { id: 'laptops', label: 'Laptops', icon: Laptop },
    { id: 'tablets', label: 'Tablets', icon: Tablet },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'accessories', label: 'Accessories', icon: Cable },
    { id: 'headphones', label: 'Headphones', icon: Headphones }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('search', undefined, searchQuery.trim());
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Top Bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-2 font-bold text-xl"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">KB</span>
            </div>
            <span>KBZ Computers</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {categories.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={currentPage === id ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onNavigate(id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => onNavigate('wishlist')}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  {wishlistCount}
                </Badge>
              )}
            </Button>

            {/* Compare */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => onNavigate('compare')}
            >
              <GitCompare className="w-5 h-5" />
              {compareCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  {compareCount}
                </Badge>
              )}
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Account */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('orders')}
            >
              <User className="w-5 h-5" />
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through our product categories and access your account
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="md:hidden">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="space-y-2">
                    {categories.map(({ id, label, icon: Icon }) => (
                      <Button
                        key={id}
                        variant={currentPage === id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => onNavigate(id)}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {label}
                      </Button>
                    ))}
                  </nav>

                  <div className="border-t pt-4 space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => onNavigate('wishlist')}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Wishlist ({wishlistCount})
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => onNavigate('compare')}
                    >
                      <GitCompare className="w-4 h-4 mr-2" />
                      Compare ({compareCount})
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => onNavigate('orders')}
                    >
                      <User className="w-4 h-4 mr-2" />
                      My Account
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}