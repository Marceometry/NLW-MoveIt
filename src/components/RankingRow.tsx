import { useSession } from 'next-auth/client'
import css from '../css/components/rankingRow.module.css'

type User = {
    email: string
    name: string
    image: string
    level: number
    totalXp: number
    challengesCompleted: number
}

type RankingRowProps = {
    users: User[]
}

export function RankingRow({ users }: RankingRowProps) {
    const [ session, loading ] = useSession()
    
    return (
        <>
        {users?.map((user: User, index) => (
            <div key={user.email} className={css.row}>
                <span className={css.position}> {index + 1} </span>

                <div className={css.userInfo} id={session?.user.email === user.email && css.currentUser}>
                    <div className={css.profileContainer}>
                        <img className='animate-left' src={user.image} alt={user.name}/>
                        
                        <div>
                            <strong className='animate-appear'>{user.name}{session?.user.email === user.email && ' (Você)'}</strong>

                            <p className='animate-up'>
                                <img src="icons/level.svg" alt="Level"/> 
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
        </>
    )
}