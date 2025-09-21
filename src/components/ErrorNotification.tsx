import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';
import {
  AlertTriangle,
  X,
  RefreshCw,
  MapPin,
  CreditCard,
  Wifi,
  CheckCircle
} from 'lucide-react';
import { ErrorInfo } from '../services/errorHandler';

interface ErrorNotificationProps {
  error: ErrorInfo | null;
  onClose: () => void;
  onAction?: () => void;
}

export function ErrorNotification({ error, onClose, onAction }: ErrorNotificationProps) {
  if (!error) return null;

  const getErrorIcon = () => {
    switch (error.type) {
      case 'out_of_stock':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'price_changed':
        return <RefreshCw className="w-5 h-5 text-blue-500" />;
      case 'payment_failed':
        return <CreditCard className="w-5 h-5 text-red-500" />;
      case 'invalid_address':
        return <MapPin className="w-5 h-5 text-yellow-500" />;
      case 'network_error':
        return <Wifi className="w-5 h-5 text-gray-500" />;
      case 'validation_error':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getErrorColor = () => {
    switch (error.type) {
      case 'out_of_stock':
        return 'border-orange-200 bg-orange-50';
      case 'price_changed':
        return 'border-blue-200 bg-blue-50';
      case 'payment_failed':
        return 'border-red-200 bg-red-50';
      case 'invalid_address':
        return 'border-yellow-200 bg-yellow-50';
      case 'network_error':
        return 'border-gray-200 bg-gray-50';
      case 'validation_error':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const handleAction = () => {
    if (onAction) {
      onAction();
    }
    onClose();
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full">
      <Card className={`${getErrorColor()} border-l-4`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getErrorIcon()}
              <CardTitle className="text-lg">{error.title}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {error.message}
          </p>

          {error.action && (
            <div className="flex gap-2">
              <Button onClick={handleAction} size="sm">
                {error.actionLabel || error.action}
              </Button>
              <Button variant="outline" onClick={onClose} size="sm">
                Dismiss
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Global error context provider
interface ErrorContextType {
  error: ErrorInfo | null;
  setError: (error: ErrorInfo | null) => void;
}

export const ErrorContext = React.createContext<ErrorContextType | null>(null);

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<ErrorInfo | null>(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
      <ErrorNotification error={error} onClose={() => setError(null)} />
    </ErrorContext.Provider>
  );
}

// Hook to use error context
export function useError() {
  const context = React.useContext(ErrorContext);
  if (!context) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

// Success notification component
export function SuccessNotification({
  message,
  onClose
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full">
      <Card className="border-l-4 border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <CardTitle className="text-lg text-green-800">Success!</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700 mb-4">
            {message}
          </p>
          <Button onClick={onClose} size="sm">
            Close
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Loading notification component
export function LoadingNotification({
  message,
  onCancel
}: {
  message: string;
  onCancel?: () => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-50 max-w-md w-full">
      <Card className="border-l-4 border-blue-200 bg-blue-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
              <CardTitle className="text-lg">Processing...</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-blue-700 mb-4">
            {message}
          </p>
          {onCancel && (
            <Button variant="outline" onClick={onCancel} size="sm">
              Cancel
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
