import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import { getSession, useSession } from 'next-auth/client'

import { SideBar } from '../components/SideNavBar'
import { SignButton } from '../components/SignButton'
import { RankingRow } from '../components/RankingRow'
import { ThemeChanger } from '../components/ThemeChanger'
import { api } from '../services/api'

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

export default function Ranking({ users, theme }) {
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/user/find/all`, api, {
        revalidateOnFocus: false,
        initialData: users
    })
    mutate(`${process.env.NEXT_PUBLIC_URL}/api/user/find/all`)

    if (error) return <div className="loading"><h2>Algo deu errado enquanto tentávamos carregar esta página :,(</h2></div>
    if (!data) return <div className="loading"><h2>Carregando...</h2></div>
    
    data.sort(function (a, b) {
        return b.totalXp - a.totalXp;
    })

    return (
        <>
        <SideBar />
        <SignButton />
        <ThemeChanger theme={theme} />
        
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
                <RankingRow users={data} />
            </div>
        </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { req } = ctx
    const session = await getSession({ req })

    const usersArray = await api.get('/api/user/find/all')
    const users = usersArray.data

    const { data } = await api.get(`/api/user/find/${session?.user.email}`)
    if (data.theme === undefined) {
        var theme = null
    } else {
        var theme = data.theme
    }

    return {
        props: {
            users,
            theme
        }
    }
}