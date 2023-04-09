import React from 'react'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className='container'>
        <div className={styles.footer__inner}>
          ТехОтдел 2023 год. V2.0 React
        </div>
      </div>
    </footer>
  )
}

export default Footer