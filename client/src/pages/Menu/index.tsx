import { useEffect, useState } from 'react';
import CustomerHeader from '../../components/CustomerHeader';
import Container from '../../components/Container';
import MenuItemComponent from './MenuItem';
import { useCart } from '../../context/CartContext'; // Importera Context-hooken

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
  const { cart } = useCart(); // Använd Context
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log('Fetching menu...');
        const res = await fetch(
          'http://localhost:8000/menu'
          // 'https://node-mongodb-api-ks7o.onrender.com/menu'
        );
        console.log('Response status:', res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data: MenuItem[] = await res.json();
        console.log('Fetched data:', data);
        setMenuItems(data);
        setFilteredMenuItems(data); // Sätt initiala filtrerade alternativ till alla objekt
      } catch (err) {
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

    // Funktion för att sortera efter pris
    const sortByPrice = () => {
      const sortedItems = [...filteredMenuItems].sort((a, b) => a.price - b.price);
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

  return (
    <Container>
      <CustomerHeader title="MENY" />
      <div className="mb-4">
        <button
          onClick={sortByPrice}
          className="bg-teal-700 text-white px-4 py-2 rounded mr-2"
        >
          Sortera efter pris
        </button>
        <button
          onClick={filterVegetarian}
          className="bg-green-700 text-white px-4 py-2 rounded mr-2"
        >
          Visa vegetariska
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Visa alla
        </button>
      </div>
      <ul className="flex flex-col flex-wrap h-80 m-auto w-5/6">
        {filteredMenuItems.map((item) => (
          <MenuItemComponent key={item._id} item={item} />
        ))}
      </ul>
      <div className="fixed bottom-0 w-80 bg-gray-100 p-2 border-t border-gray-300 right-0">
        <h3>Varukorg</h3>
        <ul className="flex flex-col">
          {cart.map((cartItem, index) => (
            <li key={`${cartItem._id}-${index}`}>
              {cartItem.name} - {cartItem.price} kr
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default Menu;
