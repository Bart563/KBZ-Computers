import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { ProductCard } from './ProductCard';
import { Filter, Grid3X3, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { mockProducts, Product } from '../data/mockData';

interface ProductListingProps {
  category: string;
  onAddToCart: (productId: string, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  onToggleCompare: (productId: string) => void;
  onViewProduct: (productId: string) => void;
  wishlistItems: string[];
  compareItems: string[];
  searchQuery?: string;
  searchResults?: Product[];
}

const categoryNames: Record<string, string> = {
  phones: 'Phones',
  laptops: 'Laptops', 
  tablets: 'Tablets',
  gaming: 'Gaming Consoles',
  accessories: 'Accessories',
  headphones: 'Headphones'
};

export function ProductListing({
  category,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onViewProduct,
  wishlistItems,
  compareItems,
  searchQuery,
  searchResults
}: ProductListingProps) {
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showInStock, setShowInStock] = useState(false);
  const [gridColumns, setGridColumns] = useState(4);

  // Use search results if provided, otherwise filter by category
  const categoryProducts = searchResults || mockProducts.filter(p => p.category === category);
  
  // Get unique brands for filters
  const brands = Array.from(new Set(categoryProducts.map(p => p.brand)));

  // Apply filters
  let filteredProducts = categoryProducts.filter(product => {
    if (showInStock && !product.inStock) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    return true;
  });

  // Apply sorting
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-semibold">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000000}
            step={50000}
            className="w-full"
          />
          <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4">
        <h3 className="font-semibold">Brand</h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label htmlFor={brand} className="text-sm cursor-pointer">
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-4">
        <h3 className="font-semibold">Availability</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={showInStock}
            onCheckedChange={setShowInStock}
          />
          <label htmlFor="in-stock" className="text-sm cursor-pointer">
            In Stock Only
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setPriceRange([0, 5000000]);
          setSelectedBrands([]);
          setShowInStock(false);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <span>Home</span>
          <span>/</span>
          <span>{categoryNames[category]}</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">
          {searchQuery ? `Search Results for "${searchQuery}"` : categoryNames[category]}
        </h1>
        <p className="text-muted-foreground">
          {searchQuery 
            ? `Found ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`
            : `Showing ${filteredProducts.length} of ${categoryProducts.length} products`
          }
        </p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5" />
                <h2 className="font-semibold">Filters</h2>
              </div>
              <FilterPanel />
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-4">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Active Filters */}
              <div className="flex items-center gap-2 flex-wrap">
                {selectedBrands.map(brand => (
                  <Badge key={brand} variant="secondary" className="cursor-pointer" onClick={() => toggleBrand(brand)}>
                    {brand} ×
                  </Badge>
                ))}
                {showInStock && (
                  <Badge variant="secondary" className="cursor-pointer" onClick={() => setShowInStock(false)}>
                    In Stock ×
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                </SelectContent>
              </Select>

              {/* Grid Toggle */}
              <div className="hidden md:flex items-center gap-1 border rounded-md p-1">
                <Button
                  size="sm"
                  variant={gridColumns === 3 ? "default" : "ghost"}
                  className="w-8 h-8 p-0"
                  onClick={() => setGridColumns(3)}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant={gridColumns === 4 ? "default" : "ghost"}
                  className="w-8 h-8 p-0"
                  onClick={() => setGridColumns(4)}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColumns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.image}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  discount={product.discount}
                  badge={product.badge}
                  isWishlisted={wishlistItems.includes(product.id)}
                  isInCompare={compareItems.includes(product.id)}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  onToggleCompare={onToggleCompare}
                  onViewProduct={onViewProduct}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setPriceRange([0, 5000000]);
                  setSelectedBrands([]);
                  setShowInStock(false);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}

          {/* Load More / Pagination could go here */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}