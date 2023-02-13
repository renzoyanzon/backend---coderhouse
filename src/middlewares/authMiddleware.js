const authMiddleware = (req, res, next) => {
    console.info("auth", req.session.username);
    if(!req.session.username || !req.session.password){
        return res.render('/signin/signin')
    }
    next();
}

export default authMiddleware

