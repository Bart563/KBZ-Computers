// Error handling service for KBZ Computers eCommerce platform
// Handles common edge cases and provides user-friendly error messages

export interface ErrorInfo {
  type: 'out_of_stock' | 'price_changed' | 'payment_failed' | 'invalid_address' | 'network_error' | 'validation_error' | 'general_error';
  title: string;
  message: string;
  action?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ErrorState {
  isVisible: boolean;
  error: ErrorInfo | null;
}

class ErrorHandler {
  private errorCallbacks: ((error: ErrorInfo) => void)[] = [];

  // Subscribe to error events
  onError(callback: (error: ErrorInfo) => void) {
    this.errorCallbacks.push(callback);
    return () => {
      const index = this.errorCallbacks.indexOf(callback);
      if (index > -1) {
        this.errorCallbacks.splice(index, 1);
      }
    };
  }

  // Emit error to all subscribers
  private emitError(error: ErrorInfo) {
    this.errorCallbacks.forEach(callback => callback(error));
  }

  // Handle out of stock products
  handleOutOfStock(productId: string, productName: string, onBrowseAlternatives?: () => void) {
    this.emitError({
      type: 'out_of_stock',
      title: 'Product Out of Stock',
      message: `${productName} is currently out of stock. We'll notify you when it becomes available.`,
      action: 'Browse Similar Products',
      actionLabel: 'Browse Alternatives',
      onAction: onBrowseAlternatives
    });
  }

  // Handle price changes
  handlePriceChanged(productId: string, productName: string, oldPrice: number, newPrice: number, onContinue?: () => void) {
    this.emitError({
      type: 'price_changed',
      title: 'Price Updated',
      message: `The price of ${productName} has changed from ₦${oldPrice.toLocaleString()} to ₦${newPrice.toLocaleString()}.`,
      action: 'Continue with new price',
      actionLabel: 'Continue',
      onAction: onContinue
    });
  }

  // Handle payment failures
  handlePaymentFailed(orderId: string, amount: number, onRetry?: () => void, onContactSupport?: () => void) {
    this.emitError({
      type: 'payment_failed',
      title: 'Payment Failed',
      message: `Your payment of ₦${amount.toLocaleString()} for order ${orderId} could not be processed. Please check your payment details and try again.`,
      action: 'Retry Payment',
      actionLabel: 'Retry',
      onAction: onRetry
    });
  }

  // Handle invalid addresses
  handleInvalidAddress(address: any, onEditAddress?: () => void) {
    this.emitError({
      type: 'invalid_address',
      title: 'Invalid Shipping Address',
      message: 'The shipping address provided appears to be invalid or incomplete. Please review and update your address information.',
      action: 'Edit Address',
      actionLabel: 'Edit Address',
      onAction: onEditAddress
    });
  }

  // Handle network errors
  handleNetworkError(action: string, onRetry?: () => void) {
    this.emitError({
      type: 'network_error',
      title: 'Connection Error',
      message: `Unable to ${action.toLowerCase()} due to a network connection issue. Please check your internet connection and try again.`,
      action: 'Try Again',
      actionLabel: 'Retry',
      onAction: onRetry
    });
  }

  // Handle validation errors
  handleValidationError(field: string, message: string, onFix?: () => void) {
    this.emitError({
      type: 'validation_error',
      title: 'Validation Error',
      message: `${field}: ${message}`,
      action: 'Fix Issue',
      actionLabel: 'Fix',
      onAction: onFix
    });
  }

  // Handle general errors
  handleGeneralError(message: string, onRetry?: () => void) {
    this.emitError({
      type: 'general_error',
      title: 'Something Went Wrong',
      message: message,
      action: 'Try Again',
      actionLabel: 'Retry',
      onAction: onRetry
    });
  }

  // Create stock check function
  checkStockAvailability(productId: string, requestedQuantity: number): { available: boolean; availableQuantity?: number } {
    const { mockProducts } = require('../data/mockData');
    const product = mockProducts.find((p: any) => p.id === productId);

    if (!product) {
      return { available: false };
    }

    if (!product.inStock) {
      return { available: false };
    }

    if (requestedQuantity > product.stockCount) {
      return { available: false, availableQuantity: product.stockCount };
    }

    return { available: true };
  }

  // Validate address
  validateAddress(address: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!address.firstName || address.firstName.trim().length < 2) {
      errors.push('First name is required and must be at least 2 characters');
    }

    if (!address.lastName || address.lastName.trim().length < 2) {
      errors.push('Last name is required and must be at least 2 characters');
    }

    if (!address.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
      errors.push('A valid email address is required');
    }

    if (!address.phone || address.phone.trim().length < 10) {
      errors.push('A valid phone number is required');
    }

    if (!address.address || address.address.trim().length < 5) {
      errors.push('Street address is required and must be at least 5 characters');
    }

    if (!address.city || address.city.trim().length < 2) {
      errors.push('City is required');
    }

    if (!address.state || address.state.trim().length < 2) {
      errors.push('State is required');
    }

    if (!address.postalCode || address.postalCode.trim().length < 3) {
      errors.push('Postal code is required');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  // Simulate payment processing with potential failure
  async processPayment(paymentInfo: any, orderTotal: number): Promise<{ success: boolean; error?: string }> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate random payment failure (10% chance)
    if (Math.random() < 0.1) {
      return {
        success: false,
        error: 'Payment processing failed. Please check your card details and try again.'
      };
    }

    // Simulate card validation
    if (paymentInfo.method === 'card') {
      if (!paymentInfo.cardNumber || paymentInfo.cardNumber.length < 13) {
        return {
          success: false,
          error: 'Invalid card number. Please check and try again.'
        };
      }

      if (!paymentInfo.expiryDate || !paymentInfo.cvv) {
        return {
          success: false,
          error: 'Card expiry date and CVV are required.'
        };
      }

      if (!paymentInfo.cardName || paymentInfo.cardName.trim().length < 2) {
        return {
          success: false,
          error: 'Cardholder name is required.'
        };
      }
    }

    return { success: true };
  }

  // Handle form validation
  validateForm(formData: any, requiredFields: string[]): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    requiredFields.forEach(field => {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (formData.phone && formData.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Please enter a valid phone number';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }
}

// Create singleton instance
export const errorHandler = new ErrorHandler();

// Utility functions for common error scenarios
export const handleAsyncError = async (operation: () => Promise<any>, errorMessage: string) => {
  try {
    return await operation();
  } catch (error) {
    errorHandler.handleGeneralError(errorMessage);
    throw error;
  }
};

export const withErrorHandling = <T extends any[], R>(
  fn: (...args: T) => R,
  errorHandler: (error: any, ...args: T) => void
) => {
  return (...args: T): R => {
    try {
      return fn(...args);
    } catch (error) {
      errorHandler(error, ...args);
      throw error;
    }
  };
};
