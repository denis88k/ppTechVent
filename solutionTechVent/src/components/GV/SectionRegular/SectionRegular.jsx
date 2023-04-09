import { useEffect, useState } from 'react'
import regular from '../../../assets/img/section_regular.png'

const SectionRegular = () => {

    const [consumption, setConsumption] = useState(1000)
    const [widthSection, setWidthSection] = useState(500)
    const [maxSpeed, setMaxSpeed] = useState(4)
    const [minLengthGV, setMinLengthGV] = useState(250)
    const [focus, setFocus] = useState('speed')

    // вычисление длины гибкой вставки
    const onMinLengthGV = () => {
        if (consumption && widthSection) {
            if (+maxSpeed === 0) {
                return setMinLengthGV(0)
            }
            if (maxSpeed) {
                let lengthMin = +(consumption / (3600 * (maxSpeed / 1000) * (widthSection / 1000))).toFixed(0)
                lengthMin = Math.ceil(lengthMin / 10) * 10;
                (lengthMin <= 250)
                    ? setMinLengthGV(250)
                    : setMinLengthGV(lengthMin)
            }
        }
    }
    // вычисление скорости при данной длине гибкой вставки
    const onMaxSpeed = () => {
        if (consumption && widthSection) {
            if (+minLengthGV === 0) {
                return setMaxSpeed(0)
            }
            if (minLengthGV) {
                const maxSpeed = (consumption / (3600 * (minLengthGV / 1000) * (widthSection / 1000))).toFixed(2)
                setMaxSpeed(maxSpeed)
            }
        }
    }

    useEffect(() => {
        switch (focus) {
            case 'speed':
                onMinLengthGV()
                break
            case 'minLength':
                onMaxSpeed()
                break
        }
    }, [consumption, widthSection, maxSpeed, minLengthGV])


    return (
        <section className='section'>

            <form className='form'>
                <h3 className='form__title'>Расчёт в обычной секции</h3>
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
                    <label className='form__label'>Ширина сечения (мм):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={widthSection}
                        onChange={(e) => setWidthSection(e.target.value)}
                    />
                </div>
                <div className='form__item'>
                    <label className='form__label'>Max скорость в Гибкой вставке (м/с):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={maxSpeed}
                        onChange={(e) => {
                            focus !== 'speed' && setFocus('speed')
                            setMaxSpeed(e.target.value)
                        }}
                    />
                </div>
                <div className='form__item'>
                    <label className='form__label'>Min длина&thinsp;<b>Гибкой вставки</b>&thinsp;(мм):</label>
                    <input
                        className='form__input'
                        type="number"
                        value={minLengthGV}
                        onChange={(e) => {
                            focus !== 'minLength' && setFocus('minLength')
                            setMinLengthGV(e.target.value)
                        }}
                    />
                </div>
            </form>

            <div className='img'>
                <img src={regular} alt="обычная секция" />
            </div>
        </section>

    )
}

export default SectionRegular