import { useEffect, useState } from 'react'
import fan from './assets/img/section_fan.png'

const FanSection = ()=>{
    const optionsWheelFan = [22, 25, 28, 30, 31,35,40,45,50,56,63,71,80,90,100,110]

    const [consumption, setConsumption] = useState(1000)
    const [widthSection, setWidthSection] = useState(500)
    const [widthFan, setWidthFan] = useState(500)
    const [requiredSpeed, setRequiredSpeed] = useState(4)
    const [minWidthGV, setMinWidthGV] = useState(250)
    const [focus, setFocus] = useState('speed')
    const [wheelFan, setWheelFan] = [22]

    function hv() {
        h = (t - ((m / 2) + 100)); // длина гибкой вставки
        v = (d / (3600 * (h / 1000) * (f / 1000))).toFixed(2); // Длина секции двигателя:
     };
  
     hv();
  
     if(d && f && t && m && n){
        if (h <= 0 || v >= n) {
           for (; (h <= 0 || v >= n); t++) {
              hv();
           };
           t = Math.ceil((t - 1) / 10) * 10;
           resultF.innerHTML = `Необходимо сделать "Длину секции вентилятора" <b>${t}</b> `;
        }else {
           resultF.innerHTML = `
             Max длина <b>Гибкой вставки:</b>
             <br><span>М = ${h} мм</span>
             <br><b>Скорость</b> в сечении:
             <br><span> V = ${v.replace(/\./, ',')} м<sup>2</sup>/с</span>`;
           resultF.style.cssText = `
                     font-size: 18.5px;
                     color: #fff;`;
        }
     }

    return (
        <section className='section section__fan'>
            <form className='form'>
                <h3 className='form__title'>Расчёт в секции вентилятора</h3>
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
                    <label className='form__label'>Ширина сечения:</label>
                    <input
                        className='form__input width_section'
                        type="number"
                        value={widthSection}
                        onChange={(e) => setWidthSection(e.target.value)}
                    />
                </div>
                <div className='form__item'>
                    <label className='form__label'>Номер колеса:</label>
                    <select 
                        className='form__input'
                        value={wheelFan}
                        onChange={(e)=> setWheelFan(e.target.value)}
                    >
                        {optionsWheelFan.map(wheel=>(
                            <option value={wheel*10}>{wheel}</option>
                        ))}
                    </select>
                </div>
                <div class="form__item">
                    <label className='form__label'>Длина секции двигателя:</label>
                    <input
                        className='form__input width_fan'
                        type="number"
                        value={widthFan}
                        onChange={(e) => setWidthFan(e.target.value)}
                    />
                </div>
                <div className='form__item'>
                    <label className='form__label'>Max скорость (м/с):</label>
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
                <label className='form__label'>Max длина<b>Гибкой вставки</b>(мм):</label>
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
                <img src={fan} alt="секция вентилятора"/>
            </div>
        </section>
    )
}
export default FanSection;