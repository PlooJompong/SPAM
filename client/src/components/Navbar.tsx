import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { FaBasketShopping } from "react-icons/fa6";
import { FaUtensils } from "react-icons/fa";
import { IoReceiptOutline, IoLogOut } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { LiaPizzaSliceSolid } from "react-icons/lia";
import { useAuth } from "../context/AuthContext";
import "./index.css";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const isLoggedIn = !!user;

  return (
    <>
      <nav className="bg-white text-teal-900 mx-auto w-full max-w-screen-2xl">
        <ul className="max-w-screen-2xl flex flex-wrap">
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
          {!isAdmin ? (
            <>
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
            </>
          ) : (
            <>
              <li>
                <Link to="/landing">Landing</Link>
              </li>
            </>
          )}
          <>
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
          </>
        </ul>
      </nav>

      {/* </li>
          <li>
            <Link to="/landing">Landing</Link>
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
          <li>
            <Link to="/">Home</Link>
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
      */}
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
