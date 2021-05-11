import connect from "../../../../services/database";

type UsersGameInfo = {
    name: string
    level: string
    currentXp: string
    totalXp: string
    challengesCompleted: string
}

export default async function FindOneUser(req, res) {
    if (req.method === 'POST') {        
        const {
            name,
            level,
            currentXp,
            totalXp,
            challengesCompleted
        }: UsersGameInfo = req.query

        if (!name) {
            res.status(400).json({ error: "Missing body parameter" })
            return
        }

        const { db } = await connect()
        db.collection("usersGameInfo").updateOne(
            { name: name },
            { $set: {
                level: Number(level),
                currentXp: Number(currentXp),
                totalXp: Number(totalXp),
                challengesCompleted: Number(challengesCompleted)
            }})

        res.status(200).json({success: true})
    } else {
        res.status(400).json({ error: "Wrong request method" })
    }
}