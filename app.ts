import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
const app = express();
app.disable("x-powered-by");
const URL = process.env.MONGO_URL!;
import cookieparser from "cookie-parser";
import api from "./route/api";
import apiProduct from "./route/apiProduct";
import helmet from "helmet";
import morgan from "morgan";

const dbConn = async () => {
  try {
    await mongoose.connect(URL);
    console.log(`suuces to connect on ${URL}`);
  } catch (error) {
    console.error(error);
  }
};

dbConn().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`suuces to connect on PORT ${process.env.PORT}`);
  });
});

app.use(express.json());
app.use(cookieparser());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api", api);
app.use("/api/product", apiProduct);
