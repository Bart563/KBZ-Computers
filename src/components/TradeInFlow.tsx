import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Gamepad2,
  Check,
  DollarSign,
  Camera,
  Upload
} from 'lucide-react';

interface TradeInFlowProps {
  onNavigate: (page: string) => void;
}

type DeviceType = 'phone' | 'laptop' | 'tablet' | 'gaming' | '';
type Condition = 'excellent' | 'good' | 'fair' | 'poor' | '';

interface TradeInData {
  deviceType: DeviceType;
  brand: string;
  model: string;
  condition: Condition;
  accessories: string[];
  description: string;
  photos: File[];
}

export function TradeInFlow({ onNavigate }: TradeInFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [tradeInData, setTradeInData] = useState<TradeInData>({
    deviceType: '',
    brand: '',
    model: '',
    condition: '',
    accessories: [],
    description: '',
    photos: []
  });
  const [estimatedValue, setEstimatedValue] = useState(0);

  const totalSteps = 4;
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  const deviceTypes = [
    { id: 'phone', label: 'Phone', icon: Smartphone },
    { id: 'laptop', label: 'Laptop', icon: Laptop },
    { id: 'tablet', label: 'Tablet', icon: Tablet },
    { id: 'gaming', label: 'Gaming Console', icon: Gamepad2 }
  ];

  const phoneBrands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei'];
  const laptopBrands = ['Apple', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'];
  const tabletBrands = ['Apple', 'Samsung', 'Microsoft', 'Lenovo'];
  const gamingBrands = ['Sony', 'Microsoft', 'Nintendo'];

  const getBrandsForDevice = (deviceType: DeviceType) => {
    switch (deviceType) {
      case 'phone': return phoneBrands;
      case 'laptop': return laptopBrands;
      case 'tablet': return tabletBrands;
      case 'gaming': return gamingBrands;
      default: return [];
    }
  };

  const conditions = [
    { 
      id: 'excellent', 
      label: 'Excellent', 
      description: 'Like new, no visible wear',
      multiplier: 1.0,
      color: 'text-green-600'
    },
    { 
      id: 'good', 
      label: 'Good', 
      description: 'Minor signs of use, fully functional',
      multiplier: 0.8,
      color: 'text-blue-600'
    },
    { 
      id: 'fair', 
      label: 'Fair', 
      description: 'Noticeable wear, some issues',
      multiplier: 0.6,
      color: 'text-yellow-600'
    },
    { 
      id: 'poor', 
      label: 'Poor', 
      description: 'Heavy wear, significant issues',
      multiplier: 0.3,
      color: 'text-red-600'
    }
  ];

  const accessories = [
    'Original Box',
    'Charger',
    'Earphones/Headphones',
    'Original Case',
    'Screen Protector',
    'Manual/Documentation'
  ];

  const calculateEstimate = () => {
    let baseValue = 0;
    
    // Base values (simplified)
    if (tradeInData.deviceType === 'phone') baseValue = 200000;
    if (tradeInData.deviceType === 'laptop') baseValue = 400000;
    if (tradeInData.deviceType === 'tablet') baseValue = 150000;
    if (tradeInData.deviceType === 'gaming') baseValue = 300000;

    // Apply condition multiplier
    const conditionData = conditions.find(c => c.id === tradeInData.condition);
    if (conditionData) {
      baseValue *= conditionData.multiplier;
    }

    // Bonus for accessories
    const accessoryBonus = tradeInData.accessories.length * 10000;
    
    return Math.round(baseValue + accessoryBonus);
  };

  const nextStep = () => {
    if (currentStep === 3) {
      const estimate = calculateEstimate();
      setEstimatedValue(estimate);
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return tradeInData.deviceType !== '';
      case 2:
        return tradeInData.brand !== '' && tradeInData.model !== '';
      case 3:
        return tradeInData.condition !== '';
      default:
        return true;
    }
  };

  const toggleAccessory = (accessory: string) => {
    setTradeInData(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accessory)
        ? prev.accessories.filter(a => a !== accessory)
        : [...prev.accessories, accessory]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="outline" 
          size="sm" 
          className="mb-4"
          onClick={() => onNavigate('home')}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Trade in Your Device</h1>
          <p className="text-muted-foreground">
            Get instant credit for your old device towards your next purchase
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="min-h-[500px]">
        <CardContent className="p-8">
          {/* Step 1: Device Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">What device are you trading?</h2>
                <p className="text-muted-foreground">Select your device type to get started</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deviceTypes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTradeInData(prev => ({ ...prev, deviceType: id as DeviceType }))}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      tradeInData.deviceType === id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <p className="font-medium">{label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Brand & Model */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Device Details</h2>
                <p className="text-muted-foreground">Help us identify your specific device</p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Select value={tradeInData.brand} onValueChange={(value) => 
                    setTradeInData(prev => ({ ...prev, brand: value, model: '' }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {getBrandsForDevice(tradeInData.deviceType).map(brand => (
                        <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input
                    placeholder="e.g., iPhone 14 Pro, MacBook Air M2"
                    value={tradeInData.model}
                    onChange={(e) => setTradeInData(prev => ({ ...prev, model: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Condition */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Device Condition</h2>
                <p className="text-muted-foreground">Be honest - it helps us give you a fair price</p>
              </div>

              <RadioGroup 
                value={tradeInData.condition} 
                onValueChange={(value) => setTradeInData(prev => ({ ...prev, condition: value as Condition }))}
                className="space-y-3"
              >
                {conditions.map(condition => (
                  <div key={condition.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-accent/50">
                    <RadioGroupItem value={condition.id} id={condition.id} />
                    <div className="flex-1">
                      <Label htmlFor={condition.id} className={`font-medium ${condition.color}`}>
                        {condition.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{condition.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>

              <div className="space-y-4">
                <Label>Included Accessories (increases value)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {accessories.map(accessory => (
                    <button
                      key={accessory}
                      onClick={() => toggleAccessory(accessory)}
                      className={`p-3 text-sm border rounded-lg transition-colors ${
                        tradeInData.accessories.includes(accessory)
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {accessory}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Additional Details (Optional)</Label>
                <Textarea
                  placeholder="Any additional information about your device..."
                  value={tradeInData.description}
                  onChange={(e) => setTradeInData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>
          )}

          {/* Step 4: Estimate */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <DollarSign className="w-10 h-10 text-green-600" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Your Trade-in Estimate</h2>
                <p className="text-muted-foreground">Based on the information provided</p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 p-8 rounded-2xl">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  ₦{estimatedValue.toLocaleString()}
                </div>
                <p className="text-green-700">Instant credit towards your next purchase</p>
              </div>

              <div className="max-w-md mx-auto space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Device:</span>
                  <span>{tradeInData.brand} {tradeInData.model}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Condition:</span>
                  <span className="capitalize">{tradeInData.condition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Accessories:</span>
                  <span>{tradeInData.accessories.length} included</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => onNavigate('trade-in-confirmation')}>
                  Accept Offer
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('home')}>
                  Use Credit Now
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Final value will be confirmed upon device inspection
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < currentStep ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextStep}
          disabled={!canProceed() || currentStep === totalSteps}
        >
          {currentStep === totalSteps - 1 ? 'Get Estimate' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}