import connect from "../../../../services/database";

type UsersGameInfo = {
    name: string
}

export default async function FindOneUser(req, res) {
    if (req.method === 'GET') {        
        const { name }: UsersGameInfo = req.query

        if (!name) {
            res.status(400).json({ error: "Missing body parameter" })
            return
        }

        const { db } = await connect()
        const response = await db.collection("usersGameInfo").findOne({ name: name })

        if (!response) {
            res.json({ error: true })
        } else {
            res.status(200).json(response)
        }
    } else {
        res.status(400).json({ error: "Wrong request method" })
    }
}