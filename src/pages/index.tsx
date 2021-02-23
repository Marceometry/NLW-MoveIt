import { CompletedChalenges } from '../components/CompletedChalenges';
import { Countdown } from '../components/Countdown';
import { Profile } from '../components/Profile';
import { XpBar } from "../components/XpBar";
import Head from 'next/head'
import home from '../css/components/home.module.css'

export default function Home() {
  return (
    <div className={home.container}>
      <Head>
        <title>Move.It | Início</title>
      </Head>
      
      <XpBar />

      <section>
        <div>
          <Profile />
          <CompletedChalenges />
          <Countdown />
        </div>

        <div>

        </div>
      </section>
    </div>
  )
}
