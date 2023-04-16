import { useEffect, useState } from 'react'
import styles from './Mixer.module.scss'
import { valves, pumps } from './data'

const Mixer = () => {
  const [consumption, setConsumption] = useState(0.5)
  const [pressure, setPressure] = useState(1)
  const [resultTable, setResultTable] = useState([])
  const [ischeckMark, setIsCheckMark] = useState(false)
  const [textCheckMark, setTextCheckMark] = useState('')
  // TODO делать проверку на NaN на ввод

  const roundingNumbers = 2
  const mixerName = [
    '15-1', '15-1,6', '15-2,5',
    '20-4', '20-6,3',
    '25-6,3', '25-10', '32-16', '40-25',
    '50-40'
  ]

  const solutionMixer = () => {
    if (consumption && pressure) {

      //падения давления на клапане
      const valvePressureDrop = valves.map(valve => {
        return valve.calcCon_val_calc(consumption)
      })
      // console.log(valvePressureDrop, 'valvePressureDrop')

      //напор насоса
      const pumpPressure = pumps.map(pump => {
        return pump.calcPump(consumption)
      })
      // console.log(pumpPressure, 'pumpPressure')

      //Общее Падение давления жидкости
      const totalPressureDrop = valvePressureDrop.map(valve => {
        return 8 + pressure + valve
      })
      // console.log(totalPressureDrop, 'totalPressureDrop')

      // авторитет
      const valveАuthority = valvePressureDrop.map((valve, index) => {
        return valve / totalPressureDrop[index]
      })
      // console.log(valveАuthority, 'valveАuthority')

      const results = mixerName.map((mixer, index) => {
        return {
          mixerName: mixer,
          valvePressureDrop: valvePressureDrop[index],
          valveАuthority: valveАuthority[index],
          totalPressureDrop: totalPressureDrop[index],
          pumpPressure: pumpPressure[index]
        }
      })
      setResultTable([...results])
      // console.log(results, 'results')
      // console.log(result[9].totalPressureDrop, result[9].pumpPressure)

      // проверка выполнения условий на авторитет и напор(давление) насоса
      const isMatch = (result) => (
        (
          (0.15 <= result.valveАuthority) || (0.15 * 0.9 <= result.valveАuthority)
        )
        &&
        (
          (result.valveАuthority <= 0.80) || (result.valveАuthority <= 0.80 * 1.1)
        )
        &&
        (
          (result.pumpPressure >= result.totalPressureDrop)
          ||
          ((result.pumpPressure * 1.1) >= result.totalPressureDrop)
        )
        && (result.match = true)
      )

      results.forEach(result => isMatch(result))
    }
  }

  function copyNameMixer(mixerName) {
    const mixerText = `Смесительный узел SU ${mixerName} с 2-х ходовым клапаном`
    navigator.clipboard
      .writeText(mixerText)
      .then(() => {
        setIsCheckMark(true)
        setTextCheckMark(mixerText)
        setTimeout(() => {
          setIsCheckMark(false)
        }, 10000)
      })
  }

  useEffect(() => {
    solutionMixer()
  }, [consumption, pressure])

  return (
    <div className='solution__show'>
      <div className={styles.block__form}>
        <form className='form'>
          <h3 className='form__title'>Расчёт смесительного узла</h3>
          <div className='form__item'>
            <label className='form__label'>Расход жидкости (м³/ч):</label>
            <input
              className='form__input'
              type="number"
              value={consumption}
              onChange={(e) => setConsumption(Number(e.target.value.replace(/,/gi, '.')))}
            />
          </div>
          <div className='form__item'>
            <label className='form__label'>Падение давления жидкости в ТО (кПа):</label>
            <input
              className='form__input'
              type="number"
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value.replace(/,/gi, '.')))}
            />
          </div>
        </form>
      </div>
      <div className={styles.block__table}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th rowSpan="2">Смеситель</th>
              <th rowSpan="2">Падение <br /> давления, кПа</th>
              <th colSpan="9">Проверка условий</th>
            </tr>
            <tr>
              <th colSpan="5">Авторитет клапана</th>
              <th colSpan="2">Общее падение давления жидкости, кПа</th>
              <th colSpan="2">Напор <br /> насоса, кПа</th>
            </tr>
          </thead>
          {/* &gt; - >;  &lt; - <*/}
          {/* &#8814; - не меньше, зачёркнутое меньше </ */}

          <tbody className="table__result">
            {/* может когда нет данных в массиве добавлять цитаты великих людей */}
            {resultTable.map((result, index) => (
              <tr
                className={[styles.row, result.match ? styles.row__match : ''].join(' ')}
                key={result.mixerName}
                onClick={() => copyNameMixer(result.mixerName)}
              >
                <td>{index}: {result.mixerName}</td>
                <td>{result.valvePressureDrop.toFixed(roundingNumbers).replace(/\./, ',')}</td>
                <td>0,25&nbsp;(0,15)</td>
                {
                  (0.15 * 0.9 < result.valveАuthority)
                    ? <td>&lt;</td>
                    // : <td style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }}>&gt;</td>
                    // : <td style={{ backgroundColor: 'rgba(125, 21, 2, 0.75)' }}>&gt;</td>
                    : <td style={{ backgroundColor: 'rgb(155, 12, 9, 0.75)' }}>&gt;</td>
                }
                <td>{result.valveАuthority.toFixed(roundingNumbers).replace(/\./, ',')}</td>
                {
                  (result.valveАuthority < 0.8 * 1.1)
                    ? <td>&lt;</td>
                    // : <td style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }}>&gt;</td>
                    // : <td style={{ backgroundColor: 'rgba(125, 21, 2, 0.75)' }}>&gt;</td>
                    : <td style={{ backgroundColor: 'rgb(155, 12, 9, 0.75)' }}>&gt;</td>
                }
                <td>0,8</td>
                <td>{result.totalPressureDrop.toFixed(roundingNumbers).replace(/\./, ',')}</td>
                {
                  (result.totalPressureDrop > result.pumpPressure)
                    // ? <td style={{ backgroundColor: 'rgba(255, 0, 0, 0.5)' }}>&gt;</td>
                    // ? <td style={{ backgroundColor: 'rgba(125, 21, 2, 0.75)' }}>&gt;</td>
                    ? <td style={{ backgroundColor: 'rgb(155, 12, 9, 0.75)' }}>&gt;</td>
                    : <td>&lt;</td>
                }
                <td>{result.pumpPressure.toFixed(roundingNumbers).replace(/\./, ',')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.mixer_choice}>
          {ischeckMark && (
            <p className={styles.mixer_text}>
              <u>Скопирован:</u>&#x2002; <i>{textCheckMark}</i>
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default Mixer