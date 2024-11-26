import { Link } from "react-router-dom";
import "./index.css";

const Landing = () => {
  return (
    <>
      <nav className="bg-orange-100 text-teal-900">
        <ul>
          <li>
            <Link to="/">Landing</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/confirmation">Confirmation</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/orderhistory">Orderhistory</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/stock">Stock</Link>
          </li>
          <li>
            <Link to="/updatemenu">Update Menu</Link>
          </li>
        </ul>
      </nav>
      <h1 className="flex h-screen w-full items-center justify-center bg-orange-100 text-3xl text-teal-900">
        SPAM Landing
      </h1>
    </>
  );
};

export default Landing;
