import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Download, 
  RotateCcw,
  Star,
  Camera,
  Gift,
  ArrowRight
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockOrders, mockProducts } from '../data/mockData';

interface OrderDashboardProps {
  onNavigate: (page: string) => void;
}

const orderStatusConfig = {
  pending: { 
    label: 'Pending', 
    color: 'bg-yellow-500', 
    icon: Clock, 
    progress: 25 
  },
  processing: { 
    label: 'Processing', 
    color: 'bg-blue-500', 
    icon: Package, 
    progress: 50 
  },
  shipped: { 
    label: 'Shipped', 
    color: 'bg-purple-500', 
    icon: Truck, 
    progress: 75 
  },
  delivered: { 
    label: 'Delivered', 
    color: 'bg-green-500', 
    icon: CheckCircle, 
    progress: 100 
  }
};

export function OrderDashboard({ onNavigate }: OrderDashboardProps) {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Mock loyalty points
  const loyaltyPoints = 2450;
  const nextRewardAt = 5000;

  const getOrderItems = (order: typeof mockOrders[0]) => {
    return order.items.map(item => {
      const product = mockProducts.find(p => p.id === item.productId);
      return { ...item, product };
    }).filter(item => item.product);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          Track your orders and manage your purchases
        </p>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          {/* Orders List */}
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const statusConfig = orderStatusConfig[order.status];
              const StatusIcon = statusConfig.icon;
              const orderItems = getOrderItems(order);

              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={`${statusConfig.color} text-white`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig.label}
                        </Badge>
                        <p className="text-lg font-semibold mt-1">
                          GH₵{order.total.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Order Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Order Progress</span>
                        <span>{statusConfig.progress}%</span>
                      </div>
                      <Progress value={statusConfig.progress} className="h-2" />
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {orderItems.map((item) => (
                        <div key={item.productId} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-muted/30 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={item.product!.image}
                              alt={item.product!.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.product!.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × GH₵{item.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t">
                      {order.trackingNumber && (
                        <Button variant="outline" size="sm">
                          <Truck className="w-4 h-4 mr-2" />
                          Track Package
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Invoice
                      </Button>
                      
                      {order.status === 'delivered' && (
                        <>
                          <Button variant="outline" size="sm">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reorder
                          </Button>
                          <Button variant="outline" size="sm">
                            <Star className="w-4 h-4 mr-2" />
                            Leave Review
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Delivery Info */}
                    {order.estimatedDelivery && order.status !== 'delivered' && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <Truck className="w-4 h-4 inline mr-1" />
                          Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Empty State */}
          {mockOrders.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">
                Start shopping to see your orders here
              </p>
              <Button onClick={() => onNavigate('home')}>
                Start Shopping
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          {/* Loyalty Points */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                KBZ Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">
                  {loyaltyPoints.toLocaleString()} Points
                </div>
                <p className="text-muted-foreground">Your current balance</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress to next reward</span>
                  <span>{nextRewardAt - loyaltyPoints} points to go</span>
                </div>
                <Progress value={(loyaltyPoints / nextRewardAt) * 100} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">GH₵2,500</div>
                  <p className="text-sm text-muted-foreground">Total Saved</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
                  <p className="text-sm text-muted-foreground">Orders This Year</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">Gold</div>
                  <p className="text-sm text-muted-foreground">Member Status</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Available Rewards</h3>
                <div className="space-y-3">
                  {[
                    { points: 1000, reward: 'GH₵50 off next purchase', available: true },
                    { points: 2500, reward: 'Free premium shipping for 6 months', available: false },
                    { points: 5000, reward: 'GH₵250 off flagship products', available: false }
                  ].map((reward, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{reward.reward}</p>
                        <p className="text-sm text-muted-foreground">{reward.points} points required</p>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={!reward.available}
                        variant={reward.available ? "default" : "outline"}
                      >
                        {reward.available ? 'Redeem' : 'Locked'}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
            <p className="text-muted-foreground mb-4">
              Share your experience with products you've purchased
            </p>
            <Button onClick={() => onNavigate('home')}>
              Browse Products to Review
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}