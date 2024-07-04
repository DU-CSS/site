import { mongo_init } from "$db/mongo";

mongo_init().then((): void => {
    console.log('Mongo DB Initialised')
})

