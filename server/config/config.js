import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';



import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env')});
const evnSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),
        BASE_URL: Joi.string().required().uri().description('Base url'),
        
    }).unknown();

const { value: envVars, error} = evnSchema.prefs({errors: {label: 'key'}}).validate(process.env);

if(error){
        throw new Error(`Config validation error: ${error.message}`);
    }


const config = {
        env: envVars.NODE_ENV,
        port: envVars.PORT,
        mongodb_url: envVars.MONGODB_URL,
        base_url: envVars.BASE_URL,
}

export default config;