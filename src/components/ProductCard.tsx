import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Heart, 
  GitCompare, 
  Star, 
  ShoppingCart,
  Eye 
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  discount?: number;
  badge?: string;
  isWishlisted: boolean;
  isInCompare: boolean;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onToggleCompare: (productId: string) => void;
  onViewProduct: (productId: string) => void;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  discount,
  badge,
  isWishlisted,
  isInCompare,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onViewProduct
}: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square bg-muted/30 overflow-hidden">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
            onClick={() => onViewProduct(id)}
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {badge && (
            <Badge className="bg-primary text-primary-foreground text-xs">
              {badge}
            </Badge>
          )}
          {discount && (
            <Badge variant="destructive" className="text-xs">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0"
            onClick={() => onToggleWishlist(id)}
          >
            <Heart 
              className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`}
            />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0"
            onClick={() => onToggleCompare(id)}
          >
            <GitCompare 
              className={`w-4 h-4 ${isInCompare ? 'text-primary' : ''}`}
            />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0"
            onClick={() => onViewProduct(id)}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            size="sm" 
            className="w-full"
            onClick={() => onAddToCart(id)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Product Info */}
        <div className="space-y-2">
          {/* Name */}
          <button
            onClick={() => onViewProduct(id)}
            className="text-left w-full"
          >
            <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
              {name}
            </h3>
          </button>

          {/* Rating */}
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="font-medium ml-1">{rating}</span>
            </div>
            <span className="text-muted-foreground">
              ({reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                GH₵{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  GH₵{originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {originalPrice && (
              <p className="text-sm text-green-600 font-medium">
                Save GH₵{(originalPrice - price).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}