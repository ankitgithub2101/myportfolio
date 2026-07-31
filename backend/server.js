import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import dbConfig from "./config/dbConfig.js";
import usersRoute from "./routes/usersRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
dbConfig();

// 3rd party middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/users", usersRoute);

app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});

app.listen(PORT, () => {
  console.log(`Node server listening on port http://localhost:${PORT}`);
});
