import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChalengesContext'
import css from '../css/components/xpBar.module.css'

export function XpBar() {
    const { currentXp, xpToNextLevel } = useContext(ChallengesContext)

    const percentToNextLevel = Math.round(currentXp * 100) / xpToNextLevel

    return (
        <header className={`${css.xpBar} animate-down`}>
            <span> 0 xp </span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }}/>

                <span className={css.currentXp} style={{ left: `${percentToNextLevel}%` }}>
                    { currentXp } xp 
                </span>
            </div>
            <span> {xpToNextLevel} xp </span>
        </header>
    )
}