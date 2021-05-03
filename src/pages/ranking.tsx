import Head from 'next/head'
import { GetServerSideProps } from 'next'
import useSWR, { mutate } from 'swr'
import { getSession } from 'next-auth/client'

import { SideBar } from '../components/SideNavBar'
import { SignButton } from '../components/SignButton'
import { RankingRow } from '../components/RankingRow'
import { ThemeChanger } from '../components/ThemeChanger'
import { api, fetcher } from '../services/api'

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
    theme: string
}

export default function Ranking(props: RankingProps) {
    const url = '/api/user/find/all'
    mutate(url)

    const { data, error } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
        // initialData: props.users
    })

    if (error) return <div className="loading"><h2>Algo deu errado enquanto tentávamos carregar esta página :,(</h2></div>
    if (!data) return <div className="loading"><h2>Carregando...</h2></div>

    const usersArray = data.data as User[]

    usersArray.sort(function (a, b) {
        return b.totalXp - a.totalXp
    })

    return (
        <>
        <SideBar />
        <SignButton />
        <ThemeChanger theme={props.theme} />
        
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
                </section>
            </header>

            <div className={css.ranking}>
                <RankingRow users={usersArray} />
            </div>
        </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req } = ctx
    const session = await getSession({ req })

    // const usersArray = await api.get('/api/user/find/all')
    // const users = usersArray.data

    const { data } = await api.get(`/api/user/find/${session?.user.email}`)
    if (data.theme === undefined) {
        var theme = null
    } else {
        var theme = data.theme
    }

    return {
        props: {
            // users,
            theme
        }
    }
}