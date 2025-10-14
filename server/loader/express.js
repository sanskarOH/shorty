
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import routes from '../api/index.js'
import path from 'path';
import { fileURLToPath } from 'url';

export default ({app}) =>{

    app.get('/healthcheck', (req, res) => {
        const healthcheck = {
            uptime : process.uptime(),
            message: 'OK',
            timeStamp: Date.now(),
        };
        try{
            console.log(healthcheck)
            return res.status(200).json(healthcheck)
        }catch(e){
            return res.status(503).send();
        }
    });
    

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("/:anypath", (req, res) => {
        res.sendFile(path.join(__dirname, "dist", "index.html"))
    });

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    app.use('/api', routes())
    //app.use(ExpressMongoSanitize());

}