import React from 'react'

const Mixer = () => {
  const [consumption, setConsumption] = useState(0,5)
    const [widthSection, setWidthSection] = useState(500)


   return (
      <section className='solution'>
        <div className="block__form">
          <form className='form'>
            <h3 className='form__title'>Расчёт смесительного узла</h3>
            <div className='form__item'>
              <label className='form__label'>Расход жидкости(м³/ч):</label>
              <input
                  className='form__input'
                  type="number"
                  value={consumption}
                  onChange={(e) => setConsumption(e.target.value)}
              />
            </div>
            <div className='form__item'>
                      <label className='form__label'>Падение давления жидкости в ТО(кПа):</label>
                      <input
                          className='form__input'
                          type="number"
                          value={pressure}
                          onChange={(e) => setPressure(e.target.value)}
                      />
                  </div>
          </form>
        </div>
        <div className='block__table'>
          <table class="table-solution">
              <thead>
                <tr>
                  <td rowspan="2">Смеситель</td>
                  <td rowspan="2">Падение давления, кПа</td>
                  <td colspan="9">Проверка условий</td>
                </tr>
                <tr>
                  <td colspan="5">Авторитет клапана</td>
                  <td colspan="2">Напор насоса, кПа</td>
                  <td colspan="2">Общее падение давления жидкости, кПа</td>
                </tr>
              </thead>

              <tbody class="table__result">
                {results.map(result=>(
                  <tr>
                    <td>{result.mixer}</td>
                    <td>{result.valvePressureDrop}</td>
                    <td>0,25 (0,15)</td>
                    <td>{result.valveАuthority}</td>
                    <td>`/`</td>
                    <td>0,8</td>
                    <td>{result.totalPressureDrop}</td>
                    <td>`/`</td>
                    <td>{result.pumpPressure}</td>
                  </tr>
                ))}
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