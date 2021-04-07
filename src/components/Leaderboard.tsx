import Head from 'next/head'
import css from '../css/components/leaderboard.module.css'

export default function Leaderboard() {
    return (        
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
                <div className={css.row}>
                    <span className={css.position}> 1 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 43
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 127 </strong> completados </span>
                            <span> <strong> 154000 </strong> xp </span>
                        </div>
                    </div>
                </div>

                
                <div className={css.row}>
                    <span className={css.position}> 2 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 36
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 113 </strong> completados </span>
                            <span> <strong> 133201 </strong> xp </span>
                        </div>
                    </div>
                </div>

                
                <div className={css.row}>
                    <span className={css.position}> 3 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 33
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 101 </strong> completados </span>
                            <span> <strong> 11509 </strong> xp </span>
                        </div>
                    </div>
                </div>
                
                
                <div className={css.row}>
                    <span className={css.position}> 4 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 28
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 96 </strong> completados </span>
                            <span> <strong> 10298 </strong> xp </span>
                        </div>
                    </div>
                </div>
                
                
                <div className={css.row}>
                    <span className={css.position}> 5 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 22
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 80 </strong> completados </span>
                            <span> <strong> 9957 </strong> xp </span>
                        </div>
                    </div>
                </div>
                
                
                <div className={css.row}>
                    <span className={css.position}> 6 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 18
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 57 </strong> completados </span>
                            <span> <strong> 8109 </strong> xp </span>
                        </div>
                    </div>
                </div>
                
                
                <div className={css.row}>
                    <span className={css.position}> 7 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 15
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 41 </strong> completados </span>
                            <span> <strong> 7901 </strong> xp </span>
                        </div>
                    </div>
                </div>
                
                
                <div className={css.row}>
                    <span className={css.position}> 8 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 15
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 40 </strong> completados </span>
                            <span> <strong> 7846 </strong> xp </span>
                        </div>
                    </div>
                </div>
                
                
                <div className={css.row}>
                    <span className={css.position}> 9 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 12
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 26 </strong> completados </span>
                            <span> <strong> 2456 </strong> xp </span>
                        </div>
                    </div>
                </div>
                
                
                <div className={css.row}>
                    <span className={css.position}> 10 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 4
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 8 </strong> completados </span>
                            <span> <strong> 786 </strong> xp </span>
                        </div>
                    </div>
                </div>
                
                
                <div className={css.row}>
                    <span className={css.position}> 11 </span>

                    <div className={css.userInfo}>
                        <div className={css.profileContainer}>
                            <img className='animate-left' src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

                            <div>
                                <strong className='animate-appear'>Marcelino Teixeira</strong>

                                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                                    Level 1
                                </p>
                            </div>
                        </div>

                        <div className={css.challengesAndXp}>
                            <span> <strong> 1 </strong> completado </span>
                            <span> <strong> 67 </strong> xp </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}