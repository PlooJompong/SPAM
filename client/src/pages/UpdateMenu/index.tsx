import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import EmployeeHeader from "../../components/EmployeeHeader";
import UpdateItemComponent from "./UpdateItem";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

const UpdateMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const { isAdmin } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    price: 0,
    vegetarian: false,
    ingredients: [],
  });

  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    price: 0,
    vegetarian: false,
    ingredients: [],
  });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:8000/menu");
        // ("https://node-mongodb-api-ks7o.onrender.com/menu");
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error("Fel vid hämtning av menyn:", error);
      }
    };

    fetchMenu();
  }, []);

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingItem || !formData.name || formData.price === undefined) {
      alert("Fyll i alla obligatoriska fält.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/menu/${editingItem._id}`,
        // `https://node-mongodb-api-ks7o.onrender.com/menu/${editingItem._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError("Din session har gått ut. Logga in igen");
          console.log("Din session har gått ut. Logga in igen");
          sessionStorage.removeItem("token");
          navigate("/login");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return;
      }

      const data = await response.json();

      if (response.ok) {
        alert("Menyartikel uppdaterad!");
        setMenuItems((prev) =>
          prev.map((item) => (item._id === editingItem._id ? data.menu : item))
        );
        setEditingItem(null);
      } else {
        alert(`Fel vid uppdatering: ${data.message}`);
      }
    } catch (error) {
      console.error("Kunde inte uppdatera artikeln:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  const handleAddNewItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newItem.name ||
      newItem.price === undefined ||
      newItem.ingredients?.length === 0
    ) {
      alert("Fyll i alla obligatoriska fält för att lägga till en ny artikel.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/menu",
        // 'https://node-mongodb-api-ks7o.onrender.com/menu',
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError("Din session har gått ut. Logga in igen");
          console.log("Din session har gått ut. Logga in igen");
          sessionStorage.removeItem("token");
          navigate("/login");
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return;
      }

      const data = await response.json();

      if (response.ok) {
        alert("Ny menyartikel tillagd!");
        setMenuItems((prev) => [...prev, data.menu]);
        setNewItem({ name: "", price: 0, vegetarian: false, ingredients: [] });
      }
    } catch (error) {
      console.error("Kunde inte skapa ny artikel:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  return (
    <Container bgColor="bg-orange-100">
      <EmployeeHeader title="Ändra meny" />
      {!isAdmin ? (
        <p className="text-center">Du har inte åtkomst till denna sida.</p>
      ) : (
        <main className="flex flex-col">
          <ul className="flex flex-col justify-start md:gap-2 xl:max-h-[800px] xl:flex-wrap mx-auto md:w-9/12 lg:w-5/6">
            {menuItems.map((item) => (
              <li key={item._id}>
                <UpdateItemComponent item={item} handleEdit={handleEdit} />
              </li>
            ))}
          </ul>
          <section className="flex flex-wrap gap-2 justify-center items-start h-screen mt-8  lg:flex-nowrap md:flex-nowrap">
            {/* Edit item form */}
            {editingItem && (
              <form
                onSubmit={handleUpdate}
                className="flex flex-col gap-2 lg:w-96 md:w-80 sm:w-80 rounded-md border-2 border-teal-900 p-4"
              >
                <h2>Redigerar "{editingItem.name}"</h2>
                <label htmlFor="edit-name" className="flex gap-1">
                  Namn
                  <input
                    type="text"
                    name="name"
                    id="edit-name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    required
                    className="w-full focus:outline-teal-900 rounded-md focus:p-1"
                  />
                </label>

                <label htmlFor="edit-price" className="flex gap-1">
                  Pris
                  <input
                    type="text"
                    name="price"
                    pattern="\d*"
                    id="edit-price"
                    value={formData.price}
                    onChange={handleChange}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/\D/g, "");
                    }}
                    required
                    className="w-full focus:outline-teal-900 rounded-md focus:p-1"
                  />
                </label>

                <label htmlFor="edit-vegetarian" className="flex gap-1">
                  Vegetarisk
                  <select
                    name="vegetarian"
                    id="edit-vegetarian"
                    value={formData.vegetarian ? "true" : "false"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        vegetarian: e.target.value === "true",
                      }))
                    }
                    className="focus:outline-teal-900 rounded-md"
                  >
                    <option value="true">Ja</option>
                    <option value="false">Nej</option>
                  </select>
                </label>

                <label htmlFor="edit-ingredients">
                  Ingredienser:
                  <textarea
                    name="ingredients"
                    id="edit-ingredients"
                    value={(formData.ingredients || []).join(", ")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ingredients: e.target.value
                          .split(",")
                          .map((ing) => ing.trim()),
                      }))
                    }
                    required
                    className="w-full focus:outline-teal-900 rounded-md h-24 focus:p-1"
                  />
                </label>

                <button
                  type="submit"
                  className="bg-teal-900 text-white rounded-md px-4 py-2 hover:bg-teal-800"
                >
                  Spara ändringar
                </button>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="bg-red-900 text-white rounded-md px-4 py-2 hover:bg-red-800"
                >
                  Avbryt
                </button>
              </form>
            )}

            {/* New item form */}
            <form
              onSubmit={handleAddNewItem}
              className="flex flex-col gap-2 w-96 rounded-md border-2 border-teal-900 p-4"
            >
              <h2 className="text-xl">Lägg till ny pizza</h2>
              <label htmlFor="name" className="flex gap-1">
                Namn
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newItem.name || ""}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                  className="w-full focus:outline-teal-900 rounded-md focus:p-1"
                />
              </label>
              <label htmlFor="price" className="flex gap-1">
                Pris
                <input
                  type="text"
                  name="price"
                  id="price"
                  pattern="\d*"
                  value={newItem.price}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      price: Number(e.target.value),
                    }))
                  }
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/\D/g, "");
                  }}
                  required
                  className="w-full focus:outline-teal-900 rounded-md focus:p-1"
                />
              </label>

              <label htmlFor="vegetarian" className="flex gap-1">
                Vegetarisk
                <select
                  name="vegetarian"
                  id="vegetarian"
                  value={newItem.vegetarian ? "true" : "false"}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      vegetarian: e.target.value === "true",
                    }))
                  }
                  className="focus:outline-teal-900 rounded-md"
                >
                  <option value="true">Ja</option>
                  <option value="false">Nej</option>
                </select>
              </label>

              <label htmlFor="ingredients" className="flex flex-col gap-1">
                Ingredienser (kommaseparerade):
                <textarea
                  name="ingredients"
                  id="ingredients"
                  value={(newItem.ingredients || []).join(", ")}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      ingredients: e.target.value
                        .split(",")
                        .map((ing) => ing.trim()),
                    }))
                  }
                  required
                  className="w-full focus:outline-teal-900 rounded-md h-24 focus:p-1"
                />
              </label>
              <br />
              <button
                type="submit"
                className="bg-teal-900 text-white rounded-md px-4 py-2 hover:bg-teal-800"
              >
                Lägg till pizza
              </button>
            </form>
          </section>
        </main>
      )}
    </Container>
  );
};

export default UpdateMenu;
