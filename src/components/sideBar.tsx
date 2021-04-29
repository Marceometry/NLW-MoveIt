import React, { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import css from "../css/components/sideBar.module.css";

export function SideBar() {
  const [home, setHome] = useState(true)
  const [leaderboard, setLeaderboard] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (router.pathname === "/") {
      setHome(true)
      setLeaderboard(false)
    } else if (router.pathname === "/leaderboard") {
      setHome(false)
      setLeaderboard(true)
    }
  }, [router.pathname])
  
  return (
    <aside id={css.aside}>
      <img src="logo.svg" alt="Logo" />

      <nav>
        <div>
          <div className={`${css.page} ${home ? css.active : ''}`}></div>

          <Link href="/">
            <a>
              { home ? (
                <img src="icons/home-active.svg" alt="Home" />
              ) : (
                <img src="icons/home.svg" alt="Home" />
              )}
            </a>
          </Link>
        </div>

        <div>
          <div className={`${css.page} ${leaderboard ? css.active : ''}`}></div>
          
          <Link href="/leaderboard">
            <a>
              { leaderboard ? (
                <img src="icons/ranking-active.svg" alt="Ranking" />
              ) : (
                <img src="icons/ranking.svg" alt="Ranking" />
              )}
            </a>
          </Link>
        </div>
      </nav>
    </aside>
  )
}