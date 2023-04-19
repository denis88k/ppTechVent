import { useState } from 'react'

import GV from './components/GV/GV'
import Mixer from './components/Mixer/Mixer'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Tabs from './components/Tabs/Tabs'


function App() {

  const [tabs, setTabs] = useState('GV')

  return (
    <div className="App">

      <Header />

      <main className='main'>
        <div className="main__inner">

          <Tabs tabs={tabs} setTabs={setTabs} />

          <div className='main__screen'>
            <div className="container">
              <div className='solution'>
              {
                tabs === 'GV'
                  ? <GV />
                  : <Mixer />
              }
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

    </div>
  )
}

export default App
