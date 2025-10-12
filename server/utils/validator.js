export const validateRequest = (schema) => {

    return(req, res, next) => {
        const { error, value} = schema.validate(req.body, {abortEarly : false});
        if(error){
            return res.status(400).json({
                success: false,
                message: "validation error",
                error: error.details.map((d) => d.message)
            })
        }
        req.validatedData = value;
        next();
    }

}