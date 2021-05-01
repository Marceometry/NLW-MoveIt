import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client'

import { api } from '../services/api'
import { ChallengesProvider } from '../contexts/ChalengesContext'
import { CountdownProvider } from '../contexts/CountdownContext'
import { ChallengeBox } from '../components/ChallengeBox'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { Profile } from '../components/Profile'
import { SideBar } from '../components/SideNavBar'
import { XpBar } from '../components/XpBar'
import { SignButton } from '../components/SignButton'

import homePage from '../css/homePage.module.css'
import { ThemeChanger } from '../components/ThemeChanger'

interface HomeProps {
  level: number
  currentXp: number
  totalXp: number
  challengesCompleted: number
  theme: string
}

export default function Home(props: HomeProps) {
  const [ session, loading ] = useSession()

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
        <SignButton />
        <ThemeChanger theme={props.theme} />
     
        <div className={homePage.container}>        
          <XpBar />
  
          <CountdownProvider>
            <section>
              <div>
                <Profile name={session.user.name} img={session.user.image} />
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
  const { req } = ctx
  const session = await getSession({ req })

  if (session) {
    const { data } = await api.get(`/api/user/find/${session.user.email}`)
  
    if (data.error) {
        await api.post(`/api/user/add/${session.user.email}?name=${session.user.name}&image=${session.user.image}`)
      
      
      const { data } = await api.get(`/api/user/find/${session.user.email}`)

      const { level, currentXp, totalXp, challengesCompleted, theme } = data
      
      return {
        props: {
          level: level,
          currentXp: currentXp,
          totalXp: totalXp,
          challengesCompleted: challengesCompleted,
          theme: theme
        }
      }
    }

    const { level, currentXp, totalXp, challengesCompleted, theme } = data
    
    return {
      props: {
        level: level,
        currentXp: currentXp,
        totalXp: totalXp,
        challengesCompleted: challengesCompleted,
        theme: theme
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