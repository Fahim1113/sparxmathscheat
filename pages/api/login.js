import clientPromise from "../../lib/mongodb/mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const body = JSON.parse(req.body);
    const mongodb = await clientPromise;
    const db = mongodb.db("users");
    let users = await db.collection("users").findOne(body);
    if (!users) res.status(200).json({ success: false });
    else {
      users = JSON.parse(JSON.stringify(users));
      if (
        users.username === body.username &&
        users.password === body.password
      ) {
        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false });
      }
    }
  }
}