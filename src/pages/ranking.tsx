import Head from 'next/head'
import { GetServerSideProps } from 'next'
import useSWR, { mutate } from 'swr'

import { SideBar } from '../components/SideNavBar'
import { SignButton } from '../components/SignButton'
import { RankingRow } from '../components/RankingRow'
import { ThemeChanger } from '../components/ThemeChanger'
import { api, fetcher } from '../services/api'

import css from '../css/ranking.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
    // const url = '/api/user/find/all'
    // mutate(url)

    // const { data, error } = useSWR(url, fetcher, {
    //     revalidateOnFocus: false,
    //     // initialData: users
    // })

    // if (error) return <div className="loading"><h2>Algo deu errado enquanto tentávamos carregar esta página :,(</h2></div>
    // if (!data) return <div className="loading"><h2>Carregando...</h2></div>

    const [isRefreshing, setIsRefreshing] = useState(false);
    const router = useRouter()
    
    const refreshData = () => {
        router.replace(router.asPath)
        setIsRefreshing(true);
    }

    useEffect(() => {
      setIsRefreshing(false);
    }, [users]);

    const usersList = users

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

                <button onClick={refreshData}>Atualizar Ranking</button>

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
                {isRefreshing ? (
                    <div className="loading"><h2>Carregando...</h2></div>
                 ) : (
                    <RankingRow users={usersList} />
                 )}
            </div>
        </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const usersArray = await api.get('/api/user/find/all')
    const users = usersArray.data

    return {
        props: {
            users
        }
    }
}