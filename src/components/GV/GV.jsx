import SectionRegular from './SectionRegular/SectionRegular'
import SectionFan from './SectionFan/SectionFan'
import styles from './GV.module.scss'

const GV = () => {
   return (
      <div className='solution__show'>
         {/* расчёт в обычной секции */}
         <SectionRegular styles={styles} />
         <hr />
         {/* расчёт в секции вентилятора*/}
         <SectionFan styles={styles} />
      </div>
   )
}

export default GV