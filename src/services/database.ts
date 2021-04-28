import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export default async function connectDB() {
    if (!client.isConnected()) await client.connect()

    const db = client.db("Portfolio")
    return { db, client }
}