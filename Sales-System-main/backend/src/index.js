import 'dotenv/config'
import { dbConnect } from "./db/index.js";
import replicateData from './db/replicateData.js';
import app from './app.js';

await dbConnect();

// Function to insert data to my database from the given one.
// await replicateData();

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server if running on port ${port}`)
});