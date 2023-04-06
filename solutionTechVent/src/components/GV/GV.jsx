import SectionRegular from './SectionRegular/SectionRegular'
import SectionFan from './SectionFan/SectionFan'

const GV = ({ show }) => {
   return (
      // <div className='solution show'>
      <div className={`solution ${show}`} >
         {/* расчёт в обычной секции */}
         <SectionRegular />
         <hr />
         {/* расчёт в секции вентилятора*/}
         <SectionFan />
      </div >
   )
}

export default GV