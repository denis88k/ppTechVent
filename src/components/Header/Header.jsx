import logo from '../../assets/img/logo.png'
import styles from './Header.module.scss'

const Header = () => {
   return (
      <header className={styles.header}>
         <div className='container'>
            <div className={styles.header__inner}>
               <div className={styles.logo}>
                  <img className={styles.logo__img} src={logo} alt="Airway logo" />
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header