import { MongoClient } from "mongodb";

import {MONGO} from '$env/static/private'

const client = new MongoClient(MONGO)

export function mongo_init() : Promise<MongoClient> {
    console.log('Initialising Mongo DB');
    return client.connect();
}

export default client.db('DUCSS-Site')