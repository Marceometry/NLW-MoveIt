import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'

import { SideBar } from '../components/SideBar'
import { SignButton } from '../components/SignButton'
import { api } from '../services/api'

import css from '../css/leaderboard.module.css'
import { LeaderboardRow } from '../components/LeaderboardRow'

type LeaderboardProps = {
    users: User[]
}

export default function Leaderboard({ users }: LeaderboardProps) {
    const [ session, loading ] = useSession()

    return (
        <>
        {loading && (
          <div className="loading">
            <h2>Carregando...</h2>
          </div>
        )}

        <SideBar />
        <SignButton />
        
        <div className={css.container}>
            <Head>
                <title>Move.It | Leaderboard</title>
            </Head>

            <header>
                <h1> Leaderboard </h1>

                <section>
                    <div className={css.leftHeader}>
                        <span> POSIÇÃO </span>
                        <span> USUÁRIO </span>
                    </div>
                    
                    <div className={css.rightHeader}>
                        <span> DESAFIOS </span>
                        <span> EXPERIÊNCIA </span>
                    </div>
                </section>
            </header>

            <div className={css.leaderboard}>
                <LeaderboardRow users={users} />
            </div>
        </div>
        </>
    )
}

type User = {
    email: string
    name: string
    image: string
    level: number
    totalXp: number
    challengesCompleted: number
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get('/api/user/find/all')

    data.sort(function (a, b,) {
        return b.totalXp - a.totalXp;
    })

    const users = data

    return {
        props: {
            users
        }
    }
}