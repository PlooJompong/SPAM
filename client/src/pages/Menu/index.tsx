import { useEffect, useState } from "react";
import Header from "../../components/CustomerHeader";
import Container from "../../components/Container";
import MenuItemComponent from "./MenuItem";
import { useCart } from "../../context/CartContext"; // Importera Context-hooken


interface MenuItem {
  _id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  ingredients: string[];
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { cart, addToCart } = useCart(); // Använd Context

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log('Fetching menu...');
        const res = await fetch('http://localhost:8000/menu');
        console.log('Response status:', res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data: MenuItem[] = await res.json();
        console.log('Fetched data:', data);
        setMenuItems(data);
      } catch (err) {
        console.error('Error fetching menu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Header title="MENY" />
      <ul className="flex flex-col flex-wrap h-80 m-auto w-5/6 flex-wrap">
        {menuItems.map((item) => (
          <MenuItemComponent key={item._id} item={item} addToCart={addToCart} />
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
