import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../data/mockProducts';

export interface CartItem {
  product: Product;
  quantity: number;
  isBundle?: boolean;
  bundleId?: string;
  bundleDiscount?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  addBundle: (products: Product[], discount: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
  getShippingCost: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 69;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('fitpoint-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('fitpoint-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const addBundle = (products: Product[], discount: number) => {
    const bundleId = `bundle-${Date.now()}`;
    const bundleItems: CartItem[] = products.map(product => ({
      product,
      quantity: 1,
      isBundle: true,
      bundleId,
      bundleDiscount: discount
    }));
    
    setItems(prevItems => [...prevItems, ...bundleItems]);
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => {
      const price = item.product.price * item.quantity;
      if (item.isBundle && item.bundleDiscount) {
        return total + price * (1 - item.bundleDiscount / 100);
      }
      return total + price;
    }, 0);
  };

  const getShippingCost = () => {
    const subtotal = getSubtotal();
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
  };

  const getTotal = () => {
    return getSubtotal() + getShippingCost();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        addBundle,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getSubtotal,
        getTotal,
        getShippingCost
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 