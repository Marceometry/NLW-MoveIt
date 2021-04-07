import Head from 'next/head'

import { CountdownProvider } from '../contexts/CountdownContext'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { Countdown } from '../components/Countdown'
import { Profile } from '../components/Profile'
import { XpBar } from "../components/XpBar"
import { ChallengeBox } from '../components/ChallengeBox'

import css from '../css/components/challengePage.module.css'

export default function ChallengePage() {
    return (
        <div className={css.container}>
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