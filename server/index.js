import express from "express";
import router from "./routes/routes.js";
import cors from 'cors';
import DBConnection from "./database/db.js";

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allow all HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
  };



app.use(cors(corsOptions));
app.use("/", router);

const PORT = 8000;

DBConnection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
