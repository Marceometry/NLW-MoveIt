import Head from 'next/head'
import useSWR, { mutate } from 'swr'

import { SideBar } from '../components/SideNavBar'
import { SignButton } from '../components/SignButton'
import { RankingRow } from '../components/RankingRow'
import { ThemeChanger } from '../components/ThemeChanger'
import { fetcher } from '../services/api'

import css from '../css/ranking.module.css'

type User = {
    email: string
    name: string
    image: string
    level: number
    totalXp: number
    challengesCompleted: number
}

type RankingProps = {
    users: User[]
}

export default function Ranking({ users }: RankingProps) {
    const url = '/api/user/find/all'
    mutate(url)

    const { data, error } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
        // initialData: users
    })

    if (error) return <div className="loading"><h2>Algo deu errado enquanto tentávamos carregar esta página :,(</h2></div>
    if (!data) return <div className="loading"><h2>Carregando...</h2></div>

    const usersList = data.data as User[]

    usersList.sort(function (a, b) {
        return b.totalXp - a.totalXp
    })

    return (
        <>
        <SideBar />
        <SignButton />
        <ThemeChanger />
        
        <div className={css.container}>
            <Head>
                <title>Move.It | Ranking</title>
            </Head>

            <header>
                <h1> Ranking </h1>

                <section>
                    <div className={css.leftHeader}>
                        <span> POSIÇÃO </span>
                        <span> USUÁRIO </span>
                    </div>
                    
                    <div className={css.rightHeader}>
                        <span> DESAFIOS </span>
                        <span> EXPERIÊNCIA </span>
                    </div>
                    
                    <div className={css.rightHeader} id={css.mobile}>
                        <span> DESAFIOS </span>
                    </div>
                </section>
            </header>

            <div className={css.ranking}>
                <RankingRow users={usersList} />
            </div>
        </div>
        </>
    )
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const usersArray = await api.get('/api/user/find/all')
//     const users = usersArray.data

//     return {
//         props: {
//             users
//         }
//     }
// }