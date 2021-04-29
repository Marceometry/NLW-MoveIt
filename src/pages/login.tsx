import React from 'react'
import Head from 'next/head'
import { useSession, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

import css from '../css/components/login.module.css'

export default function Login() {
    const [ session, loading ] = useSession()
    const router = useRouter()

    if (session) {
        router.push('/')
    }

    return (
        <>
        {loading && (
          <div className="loading">
            <h2>Carregando...</h2>
          </div>
        )}

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
    
                            <form>
                                <input type="text" name="user" id="githubUser" placeholder="Digite seu username"/>
    
                                <a onClick={() => signIn('github')}>
                                    <button type="button">
                                        <img src="icons/arrow-right.svg" alt="->"/>
                                    </button>
                                </a>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}