import css from '../css/components/xpBar.module.css'

export function XpBar() {
    return (
        <header className={css.xpBar}>
            <span> 0 xp </span>
            <div>
                <div style={{ width: '50%' }}/>

                <span className={css.currentXp} style={{ left: '50%' }}> 300 xp </span>
            </div>
            <span> 600 xp </span>
        </header>
    )
}