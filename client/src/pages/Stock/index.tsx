import { useEffect, useState } from "react";
import EmployeeHeader from "../../components/EmployeeHeader";
import Container from "../../components/Container";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Stock = () => {
  const [stockData, setStockData] = useState([]);
  const [error, setError] = useState<string>("");
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/stock",
          // ('https://node-mongodb-api-ks7o.onrender.com/stock'),
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

        setStockData(data);
      } catch (err: any) {
        console.error("Error fetching stock data:", err);
      }
    };

    fetchStockData();
  }, []);

  return (
    <>
      <Container bgColor="bg-orange-100">
        <EmployeeHeader title="Lagerstatus" />
        <main className="m-auto flex h-full w-full justify-center font-sans bg-orange-100 p-4">
          {!isAdmin ? (
            <p className="font-primary">Du har inte åtkomst till denna sida</p>
          ) : (
            <table className="w-full md:w-2/4 border-collapse border border-teal-900">
              <thead>
                <tr className="bg-teal-900 text-white">
                  <th className="w-44 border border-teal-900 p-2 text-center">
                    Artikel
                  </th>
                  <th className="w-44 hidden md:table-cell border border-teal-900 p-2 text-center">
                    Status
                  </th>
                  <th className="w-44 border border-teal-900 p-2 text-center">
                    Antal
                  </th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((item: any) => (
                  <tr key={item._id} className="text-start">
                    <td className="border border-teal-900 p-2 text-center text-teal-900">
                      {item.name}
                    </td>
                    <td className="w-40 hidden md:table-cell border border-teal-900 p-2 text-center text-teal-900">
                      {item.quantity === 0 ? (
                        <span className="inline-block rounded-xl bg-zinc-200 px-2 py-1 font-bold text-zinc-400">
                          Slut i lager
                        </span>
                      ) : item.quantity < 5 ? (
                        <span className="inline-block rounded-xl bg-red-200 px-2 py-1 font-bold text-red-800">
                          Nästan slut
                        </span>
                      ) : item.quantity < 15 ? (
                        <span className="inline-block rounded-xl bg-yellow-200 px-2 py-1 font-bold text-yellow-600">
                          Begränsad mängd
                        </span>
                      ) : (
                        <span className="inline-block rounded-xl bg-green-300 px-2 py-1 font-bold text-teal-950">
                          Tillgänglig
                        </span>
                      )}
                    </td>
                    <td className="w-40 border border-teal-900 p-2 text-center text-teal-900">
                      {item.quantity} st
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </Container>
    </>
  );
};

export default Stock;
