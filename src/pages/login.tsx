import css from '../css/components/login.module.css'

export default function Login() {
    return (
        <div className={css.container}>
            <div className={css.bg}>
                <img src="bg.svg" alt=""/>
            </div>

            <div className={css.loginContainer}>
                <header>
                    <img src="logo-white.svg" alt="Move.it"/>
                </header>

                <div id={css.login}>
                    <main>
                        <h1> Bem-vindo </h1>

                        <div className={css.github}>
                            <img src="github.svg" alt="GitHub"/>

                            <span> Faça login com seu Github para começar </span>
                        </div>

                        <form>
                            <input type="text" name="user" id="githubUser" placeholder="Digite seu username"/>

                            <button>
                                <img src="icons/arrow-right.svg" alt="->"/>
                            </button>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    )
}