import express from "express";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import authMiddleware from "../../middlewares/authMiddleware.js";
import MessageClass from "../../services/message/message.service.js";

const router = express.Router();

const messages = new MessageClass();

router.post("/",authMiddleware, async(req,res,next)=>{
    try {
        const {body}= req;
        
        if(_.isNil(body)) res.status(400).json({success:false, message: "ERROR (body missing)"})
        Object.assign(body.author, {
            uuid: uuidv4(),
            timestamp: Date.now()
        });
        console.log(body)
        const data = await messages.createMessage(body);
        if(!data.success) res.status(500).json(data)
            res.status(200).json(data);
    } catch (err) {
        next(err);
    } 
})

router.get("/", async(_req,res,next)=>{
    try {
        const data = await messages.getAllMessage();
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }

});

router.delete("/", authMiddleware ,async (req, res, next) =>{
    try{
        const data = await messages.deleteMessage();
        if(!data.success) res.status(500).json(data)
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
})



export default router;