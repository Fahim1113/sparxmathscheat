import clientPromise from "../../lib/mongodb/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const mongodb = await clientPromise;
    const db = await mongodb.db("users");
    const collection = await db.collection("users");
    let user = await collection.find(body).toArray();
    if (user.length !== 0) await res.status(200).json({ success: false });
    else {
      await collection.insertOne(body);
      await res.status(200).json({ success: true });
    }
  }
}