import React from 'react';
import { WishlistItem, Product, mockProducts } from '../data/mockData';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { XIcon, ShoppingCartIcon } from 'lucide-react';

interface WishlistPageProps {
  wishlistItems: WishlistItem[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onNavigate: (page: string) => void;
}

export function WishlistPage({ 
  wishlistItems, 
  onRemoveFromWishlist, 
  onAddToCart, 
  onNavigate 
}: WishlistPageProps) {

  const getProductDetails = (productId: string): Product | undefined => {
    return mockProducts.find(p => p.id === productId);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything yet. Start exploring and save your favorites!
        </p>
        <Button onClick={() => onNavigate('home')}>Explore Products</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map(item => {
          const product = getProductDetails(item.productId);
          if (!product) return null;

          return (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-muted-foreground">Added on: {new Date(item.dateAdded).toLocaleDateString()}</p>
                    <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="icon" onClick={() => onRemoveFromWishlist(item.productId)}>
                    <XIcon className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => onAddToCart(item.productId)}>
                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
