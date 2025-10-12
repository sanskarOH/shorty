import express from 'express';
import config from './config/config.js';
import Loader from './loader/index.js';

let server;
async function start() {
    const app = express();
    await Loader({app});
    app.get('/',(_req,res)=>{
        res.status(200).json({message: {
            status: 200,
            message: 'The server is up and running'

        }})
    });

    server = app
            .listen(config.port, () => {
            console.log(`Server is listening on port: ${config.port}`)

        })
}

const exitHandler = () => {
    if(server){
        server.closed(() => {
            console.log('Server closed');
            process.exit(1);
        });
    }else{
        process.exit(1)
    }
}

const unexpectedErrorHandler = (error) => {
    console.error(error);
    exitHandler();
}

process.on('uncaughtException',unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

start();