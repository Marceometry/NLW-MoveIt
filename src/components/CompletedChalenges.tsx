import css from '../css/components/completedChalenges.module.css'

export function CompletedChalenges() {
    return (
        <div className={css.completedChalenges}>
            <span>Desafios completos</span>
            <span>5</span>
        </div>
    )
}