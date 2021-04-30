import Head from 'next/head'
import useSWR, { mutate } from 'swr'

import { SideBar } from '../components/SideNavBar'
import { SignButton } from '../components/SignButton'
import { api } from '../services/api'

import css from '../css/ranking.module.css'
import { RankingRow } from '../components/RankingRow'
import { ThemeChanger } from '../components/ThemeChanger'

export default function Ranking() {
    const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_URL}/api/user/find/all`, api, {
        revalidateOnFocus: false,
    })
    mutate(`${process.env.NEXT_PUBLIC_URL}/api/user/find/all`)

    if (!data) return <div className="loading"><h2>Carregando...</h2></div>
    if (error) return <div className="loading"><h2>Algo deu errado enquanto tentávamos carregar esta página :,(</h2></div>
    
    data.data.sort(function (a, b) {
        return b.totalXp - a.totalXp;
    })

    return (
        <>
        <SideBar />
        <SignButton />
        <ThemeChanger theme={data.data[0].theme} />
        
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
                <RankingRow users={data.data} />
            </div>
        </div>
        </>
    )
}