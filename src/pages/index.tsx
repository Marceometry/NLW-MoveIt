import React, { useContext } from 'react'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { ChallengesProvider } from '../contexts/ChalengesContext'
import { SideBarProvider } from '../contexts/SideBarContext'

import { SideBar } from '../components/SideBar'
import HomePage from '../components/HomePage'

interface HomeProps {
  level: number;
  currentXp: number;
  challengesCompleted: number;
  home: boolean;
  ranking: boolean;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentXp={props.currentXp}
      challengesCompleted={props.challengesCompleted}
    >
      <SideBarProvider
        home={props.home}
        ranking={props.ranking}
      >
        <SideBar />

        <HomePage />
        
      </SideBarProvider>
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