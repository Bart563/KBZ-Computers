import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ProductCard } from './ProductCard';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  Tag,
  Truck,
  Shield,
  Gift
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockProducts, CartItem } from '../data/mockData';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onNavigate: (page: string) => void;
  onAddToCart: (productId: string) => void;
  onToggleWishlist: (productId: string) => void;
  onToggleCompare: (productId: string) => void;
  onViewProduct: (productId: string) => void;
  wishlistItems: string[];
  compareItems: string[];
}

export function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onNavigate,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onViewProduct,
  wishlistItems,
  compareItems
}: CartPageProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  // Get product details for cart items
  const cartItemsWithProducts = cartItems.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  // Calculate totals
  const subtotal = cartItemsWithProducts.reduce((sum, item) => 
    sum + (item.product!.price * item.quantity), 0
  );
  
  const discount = appliedCoupon ? subtotal * 0.1 : 0; // 10% discount example
  const shipping = subtotal >= 500 ? 0 : 50; // Free shipping over GH₵500
  const total = subtotal - discount + shipping;

  // Suggested products for upsell
  const suggestedProducts = mockProducts.filter(p => !cartItems.some(item => item.productId === p.id)).slice(0, 4);

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'save10') {
      setAppliedCoupon(couponCode);
      setCouponCode('');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Start shopping to add items to your cart
          </p>
          <Button size="lg" onClick={() => onNavigate('home')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItemsWithProducts.length} item{cartItemsWithProducts.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItemsWithProducts.map(({ productId, quantity, product }) => (
            <Card key={productId}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-muted/30 rounded-lg overflow-hidden shrink-0">
                    <ImageWithFallback
                      src={product!.image}
                      alt={product!.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => onViewProduct(product!.id)}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <button
                          onClick={() => onViewProduct(product!.id)}
                          className="font-semibold hover:text-primary transition-colors text-left"
                        >
                          {product!.name}
                        </button>
                        <p className="text-sm text-muted-foreground">
                          Brand: {product!.brand}
                        </p>
                        {product!.badge && (
                          <Badge className="mt-1 text-xs">{product!.badge}</Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(productId)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Price & Quantity */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-semibold">
                          GH₵{product!.price.toLocaleString()}
                        </span>
                        {product!.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            GH₵{product!.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="px-3"
                          onClick={() => onUpdateQuantity(productId, Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="px-4 py-2 font-medium">{quantity}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="px-3"
                          onClick={() => onUpdateQuantity(productId, quantity + 1)}
                          disabled={quantity >= product!.stockCount}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <span className="font-semibold">
                        Total: GH₵{(product!.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>GH₵{subtotal.toLocaleString()}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedCoupon}):</span>
                  <span>-GH₵{discount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'FREE' : `GH₵${shipping.toLocaleString()}`}
                </span>
              </div>

              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>GH₵{total.toLocaleString()}</span>
              </div>

              <Button 
                size="lg" 
                className="w-full"
                onClick={() => onNavigate('checkout')}
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Coupon Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Apply Coupon
              </CardTitle>
            </CardHeader>
            <CardContent>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">
                    Coupon "{appliedCoupon}" applied!
                  </span>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-green-700"
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={applyCoupon} disabled={!couponCode}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Try "SAVE10" for 10% off
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Free delivery on orders over GH₵500</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-green-600" />
                <span>4-week warranty on all products</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Gift className="w-5 h-5 text-purple-600" />
                <span>Trade-in program available</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suggested Products */}
      {suggestedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((product) => (
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
        </div>
      )}
    </div>
  );
}