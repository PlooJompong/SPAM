import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from 'Authorization' header

  if (!token) {
    return res.status(401).json({ message: "Token saknas." });
  }

  try {
    const decoded = jwt.verify(token, "abc123");
    req.user = decoded; // Attach decoded token data (e.g., user info) to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Ogiltig eller utgången token." });
  }
};

export default verifyToken;