import React from 'react'
import styles from './Tabs.module.scss'

const Tabs = ({ tabs, setTabs }) => {
   return (
      <div className={styles.tabs}>
         <div className="container">
            <div className={styles.tabs__inner}>
               <div
                  className={`${styles.tab} ${tabs === 'GV' ? styles.tab__active : ''}`}
                  onClick={() => setTabs('GV')}
               >
                  Расчёт гибкой вставки
               </div>
               <div
                  className={`${styles.tab} ${tabs === 'Mixer' ? styles.tab__active : ''}`}
                  onClick={() => setTabs('Mixer')}
               >
                  Расчёт смесителя
               </div>
            </div>
         </div>
      </div>
   )
}

export default Tabs