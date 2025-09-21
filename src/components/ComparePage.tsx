import React from 'react';
import { CompareItem, Product, mockProducts } from '../data/mockData';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { XIcon, ShoppingCartIcon } from 'lucide-react';

interface ComparePageProps {
  compareItems: CompareItem[];
  onRemoveFromCompare: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  onNavigate: (page: string) => void;
}

export function ComparePage({ 
  compareItems, 
  onRemoveFromCompare, 
  onAddToCart, 
  onNavigate 
}: ComparePageProps) {

  const comparedProducts = compareItems.map(item => 
    mockProducts.find(p => p.id === item.productId)
  ).filter((p): p is Product => p !== undefined);

  if (comparedProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Nothing to Compare</h1>
        <p className="text-muted-foreground mb-6">
          Add some products to compare their features side-by-side.
        </p>
        <Button onClick={() => onNavigate('home')}>Browse Products</Button>
      </div>
    );
  }

  const allSpecKeys = [...new Set(comparedProducts.flatMap(p => Object.keys(p.specifications)))];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Compare Products</h1>
      <div className="overflow-x-auto">
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${comparedProducts.length}, minmax(300px, 1fr))` }}>
          {comparedProducts.map(product => (
            <Card key={product.id}>
              <CardHeader>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                <CardTitle className="mt-4">{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
                <div className="space-y-2 text-sm">
                  {allSpecKeys.map(key => (
                    <div key={key} className="flex justify-between">
                      <span className="font-semibold text-muted-foreground">{key}</span>
                      <span>{product.specifications[key] || 'N/A'}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col space-y-2 mt-6">
                  <Button onClick={() => onAddToCart(product.id)}>
                    <ShoppingCartIcon className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" onClick={() => onRemoveFromCompare(product.id)}>
                    <XIcon className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
