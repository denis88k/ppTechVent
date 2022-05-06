let tabs_triggers = document.querySelectorAll('.tabs-triggers__item');

tabs_triggers.forEach((item) =>
   item.addEventListener('click', function (e) {
      e.preventDefault();
      const id = e.target.getAttribute('data-trigers');
      //удаляет классы с табов и контента
      document.querySelectorAll('.tabs-triggers__item').forEach((child) =>
         child.classList.remove('tabs-triggers__item--active'));
      document.querySelectorAll('.solution__item').forEach((child) =>
         child.classList.remove('solution__item--active'));
      //добавляет класс нажатому классу и контенту, относительно нажатого таба
      item.classList.add('tabs-triggers__item--active');
      document.getElementById(id).classList.add('solution__item--active');
   })
)

tabs_triggers[0].click();

//расчёт в свободной секции
function regularSection() {
   let a = parseInt(document.getElementById('a').value); //расход воздуха
   let b = parseInt(document.getElementById('b').value); //ширина сечения
   let n = parseFloat(document.getElementById('n').value); //скорость воздуха
   let resultR = document.querySelector('.resultR'); //строка вывода результата
      
   let c = (a * 1000 / (3600 * n * (b / 1000))).toFixed(0);

   let form = document.querySelector('.form__regular');
   let error = formValidate(form);
   
   if (error === 0) {
      if (c <= 250) {
         resultR.innerHTML = `
               Min длина <b>Гибкой вставки</b>:
               <br>
               <span>М = 250 мм</span>`;
         resultR.style.cssText = `
                   font-size: 18.5px;
                   color: #fff;`;
      } else {
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
};

let btn_regular = document.querySelector('.btn-regularSection');
btn_regular.addEventListener('click', regularSection);

//расчёт в секции вентилятора
function fanSection() {
   let d = parseInt(document.getElementById('d').value); // расход
   let f = parseInt(document.getElementById('f').value); // ширина сечения
   let t = parseInt(document.getElementById('t').value); // длина секции двигателя
   let m = parseInt(document.getElementById('m').value); // колесо
   let n = parseInt(document.getElementById('n').value); // скорость, которую не стоит превышать

   let resultF = document.querySelector('.resultF');
   let form = document.querySelector('.form__fan');

   let error = formValidate(form);

   function hv() {
      h = (t - ((m / 2) + 100)); // длина гибкой вставки
      v = (d / (3600 * (h / 1000) * (f / 1000))).toFixed(2); // Длина секции двигателя:
   };
   hv();

   if (error === 0) {
      if (h <= 0 || v >= n) {
         for (; (h <= 0 || v >= n); t++) {
            hv();
         };
         t = Math.ceil((t - 1) / 10) * 10;
         resultF.innerHTML = `Необходимо сделать "Длину секции вентилятора" <b>${t}</b> `;
      }else {
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
};

let btn_fan = document.querySelector('.btn-fanSection');
btn_fan.addEventListener('click', fanSection);

let select = document.querySelector('.select');
select.addEventListener('click', () => {
   select.classList.toggle('active');
});

//расчёт смесак
//переменные
//округление чисел
let f = 2;
//кнопки
let btnSolution = document.getElementById('btn-solution');
let btnReset = document.getElementById('btn-reset');
//вводимые значения
let con_val = document.getElementById('consumption'); // расход
let pres_val = document.getElementById('pressure'); //давление

//клапан
let valves = [

   con_val15_1 = {
      int: -19.04072,
      B1: 158.00988,
      B2: -114.91494,
      B3: 92.42785,
      B4: -12.29976,
      calcCon_val_calc: calcCon_val
   },

   con_val15_1_6 = {
      int: -5.2184,
      B1: 40.81085,
      B2: 19.89139,
      B3: -11.76124,
      B4: 4.98452,
      calcCon_val_calc: calcCon_val
   },

   con_val15_2_5 = {
      int: -16.80228,
      B1: 82.15408,
      B2: -74.52091,
      B3: 30.7459,
      B4: -2.65905,
      calcCon_val_calc: calcCon_val
   },

   con_val20_4 = {
      int: -1.22153,
      B1: 11.17824,
      B2: -8.37302,
      B3: 5.11344,
      B4: -0.40786,
      calcCon_val_calc: calcCon_val
   },

   con_val20_6_3 = {
      int: 6.29783,
      B1: -11.63941,
      B2: 7.25707,
      B3: -0.42451,
      B4: 0.01075,
      calcCon_val_calc: calcCon_val
   },

   con_val25_6_3 = con_val20_6_3,

   con_val25_10 = {
      int: -10.10451,
      B1: 9.74352,
      B2: -1.11385,
      B3: 0.18086,
      B4: -0.00491,
      calcCon_val_calc: calcCon_val
   },

   con_val32_16 = {
      int: -18.74865,
      B1: 11.1291,
      B2: -1.09665,
      B3: 0.06728,
      B4: -0.000862257,
      calcCon_val_calc: calcCon_val
   },

   con_val40_25 = {
      int: -6.1116,
      B1: 2.63122,
      B2: -0.08469,
      B3: 0.00674,
      B4: -0.0000382241,
      calcCon_val_calc: calcCon_val
   },

   con_val50_40 = {
      int: 6.2866,
      B1: -2.11869,
      B2: 0.28995,
      B3: -0.00843,
      B4: 0.0000974261,
      calcCon_val_calc: calcCon_val
   }
];

function calcCon_val(con_valN) {
   return calc = Math.pow(con_valN, 4) * this.B4 + Math.pow(con_valN, 3) * this.B3 + Math.pow(con_valN, 2) * this.B2 + con_valN * this.B1 + this.int;
};

//насос
function calcPump(pres_valN) {
   return calc = Math.pow(pres_valN, 2) * this.B2 + pres_valN * this.B1 + this.int;
};

let pumps = [
   pump15 = {
      int: 38.73627,
      B1: -8.18855,
      B2: -0.68647,
      calcPump: calcPump
   },

   pump15_1_6 = pump15,
   pump15_2_5 = pump15,
   pump20 = {
      int: 58.34957,
      B1: -10.10902,
      B2: -0.50668,
      calcPump: calcPump
   },

   pump20_6_3 = pump20,
   pump25_32_40 = {
      int: 79.43386,
      B1: -7.06525,
      B2: 0.06686,
      calcPump: calcPump
   },

   pump25_10 = pump25_32_40,
   pump32_16 = pump25_32_40,
   pump40_25 = pump25_32_40,

   pump50 = {
      int: 103.22108,
      B1: -0.74958,
      B2: -0.07347,
      calcPump: calcPump
   }
];

////////////////////////////////////////////////////////////////////////////////
btnSolution.onclick = () => {
   rst()
   let form = document.querySelector('.form__mixer');
   let error = formValidate(form);

   //переопределяет введённое значение расхода в число
   let con_valN = Number(con_val.value.replace(/,/, '.'));
   //переопределяет введённое значение напора в число
   let pres_valN = Number(pres_val.value.replace(/,/, '.'));

   //расчёт "падения давления" смесаков
   var t0 = performance.now();
   // let Rcon_val = [];
   // valves.forEach((con_val) => {
   //    let Rcon_val_item = +con_val.calcCon_val_calc(con_valN).toFixed(f);
   //    Rcon_val.push(Rcon_val_item);
   // });
   
   let Rcon_val = valves.map(val => {
      return +val.calcCon_val_calc(con_valN).toFixed(f);
   });

   var t1 = performance.now();
   console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

   //расчёт "напор насоса" смесаков
   // let Rpump = [];
   // pumps.forEach((pump) => {
   //    let Rpump_item = +pump.calcPump(con_valN).toFixed(f);
   //    Rpump.push(Rpump_item);
   // });

   let Rpump = pumps.map(pump => {
      return +pump.calcPump(con_valN).toFixed(f);
   });

   //расчёт "Общее Падение давления жидкости" смесаков
   // let Rtotal_valve = [];
   // Rcon_val.forEach((con_val) => {
   //    let Rtotal_valve_item = +(8 + Number(con_val) + Number(pres_valN)).toFixed(f);
   //    Rtotal_valve.push(Rtotal_valve_item);
   // });

   let Rtotal_valve = Rcon_val.map(con_val => {
      return +(8 + Number(con_val) + Number(pres_valN)).toFixed(f);
   });

   // let Rvalve_auth = [];
   // Rcon_val.forEach((con_val, index) => {
   //    let Rvalve_auth_item = +(con_val / Rtotal_valve[index]).toFixed(f);
   //    Rvalve_auth.push(Rvalve_auth_item);
   // });

   let Rvalve_auth = Rcon_val.map((con_val, index) => {
      return +(con_val / Rtotal_valve[index]).toFixed(f);
   });

   let mixerName = [
      '15-1', '15-1,6', '15-2,5',
      '20-4', '20-6,3',
      '25-6,3', '25-10', '32-16', '40-25',
      '50-40'
   ]
   //если ошибок нет, то выполняется расчёт смесака
   if (error === 0) solution_result(Rcon_val, Rvalve_auth, Rtotal_valve, mixerName, Rpump);
};

//функция вывода смесака, при удовлетворении условиям
function solution_result(Rcon_val, Rvalve_auth, Rtotal_valve, mixerName, Rpump) {
   
   //вычисление индекса смесака
   const index = Rcon_val.findIndex((elem, i) => {
      return (
         ((0.15 <= Rvalve_auth[i]) || (0.15 <= Rvalve_auth[i] * (0.15 / 0.14)))
         && ((Rvalve_auth[i] <= 0.80) || ((Rvalve_auth[i] * 0.95) <= 0.80))
         && ((Rpump[i] >= Rtotal_valve[i]) || ((Rpump[i] * 1.05) >= Rtotal_valve[i]))
      )
   });

   //если идекс смесака определён, то
   if (!(index < 0)) {
      const tbody = document.querySelector('tbody');
      tbody.insertAdjacentHTML('beforeend', `
            <tr class="mixer">
            <td>${mixerName[index]}</td>
               <td>${String(Rcon_val[index]).replace(/\./, ',')}</td>
               <td>0,25(0,15)</td><td>&lt;</td>
               <td>${String(Rvalve_auth[index]).replace(/\./, ',')}</td>
               <td>&lt;</td><td>0,8</td><td>${String(Rpump[index]).replace(/\./, ',')}</td>
               <td colspan="2">&gt;</td><td>${String(Rtotal_valve[index]).replace(/\./, ',')}</td>
            </tr>`);
      //добавление кнопки копирования названия смесака
      const mixer = document.querySelector('.mixer');
      mixer.insertAdjacentHTML('beforebegin', `<div class="copy-icon copy"></div>`);
      //навешивание прослушки на кнопку копирования смесака
      const copy = document.querySelector('.copy-icon');
      copy.addEventListener('click', () => {
         copyText(mixerName[index])
         copy.classList.remove('copy');
         copy.classList.add('check');
      });

      //функция для копирования смесака
      function copyText(mixerName) {
         const fake = document.createElement('textarea');
         document.body.appendChild(fake);
         fake.innerText = `Смесительный узел SU ${mixerName} с 2-х ходовым клапаном`;
         fake.select();
         document.execCommand('copy');
         document.body.removeChild(fake);
      };
      
   } else return;
};



//функция удаления списка смесаков
function rst() {
   const mixer = document.querySelectorAll('.mixer');
   const copy = document.querySelector('.copy-icon');
   for (let i = 0; i < mixer.length; i++) {
      mixer[i].remove();
   }
   if (copy) copy.remove();
};

//кнопка удаления
btnReset.onclick = function () {
   rst()
};

function formValidate(form) {
   let error = 0;
   const formReq = form.querySelectorAll('.req');

   for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.value === '') {
         formAddError(input);
         error++;
      }
   }
   return error;
};


//работа с незаполненными полями
function formAddError(input) {
   input.classList.add('_error');
   input.parentNode.classList.add('data_error');
};

function formRemoveError(input) {
   input.classList.remove('_error');
   input.parentNode.classList.remove('data_error');
};
