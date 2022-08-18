import "dotenv/config";
import express from "express";
import morgan from "morgan";
import "./src/db/connection.js";
import router from "./src/routes/index.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use("/api", router);

app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log("Server Runing in http://localhost:" + PORT)
);
