import { useEffect, useState } from 'react'
import logo from './assets/img/logo.png'

import RegularSection from './components/GV/SectionRegular/RegularSection'
import FanSection from './components/GV/SectionFan/FanSection'


function App() {

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

                <RegularSection />

                <hr />

                {/* расчёт в секции вентилятора*/}
                <FanSection />
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
