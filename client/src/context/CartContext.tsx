// import React, { createContext, useState, ReactNode, useContext } from "react";

// // Typen för menyobjekt
// interface MenuItem {
//   _id: string;
//   name: string;
//   price: number;
//   vegetarian: boolean;
//   ingredients: string[];
// }

// // Typ för kontexten
// interface CartContextType {
//   cart: MenuItem[];
//   addToCart: (item: MenuItem) => void;
// }

// // Skapa en Context
// const CartContext = createContext<CartContextType | undefined>(undefined);

// // Provider-komponent
// export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<MenuItem[]>([]);

//   const addToCart = (item: MenuItem) => {
//     setCart((prevCart) => [...prevCart, item]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Hook för att använda kontexten
// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

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
  calculateTotalPrice: () => number; // Ny funktion
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    // Kolla om menyartikeln redan finns i varukorgen
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
      // Om den inte finns, lägg till den med  1
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
          : item
      )
    );
  };

  const calculateTotalPrice = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, calculateTotalPrice }}
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
