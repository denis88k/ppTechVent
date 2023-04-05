import SectionRegular from './SectionRegular/SectionRegular'
import SectionFan from './SectionFan/SectionFan'

const GV = () => {
   return (
      <div className='solution__GV'>
         {/* расчёт в обычной секции */}
         <SectionRegular />
         <hr />
         {/* расчёт в секции вентилятора*/}
         <SectionFan />
      </div>
   )
}

export default GV