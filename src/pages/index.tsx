import React from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

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
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
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