import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error("Please add your MONGODB_URI to .env.local");
}

const client = new MongoClient(uri);

export default client;