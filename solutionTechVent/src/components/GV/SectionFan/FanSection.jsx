import { useEffect, useState } from 'react'
import fan from './assets/img/section_fan.png'

const FanSection = () => {
    const optionsWheelFan = [22, 25, 28, 30, 31, 35, 40, 45, 50, 56, 63, 71, 80, 90, 100, 110]

    const [consumption, setConsumption] = useState(1000)
    const [wheelFan, setWheelFan] = useState(22)
    const [widthSection, setWidthSection] = useState(500)
    const [lengthSectionFan, setLengthSectionFan] = useState(700)
    const [maxSpeed, setMaxSpeed] = useState(4)
    const [maxLengthGV, setMaxLengthGV] = useState(250)
    const [minLengthGV, setMinLengthGV] = useState(250)
    // const [focus, setFocus] = useState('speed')

    const functionSolution = () => {
        if (consumption && widthSection && lengthSectionFan && maxSpeed) {
            let lengthMax, lengthMin, speedInSection
            let newWidthSection = widthSection

            const calcLengthSpeed = () => {
                // max длина гибкой вставки:
                lengthMax = lengthSectionFan - ((wheelFan * 10 / 2) + 100)
                // TODo уточнить может ли длина гибкой вставки быть отрицательной при данном расчёте
                // скорость при данной длине гибкой вставки
                speedInSection = (consumption / (3600 * (lengthMax / 1000) * (newWidthSection / 1000))).toFixed(2)
            }

            calcLengthSpeed()

            if (speedInSection > maxSpeed) {
                let i = 0
                while (speedInSection > maxSpeed) {
                    console.log('ход:', i, 'ширина', newWidthSection)
                    i++
                    newWidthSection = newWidthSection + 10
                    calcLengthSpeed()
                }
                console.log(newWidthSection, 'итоговый')
                lengthMin = (consumption / (3600 * (maxSpeed / 1000) * (newWidthSection / 1000))).toFixed(0)
                newWidthSection = Math.ceil((newWidthSection) / 10) * 10
                // отнимаю -10, потому что в цикле выше делал +10

            }
            if (+newWidthSection <= 250) {
                setMinLengthGV(250)
            } else {
                setMinLengthGV(lengthMin)
            }
            setMaxLengthGV(lengthMax)
        }
    }

    useEffect(() => {
        functionSolution()
    }, [consumption, widthSection, maxSpeed, lengthSectionFan])

    return (
        <section className='section section__fan'>
            <form className='form'>
                <h3 className='form__title'>Расчёт в секции вентилятора</h3>
                <div className='form__item'>
                    <label className='form__label'>Расход (м³):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={consumption}
                        onChange={(e) => setConsumption(e.target.value)}
                    />
                </div>
                <div className='form__item'>
                    {/* как точно он называется: размер колеса, диаметр колеса или как там???? */}
                    <label className='form__label'>?Размер?колеса(м?м):</label>
                    <select
                        className='form__input'
                        value={wheelFan}
                        onChange={(e) => setWheelFan(e.target.value)}
                    >
                        {optionsWheelFan.map(wheel => (
                            <option key={'id-' + wheel} value={wheel * 10}>{wheel}</option>
                        ))}
                    </select>
                </div>
                <div className='form__item'>
                    <label className='form__label'>Ширина сечения (мм):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={widthSection}
                        onChange={(e) => setWidthSection(e.target.value)}
                    />
                </div>
                <div className="form__item">
                    <label className='form__label'>Длина секции вентилятора (мм):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={lengthSectionFan}
                        onChange={(e) => setLengthSectionFan(e.target.value)}
                    />
                </div>
                <div className='form__item'>
                    <label className='form__label'>Max скорость в Гибкой вставке (м/с):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={maxSpeed}
                        onChange={(e) => {
                            // focus !== 'speed' && setFocus('speed')
                            setMaxSpeed(e.target.value)
                        }}
                    />
                </div>
                <div className='form__item'>
                    <label className='form__label'>Max длина<b>Гибкой вставки</b>(мм):</label>
                    <div className='form__input'>{maxLengthGV}</div>
                    {/* <input
                        className='form__input'
                        type="number"
                        value={maxLengthGV}
                        onChange={(e) => {
                            focus !== 'maxLength' && setFocus('maxLength')
                            setMaxLengthGV(e.target.value)
                        }}
                    /> */}
                </div>
                <div className='form__item'>
                    <label className='form__label'>Min длина<b>Гибкой вставки</b>(мм):</label>
                    <div className='form__input'>{minLengthGV}</div>
                    {/* <input
                        className='form__input'
                        type="number"
                        value={minLengthGV}
                        onChange={(e) => {
                            focus !== 'minLength' && setFocus('minLength')
                            setMinLengthGV(e.target.value)
                        }}
                    /> */}
                </div>

            </form>

            <div className='img'>
                <img src={fan} alt="секция вентилятора" />
            </div>
        </section>
    )
}
export default FanSection