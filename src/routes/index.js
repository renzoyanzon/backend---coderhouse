const express = require("express");

const { Router } = express;
const router = Router();

const productsRouter = require("./products/products.router")
const cartRouter = require('./carts/cart.router');

router.get("/health", (_req, res)=>{
    res.status(200).json({
        sucess: true,
        health: "up",
        environment: process.env.ENVIRONMENT || "not found"
    })
})
.use("/productos", productsRouter)
.use('/carrito', cartRouter)

module.exports = router;