import connect from "../../../../services/database";

type UsersGameInfo = {
    email: string
    name: string
    image: string
}

export default async function AddUsersGameInfo(req, res) {
    if (req.method === 'POST') {
        const { email, name, image }: UsersGameInfo = req.query

        if (email === 'null' || !email || !name || !image) {
            res.status(400).json({ error: "Configure seu email como público no Github" })
            return
        }

        const { db } = await connect()
        const response = await db.collection("usersGameInfo").insertOne({
            email,
            name,
            image,
            level: 1,
            currentXp: 0,
            totalXp: 0,
            challengesCompleted: 0
        })
        res.status(200).json(response.ops[0])
    } else {
        res.status(400).json({ error: 'Wrong request method' })
    }
}