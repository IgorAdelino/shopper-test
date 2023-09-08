import {Router} from "express"
import multer from 'multer'
import { ProductsController } from "./http/product-controller";

// middleware para o recebimento do arquivo
const multerConfig = multer();

const router = Router();
//Rotas utilizadas no teste técnico
router.post("/validate-products", multerConfig.single("file"), ProductsController.validateProducts)
router.patch("/update-products", ProductsController.updateProducts)
//Rotas de apoio
router.get("/get-all-packs", ProductsController.showAllPacks)
router.get("/get-all-products", ProductsController.showAllProducts)

export { router}