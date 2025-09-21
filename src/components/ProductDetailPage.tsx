import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { ProductCard } from './ProductCard';
import { ProductReviews } from './ProductReviews';
import {
  Heart,
  GitCompare,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  ChevronLeft,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockProducts } from '../data/mockData';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, productId?: string, searchQuery?: string) => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  onToggleCompare: (productId: string) => void;
  onViewProduct: (productId: string) => void;
  wishlistItems: string[];
  compareItems: string[];
}

export function ProductDetailPage({
  productId,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onViewProduct,
  wishlistItems,
  compareItems
}: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.id === productId);
  const isWishlisted = wishlistItems.includes(productId);
  const isInCompare = compareItems.includes(productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Button onClick={() => onNavigate('home')}>
          Back to Home
        </Button>
      </div>
    );
  }

  // Get related products from same category
  const relatedProducts = mockProducts
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, 4);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(product.stockCount, quantity + delta));
    setQuantity(newQuantity);
  };

  // Track product view analytics
  useEffect(() => {
    const { analytics } = require('../services/analytics');
    analytics.trackProductView(product.id, product.name, product.category, product.price);
  }, [productId]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <button onClick={() => onNavigate('home')} className="hover:text-foreground">
          Home
        </button>
        <span>/</span>
        <button onClick={() => onNavigate(product.category)} className="hover:text-foreground capitalize">
          {product.category}
        </button>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      {/* Back Button */}
      <Button
        variant="outline"
        size="sm"
        className="mb-6"
        onClick={() => onNavigate(product.category)}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back to {product.category}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-muted/30 rounded-xl overflow-hidden">
            <ImageWithFallback
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title & Rating */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.badge && (
                <Badge className="bg-primary">{product.badge}</Badge>
              )}
              {product.discount && (
                <Badge variant="destructive">-{product.discount}%</Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="font-medium ml-2">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">
                GH₵{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  GH₵{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <p className="text-green-600 font-medium">
                You save GH₵{(product.originalPrice - product.price).toLocaleString()}
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            {product.inStock ? (
              <>
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-600 font-medium">
                  In Stock ({product.stockCount} available)
                </span>
              </>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {/* Key Specifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-lg">
                <Button
                  size="sm"
                  variant="ghost"
                  className="px-3"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="px-3"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  disabled={!product.inStock}
                  onClick={() => onAddToCart(product.id, quantity)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onToggleWishlist(product.id)}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onToggleCompare(product.id)}
                >
                  <GitCompare className={`w-4 h-4 mr-2 ${isInCompare ? 'text-primary' : ''}`} />
                  {isInCompare ? 'In Compare' : 'Compare'}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Free Delivery</p>
              <p className="text-xs text-muted-foreground">Orders above GH₵500</p>
            </div>
            <div className="text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm font-medium">4-Week Warranty</p>
              <p className="text-xs text-muted-foreground">Official warranty</p>
            </div>
            <div className="text-center">
              <RotateCcw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-muted-foreground">30-day policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ProductReviews productId={productId} productName={product.name} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                name={relatedProduct.name}
                price={relatedProduct.price}
                originalPrice={relatedProduct.originalPrice}
                image={relatedProduct.image}
                rating={relatedProduct.rating}
                reviewCount={relatedProduct.reviewCount}
                discount={relatedProduct.discount}
                badge={relatedProduct.badge}
                isWishlisted={wishlistItems.includes(relatedProduct.id)}
                isInCompare={compareItems.includes(relatedProduct.id)}
                onAddToCart={(id) => onAddToCart(id, 1)}
                onToggleWishlist={onToggleWishlist}
                onToggleCompare={onToggleCompare}
                onViewProduct={onViewProduct}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}