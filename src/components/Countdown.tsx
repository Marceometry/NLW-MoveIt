import { useState, useEffect } from 'react'
import css from '../css/components/countdown.module.css'

export function Countdown() {
    const [time, setTime] = useState(25 * 60)
    const [active, setActive] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

    function startCountdown() {
        if (active) {
            setActive(false)
            document.querySelectorAll('button')[0].innerHTML = 'Iniciar ciclo'
        } else {
            setTime(25 * 60)
            setActive(true)
            document.querySelectorAll('button')[0].innerHTML = 'Cancelar ciclo'
        }
        
    }

    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time -1)
            }, 1000)
        } else if (active && time === 0) {
            document.querySelectorAll('button')[0].innerHTML = 'Ciclo completado'
            setActive(false)
        }
    }, [active, time])
    
    return (
        <div>
            <div className={css.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <button type="button" className={css.countdownButton} onClick={startCountdown}>
                Iniciar ciclo
            </button>
        </div>
    )
}