import css from '../css/components/sideBar.module.css'

export function SideBar() {
    return (
        <aside id={css.aside}>
            <img src="logo.svg" alt=""/>

            <nav>
                <div>
                    <div className={`${css.page} ${css.active}`}></div>
                    <img className={css.active} src="icons/home.svg" alt="Home"/>
                </div>

                <div>
                    <div className={`${css.page}`}></div>
                    <img src="icons/ranking.svg" alt="Ranking"/>
                </div>
            </nav>
        </aside>
    )
}