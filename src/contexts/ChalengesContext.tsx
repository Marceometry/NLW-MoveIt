import { createContext, ReactNode, useEffect, useState } from 'react'
import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number; 
    currentXp: number; 
    xpToNextLevel: number;
    challengesCompleted: number; 
    currentChallenge: Challenge;
    levelUp: () => void; 
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentXp, setCurrentXp] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    const [currentChallenge, setCurrentChallenge] = useState(null)

    const xpToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() *challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setCurrentChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }

    function resetChallenge() {
        setCurrentChallenge(null)
    }

    function completeChallenge() {
        if (!currentChallenge) {
            return
        }

        const { amount } = currentChallenge

        let finalXp = currentXp + amount

        if (finalXp >= xpToNextLevel) {
            finalXp -= xpToNextLevel
            levelUp()
        }

        resetChallenge()
        setCurrentXp(finalXp)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentXp, 
                xpToNextLevel,
                challengesCompleted, 
                currentChallenge,
                levelUp, 
                startNewChallenge,
                resetChallenge,
                completeChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}