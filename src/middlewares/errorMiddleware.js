const errorMiddleware = (error,_req,res,next)=>{
    res.status(500).json({
        success: false,
        error: error.message
    })
    next()
}

module.exports = errorMiddleware