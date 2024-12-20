import editLogo from "../../assets/editLogo.svg";
import lockedLogo from "../../assets/lockedLogo.svg";
import margherita from "../../assets/margherita.png";
import unlockedLogo from "../../assets/unlockedLogo.svg";
import { useState, useEffect } from "react";
import Container from "../../components/Container";
import EmployeeHeader from "../../components/EmployeeHeader";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
  comment: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const [filter, setFilter] = useState<"done" | "pending">("pending");
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>("");

  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const filteredOrders = orders.filter((order) => {
    if (filter === "pending") {
      return !(order.locked && order.done);
    }
    return order.done && order.locked;
  });

  const formatOrderDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const datePart = new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
    const timePart = new Intl.DateTimeFormat("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
    return `${datePart}, ${timePart}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          // `http://localhost:8000/orders`,
          "https://node-mongodb-api-ks7o.onrender.com/orders",
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
            console.log("Din session har gått ut. Logga in igen");
            sessionStorage.removeItem("token");
            navigate("/login");
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return;
        }

        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    const intervalId = setInterval(fetchOrders, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleLockStatus = async (orderId: string) => {
    try {
      const response = await fetch(
        // `http://localhost:8000/orders/${orderId}/toggle-lock`,
        `https://node-mongodb-api-ks7o.onrender.com/orders/${orderId}/toggle-lock`,
        {
          method: "PUT",
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

      const updatedOrder = await response.json();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, locked: updatedOrder.locked }
            : order
        )
      );
    } catch (error) {
      console.error("Error toggling lock status:", error);
      alert("Kunde inte ändra låsstatus. Försök igen.");
    }
  };

  const toggleDoneStatus = async (orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, done: !order.done } : order
      )
    );

    try {
      const response = await fetch(
        // `http://localhost:8000/orders/${orderId}/toggle-done`,
        `https://node-mongodb-api-ks7o.onrender.com/orders/${orderId}/toggle-done`,
        {
          method: "PUT",
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
    } catch (error) {
      console.error("Error toggling done status:", error);
      alert("Kunde inte ändra klarstatus. Försök igen.");
    }
  };

  const updateComment = async (orderId: string, newComment: string) => {
    try {
      const response = await fetch(
        // `http://localhost:8000/orders/${orderId}/comment`,
        `https://node-mongodb-api-ks7o.onrender.com/orders/${orderId}/comment`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: newComment }),
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

      const updatedOrder = await response.json();

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, comment: updatedOrder.comment }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("Kunde inte uppdatera kommentaren. Försök igen.");
    }
  };

  const handleEditComment = (orderId: string, currentComment: string) => {
    setEditingComment(orderId);
    setNewComment(currentComment);
  };

  const handleSaveComment = (orderId: string) => {
    if (newComment.trim() !== "") {
      updateComment(orderId, newComment);
      setEditingComment(null);
      setNewComment("");
    } else {
      alert("Kommentaren kan inte vara tom.");
    }
  };

  return (
    <>
      <Container bgColor="bg-orange-100">
        <EmployeeHeader title="Beställningar" />
        {!isAdmin ? (
          <p className="text-center">Du har inte åtkomst till denna sida.</p>
        ) : (
          <main className="flex h-full w-full justify-center bg-orange-100 p-1 md:p-4 font-sans">
            {/* Container for both columns */}
            <section className="flex flex-col md:flex-row w-full">
              {/* Left column */}
              <article className="w-full md:w-full lg:w-4/5 space-y-4">
                <div className="flex items-center justify-center">
                  <button
                    className={`px-4 py-2 text-white shadow-md transition-all duration-300 ${
                      filter === "pending"
                        ? "bg-orange-500 underline"
                        : "bg-teal-900"
                    } rounded-l-lg`}
                    onClick={() => setFilter("pending")}
                  >
                    PÅGÅENDE
                  </button>
                  <button
                    className={`px-4 py-2 text-white shadow-md transition-all duration-300 ${
                      filter === "done"
                        ? "bg-orange-500 underline"
                        : "bg-teal-900"
                    } rounded-r-lg`}
                    onClick={() => setFilter("done")}
                  >
                    KLARA
                  </button>
                </div>

                {filteredOrders.map((order) => (
                  <section key={order._id} className="space-y-2">
                    {/* Order row */}
                    <article className="flex justify-between items-center border p-2 md:p-4 rounded-lg cursor-pointer">
                      <p className="hidden text-center font-primary text-teal-900">
                        {error}
                      </p>
                      <article
                        className={`flex-1 mr-2 sm:mr-6 ${
                          selectedOrder === order._id
                            ? "bg-orange-200 rounded p-2 w-auto"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedOrder(
                            selectedOrder === order._id ? null : order._id
                          )
                        }
                      >
                        <h2 className="font-semibold text-sm sm:text-base">
                          Beställning {order._id}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {formatOrderDate(order.orderDate)}
                        </p>
                      </article>
                      <div className="flex items-center space-x-2 md:space-x-5 flex-shrink-0">
                        <input
                          type="checkbox"
                          alt="Done"
                          className="form-checkbox h-5 w-5 md:h-6 md:w-6"
                          checked={order.done}
                          onChange={() => toggleDoneStatus(order._id)}
                        />
                        <img
                          src={order.locked ? lockedLogo : unlockedLogo}
                          alt="Locked"
                          className="h-5 w-5 md:h-6 md:w-6 cursor-pointer"
                          onClick={() => toggleLockStatus(order._id)}
                        />
                      </div>
                    </article>

                    {/* Details for selected order on small screens */}
                    {selectedOrder === order._id && (
                      <article className="md:block lg:hidden p-2 md:p-4 bg-white rounded-lg shadow-md">
                        {order.items.map((item) => (
                          <div
                            key={item._id}
                            className="flex justify-between items-start py-3 border-b"
                          >
                            <span className="flex items-start space-x-2 sm:space-x-4">
                              <img
                                src={margherita}
                                alt="Pizza"
                                className="h-16 w-16 rounded-md"
                              />
                              <div>
                                <h3 className="text-teal-900">{item.name}</h3>
                                <p className="text-sm text-gray-500">
                                  Antal: {item.quantity}
                                </p>
                              </div>
                            </span>
                            <h2 className="text-teal-900">{item.price} kr</h2>
                            <button
                              onClick={() =>
                                handleEditComment(
                                  selectedOrder,
                                  orders.find(
                                    (order) => order._id === selectedOrder
                                  )?.comment || ""
                                )
                              }
                            >
                              <img
                                src={editLogo}
                                alt="Edit"
                                className="h-6 w-6"
                              />
                            </button>
                          </div>
                        ))}
                        <article className="flex flex-col gap-2 pt-3">
                          <p className="font-semibold">Kommentar från kund: </p>
                          {editingComment === order._id ? (
                            <input
                              type="textarea"
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              className="italic w-full text-sm border p-2 rounded"
                            />
                          ) : (
                            <p className="italic">
                              {order.comment || "Ingen kommentar lämnad"}
                            </p>
                          )}

                          {editingComment === order._id && (
                            <button
                              onClick={() => handleSaveComment(order._id)}
                              className="mt-2 px-4 py-2 bg-teal-900 text-white rounded flex-end"
                            >
                              Spara
                            </button>
                          )}
                        </article>
                      </article>
                    )}
                  </section>
                ))}
              </article>

              {/* Right column */}
              <section className="hidden lg:block w-full sm:w-3/5 sm:pl-6">
                {selectedOrder ? (
                  <article className="p-6 bg-white rounded-lg shadow-md">
                    <article className="flex items-center justify-between text-xl font-semibold text-teal-900 mb-4">
                      <h2 className="text-lg font-bold text-teal-900">
                        Beställning {selectedOrder}
                      </h2>
                      <button
                        onClick={() =>
                          handleEditComment(
                            selectedOrder,
                            orders.find((order) => order._id === selectedOrder)
                              ?.comment || ""
                          )
                        }
                      >
                        <img src={editLogo} alt="Edit" className="h-6 w-6" />
                      </button>
                    </article>

                    {orders
                      .filter((order) => order._id === selectedOrder)
                      .map((order) => (
                        <article key={order._id}>
                          {order.items.map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center justify-between py-3 border-b"
                            >
                              <div className="flex items-start space-x-4 w-full">
                                <img
                                  src={margherita}
                                  alt="Pizza"
                                  className="h-16 w-16 rounded-md object-cover"
                                />
                                <div className="flex flex-col justify-center">
                                  <h3 className="text-teal-900">{item.name}</h3>
                                  <p className="text-sm text-gray-500">
                                    Antal: {item.quantity}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right flex items-start space-x-1">
                                <p className="text-teal-900">{item.price}</p>
                                <p className="text-teal-900">kr</p>
                              </div>
                            </div>
                          ))}
                          <article className="flex flex-col gap-2 pt-3">
                            <p className="font-semibold">Kommentar: </p>
                            {editingComment === order._id ? (
                              <input
                                type="textarea"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="italic w-full text-sm border p-2 rounded"
                              />
                            ) : (
                              <p className="italic">
                                {order.comment || "Ingen kommentar lämnad"}
                              </p>
                            )}

                            {editingComment === order._id && (
                              <button
                                onClick={() => handleSaveComment(order._id)}
                                className="mt-2 px-4 py-2 bg-teal-900 text-white rounded flex-end"
                              >
                                Spara
                              </button>
                            )}
                          </article>

                          <div className="mt-4 flex justify-between text-lg font-semibold">
                            <span className="text-teal-900">Totalbelopp</span>
                            <span className="text-teal-900">
                              {order.totalPrice} kr
                            </span>
                          </div>
                        </article>
                      ))}
                  </article>
                ) : (
                  <div className="text-center text-gray-500">
                    Välj en beställning för att se detaljer
                  </div>
                )}
              </section>
            </section>
          </main>
        )}
      </Container>
    </>
  );
};

export default Orders;
