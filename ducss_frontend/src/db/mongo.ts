import { MongoClient } from "mongodb";

import {MONGO} from '$env/static/private'

const client = new MongoClient(MONGO, { connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000 })


export function mongo_init() {
    console.log('Initialising Mongo DB');
        return client.connect();    
}

export default client.db('DUCSS-Site')
