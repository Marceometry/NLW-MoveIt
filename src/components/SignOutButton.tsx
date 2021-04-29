import { signOut } from 'next-auth/client'
import css from '../css/components/signOutButton.module.css'

export function SignOutButton() {
    return (
        <button
            className={css.signOutButton}
            onClick={() => signOut()}
        > Desconectar
        </button>
    )
}