import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET users
const getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// POST new user
const addNewUser = async (req, res) => {
  try {
    const { username, password, admin } = req.body;

    if (!username || !password || admin === undefined) {
      return res.status(400).json({ message: "Alla fält är obligatoriska." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Användarnamnet är redan taget." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, admin });
    await newUser.save();

    res.status(201).json({ message: "Användare skapad!", user: newUser });
  } catch (err) {
    console.error("Fel vid skapandet av användare:", err);
    res
      .status(500)
      .json({ message: "Något gick fel vid skapandet av användaren." });
  }
};

// POST login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Användarnamn och lösenord krävs." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Användaren hittades inte." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Fel lösenord." });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, admin: user.admin },
      "abc123",
      { expiresIn: "5m" } // Token expires in 5 minutes
    );

    res.status(200).json({
      message: "Inloggning lyckades!",
      token,
      user: { username: user.username, admin: user.admin },
    });
  } catch (err) {
    console.error("Fel vid inloggning:", err);
    res.status(500).json({ message: "Något gick fel vid inloggningen." });
  }
};

export { getUsers, addNewUser, loginUser };
