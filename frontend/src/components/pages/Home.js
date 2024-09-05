import { Link } from 'react-router-dom'
import styles from './Home.module.css'

function Home(){
    return (
       <section className={styles.home_container}>
        <div className={styles.container}>
            <h1>Time Magement</h1>
            <p>Transforme seu dia com o poder da organização! Nossa aplicação de gestão de tarefas é a sua aliada para priorizar o que importa, simplificar o que é urgente e conquistar seus objetivos. Torne cada minuto produtivo e veja sua rotina se transformar!</p>
            <div className={styles.home_button}>
                <button type="submit"> <Link to="/projetos"> Comece Já</Link> </button>
            </div>        
          </div>
       </section>
    )
}

export default Home