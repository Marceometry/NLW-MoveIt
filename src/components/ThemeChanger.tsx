import { useSession } from "next-auth/client"
import { useEffect, useState } from "react"
import { api } from "../services/api"
import css from '../css/components/themeChanger.module.css'

export function ThemeChanger() {
    const [ currentTheme, setCurrentTheme ] = useState('light')
    const [ session ] = useSession()

    useEffect(() => {
        async function getTheme() {
            if (session) {
                const { data } = await api.get(`/api/user/find/${session.user.name}`)
                {data.theme === 'dark' && setDarkTheme()}
                console.log(data)
            }
        } getTheme()
    }, [])

    function setTheme(theme: string) {
        if (theme === 'light') {
            {session && api.post(`/api/user/update/theme/${session.user.name}?theme=light`)}
            setLightTheme()
        } else if (theme === 'dark') {
            {session && api.post(`/api/user/update/theme/${session.user.name}?theme=dark`)}
            setDarkTheme()
        }
    }

    function changeTheme() {
        if (currentTheme === 'light') {
            setTheme('dark')
        } else if (currentTheme === 'dark') {
            setTheme('light')
        }
    }

    function setDarkTheme() {
        const root = document.documentElement.style
        setCurrentTheme('dark')
        root.setProperty('--white', '#101010')
        root.setProperty('--background', '#202020')
        root.setProperty('--gray-line', '#818181')
        root.setProperty('--text', '#999999')
        root.setProperty('--title', '#aaaaaa')
    }

    function setLightTheme() {
        const root = document.documentElement.style
        setCurrentTheme('light')
        root.setProperty('--white', '#101010')
        root.setProperty('--background', '#202020')
        root.setProperty('--gray-line', '#818181')
        root.setProperty('--text', '#999999')
        root.setProperty('--title', '#aaaaaa')
    }

    return (
        <button className={css.themeChanger} onClick={changeTheme}>
            <span>{currentTheme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
        </button>
    )
}