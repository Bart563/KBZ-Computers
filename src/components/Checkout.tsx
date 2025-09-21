import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, CreditCard, MapPin, Truck, Shield } from 'lucide-react';
import { CartItem } from '../data/mockData';

interface CheckoutProps {
  cartItems: CartItem[];
  onNavigate: (page: string, productId?: string, searchQuery?: string) => void;
  onPlaceOrder: (orderData: any) => void;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

interface PaymentInfo {
  method: 'card' | 'bank' | 'wallet';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
}

export function Checkout({ cartItems, onNavigate, onPlaceOrder }: CheckoutProps) {
  const [currentStep, setCurrentStep] = useState<'address' | 'payment' | 'review'>('address');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: ''
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'card'
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [orderNotes, setOrderNotes] = useState('');

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => {
    const product = require('../data/mockData').mockProducts.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const shipping = subtotal > 100000 ? 0 : 5000;
  const tax = Math.round(subtotal * 0.075);
  const total = subtotal + shipping + tax;

  const handleAddressSubmit = () => {
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = () => {
    setCurrentStep('review');
  };

  const handlePlaceOrder = () => {
    const orderData = {
      shippingAddress,
      paymentInfo,
      cartItems,
      subtotal,
      shipping,
      tax,
      total,
      orderNotes,
      orderId: `KBZ-${Date.now()}`,
      orderDate: new Date().toISOString()
    };
    onPlaceOrder(orderData);
    onNavigate('order-confirmation');
  };

  const steps = [
    { id: 'address', label: 'Shipping Address', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review Order', icon: Shield }
  ];

  const renderAddressForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={shippingAddress.firstName}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, firstName: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={shippingAddress.lastName}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, lastName: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={shippingAddress.email}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={shippingAddress.phone}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Street Address *</Label>
        <Input
          id="address"
          value={shippingAddress.address}
          onChange={(e) => setShippingAddress(prev => ({ ...prev, address: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={shippingAddress.city}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={shippingAddress.state}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input
            id="postalCode"
            value={shippingAddress.postalCode}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
        <Textarea
          id="orderNotes"
          placeholder="Special delivery instructions or notes..."
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
        />
      </div>

      <Button onClick={handleAddressSubmit} className="w-full" size="lg">
        Continue to Payment
      </Button>
    </div>
  );

  const renderPaymentForm = () => (
    <div className="space-y-6">
      <RadioGroup
        value={paymentInfo.method}
        onValueChange={(value) => setPaymentInfo(prev => ({ ...prev, method: value as 'card' | 'bank' | 'wallet' }))}
      >
        <div className="flex items-center space-x-2 p-4 border rounded-lg">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer">
            <CreditCard className="w-5 h-5" />
            Credit/Debit Card
          </Label>
        </div>

        <div className="flex items-center space-x-2 p-4 border rounded-lg">
          <RadioGroupItem value="bank" id="bank" />
          <Label htmlFor="bank" className="cursor-pointer">
            Bank Transfer
          </Label>
        </div>

        <div className="flex items-center space-x-2 p-4 border rounded-lg">
          <RadioGroupItem value="wallet" id="wallet" />
          <Label htmlFor="wallet" className="cursor-pointer">
            Mobile Wallet
          </Label>
        </div>
      </RadioGroup>

      {paymentInfo.method === 'card' && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentInfo.cardNumber || ''}
              onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={paymentInfo.expiryDate || ''}
                onChange={(e) => setPaymentInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={paymentInfo.cvv || ''}
                onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Cardholder Name *</Label>
            <Input
              id="cardName"
              placeholder="John Doe"
              value={paymentInfo.cardName || ''}
              onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardName: e.target.value }))}
              required
            />
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep('address')}>
          Back to Address
        </Button>
        <Button onClick={handlePaymentSubmit} className="flex-1" size="lg">
          Review Order
        </Button>
      </div>
    </div>
  );

  const renderOrderReview = () => (
    <div className="space-y-6">
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="font-semibold text-green-800 mb-2">Order Summary</h3>
        <div className="space-y-2 text-sm">
          {cartItems.map((item) => {
            const product = require('../data/mockData').mockProducts.find(p => p.id === item.productId);
            return product ? (
              <div key={item.productId} className="flex justify-between">
                <span>{product.name} × {item.quantity}</span>
                <span>₦{(product.price * item.quantity).toLocaleString()}</span>
              </div>
            ) : null;
          })}
          <Separator />
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₦{shipping.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>₦{tax.toLocaleString()}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setCurrentStep('payment')}>
          Back to Payment
        </Button>
        <Button onClick={handlePlaceOrder} className="flex-1" size="lg">
          Place Order
        </Button>
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">
          Add some items to your cart before proceeding to checkout.
        </p>
        <Button onClick={() => onNavigate('home')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" onClick={() => onNavigate('cart')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Complete your order</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = steps.findIndex(s => s.id === currentStep) >= index;
            const isCurrent = step.id === currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center gap-2 ${isCurrent ? 'text-primary' : isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                    isActive ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="hidden sm:block font-medium">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-4 ${isActive ? 'bg-primary' : 'bg-muted-foreground'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentStep === 'address' && 'Shipping Information'}
                {currentStep === 'payment' && 'Payment Information'}
                {currentStep === 'review' && 'Review Your Order'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentStep === 'address' && renderAddressForm()}
              {currentStep === 'payment' && renderPaymentForm()}
              {currentStep === 'review' && renderOrderReview()}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {cartItems.map((item) => {
                  const product = require('../data/mockData').mockProducts.find(p => p.id === item.productId);
                  return product ? (
                    <div key={item.productId} className="flex gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ₦{(product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ) : null;
                })}
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₦{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₦{tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
