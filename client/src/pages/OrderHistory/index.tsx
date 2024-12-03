import React, { useEffect, useState } from "react";
import CustomerHeader from "../../components/CustomerHeader";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/Container";

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  ingredients: string[];
}

interface Order {
  _id: string;
  name: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
}

const TestHistory: React.FC = () => {
  const { user } = useAuth(); // Hämta inloggad användare från AuthContext
  const [orderHistory, setOrderHistory] = useState<Order[]>([]); // Typen anges här
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!user) {
        setError("Du måste vara inloggad för att se din orderhistorik.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000/orderhistory/${user.username}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setOrderHistory(data.orders); // Uppdatera state med orderhistoriken
      } catch (err) {
        console.error("Fel vid hämtning av orderhistorik:", err);
        setError("Kunde inte hämta orderhistoriken. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [user]);

  return (
    <>
      <CustomerHeader title="Orderhistorik" />
      <Container>
        <main className="primary-font flex h-screen w-full items-center justify-center bg-orange-100 text-teal-900">
          {loading ? (
            <p>Laddar din orderhistorik...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orderHistory.length === 0 ? (
            <p>Du har ännu inga beställningar i din orderhistorik.</p>
          ) : (
            <div className="w-3/4 bg-white p-4 rounded shadow">
              <ul className="space-y-4 w-1/3">
                {orderHistory.map((order, index) => (
                  <li key={index} className="border-b pb-4 w-full">
                    <h3 className="text-xl font-semibold">Order {order._id}</h3>
                    <p className="italic">
                      Datum: {new Date(order.orderDate).toLocaleDateString()}
                    </p>

                    <ul className="list-disc flex flex-col">
                      {order.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="list-none flex justify-between w-full"
                        >
                          <span>{item.name}</span> <span>{item.price} kr</span>
                        </li>
                      ))}
                    </ul>
                    <p className="flex justify-between w-full mt-8">
                      <span>Totalpris:</span> <span>{order.totalPrice} kr</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </main>
      </Container>
    </>
  );
};

export default TestHistory;
