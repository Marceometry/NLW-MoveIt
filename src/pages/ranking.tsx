import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'

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

export default function Ranking({ users }: RankingProps) {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [ session ] = useSession()
    const router = useRouter()
    
    const refreshData = () => {
        router.replace(router.asPath)
        setIsRefreshing(true);
    }

    useEffect(() => {
      setIsRefreshing(false);
    }, [users]);

    return (
        <>
        <SideBar />
        <SignButton />

        {!session && <ThemeChanger />}
        {session && <ThemeChanger />}
        
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
                    <RankingRow users={users} />
                 )}
            </div>
        </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get('/api/user/find/all')

    data.sort(function (a, b) {
        return b.totalXp - a.totalXp
    })

    return {
        props: {
            users: data
        }
    }
}