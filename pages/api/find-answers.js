import clientPromise from "../../lib/mongodb/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const mongodb = await clientPromise;
    const db = mongodb.db("answers");
    const collection = await db.collection(body.username);
    const data = await collection.find({}).toArray();
    res.send({ data:data });
  }
}
