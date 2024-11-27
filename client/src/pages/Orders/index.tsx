import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import pizzaLogo from "../../assets/pizzaLogo.png";

const Orders = () => {
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
      <main className="m-auto flex h-full w-full justify-center bg-orange-100 p-4"></main>
    </>
  );
};

export default Orders;
