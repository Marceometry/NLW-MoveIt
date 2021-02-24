import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChalengesContext'
import css from '../css/components/challengeBox.module.css'

export function ChallengeBox() {
  const { currentChallenge, resetChallenge } = useContext(ChallengesContext)

  return (
    <div className={css.challengeBoxContainer}>
      { currentChallenge ? (
        <div className={css.challengeActive}>
          <header>Ganhe {currentChallenge.amount} xp!</header>

          <main>
            <img src={`icons/${currentChallenge.type}.svg`} alt="Exercite-se!"/>
            <strong>Novo desafio!</strong>
            <p>{currentChallenge.description}</p>
          </main>

          <footer>
            <button type="button"
                    className={css.challengeFailed}
                    onClick={resetChallenge}
            >
              Falhei :(
            </button>

            <button type="button"
                    className={css.challengeSucceeded}
            >
              Completei :)
            </button>
          </footer>
        </div>
      ) : (
        <div className={css.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio!</strong>

          <p>
            <img src="icons/level-up.svg" alt="Level-Up" />
            Avance de level ganhando xp ao completar desafios.
          </p>
        </div>
      )}
    </div>
  )
}
