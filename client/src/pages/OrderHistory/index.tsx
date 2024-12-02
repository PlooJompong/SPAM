import React, { useEffect, useState } from 'react';
import CustomerHeader from '../../components/CustomerHeader';
import { useAuth } from '../../context/AuthContext';

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  ingredients: string[];
}

interface Order {
  name: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
}

const TestHistory: React.FC = () => {
  const { user } = useAuth(); // Hämta inloggad användare från AuthContext
  const [orderHistory, setOrderHistory] = useState<Order[]>([]); // Typen anges här
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!user) {
        setError('Du måste vara inloggad för att se din orderhistorik.');
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
        console.error('Fel vid hämtning av orderhistorik:', err);
        setError('Kunde inte hämta orderhistoriken. Försök igen senare.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [user]);

  return (
    <>
      <CustomerHeader title="Orderhistorik" />
      <main className="primary-font flex h-screen w-full items-center justify-center bg-orange-100 text-teal-900">
        {loading ? (
          <p>Laddar din orderhistorik...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : orderHistory.length === 0 ? (
          <p>Du har ännu inga beställningar i din orderhistorik.</p>
        ) : (
          <div className="w-3/4 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Orderhistorik</h2>
            <ul className="space-y-4">
              {orderHistory.map((order, index) => (
                <li key={index} className="border-b pb-4">
                  <h3 className="text-xl font-semibold">Order: {order.name}</h3>
                  <p>Totalt Pris: {order.totalPrice} kr</p>
                  <p>Datum: {new Date(order.orderDate).toLocaleDateString()}</p>
                  <ul className="mt-2 ml-4 list-disc">
                    {order.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        {item.name} - {item.price} kr
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
};

export default TestHistory;
