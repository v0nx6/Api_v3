import express from "express";
const apiProduct = express();
apiProduct.disable("x-powered-by");
import { add } from "../productRoute/addProduct";
import { getProduct } from "../productRoute/getProduct";
import { verifyJwt } from "../middleware/verifyJwt";
import { addCart } from "../productRoute/addToCart";
import { checkOut } from "../productRoute/chechOut";

apiProduct.get("/getProduct", getProduct);

apiProduct.use(verifyJwt);
apiProduct.post("/addProduct", add);
apiProduct.post("/addToCart", addCart);
apiProduct.post("/checkOut", checkOut);

export default apiProduct;
