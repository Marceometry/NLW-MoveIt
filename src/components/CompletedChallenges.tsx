import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChalengesContext'
import css from '../css/components/completedChallenges.module.css'

export function CompletedChallenges() {
    const { challengesCompleted } = useContext(ChallengesContext)
    
    return (
        <div className={`${css.completedChallenges} animate-appear`}>
            <span className='animate-down'>Desafios completos</span>
            <span className='animate-down'>{challengesCompleted}</span>
        </div>
    )
}