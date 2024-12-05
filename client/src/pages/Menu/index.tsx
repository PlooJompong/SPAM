import { useEffect, useState } from "react";
import CustomerHeader from "../../components/CustomerHeader";
import Container from "../../components/Container";
import MenuItemComponent from "./MenuItem";
import { useCart } from "../../context/CartContext"; // Importera Context-hooken
import { useNavigate } from "react-router-dom";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiMinusSm } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";

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
    useCart(); // Använd Context
  const navigate = useNavigate();
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log("Fetching menu...");
        const res = await fetch(
          "http://localhost:8000/menu"
          // 'https://node-mongodb-api-ks7o.onrender.com/menu'
        );
        console.log("Response status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data: MenuItem[] = await res.json();
        console.log("Fetched data:", data);
        setMenuItems(data);
        setFilteredMenuItems(data); // Sätt initiala filtrerade alternativ till alla objekt
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  // Funktion för att sortera efter pris
  const sortByPrice = () => {
    const sortedItems = [...filteredMenuItems].sort(
      (a, b) => a.price - b.price
    );
    setFilteredMenuItems(sortedItems);
  };

  // Funktion för att visa endast vegetariska alternativ
  const filterVegetarian = () => {
    const vegetarianItems = menuItems.filter((item) => item.vegetarian);
    setFilteredMenuItems(vegetarianItems);
  };

  // Funktion för att visa alla alternativ igen
  const resetFilters = () => {
    setFilteredMenuItems(menuItems);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const cartClick = () => {
    navigate("/cart");
  };

  const handleQuantityChange = (itemId: string, change: number) => {
    updateQuantity(itemId, change);
  };

  const removeFromCart = (id: string) => {
    console.log(`Removed pizza with ID: ${id}`);
    removeItemFromCart(id);
  };

  return (
    <Container>
      <CustomerHeader title="MENY" />

      <section className=" flex justify-center mb-4 py-3 ">
        <motion.button
          onClick={sortByPrice}
          className="bg-teal-800 text-white px-2 py-2 rounded-2xl mr-2 text-sm hover:bg-teal-900"
          whileTap={{ scale: 0.9 }}
        >
          Sortera efter pris
        </motion.button>
        <motion.button
          onClick={filterVegetarian}
          className="bg-teal-600 text-white px-2 py-2 rounded-2xl mr-2 text-sm hover:bg-teal-800"
          whileTap={{ scale: 0.9 }}
        >
          Visa vegetariska
        </motion.button>
        <motion.button
          onClick={resetFilters}
          className="bg-gray-600 text-white px-2 py-2 rounded-2xl text-sm hover:bg-gray-700"
          whileTap={{ scale: 0.9 }}
        >
          Visa alla
        </motion.button>
      </section>

      <ul className="flex flex-col sm:justify-start lg:gap-0 md:gap-4 sm:h-screen lg:flex-wrap md:flex-wrap md:h-[625px] lg:m-auto md:m-auto md:w-9/12 lg:w-5/6">
        {filteredMenuItems.map((item) => (
          <MenuItemComponent key={item._id} item={item} />
        ))}
      </ul>

      <article className="fixed bottom-0 w-80 bg-gray-100 p-2 border-t  border-gray-300 right-0 rounded">
        <h3 className="py-3 p-2 font-sans font-bold">Din pizzakorg</h3>
        <ul className="flex flex-col font-sans">
          {cart.map((cartItem, index) => (
            <li
              key={`${cartItem._id}-${index}`}
              className=" grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-4 border-b border-gray-300 p-2 py-2.5"
            >
              <span>{cartItem.name}</span>
              <HiMinusSm
                className="cursor-pointer justify-self-center "
                onClick={() => handleQuantityChange(cartItem._id, -1)}
              />
              <span className="text-center  ">{cartItem.quantity}</span>
              <GoPlus
                className="cursor-pointer justify-self-center  "
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
          className="bg-teal-900 text-white p-2 text-sm cursor-pointer rounded-full mx-auto block mt-4 font-sans"
          onClick={cartClick}
          whileTap={{ scale: 0.9 }}
        >
          Visa varukorg
        </motion.button>
      </article>
    </Container>
  );
};

export default Menu;
