import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
client.connect();
const db = client.db(process.env.DB_NAME);

export default db;
