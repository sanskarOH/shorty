import {Router} from "express";
import { handleCreateUrl } from "./saveUrl.service.js";
import { validateRequest } from "../../utils/validator.js";
import { urlSaveSchema } from "./saveUrl.schema.js";

export default () => {
    const app = Router();

    app.post('/shorten', validateRequest(urlSaveSchema), handleCreateUrl)
    return app;
}