import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import EmployeeHeader from "../../components/EmployeeHeader";
import UpdateItemComponent from "./UpdateItem";

export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  ingredients: string[];
  comment: string;
  locked: boolean;
  done: boolean;
}

const UpdateMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: "",
    price: 0,
    vegetarian: false,
    ingredients: [],
  });

  // Ny state för att lägga till nya artiklar
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    price: 0,
    vegetarian: false,
    ingredients: [],
  });

  // Hämta menyn från API:t
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

  // Hantera redigeringsformulär
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
        `https://localhost:8000/menu/${editingItem._id}`,
        // `https://node-mongodb-api-ks7o.onrender.com/menu/${editingItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

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

  // Lägg till ny artikel
  const handleAddNewItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newItem.name ||
      newItem.price === undefined ||
      !newItem.ingredients?.length
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
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Ny menyartikel tillagd!");
        setMenuItems((prev) => [...prev, data.menu]); // Lägg till den nya artikeln i listan
        setNewItem({ name: "", price: 0, vegetarian: false, ingredients: [] }); // Rensa formuläret
      } else {
        alert(`Fel vid skapandet: ${data.message}`);
      }
    } catch (error) {
      console.error("Kunde inte skapa ny artikel:", error);
      alert("Något gick fel. Försök igen.");
    }
  };

  return (
    <Container bgColor="bg-orange-100">
      <EmployeeHeader title="Ändra meny" />
      <ul className="flex flex-col sm:justify-start lg:gap-0 md:gap-4 sm:h-screen lg:flex-wrap md:flex-wrap md:h-[625px] lg:m-auto md:m-auto md:w-9/12 lg:w-5/6">
        {menuItems.map((item) => (
          <li key={item._id} className="sm:w-full md:w-1/2">
            <UpdateItemComponent item={item} handleEdit={handleEdit} />
          </li>
        ))}
      </ul>
      <section className="flex flex-wrap gap-2 justify-center items-start h-auto mt-8  lg:flex-nowrap md:flex-nowrap">
        {/* Redigeringsformulär */}
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
                type="number"
                name="price"
                id="edit-price"
                value={formData.price || 0}
                onChange={handleChange}
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

        {/* Formulär för ny artikel */}
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
              type="number"
              name="price"
              id="price"
              value={newItem.price || 0}
              onChange={(e) =>
                setNewItem((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
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
    </Container>
  );
};

export default UpdateMenu;
