import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChalengesContext';
import css from '../css/components/profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext)

    return (
        <div className={css.profileContainer}>
            <img src="https://github.com/marceometry.png" alt="Marcelino Teixeira"/>

            <div>
                <strong>Marcelino Teixeira</strong>

                <p> <img src="icons/level.svg" alt="Level"/> 
                    Level {level}
                </p>
            </div>
        </div>
    )
}