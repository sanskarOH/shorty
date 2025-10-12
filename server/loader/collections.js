
import {getDB} from './database.js'


export const getUrlCollection = async() =>{
    const db = await getDB();
    return db.collection('urls');

}