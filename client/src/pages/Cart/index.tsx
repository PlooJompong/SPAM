// import React from "react";
// import { useCart } from "../../context/CartContext";
// import Navbar from "../../components/Navbar";


// const Cart: React.FC = () => {
//   const { cart, calculateTotalPrice } = useCart();

//   return (
//     <>
//       <Navbar/>
//       <div>
//         <h1>Din varukorg</h1>
//         <ul>
//           {cart.map((item, index) => (
//             <li key={`${item._id}-${index}`}>
//               {item.name} - {item.price} kr
//             </li>
//           ))}
//         </ul>
//         {cart.length === 0 && <p>Varukorgen är tom.</p>}
//         <div>
//           <h2>Totalpris: {calculateTotalPrice()}</h2>
//         </div>
//       </div>
//     </>
    
//   );
// };

// export default Cart;


import React from "react";
import { useCart } from "../../context/CartContext";

const Cart: React.FC = () => {
  const { cart, calculateTotalPrice } = useCart();

  // Funktion för att skicka beställningen till servern
  // const handleOrder = async () => {
  //   if (cart.length === 0) {
  //     alert("Varukorgen är tom. Lägg till något innan du beställer!");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("http://localhost:8000/orders", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         items: cart, // Skickar varukorgens innehåll
  //         totalPrice: calculateTotalPrice(), // Skickar totalpriset
  //         orderDate: new Date().toISOString(), // Lägg till orderdatum
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     alert("Din beställning har skickats!");
  //     console.log("Beställning skickad:", data);

  //     // Rensa varukorgen (valfritt)
  //     // Om du vill rensa varukorgen, implementera en "clearCart"-funktion i CartContext
  //     // clearCart();
  //   } catch (error) {
  //     console.error("Kunde inte skicka beställningen:", error);
  //     alert("Något gick fel. Försök igen.");
  //   }
  // };

  const handleOrder = async () => {
    if (cart.length === 0) {
      alert("Varukorgen är tom. Lägg till något innan du beställer!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Kundens Namn", // Lägg till ett namn här
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
  
      // Rensa varukorgen (valfritt)
      // clearCart();
    } catch (error) {
      console.error("Kunde inte skicka beställningen:", error);
      alert("Något gick fel. Försök igen.");
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
          <button onClick={handleOrder} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
            Beställ
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
