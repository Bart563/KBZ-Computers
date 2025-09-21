import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ProductCard } from './ProductCard';
import { ProductListing } from './ProductListing';
import { Search, Filter, X } from 'lucide-react';
import { mockProducts } from '../data/mockData';

interface SearchResultsProps {
  searchQuery: string;
  onNavigate: (page: string, productId?: string, searchQuery?: string) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  onToggleCompare: (productId: string) => void;
  onViewProduct: (productId: string) => void;
  wishlistItems: string[];
  compareItems: string[];
}

export function SearchResults({
  searchQuery,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onViewProduct,
  wishlistItems,
  compareItems
}: SearchResultsProps) {
  // Filter products based on search query
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const clearSearch = () => {
    onNavigate('home');
  };

  // Track search results analytics
  useEffect(() => {
    const { analytics } = require('../services/analytics');
    analytics.trackSearch(searchQuery, filteredProducts.length);
  }, [searchQuery]);

  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No products found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find any products matching "{searchQuery}". Try a different search term.
          </p>
          <div className="space-x-4">
            <Button onClick={clearSearch} variant="outline">
              Back to Home
            </Button>
            <Button onClick={() => onNavigate('home')}>
              Browse Categories
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="text-muted-foreground"
            >
              <X className="w-4 h-4 mr-2" />
              Clear Search
            </Button>
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found for "{searchQuery}"
            </div>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <ProductListing
        category="search"
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        onToggleCompare={onToggleCompare}
        onViewProduct={onViewProduct}
        wishlistItems={wishlistItems}
        compareItems={compareItems}
        searchQuery={searchQuery}
        searchResults={filteredProducts}
      />
    </div>
  );
}
