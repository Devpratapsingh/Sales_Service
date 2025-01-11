import axios from "axios";
import { itemsCollection } from "./index.js";

export default async function replicateData() {
    const response = await axios("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    await itemsCollection.insertMany(response.data);
    console.log("Data added succesfully..");
}