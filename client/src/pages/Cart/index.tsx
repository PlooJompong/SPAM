import React from "react";
import { useCart } from "../../context/CartContext";
import { GoPlus } from "react-icons/go";
import { HiMinusSm } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const { cart, calculateTotalPrice, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (itemId: string, change: number) => {
    updateQuantity(itemId, change);
  };

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Varukorgen är tom. Lägg till något innan du beställer!");
      return;
    }

    if (!user) {
      alert("Du måste vara inloggad för att lägga en beställning.");
      return;
    }

    // Skapa beställdOrder
    const createdOrder = {
      name: user.username, // Använd användarens namn från AuthContext
      items: cart.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        vegetarian: item.vegetarian,
        ingredients: item.ingredients,
        quantity: item.quantity,
      })),
      totalPrice: calculateTotalPrice(),
      orderDate: new Date().toISOString(),
      locked: true,
      done: true,
      comment: "",
    };

    try {
      const response = await fetch("https://node-mongodb-api-ks7o.onrender.com/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createdOrder),
        /*      body: JSON.stringify({
          name: user.username, // Använd användarens namn från AuthContext
          items: cart, // Skickar varukorgens innehåll
          totalPrice: calculateTotalPrice(), // Skickar totalpriset
          orderDate: new Date().toISOString(), // Lägg till orderdatum
        }), */
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      /* alert("Din beställning har skickats!"); */
      console.log("Beställning skickad:", data);
      navigate("/confirmation", {
        state: { order: createdOrder },
      });

      // Skicka till orderhistorik
      await addToOrderHistory({
        userId: user.username, // Unik användaridentifierare
        name: user.username,
        items: cart,
        totalPrice: calculateTotalPrice(),
      });

      // Rensa varukorgen efter beställning
      clearCart();
    } catch (error) {
      console.error("Kunde inte skicka beställningen:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  const addToOrderHistory = async (order: {
    userId: string;
    name: string;
    items: Array<{
      _id: string;
      name: string;
      price: number;
      vegetarian: boolean;
      ingredients: string[];
    }>;
    totalPrice: number;
  }) => {
    try {
      const response = await fetch("https://node-mongodb-api-ks7o.onrender.com/orderhistory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Order tillagd i historik:", data);
    } catch (error) {
      console.error("Kunde inte lägga till order i historik:", error);
    }
  };

  return (
    <article className="flex flex-col p-4">
      <h1 className="text-teal-900 text-lg font-bold">Varukorg</h1>
      <ul className="text-teal-900 flex flex-col w-80">
        {cart.map((item, index) => (
          <li
            key={`${item._id}-${index}`}
            className="mb-2 flex justify-between w-full flex-col"
          >
            <div className="flex justify-between w-full">
              <span>{item.name} </span>
              <span> {item.price} kr</span>
            </div>
            <span className="flex items-center gap-2 justify-center w-16 border rounded-2xl mt-1 border-zinc-200 p-1 text-teal-900">
              <HiMinusSm
                className="text-teal-900 cursor-pointer"
                onClick={() => handleQuantityChange(item._id, -1)}
              />
              <p>{item.quantity}</p>
              <GoPlus
                className="text-teal-900 cursor-pointer"
                onClick={() => handleQuantityChange(item._id, 1)}
              />
            </span>
          </li>
        ))}
      </ul>
      {cart.length === 0 && <p>Varukorgen är tom.</p>}

      {cart.length > 0 && (
        <div className="flex flex-col w-80">
          <hr className="mt-6 mb-2"></hr>
          <h2 className="text-teal-900 flex justify-between w-80">
            <span>Totalpris:</span>
            <span>{calculateTotalPrice()} kr</span>
          </h2>
          <div className="flex gap-4">
            <button
              onClick={handleOrder}
              className="bg-teal-900 text-white rounded-lg px-2 py-1 mt-8 mb-2 cursor-pointer"
            >
              Beställ
            </button>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white rounded-lg px-2 py-1 mt-8 mb-2 cursor-pointer"
            >
              Rensa varukorg
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default Cart;
