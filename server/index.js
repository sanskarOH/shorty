import express from 'express';
import config from './config/config.js';
import Loader from './loader/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let server;
async function start() {
    const app = express();
    await Loader({app});
    const frontendPath = path.join(__dirname, "public")
    
    app.use(express.static(frontendPath));
    app.get('/', (_req, res)=> {
        res.sendFile(path.join(frontendPath, "index.html"))
    })

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