import { useContext } from "react";
import { ChallengesContext } from "../contexts/ChalengesContext";
import css from "../css/components/levelUpModal.module.css";

export function LevelUpModal() {
  const { level, closeLevelUpModal } = useContext(ChallengesContext)

  return (
    <div className={css.overlay}>
      <div className={`${css.container} animate-up`}>
        <header> {level} </header>

        <strong> Parabéns! </strong>

        <p> Você alcançou um novo level. </p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src="icons/close.svg" alt="Fechar"/>
        </button>
      </div>
    </div>
  );
}
