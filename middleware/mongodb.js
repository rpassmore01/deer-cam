import gridfsStream from "gridfs-stream";
import { MongoClient } from "mongodb";

const MONGODB_URI = 'mongodb+srv://mongodb:mongodb@cluster0.0dpuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB = 'deer-pictures';

let cachedClient = null;
let cachedDb = null;
let cachedGfs = null;

export async function connectToDatabase() {
    if (cachedClient && cachedDb && cachedGfs) {
        return {
            client: cachedClient,
            db: cachedDb,
            gfs : cachedGfs,
        }
    }

    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);
    let gfs = gridfsStream

    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb
    };
}