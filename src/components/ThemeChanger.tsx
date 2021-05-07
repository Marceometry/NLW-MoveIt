import { useSession } from "next-auth/client"
import { useEffect, useState } from "react"
import { api } from "../services/api"
import css from '../css/components/themeChanger.module.css'

export function ThemeChanger() {
    const [ session ] = useSession()
    const [ theme, setTheme ] = useState('light')

    useEffect(() => {
        async function getTheme() {
            const { data } = await api.get(`/api/user/find/${session?.user.name}`)
            if (data.theme === undefined) {
                data.theme = null
            }
            
            const root = document.documentElement.style
            if (data.theme === 'dark' && root.getPropertyValue('--white') !== '#fff') {
                changeTheme()
            }
        } getTheme()
    }, [])

    function changeTheme() {
        if (theme === 'light') {
            api.post(`/api/user/update/theme/${session?.user.name}?theme=dark`)
            setTheme('dark')
            
            const root = document.documentElement.style
            root.setProperty('--white', '#101010')
            root.setProperty('--background', '#202020')
            root.setProperty('--gray-line', '#818181')
            root.setProperty('--text', '#999999')
            root.setProperty('--title', '#aaaaaa')
        } else if (theme === 'dark') {
            api.post(`/api/user/update/theme/${session?.user.name}?theme=light`)
            setTheme('light')
            
            const root = document.documentElement.style
            root.setProperty('--white', '#fff')
            root.setProperty('--background', '#f2f3f5')
            root.setProperty('--gray-line', '#dcdde0')
            root.setProperty('--text', '#666666')
            root.setProperty('--title', '#2e384d')
        }
    }

    return (
        <button className={css.themeChanger} onClick={changeTheme}>
            <span>{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
        </button>
    )
}