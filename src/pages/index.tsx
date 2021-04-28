import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useSession } from 'next-auth/client'

import { api } from '../services/api'
import { ChallengesProvider } from '../contexts/ChalengesContext'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { Profile } from '../components/Profile'
import { SideBar } from '../components/SideBar'
import { XpBar } from '../components/XpBar'

import homePage from '../css/homePage.module.css'
import Link from 'next/link'

interface HomeProps {
  level: number;
  currentXp: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const [ session, loading ] = useSession()
  const [ content, setContent ] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.get('/api/secret')

      if(data.content) {
        setContent(data.content)
      }
    }
    fetchData()
  }, [session])
  
  if (typeof window !== "undefined" && loading) return <h2>Carregando...</h2>;

  return (
    <>
    {!session && (
      <div>
        <h1>Você precisa estar logado para acessar esta página</h1>
  
        <Link href="/login"><h3>Ir para a página de Login</h3></Link>
      </div>
    )}

    {session && (
      <ChallengesProvider
        level={props.level}
        currentXp={props.currentXp}
        challengesCompleted={props.challengesCompleted}
      >
        <Head>
          <title>Move.It | Início</title>
        </Head>
  
        <SideBar />
          
        <div className={homePage.container}>        
          <XpBar />
  
          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
  
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  const { level, currentXp, challengesCompleted } = ctx.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentXp: Number(currentXp),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}