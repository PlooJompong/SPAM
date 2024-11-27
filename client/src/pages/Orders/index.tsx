import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import pizzaLogo from "../../assets/pizzaLogo.png";
import editLogo from "../../assets/editLogo.svg";
import lockedLogo from "../../assets/lockedLogo.svg";
import margherita from "../../assets/margherita.png";
// import unlockedLogo from "../../assets/unlockedLogo.svg";
import { useState, useEffect } from "react";

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

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Hämta ordrar från backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/order");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <header className="flex h-40 w-full bg-orange-100 px-2">
        <div className="flex h-full w-1/2">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={pizzaLogo}
              alt="logo"
              className="left -1/2-translate-x-1/2 h-32 w-32 transform self-center"
            />
            <h1 className="flex items-center justify-center bg-orange-100 font-primary text-3xl text-teal-900">
              SPAM PIZZA
            </h1>
          </Link>
        </div>

        <h2 className="flex h-full w-1/2 items-center font-primary text-2xl text-teal-900">
          Beställningar
        </h2>
      </header>

      <main className="m-auto flex h-full w-full justify-center bg-orange-100 p-4">
        {/* Container för båda kolumnerna */}
        <div className="flex h-screen w-9/12 p-4">
          {/* Vänster kolumn */}
          <div className="w-2/5 space-y-4">
            <div className="flex items-center justify-center">
              <button className="rounded-l-lg bg-teal-900 px-4 py-2 text-white">
                SAMTLIGA
              </button>
              <button className="rounded-r-lg bg-orange-500 px-4 py-2 text-white">
                OBEHANDLADE
              </button>
            </div>

            {/* Rendera ordrarna */}
            {orders.map((order) => (
              <div
                key={order._id}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${
                  selectedOrder === order._id ? "bg-[#e9dfcf]" : ""
                }`}
                onClick={() => setSelectedOrder(order._id)}
              >
                <div className="">Beställning {order._id}</div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox h-6 w-6" />
                  <button className="px-5">
                    <img src={editLogo} alt="Edit" className="h-6 w-6" />
                  </button>
                  <button>
                    <img src={lockedLogo} alt="Locked" className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Höger kolumn*/}
          <div className="w-3/5 pl-6">
            {selectedOrder ? (
              <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-teal-900">
                    Beställning {selectedOrder}
                  </h2>
                  <button>
                    <img src={editLogo} alt="Edit" className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4">
                  {/* Rendera detaljer för den valda beställningen */}
                  {orders
                    .filter((order) => order._id === selectedOrder)
                    .map((order) => (
                      <div key={order._id}>
                        {order.items.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between border-b py-3"
                          >
                            <div className="flex items-center space-x-4">
                              <img
                                src={margherita}
                                alt="Pizza"
                                className="h-16 w-16 rounded-md object-cover"
                              />
                              <div>
                                <div className="text-teal-900">{item.name}</div>
                                {/* Behöver läggas till quantity i backend? */}
                                <div className="text-sm text-gray-500">
                                  Antal: 1
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-teal-900">
                                {item.price} kr
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* Totalen */}
                        <div className="mt-4 flex justify-between text-lg font-semibold">
                          <span className="text-teal-900">Totalbelopp</span>
                          <span className="text-teal-900">
                            {order.totalPrice} kr
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                Välj en beställning för att se detaljer
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Orders;
