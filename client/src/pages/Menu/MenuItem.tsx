import React from 'react';
import { useCart } from '../../context/CartContext';
import { FaCirclePlus } from 'react-icons/fa6';
import { MenuItem } from './index.tsx';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.tsx';

interface MenuItemProps {
  item: MenuItem;
}

const MenuItemComponent: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 }); // Explicitly pass a default quantity
  };

  return (
    <section className="flex gap-2 items-start xl:max-w-lg max-w-lg py-2 w-full mx-auto font-primary md:text-2xl text-xl text-teal-900">
      <div className="flex flex-col flex-grow">
        <article className="flex items-center justify-between w-full">
          <h3>{item.name}</h3>
          <p>{item.price} kr</p>
        </article>

        <p className="md:text-lg sm:text-md italic">
          {item.vegetarian ? 'Vegetarisk' : 'Ej vegetarisk'}
        </p>
        <p className="md:text-lg sm:text-md">{item.ingredients.join(', ')}</p>
      </div>

      {user && (
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer"
          // onClick={() => addToCart(item)}
          onClick={handleAddToCart}
        >
          <FaCirclePlus className="text-teal-900  md:mr-4 mr-0" size={25} />
        </motion.div>
      )}
    </section>
  );
};

export default MenuItemComponent;
