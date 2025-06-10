<<<<<<< HEAD
export const asynchandler = (reqhandlerfn) =>{
    return (req,res,next)=>{
        Promise.resolve(reqhandlerfn(req, res, next))
            .catch((err) => next(err));
    }
}
=======

const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
}

}
export {asyncHandler}
>>>>>>> 63e2c67b1db9c86c85dc62ef2ccd928a9c259a76
