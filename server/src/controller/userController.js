import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// GET users
const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// POST new user
const addNewUser = async (req, res) => {
  try {
    const { username, password, admin } = req.body;

    if (!username || !password || admin === undefined) {
      return res.status(400).json({ message: "Alla fält är obligatoriska." });
    }

    // Kontrollera om användaren redan finns
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Användarnamnet är redan taget." });
    }

    // Skapa en ny användare
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, admin });
    await newUser.save();

    res.status(201).json({ message: "Användare skapad!", user: newUser });
  } catch (err) {
    console.error("Fel vid skapandet av användare:", err);
    res.status(500).json({ message: "Något gick fel vid skapandet av användaren." });
  }
};

export { getUsers, addNewUser }