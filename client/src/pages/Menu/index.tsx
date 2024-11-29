// import { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import Navbar from "../../components/Navbar";

// // Definiera typen för menyobjekt
// interface MenuItem {
//   _id: string;
//   name: string;
//   price: number;
//   vegetarian: boolean;
//   ingredients: string[];
// }

// const Menu: React.FC = () => {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         console.log("Fetching menu...");
//         const res = await fetch("http://localhost:8000/menu");
//         console.log("Response status:", res.status);

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data: MenuItem[] = await res.json();
//         console.log("Fetched data:", data);
//         setMenuItems(data);
//       } catch (err) {
//         console.error("Error fetching menu:", err);
//       } finally {
//         setLoading(false); // Detta ska alltid köras
//       }
//     };

//     fetchMenu();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <Header title="MENY" />
//       <ul>
//         {menuItems.map((item) => (
//           <li key={item._id}>
//             <h3>{item.name}</h3>
//             <p>Pris: {item.price} kr</p>
//             <p>{item.vegetarian ? "Vegetarisk" : "Ej vegetarisk"}</p>
//             <p>Ingredienser: {item.ingredients.join(", ")}</p>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default Menu;

// import { useEffect, useState } from "react";
// import Header from "../../components/Header";
// import Navbar from "../../components/Navbar";

// // Definiera typen för menyobjekt
// interface MenuItem {
//   _id: string;
//   name: string;
//   price: number;
//   vegetarian: boolean;
//   ingredients: string[];
// }

// const Menu: React.FC = () => {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
//   const [cart, setCart] = useState<MenuItem[]>([]); // Lägg till state för varukorg
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchMenu = async () => {
//       try {
//         console.log("Fetching menu...");
//         const res = await fetch("http://localhost:8000/menu");
//         console.log("Response status:", res.status);

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data: MenuItem[] = await res.json();
//         console.log("Fetched data:", data);
//         setMenuItems(data);
//       } catch (err) {
//         console.error("Error fetching menu:", err);
//       } finally {
//         setLoading(false); // Detta ska alltid köras
//       }
//     };

//     fetchMenu();
//   }, []);

//   // Funktion för att lägga till en menyartikel i varukorgen
//   const addToCart = (item: MenuItem) => {
//     setCart((prevCart) => [...prevCart, item]);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <Navbar />
//       <Header title="MENY" />
//       <ul>
//         {menuItems.map((item) => (
//           <li key={item._id}>
//             <h3>{item.name}</h3>
//             <p>Pris: {item.price} kr</p>
//             <p>{item.vegetarian ? "Vegetarisk" : "Ej vegetarisk"}</p>
//             <p>Ingredienser: {item.ingredients.join(", ")}</p>
//             <button onClick={() => addToCart(item)}>Lägg till i varukorg</button> {/* Knapp för att lägga till i varukorg */}
//           </li>
//         ))}
//       </ul>
//       <div style={{ position: "fixed", bottom: 0, width: "100%", backgroundColor: "#f8f9fa", padding: "10px", borderTop: "1px solid #ccc" }}>
//         <h3>Varukorg</h3>
//         <ul>
//           {cart.map((cartItem, index) => (
//             <li key={`${cartItem._id}-${index}`}> {/* Använd index för att undvika nyckelkollision */}
//               {cartItem.name} - {cartItem.price} kr
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Menu;

import { useEffect, useState } from "react";
import Header from "../../components/Header";
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
        console.log("Fetching menu...");
        const res = await fetch("http://localhost:8000/menu");
        console.log("Response status:", res.status);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data: MenuItem[] = await res.json();
        console.log("Fetched data:", data);
        setMenuItems(data);
      } catch (err) {
        console.error("Error fetching menu:", err);
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
