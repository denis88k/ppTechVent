import { useState } from 'react'
// import reactLogo from './assets/img/bg.png'


function App() {

  return (
    <div className="App">
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
        <div className="container">
          <div className="main__inner">

            <div className='tabs'>
              <div className='tab tab-active'>
                Расчёт гибкой вставки
              </div>
            </div>

            <div>
              <div>
                {/* расчёт гибких вставок */}
                <div>
                  <form>
                    <label>расчёт в обычной секции</label>
                    <input type="text" />
                  </form>
                  <div>
                    Min длина Гибкой вставки:{`min длина`}
                  </div>
                  <img src="" alt="" />
                </div>

                <div>
                  <form>
                    <label>расчёт в секции вентилятора</label>
                    <input type="text" />
                  </form>
                  <div>
                    Min длина Гибкой вставки:{`min длина`}
                  </div>
                  <img src="" alt="" />
                </div>
              </div>

              <div>
                {/* расчёт смесителя */}
                <div>
                  <form>
                    <label>расчёт смесителя</label>
                    <input type="text" />
                  </form>
                </div>

                <table>
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
        <div className="container">
          <div className="footer__inner">
            footer
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
