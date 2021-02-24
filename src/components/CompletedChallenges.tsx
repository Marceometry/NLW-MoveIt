import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChalengesContext'
import css from '../css/components/completedChallenges.module.css'

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext)
    
    return (
        <div className={css.completedChallenges}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}