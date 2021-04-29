import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number; 
    currentXp: number; 
    totalXp: number; 
    xpToNextLevel: number;
    challengesCompleted: number; 
    currentChallenge: Challenge;
    levelUp: () => void; 
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentXp: number;
    totalXp: number;
    challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentXp, setCurrentXp] = useState(rest.currentXp ?? 0)
    const [totalXp, setTotalXp] = useState(rest.totalXp ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

    const [currentChallenge, setCurrentChallenge] = useState(null)
    const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false)

    const xpToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentXp', String(currentXp))
        Cookies.set('totalXp', String(totalXp))
        Cookies.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentXp, challengesCompleted])

    function levelUp() {
        setLevel(level + 1)
        setLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setLevelUpModalOpen(false)
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
        setTotalXp(totalXp + amount)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                currentXp, 
                totalXp, 
                xpToNextLevel,
                challengesCompleted, 
                currentChallenge,
                levelUp, 
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}

            { isLevelUpModalOpen && <LevelUpModal /> }
            
        </ChallengesContext.Provider>
    )
}