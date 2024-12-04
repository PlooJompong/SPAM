import Menu from "../models/menuModel.js"

// GET Menu
const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json(err);
  }
}

// POST new menu item
const addNewMenuItem = async (req, res) => {
  try {
    const { name, price, vegetarian, ingredients } = req.body; // Hämta data från request-body

    // Kontrollera att alla nödvändiga fält finns
    if (!name || !price || !vegetarian || !Array.isArray(ingredients)) {
      return res.status(400).json({ message: "Alla obligatoriska fält måste fyllas i." });
    }

    // Skapa en ny menyartikel
    const newMenuItem = new Menu({
      name,
      price,
      vegetarian,
      ingredients,
    });

    // Spara den nya artikeln i databasen
    const savedMenuItem = await newMenuItem.save();

    // Returnera det sparade objektet
    res.status(201).json({ message: "Menyartikel skapad!", menu: savedMenuItem });
  } catch (err) {
    console.error("Fel vid skapandet av menyartikel:", err);
    res.status(500).json({ message: "Ett fel inträffade vid skapandet av menyartikel." });
  }
}

// New
// PUT update menu item
// const updateMenuItem = async (req, res) => {
//   try {
//     const { id } = req.params; // Extract the ID from the URL
//     const updateFields = req.body; // Extract the fields to update from the request body

//     // Ensure the request body is not empty
//     if (!Object.keys(updateFields).length) {
//       return res.status(400).json({ message: "Inga fält att uppdatera." });
//     }

//     // Update the menu item in the database
//     const updatedMenuItem = await Menu.findByIdAndUpdate(
//       id,
//       { $set: updateFields }, // Use $set to update only the provided fields
//       { new: true } // Return the updated object
//     );

//     if (!updatedMenuItem) {
//       return res.status(404).json({ message: "Menyartikel hittades inte." });
//     }

//     // Return the updated menu item
//     res.status(200).json({ message: "Menyartikel uppdaterad!", menu: updatedMenuItem });
//   } catch (err) {
//     console.error("Fel vid uppdatering av menyartikel:", err);
//     res.status(500).json({ message: "Ett fel inträffade vid uppdatering av menyartikel." });
//   }
// };


// OLD
// PUT update menu item
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params; // Hämta ID från URL:en
    const { name, price, vegetarian, ingredients } = req.body; // Hämta uppdaterade värden från request-body

    // Kontrollera att alla nödvändiga fält finns
    if (!name || !price || !Array.isArray(ingredients)) {
      return res.status(400).json({ message: "Alla obligatoriska fält måste fyllas i." });
    }

    // Hitta och uppdatera menyalternativet i databasen
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      id,
      { name, price, vegetarian, ingredients },
      { new: true } // Returnera det uppdaterade objektet
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menyartikel hittades inte." });
    }

    // Returnera den uppdaterade menyalternativet
    res.status(200).json({ message: "Menyartikel uppdaterad!", menu: updatedMenuItem });
  } catch (err) {
    console.error("Fel vid uppdatering av menyartikel:", err);
    res.status(500).json({ message: "Ett fel inträffade vid uppdatering av menyartikel." });
  }
}

export { getMenu, addNewMenuItem, updateMenuItem }
