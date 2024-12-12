import { useEffect, useState } from "react";
import CustomHeader from "../../components/CustomerHeader";
import orderCheck from "../../assets/orderCheck.svg";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Modal";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [onConfirmAction, setOnConfirmAction] = useState<(() => void) | null>(
    null
  );

  const orderId = location.state?.order?._id;

  // Get order status from backend with polling
  useEffect(() => {
    if (!orderId) {
      setError("Ingen orderinformation tillgänglig");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await fetch(
          // `http://localhost:8000/orders/${orderId}`,
          `https://node-mongodb-api-ks7o.onrender.com/orders/${orderId}`,
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

        const data: Order = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error("Fel vid hämtning av order:", err);
        setError("Kunde inte hämta ordern. Försök igen senare.");
        setLoading(false);
      }
    };

    const intervalId = setInterval(fetchOrder, 5000);

    fetchOrder();

    return () => clearInterval(intervalId);
  }, [orderId]);

  if (loading) {
    return <p>Laddar orderinformation...</p>;
  }

  const handleCancelOrder = async () => {
    if (order?.locked || order?.done) {
      setModalTitle("Order kan inte avbrytas");
      setModalMessage(
        order?.done
          ? "Din beställning är redan slutförd och kan inte avbrytas"
          : "Köket har börjat med din beställning, du kan inte avbryta ordern"
      );
      setOnConfirmAction(null);
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
      return;
    }

    setModalTitle("Bekräfta avbokning");
    setModalMessage(
      "Din beställning avbryts, du får pengarna tillbaka. Vill du fortsätta?"
    );
    setOnConfirmAction(() => confirmCancelOrder);
    setIsModalOpen(true);
  };

  const confirmCancelOrder = async () => {
    if (!order) return;

    try {
      const response = await fetch(
        // `http://localhost:8000/orders/${order._id}`,
        `https://node-mongodb-api-ks7o.onrender.com/orders/${order._id}`,
        {
          method: "DELETE",
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

      setOrder(null);
      setModalTitle("Order avbruten");
      setModalMessage(
        "Din beställning har avbrutits och pengarna är återbetalade"
      );
    } catch (err) {
      console.error("Fel vid avbokning av order:", err);
      setModalTitle("Fel");
      setModalMessage("Något gick fel. Försök igen senare");
    }
  };

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
        {!order ? (
          <p className="text-center font-primary text-teal-900">{error}</p>
        ) : (
          <>
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
                    <p className="text-lg font-medium text-teal-900">
                      {item.name}
                    </p>
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

              {/* New section for locked and done */}
              <article className="flex gap-4">
                <p className="text-lg font-semibold text-teal-900">
                  Orderstatus:
                </p>
                <div>
                  <p>
                    <span className="font-bold">Tillagas:</span>
                    {order.locked ? "Ja" : "Nej"}
                  </p>
                  <p>
                    <span className="font-bold">Färdig:</span>
                    {order.done ? "Ja" : "Nej"}
                  </p>
                </div>
              </article>
              <article>
                <button
                  className="bg-red-900 text-white text-sm px-2 py-1 rounded hover:bg-red-800"
                  onClick={handleCancelOrder}
                >
                  Avbryt order
                </button>
                {order.done && (
                  <article className="mt-4 p-4 text-center bg-green-100 text-teal-900 rounded">
                    Din order är klar! 🎉
                  </article>
                )}
              </article>

              <Modal
                isOpen={isModalOpen}
                title={modalTitle}
                message={modalMessage}
                onConfirm={onConfirmAction ?? (() => setIsModalOpen(false))}
                onCancel={() => setIsModalOpen(false)}
                autoClose={
                  modalTitle === "Order kan inte avbrytas" ? true : false
                }
              />

              <article className="flex items-center justify-between border-t pt-4">
                <p className="text-lg font-bold text-teal-900">Totalt</p>
                <p className="text-lg font-bold text-teal-900">
                  {order.totalPrice} kr
                </p>
              </article>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Confirmation;
