import { useEffect, useState } from 'react'
import logo from './assets/img/logo.png'


import GV from './components/GV/GV'
import Mixer from './components/Mixer/Mixer'
import Footer from './components/Footer/Footer'


function App() {

  // const [tabs, setTabs] = useState('GV')
  const [tabs, setTabs] = useState('GV')

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
              <div className='tabs__inner'>
                <div
                  className={`tab ${tabs ? 'GV' : ''}`}
                  onClick={() => setTabs('GV')}
                >
                  Расчёт гибкой вставки
                </div>
                <div
                  className={`tab ${tabs ? 'Mixer' : ''}`}
                  onClick={() => setTabs('Mixer')}
                >
                  Расчёт смесителя
                </div>
              </div>
            </div>
          </div>

          <div className='main__screen'>
            <div className="container">
              {/* TODO решить проблему со скачками между табами */}
              {tabs === 'GV' && (
                /* расчёт гибких вставок */
                <GV />
              )}
              {tabs === 'Mixer' && (
                /* расчёт смесителя */
                <Mixer />
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />

    </div>
  )
}

export default App
