import { createContext, ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'
import { api } from '../services/api'

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
    const [session, loading] = useSession()

    const [level, setLevel] = useState(rest.level)
    const [currentXp, setCurrentXp] = useState(rest.currentXp)
    const [totalXp, setTotalXp] = useState(rest.totalXp)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted)

    const [currentChallenge, setCurrentChallenge] = useState(null)
    const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false)

    const xpToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        if (challengesCompleted === 0) {return}

        try {
            api.post(`/api/user/update/${session.user.name}?level=${String(level)}&currentXp=${String(currentXp)}&totalXp=${String(totalXp)}&challengesCompleted=${String(challengesCompleted)}`)
        } catch (err) {
            alert( err.response.data.error )
        }
    }, [level, currentXp, totalXp, challengesCompleted])

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