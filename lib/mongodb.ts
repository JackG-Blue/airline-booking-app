import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing");
}

const options = {
  serverSelectionTimeoutMS: 10000,
};

let client: MongoClient;

declare global {
  var _mongoClient: MongoClient | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options);
  }

  client = global._mongoClient;
} else {
  client = new MongoClient(uri, options);
}

export default Promise.resolve(client);