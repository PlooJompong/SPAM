import React, { createContext, useState, ReactNode, useContext } from "react";

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  ingredients: string[];
  quantity: number;
}

interface CartContextType {
  cart: MenuItem[];
  addToCart: (item: MenuItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  calculateTotalPrice: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(0, item.quantity + quantity) }
            : item
        )
        .filter((item) => item.quantity > 0) // Ta bort objekt med quantity 0
    );
  };

  const calculateTotalPrice = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => {
    setCart([]); // Töm varukorgen
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, calculateTotalPrice, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

