import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChalengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    progress: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext)
  
    const [totalTime, setTotalTime] = useState(25 * 60)
    const [time, setTime] = useState(totalTime)
    const [progress, setProgress] = useState(0)
    const [isActive, setActive] = useState(false)
    const [hasFinished, setFinished] = useState(false)
  
    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountdown() {
      setActive(true)
    }
  
    function resetCountdown() {
      clearTimeout(countdownTimeout)
      setActive(false)
      setFinished(false)
      setProgress(0)
      setTime(totalTime)
    }
  
    useEffect(() => {
      if (isActive && time > 0) {
        countdownTimeout = setTimeout(() => {
          setProgress(progress + (100/totalTime))
          setTime(time - 1)
        }, 1000)
      } else if (isActive && time === 0) {
        setFinished(true)
        setActive(false)
        setProgress(0)
        startNewChallenge()
      }
    }, [isActive, time])
  
    return (
        <CountdownContext.Provider
            value={{
                minutes,
                seconds,
                progress,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown
            }}
        >
            {children}
        </CountdownContext.Provider>
    )
}