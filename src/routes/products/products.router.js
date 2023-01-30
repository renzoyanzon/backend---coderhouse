import express from "express";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = express.Router();

/* const ProductService = require('../../services/db/products/products.knex');
const products = new ProductService(); */

import { getProductModule } from '../../daos/index.js'

router.get("/", async (_req, res, next) => {
    try{
        const products = await getProductModule();
        const product = new products();
        const data = await product.getAllProducts();
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch {
        next(err)
    }
})

router.post("/", authMiddleware, async (req, res, next) => {
    try{
        const { body } = req;
        if(_.isNil(body)) res.status(400).json({success:false, message: "ERROR (body missing)"})
        Object.assign(body, {
            uuid: uuidv4(),
            timestamp: Date.now()
        });
        const products = await getProductModule();
        const product = new products();

        const data = await product.createProduct(body);
        console.log("datapost",data)
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})

router.put("/:productUuid", authMiddleware, async (req, res, next) => {
    try{
        const { productUuid } = req.params;
        const { body } = req;
        if(_.isNil(productUuid)) res.status(400).json({success:false, message: "ERROR (product missing)"})
        const products = await getProductModule();
        const product = new products();
        const data = await product.updateProduct(productUuid, body);
        if(!data.success) res.status(500).json(data);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})

router.get("/:productUuid", async (req, res, next) =>{
    try{
        const { productUuid } = req.params;
        if(_.isNil(productUuid)) res.status(400).json({success:false, message: "ERROR (product missing)"});
        const products = await getProductModule();
        const product = new products();
        const data = await product.getProduct(productUuid);
        if(!data.success) res.status(500).json(data);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})

router.delete("/:productUuid", authMiddleware ,async (req, res, next) =>{
    try{
        const { productUuid } = req.params;
        if(_.isNil(productUuid)) res.status(400).json({success:false, message: "ERROR (product missing)"})
        const products = await getProductModule();
        const product = new products();
        const data = await product.deleteProduct(productUuid);
        if(!data.success) res.status(500).json(data);
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})



export default router;