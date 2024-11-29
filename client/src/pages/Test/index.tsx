import React from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // Importera AuthContext för att få användarinfo

const Test: React.FC = () => {
  const { cart, addToCart, calculateTotalPrice } = useCart();
  const { user } = useAuth(); // Hämta inloggad användare från AuthContext

  // Funktion för att lägga till dummydata i varukorgen
  const addDummyData = () => {
    addToCart({
      _id: "1",
      name: "Pizza",
      price: 120,
      vegetarian: true,
      ingredients: ["Tomatsås"],
    });
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

    try {
      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.username, // Använd användarens namn från AuthContext
          items: cart, // Skickar varukorgens innehåll
          totalPrice: calculateTotalPrice(), // Skickar totalpriset
          orderDate: new Date().toISOString(), // Lägg till orderdatum
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      alert("Din beställning har skickats!");
      console.log("Beställning skickad:", data);

      // Skicka till orderhistorik
      await addToOrderHistory({
        userId: user.username, // Unik användaridentifierare
        name: user.username,
        items: cart,
        totalPrice: calculateTotalPrice(),
      });

      // Rensa varukorgen (valfritt)
      // clearCart();
    } catch (error) {
      console.error("Kunde inte skicka beställningen:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  // Funktion för att lägga till i orderhistorik
  const addToOrderHistory = async (order: {
    userId: string;
    name: string;
    items: Array<{ _id: string; name: string; price: number; vegetarian: boolean; ingredients: string[] }>;
    totalPrice: number;
  }) => {
    try {
      const response = await fetch("http://localhost:8000/orderhistory", {
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
    <div>
      <h1>Din varukorg</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={`${item._id}-${index}`}>
            {item.name} - {item.price} kr
          </li>
        ))}
      </ul>
      {cart.length === 0 && <p>Varukorgen är tom.</p>}

      {cart.length > 0 && (
        <div>
          <h2>Totalpris: {calculateTotalPrice()} kr</h2>
          <button
            onClick={handleOrder}
            style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
          >
            Beställ
          </button>
        </div>
      )}

      {/* Knapp för att lägga till dummydata */}
      <button
        onClick={addDummyData}
        style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}
      >
        Lägg till Pizza
      </button>
    </div>
  );
};

export default Test;
