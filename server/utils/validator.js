export const validateRequest = (schema, source = 'body') => {
    return (req, res, next) => {
     
        const dataToValidate = source === 'body' ? req.body : 
                               source === 'params' ? req.params : 
                               req.query;
        
        const { error, value } = schema.validate(dataToValidate, { abortEarly: false });
        
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.details.map((d) => d.message)
            });
        }
        
        req.validatedData = value;
        next();
    }
}