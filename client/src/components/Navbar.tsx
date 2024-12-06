import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { FaBasketShopping } from "react-icons/fa6";
import { IoReceiptOutline } from "react-icons/io5";
import "./index.css";

const Navbar = () => {
  return (
    <>
      <nav className="bg-orange-100 text-teal-900">
        <ul className="max-w-screen-2xl flex flex-wrap">
          <li>
            <Link to="/">Landing</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/cart">
              <FaBasketShopping className="text-teal-900" />
            </Link>
          </li>
          <li>
            <Link to="/confirmation">Confirmation</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/login">
              <FiLogIn className="text-teal-900" />
            </Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/orderhistory">
              <IoReceiptOutline className="text-teal-900" />
            </Link>
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
      {/* 
      <div className="bg-orange-100 text-teal-900">
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
      </div> */}
    </>
  );
};

export default Navbar;
