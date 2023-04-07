import { useEffect, useState } from 'react'
import styles from './Mixer.module.scss'
import {valves, pumps} from './data'


const Mixer = ({ show }) => {
  const [consumption, setConsumption] = useState(0.5)
  const [pressure, setPressure] = useState(1)
  const [resultTable, setResultTable] = useState([])
    // TODO делать проверку на NaN на ввод

  const roundingNumbers = 2;
  const mixerName = [
    '15-1', '15-1,6', '15-2,5',
    '20-4', '20-6,3',
    '25-6,3', '25-10', '32-16', '40-25',
    '50-40'
  ]

  const solutionMixer=()=>{
    if(consumption && pressure){
      // скорее всего на этапе расчёта лучше убрать округление, округлять только в результате

      //падения давления на клапане
      const valvePressureDrop = valves.map(valve => {
        return Number(valve.calcCon_val_calc(consumption).toFixed(roundingNumbers))
      })

      //напор насоса
      const pumpPressure = pumps.map(pump => {
        return Number(pump.calcPump(pressure).toFixed(roundingNumbers))
      })

      //Общее Падение давления жидкости
      const totalPressureDrop = valvePressureDrop.map(valve => {
        return Number((8 + pressure + valve).toFixed(roundingNumbers))
      })

      // авторитет
      const valveАuthority = valvePressureDrop.map((valve, index) => {
        return Number((valve / totalPressureDrop[index]).toFixed(roundingNumbers))
      })

      setResultTable([
        mixerName,
        valvePressureDrop,
        valveАuthority,
        totalPressureDrop,
        pumpPressure
      ])

      const result = mixerName.map((mixer, index)=>{
        {
          mixerName = mixer, 
          valvePressureDrop[index],
          valveАuthority[index], 
          totalPressureDrop[index],
          pumpPressure[index]
        }
      })

      // result = [
      //   {mixerName, valvePressureDrop, valveАuthority, totalPressureDrop, pumpPressure},
      //   {mixerName, valvePressureDrop, valveАuthority, totalPressureDrop, pumpPressure},
      // ]

      //вычисление индекса смесака
      const index = valvePressureDrop.findIndex((elem, i) => {
        return (
          ((0.15 <= valveАuthority[i]) || (0.15 <= valveАuthority[i] * (0.15 / 0.14)))
          && ((valveАuthority[i] <= 0.80) || ((valveАuthority[i] * 0.95) <= 0.80))
          && ((pumpPressure[i] >= totalPressureDrop[i]) || ((pumpPressure[i] * 1.05) >= totalPressureDrop[i]))
        )
      })
      //  TODO
      // после ввода данных добавить итоговую информацию по ним в массив данных
      // выводить этот массив
      // после нахождения индекса к этому смесаку добавить зеленый фон
      // при наведении на строку добавить выделение голубого цвета прорачного
      // при наведении показывать руку
      // при нажатии у строки меняется фон, добавляется 
      // надпись "скопированно{иконка} !" и иконка в конце надписи
      // при нажатии на другую строку
    }
  }

  return (
    <section className={`solution ${show}`}>
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
        <table className={styles.table__solution}>
          <thead>
            <tr>
              <td rowSpan="2">Смеситель</td>
              <td rowSpan="2">Падение давления, кПа</td>
              <td colSpan="9">Проверка условий</td>
            </tr>
            <tr>
              <td colSpan="5">Авторитет клапана</td>
              <td colSpan="2">Напор насоса, кПа</td>
              <td colSpan="2">Общее падение давления жидкости, кПа</td>
            </tr>
          </thead>

          <tbody className="table__result">
            {/* может когда нет данных в массиве добавлять цитаты великих людей */}
            {/* {resultTable.map(result => (
              <tr>
                <td>{result.mixerName}</td>
                <td>{result.valvePressureDrop}</td>
                <td>0,25 (0,15)</td>
                <td>{result.valveАuthority}</td>
                <td>`/`</td>
                <td>0,8</td>
                <td>{result.totalPressureDrop}</td>
                <td>`/`</td>
                <td>{result.pumpPressure}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Mixer

{/**
без проверки условий
<tr>
			<td></td>
			<td></td>
			<td colspan="5"></td>
			<td colspan="2"></td>
			<td colspan="2"></td>
		</tr> 
*/}
{
  // откудато
  //   <tr>
  //   <th rowspan="2">Смеситель</th>
  //   <th rowspan="2">Падение давления, кПа</th>
  //   <th colspan="3">Проверка условий</th>
  // </tr>
  // <tr>
  //   <th>Авторитет клапана</th>
  //   <th>Напор насоса, кПа</th>
  //   <th>Общее падение давления жидкости, кПа</th>
  // </tr>
}

{/*
  таблица вывода
  -выводится по всем смесакам
  -при наведении на строку: выделяется область пунктирными линиями и появляется надпись скопировать
  -при нажатии копируется смесак в буфер обмена
  -выделяется полупрозрачным фоном наиболее оптимальные смесаки
*/}