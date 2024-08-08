import { CommandSucceededEvent, MongoClient } from "mongodb";

import {MONGO} from '$env/static/private'

var MongoError = false;
const client = new MongoClient(MONGO, { connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000, socketTimeoutMS: 5000 })
client.on('error', (error) => {MongoError = true;})
client.on('commandSucceeded', (CommandSucceededEvent) => {MongoError = false;})


export function mongo_init() {
    console.log('Initialising Mongo DB');
        return client.connect();    
}

export default client.db('DUCSS-Site')

