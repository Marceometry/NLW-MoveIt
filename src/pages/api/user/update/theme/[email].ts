import connect from "../../../../../services/database";

type UsersGameInfo = {
    email: string
    theme: string
}

export default async function FindOneUser(req, res) {
    if (req.method === 'POST') {        
        const { email, theme }: UsersGameInfo = req.query

        if (email === 'null' || !email || !theme) {
            res.status(400).json({ error: "Configure seu email como público no Github" })
            return
        }

        const { db } = await connect()
        db.collection("usersGameInfo").updateOne(
            { email: email },
            { $set: { theme: theme }})

        res.status(200).json({success: true})
    } else {
        res.status(400).json({ error: "Wrong request method" })
    }
}