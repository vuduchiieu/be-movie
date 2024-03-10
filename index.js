import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import movieRoute from "./routes/movieRoute.js";
import authRoute from "./routes/authRoute.js";
import searchRoute from "./routes/searchRoute.js";
import sortedRoute from "./routes/sortedRoute.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(morgan("combined"));

app.use("/v1/auth", authRoute);
app.use("/v1/movies", movieRoute);
app.use("/v1/search", searchRoute);
app.use("/v1/sorted", sortedRoute);

mongoose
  .connect(process.env.MONGODB)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(
        `server port http://localhost:${process.env.PORT} is running !!!`
      )
    )
  );
