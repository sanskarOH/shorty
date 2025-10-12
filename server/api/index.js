import { Router } from "express";
import redirectRouter from "./redirect/redirect.router.js";
import saveUrlRouter from "./saveUrl/saveUrl.router.js";


export default () => {
    const app = Router();
    app.use(saveUrlRouter());
    app.use(redirectRouter());
    return app;
} 
