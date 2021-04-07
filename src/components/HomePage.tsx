import { useContext } from 'react'
import { SideBarContext } from '../contexts/SideBarContext'

import ChallengePage from '../components/ChallengePage'
import Leaderboard from '../components/Leaderboard'

export default function HomePage() {
    const { home } = useContext(SideBarContext)

    return (
        <div>        
          { home ? ( <ChallengePage /> ) : ( <Leaderboard /> ) }
        </div>
    )
}