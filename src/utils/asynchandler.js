// production main use hota hain aise ye code 
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler };














// basic method hain


// const asynchandler = () => {}

// export{asynchandler}


// const asynchandler =(fn) => async (req,res,next) => {
//     try
//     {
//         await fn(req,res,next)

//     }
//     catch(error)
//     {
//         res.status(error.code || 500) .json({
//             success :false,
//             message :error.message
//         })
//     }
// }



