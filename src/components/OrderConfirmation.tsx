import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CheckCircle, Download, Mail, Package, Truck } from 'lucide-react';
import { CartItem } from '../data/mockData';

interface OrderConfirmationProps {
  orderData: {
    orderId: string;
    orderDate: string;
    shippingAddress: any;
    paymentInfo: any;
    cartItems: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  onNavigate: (page: string, productId?: string, searchQuery?: string) => void;
}

export function OrderConfirmation({ orderData, onNavigate }: OrderConfirmationProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-green-800 mb-2">Order Confirmed!</h1>
        <p className="text-muted-foreground">
          Thank you for shopping with KBZ Computers. Your order has been successfully placed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Information */}
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Order Details</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-muted-foreground">Order ID:</span> {orderData.orderId}</p>
                    <p><span className="text-muted-foreground">Order Date:</span> {formatDate(orderData.orderDate)}</p>
                    <p><span className="text-muted-foreground">Order Time:</span> {formatTime(orderData.orderDate)}</p>
                    <p><span className="text-muted-foreground">Payment Method:</span> {orderData.paymentInfo.method}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <div className="space-y-1 text-sm">
                    <p>{orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}</p>
                    <p>{orderData.shippingAddress.address}</p>
                    <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.postalCode}</p>
                    <p>{orderData.shippingAddress.email}</p>
                    <p>{orderData.shippingAddress.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.cartItems.map((item) => {
                  const product = require('../data/mockData').mockProducts.find(p => p.id === item.productId);
                  return product ? (
                    <div key={item.productId} className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          ₦{(product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Order Confirmed</p>
                    <p className="text-sm text-muted-foreground">Your order has been received and confirmed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Processing</p>
                    <p className="text-sm text-muted-foreground">We're preparing your items for shipment</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Truck className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Shipped</p>
                    <p className="text-sm text-muted-foreground">Estimated delivery: 3-5 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{orderData.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₦{orderData.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₦{orderData.tax.toLocaleString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₦{orderData.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Order Confirmation Email</p>
                  <p className="text-sm text-muted-foreground">Sent to your email address</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <Download className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Download Receipt</p>
                  <p className="text-sm text-muted-foreground">PDF receipt available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button className="w-full" size="lg">
              Track Your Order
            </Button>
            <Button variant="outline" className="w-full" onClick={() => onNavigate('home')}>
              Continue Shopping
            </Button>
            <Button variant="outline" className="w-full" onClick={() => onNavigate('orders')}>
              View All Orders
            </Button>
          </div>

          {/* Help */}
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Need Help?</p>
              <p className="text-sm">
                Contact our support team at{' '}
                <a href="mailto:support@kbzcomputers.com" className="text-primary hover:underline">
                  support@kbzcomputers.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
