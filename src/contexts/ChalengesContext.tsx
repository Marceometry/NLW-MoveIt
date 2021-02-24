import { createContext, ReactNode, useState } from 'react'
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

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() *challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setCurrentChallenge(challenge)
    }

    function resetChallenge() {
        setCurrentChallenge(null)
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
                resetChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}