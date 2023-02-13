import express from 'express';
import statusCode from 'http-status';
import authMiddleware  from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware,(req,res)=>{
    if(!req.session.contador){
        req.session.contador= 0
    }
    req.session.contador = req.session.contador + 1;
    const message = {
        username: req.session.username,
        contador: req.session.contador
    }

    res.render('signin/home',{message})
});


router.post('/signin', (req,res)=>{
    const USRNAME = process.env.USRNAME;
    const PASSWORD = process.env.PASSWORD;

    const {usernameInput, passwordInput}= req.body;

    if(!usernameInput || !passwordInput){
        return res.render('signin/error',{message: `${statusCode[400]} ,username or password missing`})
    }
    if(usernameInput !=USRNAME || passwordInput != PASSWORD){
        return res.render('signin/error',{message: `${statusCode[403]} ,bad username or password`})
    }
    console.log(usernameInput)
    req.session.username= usernameInput;
    req.session.password = passwordInput;
    
    

    const message = {
        username: req.session.username,
        contador: req.session.contador || 0
    }

    console.log(message)

    res.render('signin/home',{message})
})


router.post('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            return res.status(500).json({
                succcess: false,
                message: err.message
            })
        }
        res.render('signin/signin')
    })
})


export default router

