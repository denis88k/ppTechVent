export const valves = [
   {
      valveName: '15-1',
      int: -19.04072,
      B1: 158.00988,
      B2: -114.91494,
      B3: 92.42785,
      B4: -12.29976,
      calcCon_val_calc: calcCon_val
   },
   {
      valveName: '15-1,6',
      int: -5.2184,
      B1: 40.81085,
      B2: 19.89139,
      B3: -11.76124,
      B4: 4.98452,
      calcCon_val_calc: calcCon_val
   },
   {
      valveName: '15-2,5',
      int: -16.80228,
      B1: 82.15408,
      B2: -74.52091,
      B3: 30.7459,
      B4: -2.65905,
      calcCon_val_calc: calcCon_val
   },
   {
      valveName: '20-4',
      int: -1.22153,
      B1: 11.17824,
      B2: -8.37302,
      B3: 5.11344,
      B4: -0.40786,
      calcCon_val_calc: calcCon_val
   },
   {
      valveName: '20-6,3',
      int: 6.29783,
      B1: -11.63941,
      B2: 7.25707,
      B3: -0.42451,
      B4: 0.01075,
      calcCon_val_calc: calcCon_val
   },
   {
      valveName: '25-6,3',
      int: 6.29783,
      B1: -11.63941,
      B2: 7.25707,
      B3: -0.42451,
      B4: 0.01075,
      calcCon_val_calc: calcCon_val
   },
   {
      valveName: '25-10',
      int: -10.10451,
      B1: 9.74352,
      B2: -1.11385,
      B3: 0.18086,
      B4: -0.00491,
      calcCon_val_calc: calcCon_val
   },
   {
      valveName: '32-16',
      int: -18.74865,
      B1: 11.1291,
      B2: -1.09665,
      B3: 0.06728,
      B4: -0.000862257,
      calcCon_val_calc: calcCon_val
   },
   {
      valveName: '40-25',
      int: -6.1116,
      B1: 2.63122,
      B2: -0.08469,
      B3: 0.00674,
      B4: -0.0000382241,
      calcCon_val_calc: calcCon_val
   },
   {
      valveName: '50-40',
      int: 6.2866,
      B1: -2.11869,
      B2: 0.28995,
      B3: -0.00843,
      B4: 0.0000974261,
      calcCon_val_calc: calcCon_val
   }
]

export const pumps = [
   {
      pumpName: '15-1',
      int: 38.73627,
      B1: -8.18855,
      B2: -0.68647,
      calcPump: calcPump
   },
   {
      pumpName: '15-1,6',
      int: 38.73627,
      B1: -8.18855,
      B2: -0.68647,
      calcPump: calcPump
   },
   {
      pumpName: '15-2,5',
      int: 38.73627,
      B1: -8.18855,
      B2: -0.68647,
      calcPump: calcPump
   },
   {
      pumpName: '20-4',
      int: 58.34957,
      B1: -10.10902,
      B2: -0.50668,
      calcPump: calcPump
   },
   {
      pumpName: '20-6,3',
      int: 58.34957,
      B1: -10.10902,
      B2: -0.50668,
      calcPump: calcPump
   },
   {
      pumpName: '25-6,3',
      int: 79.43386,
      B1: -7.06525,
      B2: 0.06686,
      calcPump: calcPump
   },
   {
      pumpName: '25-10',
      int: 79.43386,
      B1: -7.06525,
      B2: 0.06686,
      calcPump: calcPump
   },
   {
      pumpName: '32-16',
      int: 79.43386,
      B1: -7.06525,
      B2: 0.06686,
      calcPump: calcPump
   },
   {
      pumpName: '40-25',
      int: 79.43386,
      B1: -7.06525,
      B2: 0.06686,
      calcPump: calcPump
   },
   {
      pumpName: '50-40',
      int: 103.22108,
      B1: -0.74958,
      B2: -0.07347,
      calcPump: calcPump
   }
]

// клапан
function calcCon_val(consumption) {
   return Math.pow(consumption, 4) * this.B4 + Math.pow(consumption, 3) * this.B3 + Math.pow(consumption, 2) * this.B2 + consumption * this.B1 + this.int
};

//насос
function calcPump(pressure) {
   return Math.pow(pressure, 2) * this.B2 + pressure * this.B1 + this.int
}