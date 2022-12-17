const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware")
const errorMiddleware = require("../../middlewares/errorMiddleware")

const router = express.Router();
const ProductService = require('../../products/products.service');
const newFile = new ProductService();



router.get("/", async (_req, res) => {
    try{
        const products = await newFile.getAll();
        res.status(200).json(products);
    }catch(err){
        errorMiddleware(err);
    }
})

router.post("/", authMiddleware, async (req, res) => {
    try{
        const { body } = req;
        const data = await newFile.save (body);
        res.status(200).json(data)
    }catch(err){
        errorMiddleware(err);
    }
})

router.get("/:id", async (req, res) => {
    try{
        const { id } = req.params ;
        const product = await newFile.getById(id)
        if (product != undefined){
            res.status(200).json({
                success: true,
                data: product
            })
        } else {
            res.status(404).json({
                success: false,
                error: "producto no encontrado"
            })
        }
    }catch(err){
        errorMiddleware(err);
    }
})

router.put("/:id", authMiddleware, async(req, res) => {
    try{
        const { id } = req.params;
        const {body} = req;
        const data = await newFile.updateProduct(id,body);
        res.status(200).json(data)
      
    }catch(err){
        errorMiddleware(err);
    }
})

router.delete("/:id", authMiddleware, async(req, res) => {
    try{
        const {id} = req.params;
    
        const data = await newFile.deleteById(id);
        res.status(200).json(data)
    }catch(err){
        errorMiddleware(err);
    }
})

module.exports = router;