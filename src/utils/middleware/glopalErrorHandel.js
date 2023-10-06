


// TODO: m4 48ala
const glopalErrorHandel = (err,req,res,next) => {
    res.status(err.statusCode).json({message:err.message})
}
// TODO: m4 48ala


export default glopalErrorHandel