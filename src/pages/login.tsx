import React from 'react'
import Head from 'next/head'
import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import css from '../css/login.module.css'

export default function Login() {
    const [ session, loading ] = useSession()
    const router = useRouter()

    if (session) {
        router.push('/')
    }

    return (
        <>
        {!session && (
            <div className={css.container}>
                <Head>
                    <title>Move.It | Login</title>
                </Head>
    
                <div className={css.bg}>
                    <img src="bg.svg" alt=""/>
                </div>
    
                <div className={css.loginContainer}>
                    <header>
                        <img src="logo-white.svg" alt="Move.it"/>
                    </header>
    
                    <div id={css.login}>
                        <main>
                            <h1> Bem-vindo </h1>
    
                            <div className={css.github}>
                                <img src="github.svg" alt="GitHub"/>
    
                                <span> Faça login com seu Github para começar </span>
                            </div>
    
                            <button onClick={() => signIn('github')} type="button">
                                Fazer Login com Github
                                {/* <img src="icons/arrow-right.svg" alt="->"/> */}
                            </button>
                        </main>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}