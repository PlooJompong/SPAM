import { useEffect, useState } from "react";
import EmployeeHeader from "../../components/EmployeeHeader";
import Container from "../../components/Container";

const Stock = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("http://localhost:8000/stock");
        // ('https://node-mongodb-api-ks7o.onrender.com/stock');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStockData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setLoading(false);
      }
    };
    fetchStockData();
  }, []);

  return (
    <>
      <Container bgColor="bg-orange-100">
        <EmployeeHeader title="Lagerstatus" />
        <main className="m-auto flex h-full w-full justify-center font-sans bg-orange-100 p-4">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">Fel: {error}</p>
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
