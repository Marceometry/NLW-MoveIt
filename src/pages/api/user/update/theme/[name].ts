import connect from "../../../../../services/database";

type UsersGameInfo = {
    name: string
    theme: string
}

export default async function FindOneUser(req, res) {
    if (req.method === 'POST') {        
        const { name, theme }: UsersGameInfo = req.query

        if (!name || !theme) {
            res.status(400).json({ error: "Missing body parameters" })
            return
        }

        const { db } = await connect()
        db.collection("usersGameInfo").updateOne(
            { name: name },
            { $set: { theme: theme }})

        res.status(200).json({success: true})
    } else {
        res.status(400).json({ error: "Wrong request method" })
    }
}