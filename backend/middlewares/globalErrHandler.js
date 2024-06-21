export const globalErrhandler = (err, req, res, next) =>{
    //stack
    //message
    const stack = err?.stack;
    const statusCode = err?.statusCode ? err?.statusCode : 500;
    const message = err?.message;
    res.status(statusCode).json({
        stack,
        message,
    });
    
}

//404
export const notFound = (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    //next will excecute all the middleware function including function that is below it
    //if use next globalhandle in appjs will not be execute
    next(err);
}