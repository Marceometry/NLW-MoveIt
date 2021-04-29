import { createContext, ReactNode, useEffect, useState } from 'react'
import { useSession } from 'next-auth/client'
import { mutate } from 'swr'

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

    const [level, setLevel] = useState(1)
    const [currentXp, setCurrentXp] = useState(0)
    const [totalXp, setTotalXp] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)

    useEffect(() => {
        async function Data() {
            const { data } = await api.get(`/api/user/find/${session.user.email}`)
            
            if (data.error) {return}
            else if (data.challengesCompleted === 0) {return}

            setLevel(data.level)
            setCurrentXp(data.currentXp)
            setTotalXp(data.totalXp)
            setChallengesCompleted(data.challengesCompleted)
        }
        Data()
    }, [])

    const [currentChallenge, setCurrentChallenge] = useState(null)
    const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false)

    const xpToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        if (challengesCompleted === 0) {return}
        api.post(`/api/user/update/${session.user.email}?level=${String(level)}&currentXp=${String(currentXp)}&totalXp=${String(totalXp)}&challengesCompleted=${String(challengesCompleted)}`)
        mutate(`/api/user/update/${session.user.email}`)
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