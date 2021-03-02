import { useState } from "react";
import css from "../css/components/sideBar.module.css";

export function SideBar() {
  const [home, setHome] = useState(true);
  const [ranking, setRanking] = useState(false);

  function openHome() {
    setHome(true)
    setRanking(false)
  }

  function openRanking() {
    setHome(false)
    setRanking(true)
  }

  return (
    <aside id={css.aside}>
      <img src="logo.svg" alt="Logo" />

      <nav>
        <div>
          <div className={`${css.page} ${home ? css.active : ''}`}></div>

          { home ? (
            <img src="icons/home-active.svg" alt="Home" />
          ) : (
            <img onClick={openHome} src="icons/home.svg" alt="Home" />
          )}
        </div>

        <div>
          <div className={`${css.page} ${ranking ? css.active : ''}`}></div>

          { ranking ? (
            <img src="icons/ranking-active.svg" alt="Ranking" />
          ) : (
            <img onClick={openRanking} src="icons/ranking.svg" alt="Ranking" />
          )}
        </div>
      </nav>
    </aside>
  );
}