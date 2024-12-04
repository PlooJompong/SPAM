import React from "react";
import { useCart } from "../../context/CartContext";
import { FaCirclePlus } from "react-icons/fa6";
import { MenuItem } from "./index.tsx";

interface MenuItemProps {
  item: MenuItem;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  return (
    <article className="flex gap-2 items-start w-full max-w-xl pt-2 pb-2">
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between w-full">
          <h3 className="font-primary text-2xl text-teal-900">{item.name}</h3>
          <p className="font-primary text-2xl text-teal-900 text-right">
            {item.price} kr
          </p>
        </div>

        <p className="font-primary text-lg text-teal-900 italic">
          {item.vegetarian ? "Vegetarisk" : "Ej vegetarisk"}
        </p>
        <p className="font-primary text-lg text-teal-900">
          {item.ingredients.join(", ")}
        </p>
      </div>
      <FaCirclePlus
        className="text-teal-900 margin-0 cursor-pointer"
        onClick={() => addToCart(item)}
        size={25}
      />
    </article>
  );
};

export default MenuItemComponent;
