import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import validateApiKey from './middlewares/validateApiKey.js';

import menuRouter from './routes/menuRouter.js';
import orderRouter from './routes/orderRouter.js';
import stockRouter from './routes/stockRouter.js';
import orderHistoryRouter from './routes/orderHistoryRouter.js';
import userRouter from './routes/userRouter.js';
import loginRouter from './routes/loginRouter.js';
import helmet from 'helmet';

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(express.json());



app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Tillåt endast resurser från samma origin
        scriptSrc: ["'self'", "'unsafe-inline'"], // Skript från samma origin och inline-skript (använd med försiktighet)
        connectSrc: ["'self'", "https://node-mongodb-api-ks7o.onrender.com"], 
        imgSrc: ["'self'", "data:"], // Tillåt bilder från samma origin och data-URI
        styleSrc: ["'self'", "'unsafe-inline'"], // CSS från samma origin och inline-CSS
        fontSrc: ["'self'", "https://fonts.googleapis.com", "https://fonts.gstatic.com"], // Tillåt typsnitt från en specifik domän
        objectSrc: ["'none'"], // Blockera alla `<object>`-taggar
        upgradeInsecureRequests: [], // Lägg till detta om du bara vill tillåta HTTPS
      },
    },
    crossOriginEmbedderPolicy: false, // Om du hanterar vissa typer av inbäddade resurser
  })
);


mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use((req, res, next) => {
  if (!req.header("x-api-key")) {
    req.headers["x-api-key"] = process.env.API_KEY; // Sätter API-nyckeln automatiskt
    console.log("API-nyckel automatiskt tillagd:", process.env.API_KEY);
  }
  next();
});

app.use(validateApiKey);

app.use("/menu", menuRouter)
app.use("/orders", orderRouter)
app.use("/stock", stockRouter)
app.use("/orderhistory", orderHistoryRouter)
app.use("/users", userRouter)
app.use("/login", loginRouter)

//Middleware
app.use((req, res) => {
  res.status(404).json({ message: `Cannot ${req.method} ${req.path}` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});