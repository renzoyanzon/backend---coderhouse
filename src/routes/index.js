import express from "express";

const { Router } = express;
const router = Router();

import productsRouter from "./products/products.router.js";
import cartRouter from './carts/cart.router.js';

router.get("/health", (_req, res)=>{
    res.status(200).json({
        sucess: true,
        health: "up",
        environment: process.env.ENVIRONMENT || "not found"
    })
})
.use("/productos", productsRouter)
.use('/carrito', cartRouter)

export default router;