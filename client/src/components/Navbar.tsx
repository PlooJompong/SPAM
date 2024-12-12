import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import { IoReceiptOutline, IoLogOut } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { LiaPizzaSliceSolid } from "react-icons/lia";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const isLoggedIn = !!user;

  return (
    <>
      <nav className="bg-white text-teal-900 mx-auto w-full max-w-screen-2xl px-2 py-4">
        <ul className="max-w-screen-2xl flex flex-wrap justify-around">
          <li>
            <Link to="/">
              <TiHome className="text-teal-900" />
            </Link>
          </li>
          <li>
            <Link to="/about">
              <LiaPizzaSliceSolid className="text-teal-900" />
            </Link>
          </li>
          <li>
            <Link to="/menu">
              <FaUtensils className="text-teal-900" />
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <FaBasketShopping className="text-teal-900" />
            </Link>
          </li>
          <li>
            <Link to="/orderhistory">
              <IoReceiptOutline className="text-teal-900" />
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/landing">
                <IoIosListBox className="text-teal-900" />
              </Link>
            </li>
          )}
          <li>
            {isLoggedIn ? (
              <button
                onClick={logout}
                className="bg-transparent border-none cursor-pointer"
              >
                <IoLogOut className="text-teal-900" />
              </button>
            ) : (
              <a href="/login">
                <FiLogIn className="text-teal-900" />
              </a>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
