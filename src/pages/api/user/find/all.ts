import connect from "../../../../services/database";

export default async function FindAll(req, res) {
    if (req.method === 'GET') {
        const { db } = await connect()
        const response = await db.collection("usersGameInfo").find().toArray()

        res.status(200).json(response)
    } else {
        res.status(400).json({ error: "Wrong request method" })
    }
}