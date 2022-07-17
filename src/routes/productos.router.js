import {Router} from 'express';
import ProductService from '../ProductService.js';

const router = Router()


const service = new ProductService('../products.json')

router.get("/", service.get);

router.post("/", service.post);

router.get("/:id", service.getById)

router.put("/:id", service.put);

router.delete("/:id",service.deleteById);

export default router