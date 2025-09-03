import express from "express";
import router from "./routes/routes.js";
import cors from 'cors';
import DBConnection from "./database/db.js";

const app = express();


const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,POST,PUT,DELETE,OPTIONS', 
    allowedHeaders: 'Content-Type,Authorization',
  };



app.use(cors(corsOptions));
app.use("/", router);

const port = process.env.PORT || 4000;

DBConnection();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
