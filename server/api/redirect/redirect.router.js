import { Router } from "express";
import { validateRequest } from "../../utils/validator.js";
import { redirectionSchema } from "./redirect.schema.js";
import { redirectionHandler } from "./redirection.service.js";


export default () => {
    const app = Router();
    app.get('/',(_req, res)=>{
        res.json(({
            success : true,
            message: "Route working fine"
        }))

    })
    app.get('/:shortCode', validateRequest(redirectionSchema, 'params') ,redirectionHandler);
    return app; 

}