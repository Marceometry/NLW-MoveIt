import Head from 'next/head'
import { session, useSession } from 'next-auth/client'

import { SideBar } from '../components/SideBar'
import { SignOutButton } from '../components/SignOutButton'
import css from '../css/components/leaderboard.module.css'
import { GetServerSideProps } from 'next'
import { api } from '../services/api'

type LeaderboardProps = {
    users: User[]
}

export default function Leaderboard({ users }: LeaderboardProps) {
    const [ session, loading ] = useSession()

    return (
        <>
        <SideBar />
        {session && <SignOutButton />}
        
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
                {users?.map((user: User, index) => (
                    <div className={css.row} key={user.email}>
                        <span className={css.position}> {index + 1} </span>

                        <div className={css.userInfo}>
                            <div className={css.profileContainer}>
                                <img className='animate-left' src={user.image} alt={user.name}/>
                                
                                <div>
                                    <strong className='animate-appear'>{user.name}</strong>

                                    <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                        Level {user.level}
                                    </p>
                                </div>
                            </div>
                            
                            <div className={css.challengesAndXp}>
                                <span> <strong> {user.challengesCompleted} </strong> completados </span>
                                <span> <strong> {user.totalXp} </strong> xp </span>
                            </div>
                        </div>
                    </div>
                ))}
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
    const { data } = await api.get('/api/user/find/all', {
        params : {
          _sort: 'totalXp',
          _order: 'desc'
        }
    })

    const users = data

    return {
        props: {
            users
        }
    }
}