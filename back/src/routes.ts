import {Router} from "express"
import multer from 'multer'
import { ProductsController } from "./http/product-controller";


const multerConfig = multer();

const router = Router();

router.post("/validate-products", multerConfig.single("file"), ProductsController.validateProducts)
router.patch("/update-products", ProductsController.updateProducts)
router.get("/get-all-packs", ProductsController.showAllPacks)
router.get("/get-all-products", ProductsController.showAllProducts)

export { router}