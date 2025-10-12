
import database from './database.js';
import express from './express.js';

export default async ({
    app
}) => {
    await database();
    console.log('Connection to database successful!')
    express({app})
};

