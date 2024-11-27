import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import pizzaLogo from "../../assets/pizzaLogo.png";
import editLogo from "../../assets/editLogo.svg";
import lockedLogo from "../../assets/lockedLogo.svg";
// import unlockedLogo from "../../assets/unlockedLogo.svg";
import { useState } from "react";

const orders = ["TG23S#L", "S3FSS#D", "DF23S#P", "MN23F&3"];

const Orders: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

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
        <div className="flex h-screen w-9/12 bg-[#f9ecd8] p-4">
          {/* Vänster column */}
          <div className="w-2/5 space-y-4">
            {/* Filtreringsknapparna */}
            <div className="flex items-center justify-center">
              <button className="rounded-l-lg bg-teal-900 px-4 py-2 text-white">
                SAMTLIGA
              </button>
              <button className="rounded-r-lg bg-orange-500 px-4 py-2 text-white">
                OBEHANDLADE
              </button>
            </div>

            {/* Beställningar */}
            {orders.map((order) => (
              <div
                key={order}
                className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${
                  selectedOrder === order ? "bg-[#e9dfcf]" : ""
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="">Beställning {order}</div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="form-checkbox" />
                  <button className="px-5">
                    <img src={editLogo} alt="Edit" className="h-6 w-6" />
                  </button>
                  <button className="">
                    <img src={lockedLogo} alt="Locked" className="h-6 w-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Höger kolumn*/}
          <div className="w-3/5 pl-6">
            {selectedOrder ? (
              <div className="h-2/6 rounded-lg bg-white p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-teal-900">
                    Beställning {selectedOrder}
                  </h2>
                  <button className="">
                    <img src={editLogo} alt="Edit" className="h-6 w-6" />
                  </button>
                </div>
                {/* Placeholder  */}
                <div className="mt-4 text-gray-500">
                  Detaljer för beställningen kommer här.
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
