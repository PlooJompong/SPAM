import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// POST login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Användarnamn och lösenord krävs." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Användaren hittades inte." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Fel lösenord." });
    }

    res.status(200).json({
      message: "Inloggning lyckades!",
      user: { username: user.username, admin: user.admin }
    });
  } catch (err) {
    console.error("Fel vid inloggning:", err);
    res.status(500).json({ message: "Något gick fel vid inloggningen." });
  }
};

export { loginUser }