import express from "express";

const { Router } = express;
const router = Router();

import productsRouter from "./products/products.router.js";
import cartRouter from './carts/cart.router.js';
import ProductMock from "../services/mock/mock.services.js";
import messageRouter from "./message/message.router.js";

router.get("/health", (_req, res)=>{
    res.status(200).json({
        sucess: true,
        health: "up",
        environment: process.env.ENVIRONMENT || "not found"
    })
})
.use("/productos", productsRouter)
.use('/carrito', cartRouter)
.use("/mensajes",messageRouter);

const productMock = new ProductMock();

router.get("/productos-test", async (_req,res)=>{
    try {
        const mockData = await productMock.getProductsMock();

        res.render("pages/form",{mockData})

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }

});


export default router;