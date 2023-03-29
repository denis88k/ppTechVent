import { useEffect, useRef, useState } from 'react'
import logo from './assets/img/logo.png'
import regular from './assets/img/section_regular.png'
import fan from './assets/img/section_fan.png'


function App() {

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
    focus === 'speed' && onMinWidthGV()
  }, [consumption, widthSection, requiredSpeed])


  useEffect(() => {
    focus === 'minWidth' && onRequiredSpeed()
  }, [minWidthGV])


  return (
    <div className="App">

      <header className='header'>
        <div className='container'>
          <div className="header__inner">
            <div className='logo'>
              <img className='logo__img' src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </header>

      <main className='main'>
        <div className="main__inner">

          <div className='tabs'>
            <div className="container">
              <div className='tab tab-active'>
                Расчёт гибкой вставки
              </div>
              <div className='tab'>
                Расчёт смесителя
              </div>
            </div>
          </div>

          <div className='main__screen'>
            <div className="container">
              {/* расчёт гибких вставок */}
              <div className='solution__GV'>
                {/* расчёт в обычной секции */}
                <section className='section section__regular'>

                  <div className='form-block'>
                    <form className='form'>
                      <h3 className='form__title'>Расчёт в обычной секции</h3>
                      <label className='form__label label'>
                        Расход (м³):
                        <input
                          className='form__input input consumption'
                          type="number"
                          value={consumption}
                          onChange={(e) => setConsumption(e.target.value)}
                        />
                      </label>
                      <label className='form__label label'>
                        Ширина сечения (мм):
                        <input
                          className='form__input input width_section'
                          type="number"
                          value={widthSection}
                          onChange={(e) => setWidthSection(e.target.value)}
                        />
                      </label>
                      <label className='form__label label'>
                        Необходимая скорость (м/с):
                        <input
                          className='form__input input required_speed'
                          type="number"
                          value={requiredSpeed}
                          onChange={(e) => {
                            setFocus('speed')
                            setRequiredSpeed(e.target.value)
                          }}
                        />
                      </label>
                      <label className='form__label label'>
                        Min длина<b>Гибкой вставки</b>(мм):
                        <input
                          className='form__input input minWidthGV'
                          type="number"
                          value={minWidthGV}
                          onChange={(e) => {
                            setFocus('minWidth')
                            setMinWidthGV(e.target.value)
                          }}
                        />
                      </label>
                    </form>
                    {/* <div className='result'>
                      Min длина <b>Гибкой вставки:</b>
                      <br />
                      <span>{resultRegularSection}</span>
                    </div> */}
                  </div>

                  <div className='img'>
                    <img src={regular} alt="обычная секция" />
                  </div>
                </section>

                <hr />

                {/* расчёт в секции вентилятора*/}
                {/* <section className='section section__fan'>

                  <div className='form-block'>
                    <form className='form'>
                      <h3 className='form__title'>Расчёт в секции вентилятора</h3>
                      <label className='form__label label'>
                        Расход (м³):
                        <input
                          className='form__input input consumption'
                          type="number"
                          value={consumption}
                          onChange={(e) => setConsumption(e.target.value)}
                        />
                      </label>
                      <label className='form__label label'>
                        Ширина сечения (мм):
                        <input
                          className='form__input input width_section'
                          type="number"
                          value={widthSection}
                          onChange={(e) => setWidthSection(e.target.value)}
                        />
                      </label>
                      <label className='form__label label'>
                        Необходимая скорость (м/с):
                        <input
                          className='form__input input required_speed'
                          type="number"
                          value={requiredSpeed}
                          onChange={(e) => setRequiredSpeed(e.target.value)}
                        />
                      </label>
                    </form>
                    <div className='result'>
                      Min длина <b>Гибкой вставки:</b>
                      <br />
                      <span>{resultRegularSection}</span>
                    </div>
                  </div>

                  <div className='img'>
                    <img src={regular} alt="обычная секция" />
                  </div>
                </section> */}

              </div>

              {/* расчёт смесителя */}
              {/* <div>
                <div>
                  <form className='form'>
                    <h3 className='form__title'>Расчёт смесителя</h3>
                    <label className='label'>
                      Расход:
                      <input className='input ' type="number" />
                    </label>
                    <label className='label'>
                      Давление:
                      <input className='input ' type="number" />
                    </label>
                  </form>
                </div>

                <table className='table'>
                  таблица вывода
                  -выводится по всем смесакам
                  -при наведении на строку: выделяется область пунктирными линиями и появляется надпись скопировать
                  -при нажатии копируется смесак в буфер обмена
                  -выделяется полупрозрачным фоном наиболее оптимальные смесаки
                </table>
              </div> */}

            </div>
          </div>

        </div>
      </main>

      <footer className='footer'>
        <div className='container'>
          <div className="footer__inner">
            footer
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
