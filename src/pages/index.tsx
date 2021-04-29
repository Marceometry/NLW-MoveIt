import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import { useSession, signOut, getSession } from 'next-auth/client'

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

interface HomeProps {
  level: number;
  currentXp: number;
  totalXp: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  const [ session, loading ] = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session) {
      router.push('/login')
    }
  }, [session])
  

  return (
    <>
    {loading && (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    )}

    {session && (
      <ChallengesProvider
        level={props.level}
        currentXp={props.currentXp}
        totalXp={props.totalXp}
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
            <button onClick={() => signOut()}>Sign out</button>
          </CountdownProvider>
        </div>
      </ChallengesProvider>
    )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx
  const session = await getSession({ req })

  if (session) {
    const { data } = await api.get(`/api/user/search/${session.user.email}`)
  
    if (data.error) {
      await api.post(`/api/user/add/${session.user.email}`)
      const { data } = await api.get(`/api/user/search/${session.user.email}`)

      const { level, currentXp, totalXp, challengesCompleted } = data
      
      return {
        props: {
          level: level,
          currentXp: currentXp,
          totalXp: totalXp,
          challengesCompleted: challengesCompleted
        }
      }
    }

    const { level, currentXp, totalXp, challengesCompleted } = data
    
    return {
      props: {
        level: level,
        currentXp: currentXp,
        totalXp: totalXp,
        challengesCompleted: challengesCompleted
      }
    }
  } else {
    return {
      redirect: {
        permanent: true,
        destination: "/login",
      },
      props:{},
    };
  }
}