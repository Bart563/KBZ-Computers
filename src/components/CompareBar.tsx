import React from 'react';
import { CompareItem, Product, mockProducts } from '../data/mockData';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { XIcon, GitCompareIcon } from 'lucide-react';

interface CompareBarProps {
  compareItems: CompareItem[];
  onRemoveFromCompare: (productId: string) => void;
  onNavigate: (page: string) => void;
}

export function CompareBar({ compareItems, onRemoveFromCompare, onNavigate }: CompareBarProps) {
  if (compareItems.length === 0) {
    return null;
  }

  const comparedProducts = compareItems.map(item => 
    mockProducts.find(p => p.id === item.productId)
  ).filter((p): p is Product => p !== undefined);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">Compare Items ({comparedProducts.length}/4)</h3>
          <div className="flex space-x-2">
            {comparedProducts.map(product => (
              <div key={product.id} className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-12 h-12 object-cover rounded-md"
                />
                <button 
                  onClick={() => onRemoveFromCompare(product.id)}
                  className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full p-0.5"
                >
                  <XIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <Button variant="outline" onClick={() => compareItems.forEach(item => onRemoveFromCompare(item.productId))}>Clear All</Button>
          <Button onClick={() => onNavigate('compare')}>
            <GitCompareIcon className="h-4 w-4 mr-2" />
            Compare Now
          </Button>
        </div>
      </div>
    </div>
  );
}
