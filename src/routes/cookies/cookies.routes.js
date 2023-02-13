import express from 'express';

const router = express.Router();

router.post('/setCookie',(req,res)=>{
    const {name, value, time } = req.body;
    const config = {
        signed: true
    };
    if(!time){
        return res.cookie(name,value,config).send(`Cookie ${name} set`)
    }
    if(isNaN(time) || time <1 ){
        return res.status(400).json({
            success: false,
            message: "Bad cookie time format"
        })
    }
    config['maxAge']=  parseInt(time)*1000;
    res.cookie(name,value,config).send(`Cookie ${name} set`)
});

router.get('/getCookies',(req,res)=>{
    res.status(200).json(req.signedCookies.name)
});

router.delete('/:name',(req,res)=>{
    const {name}= req.params;
    if(!Object.hasOwn(req.signedCookies,name)){  // ECS 6 es un objeto que me dice si no existe
        return res.status(400).json({
            success: false,
            message: `The cookie ${name} does exists`
        })
    }
    res.clearCookie(name).send(`Cookie ${name} was deleted successfully`)
})


export default router;

