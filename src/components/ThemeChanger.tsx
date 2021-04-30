import { useSession } from "next-auth/client"
import { useEffect, useState } from "react"
import css from '../css/components/themeChanger.module.css'
import { api } from "../services/api"

export function ThemeChanger(props) {
    const [ session, loading ] = useSession()
    const [ theme, setTheme ] = useState('light')

    useEffect(() => {
        const root = document.documentElement.style
        if (root.getPropertyValue('--white') === '#101010') {
            setTheme('dark')
        } else {setTheme('light')}
    }, [])

    function changeTheme() {
        const root = document.documentElement.style

        if (theme === 'light') {
            setTheme('dark')
            root.setProperty('--white', '#101010')
            root.setProperty('--background', '#202020')
            root.setProperty('--gray-line', '#818181')
            root.setProperty('--text', '#999999')
            root.setProperty('--title', '#aaaaaa')
        } else {
            setTheme('light')
            root.setProperty('--white', '#fff')
            root.setProperty('--background', '#f2f3f5')
            root.setProperty('--gray-line', '#dcdde0')
            root.setProperty('--text', '#666666')
            root.setProperty('--title', '#2e384d')
        }
    }

    return (
        <button className={css.themeChanger} onClick={changeTheme}>
            <span>Alterar Tema</span>
        </button>
    )
}