// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import pizzaLogo from '../../assets/pizzaLogo.png';
import EmployeeHeader from '../../components/EmployeeHeader';

const Stock = () => {
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('http://localhost:8000/stock');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStockData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setLoading(false);
      }
    };
    fetchStockData();
  }, []);

  return (
    <>
      <EmployeeHeader title="Lagerstatus" />
      {/* <header className="flex h-40 w-full bg-orange-100 px-2">
        <div className="flex w-1/2 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={pizzaLogo}
              alt="logo"
              className="left -1/2-translate-x-1/2 h-32 w-32 transform self-center"
            />
            <h1 className="flex items-center justify-center whitespace-nowrap bg-orange-100 font-primary text-3xl text-teal-900">
              SPAM PIZZA
            </h1>
          </Link>
        </div>
        <h2 className="flex h-full w-1/2 items-center font-primary text-2xl text-teal-900">
          Lagerstatus
        </h2>
      </header> */}

      <main className="m-auto flex h-full w-full justify-center bg-orange-100 p-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Fel: {error}</p>
        ) : (
          <table className="w-4/6 border-collapse border border-teal-900">
            <thead>
              <tr className="bg-teal-900 text-white">
                <th className="border border-teal-900 p-2 text-start">
                  Artikel
                </th>
                <th className="w-44 border border-teal-900 p-2 text-center">
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
                  <td className="border border-teal-900 p-2 text-teal-900">
                    {item.name}
                  </td>
                  <td className="w-40 border border-teal-900 p-2 text-center text-teal-900">
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
    </>
  );
};

export default Stock;
