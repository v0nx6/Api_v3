import express from "express";
const api = express();
api.disable("x-powered-by");
import { registersRoute } from "../userRoute/register";
import { login } from "../userRoute/login";
import { verifyJwt } from "../middleware/verifyJwt";
import { updateFunction } from "../userRoute/update";
import { deleteProfile } from "../userRoute/deleteProfile";

api.post("/register", registersRoute);
api.post("/login", login);

api.use(verifyJwt);
api.patch("/update", updateFunction);
api.delete("/delete", deleteProfile);

export default api;
