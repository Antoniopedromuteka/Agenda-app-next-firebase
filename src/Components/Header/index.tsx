

import styles from './styles.module.scss'



export function Header(){
    return(

        <header className={styles.container}>
            

            <div className={styles.content}>
                <h1 className={styles.title}>
                    Agenda App
                </h1>
            </div>

        </header>

    );
}