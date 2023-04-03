import { useEffect, useState } from 'react'
import fan from './assets/img/section_fan.png'

const FanSection = () => {
    const optionsWheelFan = [22, 25, 28, 30, 31, 35, 40, 45, 50, 56, 63, 71, 80, 90, 100, 110]

    const [consumption, setConsumption] = useState(1000)
    const [wheelFan, setWheelFan] = useState(22)
    const [widthSection, setWidthSection] = useState(500)
    const [lengthSectionFan, setLengthWidthSectionFan] = useState(700)
    const [requiredSpeed, setRequiredSpeed] = useState(4)
    const [minWidthGV, setMinWidthGV] = useState(250)
    const [focus, setFocus] = useState('speed')

    function hv() {
        // max длина гибкой вставки:
        lengthMax = lengthSectionFan - ((wheelFan * 10 / 2) + 100)
        // скорость в секции двигателя
        speedSection = (consumption / (3600 * (lengthMax / 1000) * (widthSection / 1000))).toFixed(2)
    };

    hv()

    if (lengthMax <= 0 || speedSection >= requiredSpeed) {
        while (lengthMax <= 0 || speedSection >= requiredSpeed) {
            hv()
            setLengthWidthSectionFan(prev => prev + 2)
        }
        newLengthSectionFan = Math.ceil((lengthSectionFan - 1) / 10) * 10
        resultF.innerHTML = `Необходимо сделать "Длину секции вентилятора" <b>${newLengthSectionFan}</b> `
    } else {
        resultF.innerHTML = `
             Max длина <b>Гибкой вставки:</b>
             <br><span>М = ${lengthMax} мм</span>
             <br><b>Скорость</b> в сечении:
             <br><span> V = ${speedSection.replace(/\./, ',')} м<sup>2</sup>/с</span>`
    }

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
                <div class="form__item">
                    <label className='form__label'>Длина секции двигателя (мм):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={lengthSectionFan}
                        onChange={(e) => setLengthWidthSectionFan(e.target.value)}
                    />
                </div>
                <div className='form__item'>
                    <label className='form__label'>Max скорость в сечении (м/с):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={requiredSpeed}
                        onChange={(e) => {
                            focus !== 'speed' && setFocus('speed')
                            setRequiredSpeed(e.target.value)
                        }}
                    />
                </div>
                <div className='form__item'>
                    <label className='form__label'>Max длина<b>Гибкой вставки</b>(мм):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={minWidthGV}
                        onChange={(e) => {
                            focus !== 'minWidth' && setFocus('minWidth')
                            setMinWidthGV(e.target.value)
                        }}
                    />
                </div>
            </form>

            <div className='img'>
                <img src={fan} alt="секция вентилятора" />
            </div>
        </section>
    )
}
export default FanSection