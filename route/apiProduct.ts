import express from "express";
const apiProduct = express();
apiProduct.disable("x-powered-by");
import { add } from "../productRoute/addProduct";

apiProduct.post("/addProduct", add);

export default apiProduct;
