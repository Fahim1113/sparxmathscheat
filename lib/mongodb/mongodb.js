import mongodb from "mongodb"

const uri = process.env.MongoDB;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client = new MongoClient(uri, options);
let clientPromise;

if (!uri) {
  throw new Error("Please add your Mongo URI");
}

if (process.env.NODE_ENV !== "production") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;