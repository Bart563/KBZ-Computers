import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ProductCard } from './ProductCard';
import { ArrowRight, Zap, Shield, Truck, Headphones, TrendingUp, Star, Gift } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockProducts } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onToggleCompare: (productId: string) => void;
  onViewProduct: (productId: string) => void;
  wishlistItems: string[];
  compareItems: string[];
}

export function HomePage({ 
  onNavigate, 
  onAddToCart, 
  onToggleWishlist, 
  onToggleCompare, 
  onViewProduct,
  wishlistItems,
  compareItems 
}: HomePageProps) {
  const newArrivals = mockProducts.filter(p => p.isNew);
  const bestSellers = mockProducts.filter(p => p.isBestSeller);
  const trending = mockProducts.filter(p => p.isTrending);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <Badge className="w-fit bg-primary/10 text-primary border-primary/20">
                  🔥 New Year Tech Sale
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Upgrade Your
                  <span className="text-primary block">Tech Game</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Discover the latest phones, laptops, gaming consoles, and accessories. 
                  Premium quality, unbeatable prices, fast delivery.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  <Zap className="w-5 h-5 mr-2" />
                  Shop Now
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('trade-in')}>
                  <Gift className="w-5 h-5 mr-2" />
                  Trade-in Device
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Headphones className="w-4 h-4 text-purple-600" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1620705914357-a9d11009e068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzU4Mzk4ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Hero Product"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Deal Card */}
              <Card className="absolute -bottom-6 -left-6 bg-background/95 backdrop-blur-sm border-2 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Save up to 30%</p>
                      <p className="text-sm text-muted-foreground">On gaming gear</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Phones', icon: '📱', page: 'phones', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
            { name: 'Laptops', icon: '💻', page: 'laptops', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
            { name: 'Tablets', icon: '📱', page: 'tablets', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
            { name: 'Gaming', icon: '🎮', page: 'gaming', color: 'bg-red-50 hover:bg-red-100 text-red-700' },
            { name: 'Accessories', icon: '🔌', page: 'accessories', color: 'bg-orange-50 hover:bg-orange-100 text-orange-700' },
            { name: 'Headphones', icon: '🎧', page: 'headphones', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700' }
          ].map((category) => (
            <button
              key={category.page}
              onClick={() => onNavigate(category.page)}
              className={`p-6 rounded-xl transition-all duration-300 ${category.color} group`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <p className="font-medium group-hover:scale-105 transition-transform">
                {category.name}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Promotions */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Gaming Week</h3>
                <p className="text-blue-100">Up to 30% off gaming laptops & consoles</p>
                <Button variant="secondary" size="sm">
                  Shop Gaming <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Trade-in Bonus</h3>
                <p className="text-green-100">Get extra ₦50,000 for your old device</p>
                <Button variant="secondary" size="sm" onClick={() => onNavigate('trade-in')}>
                  Trade Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 overflow-hidden md:col-span-2 lg:col-span-1">
            <CardContent className="p-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Free Shipping</h3>
                <p className="text-purple-100">On orders above ₦50,000</p>
                <Button variant="secondary" size="sm">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh tech just landed</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('new-arrivals')}>
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product) => (
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
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Best Sellers</h2>
              <p className="text-muted-foreground">Customer favorites</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('best-sellers')}>
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
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
        </section>
      )}

      {/* Trending Deals */}
      {trending.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Trending Deals</h2>
              <p className="text-muted-foreground">Hot right now</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('trending')}>
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.slice(0, 4).map((product) => (
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
        </section>
      )}

      {/* Customer Reviews Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground">Trusted by thousands of tech enthusiasts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Adebayo O.",
              rating: 5,
              comment: "Excellent service! My gaming laptop arrived next day and works perfectly. Great prices too!",
              product: "Gaming Laptop"
            },
            {
              name: "Sarah M.",
              rating: 5,
              comment: "Love the trade-in program. Got a great deal on my new iPhone by trading in my old one.",
              product: "iPhone 15 Pro"
            },
            {
              name: "Michael K.",
              rating: 5,
              comment: "KBZ has the best tech selection in Nigeria. Fast shipping and genuine products always.",
              product: "PlayStation 5"
            }
          ].map((review, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{review.comment}"</p>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">Purchased {review.product}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recently Viewed */}
      <section className="container mx-auto px-4">
        <div className="bg-muted/30 rounded-2xl p-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Continue Shopping</h2>
            <p className="text-muted-foreground">Your recently viewed items are waiting</p>
            <Button onClick={() => onNavigate('recently-viewed')}>
              View Recent Items <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}