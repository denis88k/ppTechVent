import { useState } from 'react'
import logo from './assets/img/logo.png'
import regular from './assets/img/section_regular.png'
import fan from './assets/img/section_fan.png'


function App() {

  return (
    <div className="App bg">
      <header>
        <div className='container'>
          <div className="header__inner">
            <div className='logo'>
              <img className='logo__img' src={logo} alt="logo" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className='container'>
          <div className="main__inner">

            <div className='tabs'>
              <div className='tab tab-active'>
                Расчёт гибкой вставки
              </div>
              <div className='tab'>
                Расчёт смесителя
              </div>
            </div>

            <div className='main__screen'>
              {/* расчёт гибких вставок */}
              <div className='solution__GV'>
                {/* расчёт в обычной секции */}
                <section className='section section__regular'>

                  <div className='form-block'>
                    <form className='form'>
                      <h3 className='form__title'>Расчёт в обычной секции</h3>
                      <label className='form__label label'>
                        Расход:
                        <input className='form__input input consumption' type="number" />
                      </label>
                      <label className='form__label label'>
                        Ширина сечения:
                        <input className='form__input input width_section' type="number" />
                      </label>
                      <label className='form__label label'>
                        Необходимая скорость:
                        <input className='form__input input required_speed' type="number" defaultValue="4" />
                      </label>
                    </form>
                    <div className='result'>
                      Min длина <b>Гибкой вставки:</b>{` min длина`}
                    </div>
                  </div>

                  <div className='img'>
                    <img src={regular} alt="обычная секция" />
                  </div>
                </section>

                <hr />

                {/* расчёт в секции вентилятора*/}
                <section className='section section__regular'>

                  <form className='form'>
                    <h3 className='form__title'>Расчёт в секции вентилятора</h3>
                    <label className='label'>
                      Расход:
                      <input className='input consumption' type="number" />
                    </label>
                  </form>
                  <div>
                    Min длина Гибкой вставки:{`min длина`}
                  </div>


                  <div className='img'>
                    <img src={fan} alt="Секция вентилятора" />
                  </div>
                </section>

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

      <footer>
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
