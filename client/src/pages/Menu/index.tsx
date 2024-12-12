import { useEffect, useState } from "react";
import CustomerHeader from "../../components/CustomerHeader";
import Container from "../../components/Container";
import MenuItemComponent from "./MenuItem";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiMinusSm } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  ingredients: string[];
  quantity: number;
  comment: string;
  locked: boolean;
  done: boolean;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { cart, updateQuantity, removeItemFromCart, calculateTotalPrice } =
    useCart();
  const navigate = useNavigate();
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);
  const { user } = useAuth();
  const [cartOpen, setCartOpen] = useState<string>("hidden");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log("Fetching menu...");
        const res = await fetch(
          // "http://localhost:8000/menu"
          "https://node-mongodb-api-ks7o.onrender.com/menu"
        );
        console.log("Response status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data: MenuItem[] = await res.json();

        console.log("Fetched data:", data);
        setMenuItems(data);
        setFilteredMenuItems(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const sortByPrice = () => {
    const sortedItems = [...filteredMenuItems].sort(
      (a, b) => a.price - b.price
    );
    setFilteredMenuItems(sortedItems);
  };

  const filterVegetarian = () => {
    const vegetarianItems = menuItems.filter((item) => item.vegetarian);
    setFilteredMenuItems(vegetarianItems);
  };

  const resetFilters = () => {
    setFilteredMenuItems(menuItems);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const cartClick = () => {
    navigate("/cart");
  };

  const toggleCart = () => {
    setCartOpen((prevState) => (prevState === "hidden" ? "block" : "hidden"));
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    updateQuantity(itemId, change);
  };

  const removeFromCart = (id: string) => {
    console.log(`Removed pizza with ID: ${id}`);
    removeItemFromCart(id);
  };

  return (
    <>
      <CustomerHeader title="MENY" />
      <Container>
        <section className="flex justify-center mb-4 py-3 ">
          <motion.button
            onClick={sortByPrice}
            className="bg-teal-800 text-white px-2 py-2 rounded-2xl mr-2 text-sm hover:bg-teal-900 shadow-md"
            whileTap={{ scale: 0.9 }}
          >
            Sortera efter pris
          </motion.button>
          <motion.button
            onClick={filterVegetarian}
            className="bg-teal-600 text-white px-2 py-2 rounded-2xl mr-2 text-sm hover:bg-teal-800 shadow-md"
            whileTap={{ scale: 0.9 }}
          >
            Visa vegetariska
          </motion.button>
          <motion.button
            onClick={resetFilters}
            className="bg-gray-600 text-white px-2 py-2 rounded-2xl text-sm hover:bg-gray-700 shadow-md"
            whileTap={{ scale: 0.9 }}
          >
            Visa alla
          </motion.button>
        </section>
        {!user && (
          <p className="text-center text-orange-700 text-lg mb-4">
            Du måste vara inloggad för att göra en beställning.
          </p>
        )}

        <ul className="flex flex-col justify-start md:gap-2 h-screen xl:max-h-[800px] xl:flex-wrap mx-auto md:w-9/12 lg:w-5/6">
          {filteredMenuItems.map((item) => (
            <MenuItemComponent key={item._id} item={item} />
          ))}
        </ul>

        {/* Cart */}
        <article className="fixed left-0 right-0 mx-auto bottom-0 w-64 px-2 bg-gray-100 border-t border-gray-300 xl:left-[864px]  rounded">
          <motion.div
            className="py-3 p-2 font-sans font-bold hover:cursor-pointer text-center"
            onClick={toggleCart}
            whileTap={{ scale: 0.9 }}
          >
            {cartOpen === "block" ? (
              <p>Dölj din pizzakorg</p>
            ) : (
              <p>Visa din pizzakorg</p>
            )}
          </motion.div>
          <div className={cartOpen}>
            <ul className="flex flex-col font-sans">
              {cart.map((cartItem, index) => (
                <li
                  key={`${cartItem._id}-${index}`}
                  className=" grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-gray-300 p-2 py-2.5"
                >
                  <span>{cartItem.name}</span>
                  <HiMinusSm
                    className="cursor-pointer justify-self-center"
                    onClick={() => handleQuantityChange(cartItem._id, -1)}
                  />
                  <span className="text-center">{cartItem.quantity}</span>
                  <GoPlus
                    className="cursor-pointer justify-self-center"
                    onClick={() => handleQuantityChange(cartItem._id, 1)}
                  />
                  <FaRegTrashCan
                    className="text-red-500 cursor-pointer hover:text-red-700 justify-self-end"
                    onClick={() => removeFromCart(cartItem._id)}
                  />
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center font-sans">
              <p className=" px-1 py-4 font-bold">Totalsumma</p>
              <p className="">{calculateTotalPrice()} kr</p>
            </div>
            <motion.button
              className="bg-teal-900 text-white p-2 text-sm cursor-pointer rounded-full mx-auto block mt-1 font-sans shadow-md mb-5"
              onClick={cartClick}
              whileTap={{ scale: 0.9 }}
            >
              Visa varukorg
            </motion.button>
          </div>
        </article>
      </Container>
    </>
  );
};

export default Menu;
