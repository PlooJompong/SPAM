import React, { useEffect, useState } from 'react';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  vegetarian: boolean;
  ingredients: string[];
}

const UpdateMenu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    vegetarian: false,
    ingredients: [],
  });

  // Ny state för att lägga till nya artiklar
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    vegetarian: false,
    ingredients: [],
  });

  // Hämta menyn från API:t
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:8000/menu');
        // ("https://node-mongodb-api-ks7o.onrender.com/menu");
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        console.error('Fel vid hämtning av menyn:', error);
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

    if (type === 'checkbox') {
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
      alert('Fyll i alla obligatoriska fält.');
      return;
    }

    try {
      const response = await fetch(
        `https://localhost:8000/menu/${editingItem._id}`,
        // `https://node-mongodb-api-ks7o.onrender.com/menu/${editingItem._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Menyartikel uppdaterad!');
        setMenuItems((prev) =>
          prev.map((item) => (item._id === editingItem._id ? data.menu : item))
        );
        setEditingItem(null);
      } else {
        alert(`Fel vid uppdatering: ${data.message}`);
      }
    } catch (error) {
      console.error('Kunde inte uppdatera artikeln:', error);
      alert('Något gick fel. Försök igen.');
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
      alert('Fyll i alla obligatoriska fält för att lägga till en ny artikel.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:8000/menu',
        // 'https://node-mongodb-api-ks7o.onrender.com/menu',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert('Ny menyartikel tillagd!');
        setMenuItems((prev) => [...prev, data.menu]); // Lägg till den nya artikeln i listan
        setNewItem({ name: '', price: 0, vegetarian: false, ingredients: [] }); // Rensa formuläret
      } else {
        alert(`Fel vid skapandet: ${data.message}`);
      }
    } catch (error) {
      console.error('Kunde inte skapa ny artikel:', error);
      alert('Något gick fel. Försök igen.');
    }
  };

  return (
    <div>
      <h1>Uppdatera Meny</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>Pris: {item.price} kr</p>
            <p>{item.vegetarian ? 'Vegetarisk' : 'Ej vegetarisk'}</p>
            <p>Ingredienser: {item.ingredients.join(', ')}</p>
            <button onClick={() => handleEdit(item)}>Redigera</button>
          </li>
        ))}
      </ul>

      {/* Redigeringsformulär */}
      {editingItem && (
        <form onSubmit={handleUpdate}>
          <h2>Redigera: {editingItem.name}</h2>
          <label>
            Namn:
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Pris:
            <input
              type="number"
              name="price"
              value={formData.price || 0}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Vegetarisk:
            <select
              name="vegetarian"
              value={formData.vegetarian ? 'true' : 'false'}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  vegetarian: e.target.value === 'true',
                }))
              }
            >
              <option value="true">Ja</option>
              <option value="false">Nej</option>
            </select>
          </label>
          <br />
          <label>
            Ingredienser:
            <textarea
              name="ingredients"
              value={(formData.ingredients || []).join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  ingredients: e.target.value
                    .split(',')
                    .map((ing) => ing.trim()),
                }))
              }
              required
            />
          </label>
          <br />
          <button type="submit">Spara ändringar</button>
          <button
            type="button"
            onClick={() => setEditingItem(null)}
            style={{ marginLeft: '10px' }}
          >
            Avbryt
          </button>
        </form>
      )}

      {/* Formulär för ny artikel */}
      <div style={{ marginTop: '20px' }}>
        <h2>Lägg till ny artikel</h2>
        <form onSubmit={handleAddNewItem}>
          <label>
            Namn:
            <input
              type="text"
              name="name"
              value={newItem.name || ''}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </label>
          <br />
          <label>
            Pris:
            <input
              type="number"
              name="price"
              value={newItem.price || 0}
              onChange={(e) =>
                setNewItem((prev) => ({
                  ...prev,
                  price: Number(e.target.value),
                }))
              }
              required
            />
          </label>
          <br />
          <label>
            Vegetarisk:
            <select
              name="vegetarian"
              value={newItem.vegetarian ? 'true' : 'false'}
              onChange={(e) =>
                setNewItem((prev) => ({
                  ...prev,
                  vegetarian: e.target.value === 'true',
                }))
              }
            >
              <option value="true">Ja</option>
              <option value="false">Nej</option>
            </select>
          </label>
          <br />
          <label>
            Ingredienser (kommaseparerade):
            <textarea
              name="ingredients"
              value={(newItem.ingredients || []).join(', ')}
              onChange={(e) =>
                setNewItem((prev) => ({
                  ...prev,
                  ingredients: e.target.value
                    .split(',')
                    .map((ing) => ing.trim()),
                }))
              }
              required
            />
          </label>
          <br />
          <button type="submit">Lägg till artikel</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
