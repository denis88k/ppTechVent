import { useEffect, useState } from 'react'
import fan from '../../../assets/img/section_fan.png'

const SectionFan = ({ styles }) => {
    const optionsWheelFan = [22, 25, 28, 30, 31, 35, 40, 45, 50, 56, 63, 71, 80, 90, 100, 110]
    const stepFindLengthFan = 5
    const multipleNumber = 50

    const [consumption, setConsumption] = useState(1000)
    const [wheelFan, setWheelFan] = useState(220)
    const [widthSection, setWidthSection] = useState(500)
    const [lengthSectionFan, setLengthSectionFan] = useState(700)
    const [maxSpeed, setMaxSpeed] = useState(4)
    const [maxLengthGV, setMaxLengthGV] = useState()
    const [minLengthGV, setMinLengthGV] = useState()
    const [changeLengthFan, setChangeLengthFan] = useState(false)
    const [focusLengthFan, setFocusLengthFan] = useState(false)

    const functionSolution = () => {
        if (consumption && wheelFan && widthSection && lengthSectionFan && maxSpeed) {
            // min длина гибкой вставки
            let lengthMin = (consumption / (3600 * (maxSpeed / 1000) * (widthSection / 1000)))

            let lengthMax, speedInLengthMax
            let newLengthSectionFan = lengthSectionFan

            const calcLengthSpeed = () => {
                // max длина гибкой вставки:
                // console.log(newLengthSectionFan, wheelFan, 'wheelFan')
                lengthMax = newLengthSectionFan - ((wheelFan / 2) + 100)

                // скорость при данной длине гибкой вставки
                speedInLengthMax = consumption / (3600 * (lengthMax / 1000) * (widthSection / 1000))
            }

            calcLengthSpeed()

            if (lengthMax <= 0 || speedInLengthMax >= maxSpeed || speedInLengthMax < 0) {
                //console.log(
                //     consumption, 'consumption;',
                //     wheelFan, 'wheelFan;',
                //     widthSection, 'widthSection;',
                //     lengthSectionFan, 'lengthSectionFan;',
                //     lengthMin, 'lengthMin;',
                //     newLengthSectionFan, 'newLengthSectionFan = lengthSectionFan;',
                //     lengthMax, 'lengthMax;',
                //     speedInLengthMax, 'speedInLengthMax;',
                // )
                let i = 0
                while (lengthMax <= 0 || speedInLengthMax >= maxSpeed || speedInLengthMax < 0) {
                    i++
                    newLengthSectionFan = newLengthSectionFan + stepFindLengthFan
                    calcLengthSpeed()
                }
                //console.log(newLengthSectionFan)
                newLengthSectionFan = Math.ceil((newLengthSectionFan - stepFindLengthFan) / multipleNumber) * multipleNumber
                // отнимаю 'stepFindLengthFan', потому что в цикле выше делал 'stepFindLengthFan'
                setLengthSectionFan(newLengthSectionFan)
                setChangeLengthFan(true)
            };
            //console.log(lengthMin, 'lengthMin', lengthMax, 'lengthMax', speedInLengthMax, 'speedInLengthMax', newLengthSectionFan, 'newLengthSectionFan')

            lengthMin = Math.ceil(lengthMin / multipleNumber) * multipleNumber
            lengthMax = Math.ceil(lengthMax / multipleNumber) * multipleNumber;

            (+lengthMin <= 250)
                ? setMinLengthGV(250)
                : setMinLengthGV(lengthMin);
            (+lengthMax <= 250)
                ? setMaxLengthGV(250)
                : setMaxLengthGV(lengthMax)
        }
    }

    useEffect(() => {
        // console.log('focus useEffect', focusLengthFan)
        !focusLengthFan && functionSolution()
    }, [consumption, wheelFan, widthSection, maxSpeed, lengthSectionFan])

    useEffect(() => {
        setChangeLengthFan(false)
    }, [consumption, wheelFan, widthSection, maxSpeed])

    return (
        <section className={styles.section}>
            <form className='form'>
                <h3 className='form__title'>Расчёт в секции вентилятора</h3>
                <div className='form__item'>
                    <label className='form__label'>Расход (м³):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={consumption}
                        onChange={(e) => setConsumption(Number(e.target.value))}
                    />
                </div>
                <div className='form__item'>
                    {/* как точно он называется: размер колеса, диаметр колеса или как там???? */}
                    <label className='form__label'>Размер колеса (мм):</label>
                    <select
                        className='form__input'
                        value={wheelFan}
                        onChange={(e) => setWheelFan(Number(e.target.value))}
                    >
                        {optionsWheelFan.map(wheel => (
                            <option key={'id-' + wheel} value={wheel * 10}>{wheel}</option>
                        ))}
                    </select>
                </div>
                <div className='form__item'>
                    <label className='form__label'>Ширина Гибкой вставки (мм):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={widthSection}
                        onChange={(e) => setWidthSection(Number(e.target.value))}
                    />
                </div>
                <div className="form__item ">
                    <label className='form__label'>Длина секции вентилятора (мм):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={lengthSectionFan}
                        onChange={(e) => {
                            setLengthSectionFan(Number(e.target.value))
                            setChangeLengthFan(false)
                        }}
                        onFocus={() => {
                            setFocusLengthFan(true)
                        }}
                        onBlur={() => {
                            setFocusLengthFan(false)
                            functionSolution()
                        }}
                    />
                    {changeLengthFan && <div className={styles.change_lengthFan} />}
                    {/* <div className='change_lengthFan' /> */}
                </div>
                <div className='form__item'>
                    <label className='form__label'>Max скорость в Гибкой вставке (м/с):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={maxSpeed}
                        onChange={(e) => setMaxSpeed(Number(e.target.value))}
                    />
                </div>
                <div className='form__item'>
                    <label className='form__label'>Max длина&thinsp;<b>Гибкой вставки</b>&thinsp;(мм):</label>
                    <div className='form__input'>{maxLengthGV}</div>
                </div>
                <div className='form__item'>
                    <label className='form__label'>Min длина&thinsp;<b>Гибкой вставки</b>&thinsp;(мм):</label>
                    <div className='form__input'>{minLengthGV}</div>
                </div>

            </form>

            <div className={styles.img}>
                <img src={fan} alt="секция вентилятора" />
            </div>
        </section>
    )
}
export default SectionFan