import { signOut } from 'next-auth/client'
import css from '../css/components/signOutButton.module.css'

export default function SignOutButton() {
    return (
        <button
            className={css.signOutButton}
            onClick={() => signOut()}
        > Desconectar
        </button>
    )
}