import { signIn, signOut, useSession } from 'next-auth/client'
import css from '../css/components/signButton.module.css'

export function SignButton() {
    const [ session ] = useSession()

    return (
        <>
        {session ? (
            <button
                className={css.signButton}
                id={css.signOut}
                onClick={() => signOut()}
            > Desconectar
            </button>
        ) : (
            <button
                className={css.signButton}
                id={css.signIn}
                onClick={() => signIn('github')}
            > Conectar com Github
            </button>
        )}
        </>
    )
}