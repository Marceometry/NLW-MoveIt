import connect from "../../../../services/database";

type UsersGameInfo = {
    email: string
}

export default async function FindOneUser(req, res) {
    if (req.method === 'GET') {        
        const { email }: UsersGameInfo = req.query

        if (!email) {
            res.status(400).json({ error: "Configure seu email como público no Github" })
            return
        }

        const { db } = await connect()
        const response = await db.collection("usersGameInfo").findOne({ email: email })

        if (!response) {
            res.json({ error: true })
        } else {
            res.status(200).json(response)
        }
    } else {
        res.status(400).json({ error: "Wrong request method" })
    }
}