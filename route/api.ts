import express from "express";
const api = express();
api.disable("x-powered-by");
import { registersRoute } from "../userRoute/register";
import { login } from "../userRoute/login";

api.post("/register", registersRoute);
api.post("/login", login);

export default api;
