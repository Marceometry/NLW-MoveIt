import React, { useContext } from "react";
import css from "../css/components/sideBar.module.css";
import { SideBarContext } from "../contexts/SideBarContext";

export function SideBar() {
  const { home, openHome, ranking, openRanking } = useContext(SideBarContext)

  return (
    <aside id={css.aside}>
      <img src="logo.svg" alt="Logo" />

      <nav>
        <div>
          <div className={`${css.page} ${home ? css.active : ''}`}></div>

          <a>
            { home ? (
              <img src="icons/home-active.svg" alt="Home" />
            ) : (
              <img onClick={openHome} src="icons/home.svg" alt="Home" />
            )}
          </a>
        </div>

        <div>
          <div className={`${css.page} ${ranking ? css.active : ''}`}></div>
          
          <a>
            { ranking ? (
              <img src="icons/ranking-active.svg" alt="Ranking" />
            ) : (
              <img onClick={openRanking} src="icons/ranking.svg" alt="Ranking" />
            )}
          </a>
        </div>
      </nav>
    </aside>
  );
}