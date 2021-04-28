import { getSession } from 'next-auth/client'

export default async (req, res) => {
    const session = await getSession({ req })

    if (session) {
        res.send({content: "Informação"})
    } else {
        res.send({error: "Você precisa estar logado"})
    }
}