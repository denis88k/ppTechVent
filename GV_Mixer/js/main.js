let tabs_triggers = document.querySelectorAll('.tabs-triggers__item');

tabs_triggers.forEach((item) =>
   item.addEventListener('click', function (e) {
      e.preventDefault()
      const id = e.target.getAttribute('data-trigers')
      //удаляет классы с табов и контента
      document.querySelectorAll('.tabs-triggers__item').forEach((child) =>
         child.classList.remove('tabs-triggers__item--active'))
      document.querySelectorAll('.solution__item').forEach((child) =>
         child.classList.remove('solution__item--active'))
      //добавляет класс нажатому классу и контенту, относительно нажатого таба
      item.classList.add('tabs-triggers__item--active')
      document.getElementById(id).classList.add('solution__item--active')
   })
)

tabs_triggers[0].click();


function regularSection() {
   let a = parseInt(document.getElementById('a').value);
   let b = parseInt(document.getElementById('b').value);
   let n = parseFloat(document.getElementById('n').value);
   let resultR = document.querySelector('.resultR');
   let form = document.querySelector('.form__regular')

   let error = formValidate(form);
   let c = (a * 1000 / (3600 * n * (b / 1000))).toFixed(0);

   if (error === 0) {
      if (c <= 250) {
         resultR.innerHTML = `
               Min длина <b>Гибкой вставки</b>:
               <br>
               <span>М = 250 мм</span>`;
         resultR.style.cssText = `
                   font-size: 18.5px;
                   color: #fff;`;
      }
      else {
         resultR.innerHTML = `
               Min длина <b>Гибкой вставки</b>:
               <br>
               <span>М = ${c} мм</span>`;
         resultR.style.cssText = `
                   font-size: 18.5px;
                   color: #fff;`;
      }
   } else {
      resultR.innerHTML = 'Забыл ввести данные!';
      resultR.style.cssText = `
               color: red;
               font-size: 25px;`;
   }
}
let btn_regular = document.querySelector('.btn-regularSection');
btn_regular.addEventListener('click', regularSection)

function fanSection() {
   let d = parseInt(document.getElementById('d').value);
   let f = parseInt(document.getElementById('f').value);
   let t = parseInt(document.getElementById('t').value);
   let m = parseInt(document.getElementById('m').value);
   let n = parseInt(document.getElementById('n').value);

   let resultF = document.querySelector('.resultF');
   let form = document.querySelector('.form__fan');

   let error = formValidate(form);

   function hv() {
      h = (t - ((m / 2) + 100));
      v = (d / (3600 * (h / 1000) * (f / 1000))).toFixed(2);
   }
   hv();

   if (error === 0) {
      if (h <= 0 || v >= n) {
         for (; (h <= 0 || v >= n); t++) {
            hv();
         };
         t = Math.ceil((t - 1) / 10) * 10;
         resultF.innerHTML = `Необходимо сделать "Длину секции вентилятора" <b>${t}</b> `;
      }

      else {
         resultF.innerHTML = `
           Max длина <b>Гибкой вставки:</b>
           <br><span>М = ${h} мм</span>
           <br><b>Скорость</b> в сечении:
           <br><span> V = ${v.replace(/\./, ',')} м<sup>2</sup>/с</span>`;
         resultF.style.cssText = `
                   font-size: 18.5px;
                   color: #fff;`;
      }
   } else {
      resultF.innerHTML = 'Забыл ввести данные!';
      resultF.style.cssText = `
               color: white;
               font-size: 18.5px;`;
   }
}
let btn_fan = document.querySelector('.btn-fanSection');
btn_fan.addEventListener('click', fanSection)

let select = document.querySelector('.select');
select.addEventListener('click', () => {
   select.classList.toggle('active');
})

//смесак
//переменные
//округление чисел
let f = 2
//кнопки
let btnSolution = document.getElementById('btn-solution')
let btnReset = document.getElementById('btn-reset')
//вводимые значения
let con_val = document.getElementById('consumption')
let pres_val = document.getElementById('pressure')

//клапан

calcCon_val = function (con_valN) {
   let calc = Math.pow(con_valN, 4) * this.B4 + Math.pow(con_valN, 3) * this.B3 + Math.pow(con_valN, 2) * this.B2 + con_valN * this.B1 + this.int
   return calc;
}

let con_val15_1 = {
   int: -19.04072,
   B1: 158.00988,
   B2: -114.91494,
   B3: 92.42785,
   B4: -12.29976,
   calcCon_val15_1: calcCon_val
}

let con_val15_1_6 = {
   int: -5.2184,
   B1: 40.81085,
   B2: 19.89139,
   B3: -11.76124,
   B4: 4.98452,
   calcCon_val15_1_6: calcCon_val
}

let con_val15_2_5 = {
   int: -16.80228,
   B1: 82.15408,
   B2: -74.52091,
   B3: 30.7459,
   B4: -2.65905,
   calcCon_val15_2_5: calcCon_val
}

let con_val20_4 = {
   int: -1.22153,
   B1: 11.17824,
   B2: -8.37302,
   B3: 5.11344,
   B4: -0.40786,
   calcCon_val20_4: calcCon_val
}

let con_val20_6_3 = {
   int: 6.29783,
   B1: -11.63941,
   B2: 7.25707,
   B3: -0.42451,
   B4: 0.01075,
   calcCon_val20_6_3: calcCon_val
}

let con_val25_6_3 = {
   int: 6.29783,
   B1: -11.63941,
   B2: 7.25707,
   B3: -0.42451,
   B4: 0.01075,
   calcCon_val25_6_3: calcCon_val
}

let con_val25_10 = {
   int: -10.10451,
   B1: 9.74352,
   B2: -1.11385,
   B3: 0.18086,
   B4: -0.00491,
   calcCon_val25_10: calcCon_val
}

let con_val32_16 = {
   int: -18.74865,
   B1: 11.1291,
   B2: -1.09665,
   B3: 0.06728,
   B4: -0.000862257,
   calcCon_val32_16: calcCon_val
}

let con_val40_25 = {
   int: -6.1116,
   B1: 2.63122,
   B2: -0.08469,
   B3: 0.00674,
   B4: -0.0000382241,
   calcCon_val40_25: calcCon_val
}

let con_val50_40 = {
   int: 6.2866,
   B1: -2.11869,
   B2: 0.28995,
   B3: -0.00843,
   B4: 0.0000974261,
   calcCon_val50_40: calcCon_val
}

//насос
calcPump = function (pres_valN) {
   let calc = Math.pow(pres_valN, 2) * this.B2 + pres_valN * this.B1 + this.int
   return calc
}

let pump15 = {
   int: 38.73627,
   B1: -8.18855,
   B2: -0.68647,
   calcPump15: calcPump
}

let pump20 = {
   int: 58.34957,
   B1: -10.10902,
   B2: -0.50668,
   calcPump20: calcPump
}

let pump25_32_40 = {
   int: 79.43386,
   B1: -7.06525,
   B2: 0.06686,
   calcPump25_32_40: calcPump
}

let pump50 = {
   int: 103.22108,
   B1: -0.74958,
   B2: -0.07347,
   calcPump50: calcPump
}

////////////////////////////////////////////////////////////////////////////////


con_val.oninput = function () {
   let check1 = con_val.length;
   let check2 = pres_val.length;
   // if (!check1 == undefined && !check2 == undefined) {
   //     btnSolution.setAttribute('disabled', true);
   // } else {
   //     btnSolution.removeAttribute('disabled');
   // }
   check = true
   if (!check1 == undefined) return check
}
btnSolution.onclick = function () {
   rst()
   let form = document.querySelector('.form__mixer');
   let error = formValidate(form);
   //переопределяет введённое значение расхода в число

   let con_valN = Number(con_val.value.replace(/,/, '.'))

   console.log(con_val.length, 'инпут')
   //переопределяет введённое значение напора в число
   let pres_valN = Number(pres_val.value.replace(/,/, '.'))

   //расчёт "падения давления" смесаков
   let Rcon_val15_1 = con_val15_1.calcCon_val15_1(con_valN).toFixed(f);
   Rcon_val15_1_6 = con_val15_1_6.calcCon_val15_1_6(con_valN).toFixed(f)
   Rcon_val15_2_5 = con_val15_2_5.calcCon_val15_2_5(con_valN).toFixed(f)
   Rcon_val20_4 = con_val20_4.calcCon_val20_4(con_valN).toFixed(f)
   Rcon_val20_6_3 = con_val20_6_3.calcCon_val20_6_3(con_valN).toFixed(f)
   Rcon_val25_6_3 = con_val25_6_3.calcCon_val25_6_3(con_valN).toFixed(f)
   Rcon_val25_10 = con_val25_10.calcCon_val25_10(con_valN).toFixed(f)
   Rcon_val32_16 = con_val32_16.calcCon_val32_16(con_valN).toFixed(f)
   Rcon_val40_25 = con_val40_25.calcCon_val40_25(con_valN).toFixed(f)
   Rcon_val50_40 = con_val50_40.calcCon_val50_40(con_valN).toFixed(f)
   //расчёт "напор насоса" смесаков
   let Rpump15_1 = pump15.calcPump15(con_valN).toFixed(f)
   Rpump15_1_6 = Rpump15_1
   Rpump15_2_5 = Rpump15_1
   Rpump20_4 = pump20.calcPump20(con_valN).toFixed(f)
   Rpump20_6_3 = Rpump20_4
   Rpump25_6_3 = pump25_32_40.calcPump25_32_40(con_valN).toFixed(f)
   Rpump25_10 = Rpump25_6_3
   Rpump32_16 = Rpump25_6_3
   Rpump40_25 = Rpump25_6_3
   Rpump50_40 = pump50.calcPump50(con_valN).toFixed(f)

   //расчёт "Общее Падение давления жидкости" смесаков
   let Rtotal_valve15_1 = (8 + Number(Rcon_val15_1) + Number(pres_valN)).toFixed(f)
   Rtotal_valve15_1_6 = (8 + Number(Rcon_val15_1_6) + Number(pres_valN)).toFixed(f)
   Rtotal_valve15_2_5 = (8 + Number(Rcon_val15_2_5) + Number(pres_valN)).toFixed(f)
   Rtotal_valve20_4 = (8 + Number(Rcon_val20_4) + Number(pres_valN)).toFixed(f)
   Rtotal_valve20_6_3 = (8 + Number(Rcon_val20_6_3) + Number(pres_valN)).toFixed(f)
   Rtotal_valve25_6_3 = (8 + Number(Rcon_val25_6_3) + Number(pres_valN)).toFixed(f)
   Rtotal_valve25_10 = (8 + Number(Rcon_val25_10) + Number(pres_valN)).toFixed(f)
   Rtotal_valve32_16 = (8 + Number(Rcon_val32_16) + Number(pres_valN)).toFixed(f)
   Rtotal_valve40_25 = (8 + Number(Rcon_val40_25) + Number(pres_valN)).toFixed(f)
   Rtotal_valve50_40 = (8 + Number(Rcon_val50_40) + Number(pres_valN)).toFixed(f)
   //расчёт "Авторитет Клапана" смесаков
   let Rvalve_auth15_1 = (Rcon_val15_1 / Rtotal_valve15_1).toFixed(f)
   Rvalve_auth15_1_6 = (Rcon_val15_1_6 / Rtotal_valve15_1_6).toFixed(f)
   Rvalve_auth15_2_5 = (Rcon_val15_2_5 / Rtotal_valve15_2_5).toFixed(f)
   Rvalve_auth20_4 = (Rcon_val20_4 / Rtotal_valve20_4).toFixed(f)
   Rvalve_auth20_6_3 = (Rcon_val20_6_3 / Rtotal_valve20_6_3).toFixed(f)
   Rvalve_auth25_6_3 = (Rcon_val25_6_3 / Rtotal_valve25_6_3).toFixed(f)
   Rvalve_auth25_10 = (Rcon_val25_10 / Rtotal_valve25_10).toFixed(f)
   Rvalve_auth32_16 = (Rcon_val32_16 / Rtotal_valve32_16).toFixed(f)
   Rvalve_auth40_25 = (Rcon_val40_25 / Rtotal_valve40_25).toFixed(f)
   Rvalve_auth50_40 = (Rcon_val50_40 / Rtotal_valve50_40).toFixed(f)
   //расчёт смесака
   let Rcon_val = [
      Rcon_val15_1, Rcon_val15_1_6, Rcon_val15_2_5,
      Rcon_val20_4, Rcon_val20_6_3,
      Rcon_val25_6_3, Rcon_val25_10, Rcon_val32_16, Rcon_val40_25,
      Rcon_val50_40
   ]
   let Rvalve_auth = [
      Rvalve_auth15_1, Rvalve_auth15_1_6, Rvalve_auth15_2_5,
      Rvalve_auth20_4, Rvalve_auth20_6_3,
      Rvalve_auth25_6_3, Rvalve_auth25_10, Rvalve_auth32_16, Rvalve_auth40_25,
      Rvalve_auth50_40
   ]
   let Rtotal_valve = [
      Rtotal_valve15_1, Rtotal_valve15_1_6, Rtotal_valve15_2_5,
      Rtotal_valve20_4, Rtotal_valve20_6_3,
      Rtotal_valve25_6_3, Rtotal_valve25_10, Rtotal_valve32_16, Rtotal_valve40_25,
      Rtotal_valve50_40
   ]
   let mixerName = [
      '15-1', '15-1,6', '15-2,5',
      '20-4', '20-6,3',
      '25-6,3', '25-10', '32-16', '40-25',
      '50-40'
   ]
   let Rpump = [
      Rpump15_1, Rpump15_1_6, Rpump15_2_5,
      Rpump20_4, Rpump20_6_3,
      Rpump25_6_3, Rpump25_10, Rpump32_16, Rpump40_25,
      Rpump50_40
   ]

   if (error === 0) solution_result(Rcon_val, Rvalve_auth, Rtotal_valve, mixerName, Rpump);
}
//функция вывода смесака, при удовлетворении условиям
const tbody = document.querySelector('tbody');
function solution_result(Rcon_val, Rvalve_auth, Rtotal_valve, mixerName, Rpump) {
   let i = 0;
   console.log(Rvalve_auth.length, 'длина цикла')
   for (; i < Rvalve_auth.length; i++) {
      if ((0.15 < Rvalve_auth[i]) && (Rvalve_auth[i] < 0.80) && (Rtotal_valve[i] < Rpump[i])) {

         // console.log(con_valN);
         console.log(i, 'внутри условия');
         break;
      }
      console.log(i, 'внутри цикла')
   };
   if (i < Rvalve_auth.length) {
      tbody.insertAdjacentHTML('beforeend', `
         <tr class="mixer">
         <td>${mixerName[i]}</td>
            <td>${Rcon_val[i].replace(/\./, ',')}</td>
            <td>0,25(0,15)</td><td>&lt;</td>
            <td>${Rvalve_auth[i].replace(/\./, ',')}</td>
            <td>&lt;</td><td>0,8</td><td>${Rpump[i].replace(/\./, ',')}</td>
            <td colspan="2">&gt;</td><td>${Rtotal_valve[i].replace(/\./, ',')}</td>
         </tr>
      `);

      let mixer = document.querySelector('.mixer');
      mixer.insertAdjacentHTML('beforebegin', `
         <div class="copy-icon copy"></div>
      `);
      let copy = document.querySelector('.copy-icon');
      copy.addEventListener('click', () => {
         copyText(mixerName[i])
         copy.classList.remove('copy');
         copy.classList.add('check');
      })
   }
   console.log(i, 'после цикла')
   console.log(Rvalve_auth[i], 'значение')
}

//функция для копирования смесака
function copyText(mixerName) {
   const fake = document.createElement('textarea');
   document.body.appendChild(fake);
   fake.innerText = `Смесительный узел SU ${mixerName} с 2-х ходовым клапаном`;
   fake.select();
   document.execCommand('copy');
   document.body.removeChild(fake);
};
//функция удаления списка смесаков
function rst() {
   let mixer = document.querySelectorAll('.mixer');
   copy = document.querySelector('.copy-icon');
   for (let i = 0; i < mixer.length; i++) {
      mixer[i].remove(); s
   }
   if (copy) copy.remove();

}
//кнопка удаления
btnReset.onclick = function () {
   rst()
}



function formValidate(form) {
   let error = 0;
   let formReq = form.querySelectorAll('.req');

   for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.value === '') {
         formAddError(input);
         error++;
      }
   }
   return error;
}
function formAddError(input) {
   // input.parentElement.classList.add('_error');
   input.classList.add('_error');
   input.parentNode.classList.add('data_error');
}
function formRemoveError(input) {
   // input.parentElement.classList.remove('_error');
   input.classList.remove('_error');
   input.parentNode.classList.remove('data_error');
}

