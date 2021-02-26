import React from 'react'
import Head from 'next/head'

import { CountdownProvider } from '../contexts/CountdownContext'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { Profile } from '../components/Profile'
import { XpBar } from "../components/XpBar"
import { ChallengeBox } from '../components/ChallengeBox'

import home from '../css/components/home.module.css'

export default function Home() {
  return (
    <div className={home.container}>
      <Head>
        <title>Move.It | Início</title>
      </Head>
      
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
  )
}
