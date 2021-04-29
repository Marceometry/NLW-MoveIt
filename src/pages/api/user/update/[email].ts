import connect from "../../../../services/database";

type UsersGameInfo = {
    email: string
    level: string
    currentXp: string
    totalXp: string
    challengesCompleted: string
}

export default async function FindOneUser(req, res) {
    if (req.method === 'POST') {        
        const {
            email,
            level,
            currentXp,
            totalXp,
            challengesCompleted
        }: UsersGameInfo = req.query

        if (!email) {
            res.status(400).json({ error: "Configure seu email como público no Github" })
            return
        }

        const { db } = await connect()
        db.collection("usersGameInfo").updateOne(
            { email: email },
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