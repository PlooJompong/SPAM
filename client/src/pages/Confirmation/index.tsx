// import CustomHeader from "../../components/CustomerHeader";
// import orderCheck from "../../assets/orderCheck.svg";
// import { useLocation } from "react-router-dom";

// interface OrderItem {
//   _id: string;
//   name: string;
//   price: number;
//   vegetarian: boolean;
//   ingredients: string[];
//   quantity: number;
// }

// interface Order {
//   _id: string;
//   name: string;
//   items: OrderItem[];
//   totalPrice: number;
//   orderDate: string;
//   locked: boolean;
//   done: boolean;
//   comment?: string;
// }

// const Confirmation = () => {
//   const location = useLocation();
//   const order = location.state?.order as Order | undefined; // Hämta beställdOrder från location.state

//   // När order eller items inte finns
//   if (!order || !order.items) {
//     return <p>Ingen orderinformation tillgänglig</p>;
//   }

//   return (
//     <>
//       <CustomHeader />
//       <main className="flex h-screen flex-col items-center pt-16">
//         <section className="mb-4 flex items-center">
//           <img
//             src={orderCheck}
//             alt="Ordercheck Icon"
//             className="mr-4 h-9 w-9 pb-2"
//           />
//           <h1 className="font-primary text-2xl md:text-4xl font-bold text-teal-900">
//             Orderbekräftelse
//           </h1>
//         </section>
//         <h4 className="font-primary text-lg text-teal-900">
//           Tack för din order, {order.name}!
//         </h4>
//         <section className="flex w-full px-4 md:w-1/2 flex-col space-y-6 pt-1">
//           {order.items.map((item) => (
//             <article
//               key={item._id}
//               className="flex items-start justify-between pb-2"
//             >
//               <article>
//                 <p className="text-lg font-medium text-teal-900">{item.name}</p>
//                 <p className="text-sm text-teal-900">{item.quantity} st</p>
//               </article>
//               <p className="text-lg font-medium text-teal-900">
//                 {item.price * item.quantity} kr
//               </p>
//             </article>
//           ))}

//           <article className="flex gap-2">
//             <p className="font-semibold text-gray-600">Din kommentar: </p>
//             <p className="italic text-gray-600">
//               {order.comment || "Ingen kommentar lämnad"}
//             </p>
//           </article>

//           <article className="flex items-center justify-between border-t pt-4">
//             <p className="text-lg font-bold text-teal-900">Totalt</p>
//             <p className="text-lg font-bold text-teal-900">
//               {order.totalPrice} kr
//             </p>
//           </article>
//         </section>
//       </main>
//     </>
//   );
// };

// export default Confirmation;

import React, { useEffect, useState } from "react";
import CustomHeader from "../../components/CustomerHeader";
import orderCheck from "../../assets/orderCheck.svg";
import { useLocation } from "react-router-dom";

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  ingredients: string[];
  quantity: number;
}

interface Order {
  _id: string;
  name: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
  locked: boolean;
  done: boolean;
  comment?: string;
}

const Confirmation = () => {
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const orderId = location.state?.order?._id;

  // Hämta orderstatus från backend med polling
  useEffect(() => {
    if (!orderId) {
      setError("Ingen orderinformation tillgänglig");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/orders/${orderId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Order = await response.json();
        setOrder(data);
        setLoading(false); // Sätt loading till false efter en lyckad hämtning
      } catch (err) {
        console.error("Fel vid hämtning av order:", err);
        setError("Kunde inte hämta ordern. Försök igen senare.");
        setLoading(false); // Sätt loading till false även vid ett fel
      }
    };

    // Starta polling
    const intervalId = setInterval(fetchOrder, 5000); // Uppdatera var 5:e sekund

    // Hämta första gången omedelbart
    fetchOrder();

    // Rensa intervallet när komponenten avmonteras
    return () => clearInterval(intervalId);
  }, [orderId]);

  if (loading) {
    return <p>Laddar orderinformation...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!order) {
    return <p>Ingen orderinformation tillgänglig</p>;
  }

  return (
    <>
      <CustomHeader />
      <main className="flex h-screen flex-col items-center pt-16">
        <section className="mb-4 flex items-center">
          <img
            src={orderCheck}
            alt="Ordercheck Icon"
            className="mr-4 h-9 w-9 pb-2"
          />
          <h1 className="font-primary text-2xl md:text-4xl font-bold text-teal-900">
            Orderbekräftelse
          </h1>
        </section>
        <h4 className="font-primary text-lg text-teal-900">
          Tack för din order, {order.name}!
        </h4>
        <section className="flex w-full px-4 md:w-1/2 flex-col space-y-6 pt-1">
          {order.items.map((item) => (
            <article
              key={item._id}
              className="flex items-start justify-between pb-2"
            >
              <article>
                <p className="text-lg font-medium text-teal-900">{item.name}</p>
                <p className="text-sm text-teal-900">{item.quantity} st</p>
              </article>
              <p className="text-lg font-medium text-teal-900">
                {item.price * item.quantity} kr
              </p>
            </article>
          ))}

          <article className="flex gap-2">
            <p className="font-semibold text-gray-600">Din kommentar: </p>
            <p className="italic text-gray-600">
              {order.comment || "Ingen kommentar lämnad"}
            </p>
          </article>

          {/* Nytt avsnitt för locked och done */}
          <article className="flex gap-4">
            <p className="text-lg font-semibold text-teal-900">Orderstatus:</p>
            <div>
              <p>
                <span className="font-bold">Låst:</span>{" "}
                {order.locked ? "Ja" : "Nej"}
              </p>
              <p>
                <span className="font-bold">Färdig:</span>{" "}
                {order.done ? "Ja" : "Nej"}
              </p>
            </div>
          </article>

          <article className="flex items-center justify-between border-t pt-4">
            <p className="text-lg font-bold text-teal-900">Totalt</p>
            <p className="text-lg font-bold text-teal-900">
              {order.totalPrice} kr
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default Confirmation;
