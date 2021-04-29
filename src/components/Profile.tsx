import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChalengesContext';
import css from '../css/components/profile.module.css';

export function Profile({ name, img }) {
    const { level } = useContext(ChallengesContext)

    return (
        <div className={css.profileContainer}>
            <img className='animate-left' src={img} alt={name}/>

            <div>
                <strong className='animate-appear'>{name}</strong>

                <p className='animate-up'> <img src="icons/level.svg" alt="Level"/> 
                    Level {level}
                </p>
            </div>
        </div>
    )
}