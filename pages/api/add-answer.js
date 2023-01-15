import clientPromise from "../../lib/mongodb/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const mongodb = await clientPromise;
    const db = mongodb.db("answers");
    const collection = await db.collection(body.username);
    let ans = await collection.findOne({ bookworkCode: body.bookworkCode });
    if (!ans)
      await collection.insertOne({
        bookworkCode: body.bookworkCode,
        answer: body.answer,
      });
    else
      await collection.findOneAndReplace(
        { bookworkCode: body.bookworkCode },
        { bookworkCode: body.bookworkCode, answer: body.answer }
      );
    res.send({ success: true });
  }
}
