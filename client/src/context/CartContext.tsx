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
}

interface CartContextType {
  cart: MenuItem[];
  addToCart: (item: MenuItem) => void;
  calculateTotalPrice: () => number; // Ny funktion
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<MenuItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const calculateTotalPrice = (): number => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, calculateTotalPrice }}>
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
