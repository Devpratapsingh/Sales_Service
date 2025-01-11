import {MongoClient} from "mongodb";

let itemsCollection = null;
async function dbConnect() {
    const client = new MongoClient(process.env.MONGODB_URI);
    
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    itemsCollection = db.collection(process.env.COLLECTION_NAME);
    console.log("DATABASE CONNECTED SUCCESSFULLY...");
}
export {dbConnect, itemsCollection};