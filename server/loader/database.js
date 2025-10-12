import { MongoClient } from "mongodb";
import config from "../config/config.js";

let db;

async function initalizeClient(){
    const client = new MongoClient(config.mongodb_url);
    return client.db(); 

}

export default async () =>{
    if(!db){
        db = await initalizeClient();
    }
    return db;

}

let client;

export async function getDB() {

    if(!client){
        client = new MongoClient(config.mongodb_url);
        await client.connect();
        db = client.db();
    }else if(!db){
        db = client.db();
    }
    return db;
}