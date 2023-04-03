import { useEffect, useState } from 'react'
import regular from './assets/img/section_regular.png'

const RegularSection = ()=>{

    const [consumption, setConsumption] = useState(1000)
    const [widthSection, setWidthSection] = useState(500)
    const [requiredSpeed, setRequiredSpeed] = useState(4)
    const [minWidthGV, setMinWidthGV] = useState(250)
    const [focus, setFocus] = useState('speed')

    const onMinWidthGV = () => {
        if (+requiredSpeed === 0) {
            return setMinWidthGV(0)
        } else {
            const lengthMin = (consumption * 1000 / (3600 * requiredSpeed * (widthSection / 1000))).toFixed(0)
            if (consumption && widthSection && requiredSpeed) {
            (+lengthMin <= 250)
                ? setMinWidthGV(250)
                : setMinWidthGV(lengthMin)
            }
        }
    }
    
    const onRequiredSpeed = () => {
        if (+minWidthGV === 0) {
            return setRequiredSpeed(0)
        } else {
            const requiredSpeed = (consumption * 1000 / (3600 * minWidthGV * (widthSection / 1000))).toFixed(2)
            consumption && widthSection && minWidthGV && setRequiredSpeed(requiredSpeed)
        }
    }
    
    useEffect(() => {
        switch (focus){
            case 'speed':
            onMinWidthGV()
            break;
            case 'minWidth':
            onRequiredSpeed()
            break;
        }
    }, [consumption, widthSection, requiredSpeed,minWidthGV])


    return (
    <section className='section section__regular'>

        <form className='form'>
            <h3 className='form__title'>Расчёт в обычной секции</h3>
            <div className='form__item'>
                <label className='form__label'>Расход (м³):</label>
                <input
                    className='form__input consumption'
                    type="number"
                    value={consumption}
                    onChange={(e) => setConsumption(e.target.value)}
                />
            </div>
            <div className='form__item'>
                <label className='form__label'>Ширина сечения (мм):</label>
                <input
                    className='form__input width_section'
                    type="number"
                    value={widthSection}
                    onChange={(e) => setWidthSection(e.target.value)}
                />
            </div>
            <div className='form__item'>
                <label className='form__label'>Необходимая скорость (м/с):</label>
                <input
                    className='form__input required_speed'
                    type="number"
                    value={requiredSpeed}
                    onChange={(e) => {
                        setFocus('speed')
                        setRequiredSpeed(e.target.value)
                    }}
                />
            </div>
            <div className='form__item'>
                <label className='form__label'>Min длина<b>Гибкой вставки</b>(мм):</label>
                <input
                    className='form__input minWidthGV'
                    type="number"
                    value={minWidthGV}
                    onChange={(e) => {
                        setFocus('minWidth')
                        setMinWidthGV(e.target.value)
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

export default RegularSection;