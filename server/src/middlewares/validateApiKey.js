import dotenv from "dotenv";

dotenv.config();

const validateApiKey = (req, res, next) => {
  const apiKey = req.header("x-api-key");
  const validApiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(403).json({ message: "Saknad API-nyckel." });
  }

  if (apiKey !== validApiKey) {
    return res.status(403).json({ message: "Ogiltig API-nyckel." });
  }

  next();
};

export default validateApiKey;
