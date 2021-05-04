import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChalengesContext';
import css from '../css/components/profile.module.css';

export function Profile({ name, img }) {
    const { level, challengesCompleted } = useContext(ChallengesContext)

    return (
        <div>
        <div className={css.profileContainer}>
            <img className='animate-left' src={img} alt={name}/>

            <div>
                <strong className='animate-appear'>{name}</strong>

                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                    Level {level}
                </p>
            </div>
        </div>
        
        <div className={`${css.completedChallenges} animate-appear`}>
            <span className='animate-down'>Desafios completos</span>
            <span className='animate-down'>{challengesCompleted}</span>
        </div>
        </div>
    )
}