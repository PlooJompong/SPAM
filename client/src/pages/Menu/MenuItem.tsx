import React from "react";
import { useCart } from "../../context/CartContext";
import { FaCirclePlus } from "react-icons/fa6";
import { MenuItem } from "./index.tsx";
import { motion } from "framer-motion";

interface MenuItemProps {
  item: MenuItem;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 }); // Explicitly pass a default quantity
  };

  return (
    <main className="flex gap-2 items-start w-full max-w-xl pt-2 pb-2 w-full">
      <section className="flex flex-col flex-grow">
        <article className="flex justify-between w-full">
          <h3 className="font-primary md:text-2xl text-xl text-teal-900">
            {item.name}
          </h3>
          <p className="font-primary md:text-2xl text-xl text-teal-900 text-right">
            {item.price} kr
          </p>
        </article>

        <p className="font-primary md:text-lg sm:text-md text-teal-900 italic">
          {item.vegetarian ? "Vegetarisk" : "Ej vegetarisk"}
        </p>
        <p className="font-primary md:text-lg text-md text-teal-900">
          {item.ingredients.join(", ")}
        </p>
      </section>
      <motion.div
        whileTap={{ scale: 0.9 }}
        className="cursor-pointer"
        // onClick={() => addToCart(item)}
        onClick={handleAddToCart}
      >
        <FaCirclePlus
          className="text-teal-900 margin-0 md:mr-4 mr-0"
          size={25}
        />
      </motion.div>
    </main>
  );
};

export default MenuItemComponent;
