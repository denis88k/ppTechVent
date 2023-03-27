import { useState } from 'react'
// import reactLogo from './assets/img/bg.png'


function App() {

  return (
    <div className="App bg">
      <header>
        <div className='container'>
          <div className="header__inner">
            <div className='logo'>
              <img className='logo__img' src="assets/img/logo.png" alt="logo" />
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

                <div className='section section__regular'>
                  <form className='form'>
                    <h3 className='form__title'>Расчёт в обычной секции</h3>
                    <label className='label'>
                      Расход:
                      <input className='input consumption' type="number"/>
                    </label>
                    <label className='label'>
                      Ширина сечения:
                      <input className='input witdh_section' type="number"/>
                    </label>
                    <label className='label'>
                      Необходимая скорость:
                      <input className='input required_speed' type="number" value="4"/>
                    </label>
                  </form>

                  <div>
                    Min длина <b>Гибкой вставки:</b>{`min длина`}
                  </div>

                  <div className='img'>
                    <img src="./assets/img/section_regular.png" alt="обычная секция"/>
                  </div>
                </div>

                <hr />

                <div className='section section__regular'>
                  <form className='form'>
                    <h3 className='form__title'>Расчёт в секции вентилятора</h3>
                    <label className='label'>
                      Расход:
                      <input className='input consumption' type="number"/>
                    </label>
                  </form>

                  <div>
                    Min длина Гибкой вставки:{`min длина`}
                  </div>

                  <div className='img'>
                    <img src="./assets/img/section_fan.png" alt="Cекция вентилятора"/>
                  </div>
                </div>

              </div>

                {/* расчёт смесителя */}
              <div>
                <div>
                  <form className='form'>
                    <h3 className='form__title'>Расчёт смесителя</h3>
                    <label className='label'>
                      Расход:
                      <input  className='input ' type="number" />
                    </label>
                    <label className='label'>
                      Давление:
                      <input  className='input ' type="number" />
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
              </div>

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
