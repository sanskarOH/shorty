
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'



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

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true}));
    //app.use(ExpressMongoSanitize());

}