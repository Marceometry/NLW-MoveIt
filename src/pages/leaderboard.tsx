import { Profile } from '../components/Profile'
import css from '../css/components/leaderboard.module.css'

export default function Leaderboard() {
    return (
        <div className={css.container}>
            <header>
                <h1> LeaderBoard </h1>

                <section>
                    <div>
                        <span> Posição </span>
                        <span> Usuário </span>
                    </div>
                    
                    <div>
                        <span> Desafios </span>
                        <span> Experiência </span>
                    </div>
                </section>
            </header>

            <div className={css.leaderboard}>
                <div className={css.row}>
                    <span className={css.position}> 1 </span>

                    <div className={css.ra}>
                        <Profile />

                        <div>
                            <span> <strong> 127 </strong> completados </span>
                            <span> <strong> 154000 </strong> xp </span>
                        </div>
                    </div>
                </div>
                
                <div className={css.row}>
                    <span className={css.position}> 2 </span>

                    <div className={css.ra}>
                        <Profile />

                        <div>
                            <span> <strong> 127 </strong> completados </span>
                            <span> <strong> 154000 </strong> xp </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}