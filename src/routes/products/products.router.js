const express = require("express");
const authMiddleware = require("../../middlewares/authMiddleware")
const router = express.Router();
const {v4: uuidv4} = require('uuid');

const productsClass = require('../../services/products/products.service');

const products = new productsClass();


router.get('/',async (_req,res,next)=>{
    try {
        const data = await products.getAllProducts();
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
    
}) 

router.post ('/', authMiddleware, async (req,res,next)=>{
    try {
        const {body}= req;
        Object.assign(body,{
            uuid: uuidv4(),
            timestamp: Date.now()
        });
        const data = await products.createProducts(body);
        res.status(200).json(data)
        
    } catch (error) {
        next(error)
    } 
})

router.get('/:id',authMiddleware,async (req,res,next)=>{
    try {
        const id =req.params.id;
        const data = await products.getById(id);
        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
})

router.put('/:id', async(req,res,next)=>{
    try {
        const id = req.params.id;
        const {body}= req;
        const data = await products.updateById(id,body)
        res.status(200).json(data)

    } catch (error) {
       next(error) 
    }
})

router.delete('/:id',authMiddleware,async(req,res,next)=>{
    try {
        const {id}  = req.params;
        const data = await products.deleteById(id);
        res.status(200).json(data)

    } catch (error) {
        next(error)
    }
})

module.exports = router;