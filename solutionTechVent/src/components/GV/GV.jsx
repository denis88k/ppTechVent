import SectionRegular from './SectionRegular/SectionRegular'
import SectionFan from './SectionFan/SectionFan'

const GV = () => {
   return (
      <div className='solution__show'>
      {/* расчёт в обычной секции */}
      <SectionRegular />
         <hr />
         {/* расчёт в секции вентилятора*/}
         <SectionFan />
      </div>
      // <div className='solution' >
         
      // </div >
   )
}

export default GV