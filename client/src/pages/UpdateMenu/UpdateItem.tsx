import React from "react";
import { FaPen } from "react-icons/fa";
import { MenuItem } from "./index.tsx";

interface MenuItemProps {
  item: MenuItem;
  handleEdit: (item: MenuItem) => void;
}

const UpdateItemComponent: React.FC<MenuItemProps> = ({ item, handleEdit }) => {
  return (
    <main className="flex gap-2 items-start xl:max-w-lg max-w-lg py-2 w-full mx-auto font-primary md:text-2xl text-xl text-teal-900">
      <section className="flex flex-col flex-grow">
        <article className="flex items-center justify-between w-full">
          <h3 className="font-primary md:text-2xl sm:text-xl text-teal-900">
            {item.name}
          </h3>
          <p className="font-primary md:text-2xl sm:text-xl text-teal-900 text-right">
            {item.price} kr
          </p>
        </article>

        <p className="font-primary md:text-lg sm:text-md text-teal-900 italic">
          {item.vegetarian ? "Vegetarisk" : "Ej vegetarisk"}
        </p>
        <p className="font-primary md:text-lg sm:text-md text-teal-900">
          {item.ingredients.join(", ")}
        </p>
      </section>
      <FaPen
        className="text-teal-900 margin-0 cursor-pointer md:mr-4 sm:mr-0 sm:size-5 md:size-6 lg:size-6"
        onClick={() => handleEdit(item)}
      />
    </main>
  );
};

export default UpdateItemComponent;
