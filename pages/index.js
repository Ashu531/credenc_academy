import styles from '../styles/Home.module.css'
import Dashboard from './dashboard/Dashboard'


export default function Home() {
  return (
    <div className={styles.container}>
     <Dashboard />
    </div>
  )
}
