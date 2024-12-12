import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerHeader from "../../components/CustomerHeader";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/Container";
import { useCart } from "../../context/CartContext";
import { motion } from "framer-motion";

interface OrderItem {
  _id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  ingredients: string[];
  quantity: number;
  done: boolean;
  locked: boolean;
  comment: string;
}

interface Order {
  _id: string;
  name: string;
  items: OrderItem[];
  totalPrice: number;
  orderDate: string;
  comment: string;
}

const TestHistory: React.FC = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!user) {
        setError("Du måste vara inloggad för att se din orderhistorik.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8000/orderhistory/${user.username}`,
          // `https://node-mongodb-api-ks7o.onrender.com/orderhistory/${user.username}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            setError("Din session har gått ut. Logga in igen");
            console.log("Din session har gått ut. Logga in igen");
            sessionStorage.removeItem("token");
            navigate("/login");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return;
        }
        const data = await response.json();
        setOrderHistory(data.orders);
      } catch (err) {
        console.error("Fel vid hämtning av orderhistorik:", err);
        setError("Kunde inte hämta orderhistoriken. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [user, navigate]);

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => {
      addToCart({
        ...item,
        quantity: item.quantity, // Ensure the correct quantity is passed
      });
    });
    navigate("/cart");
  };

  return (
    <>
      <CustomerHeader title="Orderhistorik" />
      <Container>
        <main className="primary-font flex min-h-screen w-full justify-center text-teal-900">
          {loading ? (
            <p>Laddar din orderhistorik...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : orderHistory.length === 0 ? (
            <p>Du har ännu inga beställningar i din orderhistorik.</p>
          ) : (
            <section className="w-full max-w-[768px] flex flex-col">
              <ul className="space-y-4 w-full flex flex-wrap ">
                {orderHistory.map((order, index) => (
                  <li
                    key={index}
                    className="border-b pb-4 w-full flex flex-col p-4 bg-orange-100 shadow rounded"
                  >
                    <h3 className="lg:text-xl md:text-xl sm:text-sm font-semibold">
                      Order {order._id}
                    </h3>
                    <p className="lg:text-lg md:text-lg sm:text-sm font-sans">
                      Datum: {new Date(order.orderDate).toLocaleDateString()}
                    </p>

                    <ul className="list-disc flex flex-col">
                      {order.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="list-none flex justify-between w-full"
                        >
                          <span className="lg:text-lg md:text-lg sm:text-xs">
                            {item.name}
                          </span>
                          <div>
                            <span className="lg:text-lg md:text-lg sm:text-xs mr-3">
                              {item.quantity} st x
                            </span>
                            <span className="lg:text-lg md:text-lg sm:text-xs">
                              {item.price} kr
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="flex justify-between w-full mt-8">
                      <span className="lg:text-lg md:text-lg sm:text-xs">
                        Totalpris:
                      </span>
                      <span className="lg:text-lg md:text-lg sm:text-xs">
                        {order.totalPrice} kr
                      </span>
                    </p>
                    <article className="flex gap-2 font-sans">
                      <p className="">Din kommentar:</p>
                      <p className="italic">
                        {order.comment || "Ingen kommentar lämnad"}
                      </p>
                    </article>
                    <motion.button
                      onClick={() => handleReorder(order)}
                      className="bg-teal-900 text-white rounded-lg px-4 py-2 mt-4 hover:bg-teal-800 self-end"
                      whileTap={{ scale: 0.9 }}
                    >
                      Beställ igen
                    </motion.button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </Container>
    </>
  );
};

export default TestHistory;
