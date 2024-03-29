import { pumps, valves } from 'entities/Mixer/model/data';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Form } from 'shared/ui/Form/Form';
import { Input } from 'shared/ui/InputGroup/Input/Input';
import { InputToggle } from 'shared/ui/InputGroup/InputToggle/InputToggle';
import cls from './Mixer.module.scss';

const TableThead = memo(() => (
	<thead>
		<tr>
			<th rowSpan='2'>Смеситель</th>
			<th rowSpan='2'>
				Падение <br /> давления, кПа
			</th>
			<th colSpan='9'>Проверка условий</th>
		</tr>
		<tr>
			<th colSpan='5'>Авторитет клапана</th>
			<th colSpan='2'>Общее падение давления жидкости, кПа</th>
			<th colSpan='2'>
				Напор <br /> насоса, кПа
			</th>
		</tr>
	</thead>
));

export const Mixer = () => {
	const [consumption, setConsumption] = useState(0.5);
	const [pressure, setPressure] = useState(1);
	const [resultTable, setResultTable] = useState([]);
	const [isCheckMark, setIsCheckMark] = useState(false);
	const [textCheckMark, setTextCheckMark] = useState('');
	const [type, setType] = useState('SU');
	const [valve, setValve] = useState('2');
	const [isReverseConfig, setIsReverseConfig] = useState(false);
	const [isThermomanometer, setIsThermomanometer] = useState(false);
	const [reverseConfig, setReverseConfig] = useState('');
	const [thermomanometer, setThermomanometer] = useState('');

	const replaceReg = /\./; // замена точек, на запятые
	const roundingNumbers = 2; // округление до 2 чисел после запятой
	const mixerName = [
		'15-1',
		'15-1,6',
		'15-2,5',
		'20-4',
		'20-6,3',
		'25-6,3',
		'25-10',
		'32-16',
		'40-25',
		'50-40',
	];

	const solutionMixer = () => {
		if (consumption && pressure) {
			//падения давления на клапане
			const valvePressureDrop = valves.map(valve => {
				return valve.calcCon_val_calc(consumption);
			});
			// console.log(valvePressureDrop, 'valvePressureDrop')

			//напор насоса
			const pumpPressure = pumps.map(pump => {
				return pump.calcPump(consumption);
			});
			// console.log(pumpPressure, 'pumpPressure')

			//Общее Падение давления жидкости
			const totalPressureDrop = valvePressureDrop.map(valve => {
				return 8 + pressure + valve;
			});
			// console.log(totalPressureDrop, 'totalPressureDrop')

			// авторитет
			const valveAuthority = valvePressureDrop.map((valve, index) => {
				return valve / totalPressureDrop[index];
			});
			// console.log(valveAuthority, 'valveAuthority')

			const results = mixerName.map((mixer, index) => {
				return {
					mixerName: mixer,
					valvePressureDrop: valvePressureDrop[index],
					valveAuthority: valveAuthority[index],

					totalPressureDrop: totalPressureDrop[index],
					pumpPressure: pumpPressure[index],
				};
			});
			setResultTable([...results]);
			// console.log(results, 'results')
			// console.log(result[9].totalPressureDrop, result[9].pumpPressure)

			// проверка выполнения условий на авторитет и напор(давление) насоса
			const isMatch = result =>
				(0.15 <= result.valveAuthority ||
					0.15 * 0.9 <= result.valveAuthority) &&
				(result.valveAuthority <= 0.8 || result.valveAuthority <= 0.8 * 1.1) &&
				(result.pumpPressure >= result.totalPressureDrop ||
					result.pumpPressure * 1.1 >= result.totalPressureDrop) &&
				(result.match = true);

			results.forEach(result => isMatch(result));
		}
	};

	const useDebounce = (callback, delay) => {
		const timer = useRef(null);

		const debouncedCallback = useCallback(
			(...args) => {
				if (timer.current) {
					clearTimeout(timer.current);
				}
				timer.current = setTimeout(() => {
					callback(...args);
				}, delay);
			},
			[callback, delay],
		);

		return debouncedCallback;
	};
	const newCopyName = useDebounce(() => {
		setIsCheckMark(false);
		setTextCheckMark('');
		console.log('end');
	}, 8888);

	function copyNameMixer(mixerName) {
		const mixerText = `Смесительный узел ${type} ${mixerName} с ${valve}-х ходовым клапаном${thermomanometer}${reverseConfig}`;
		navigator.clipboard.writeText(mixerText).then(() => {
			setTextCheckMark(mixerText);
			setIsCheckMark(true);
			newCopyName();
		});
	}

	const onChangeType = e => {
		setType(e.target.id);
	};
	const onChangeValve = e => {
		setValve(e.target.id);
	};

	const onChangeReverseConfig = () => {
		console.log(isReverseConfig, 'isReverseConfig');
		setIsReverseConfig(!isReverseConfig);
		console.log(isReverseConfig, 'isReverseConfig');
		!isReverseConfig
			? setReverseConfig(' (Обратной конфигурации)')
			: setReverseConfig('');
	};

	const onChangeThermomanometer = () => {
		console.log(isThermomanometer, 'isReverseConfig');
		setIsThermomanometer(!isThermomanometer);
		console.log(isThermomanometer, 'isReverseConfig');
		!isThermomanometer
			? setThermomanometer(' и термоманометрами')
			: setThermomanometer('');
	};

	useEffect(() => {
		solutionMixer();
	}, [consumption, pressure]);

	const resultMixerName = result => <td>{result.mixerName}</td>;
	const resultValvePressureDrop = result => (
		<td>
			{result.valvePressureDrop
				.toFixed(roundingNumbers)
				.replace(replaceReg, ',')}
		</td>
	);
	const startValveAuthority = <td>0,25&nbsp;(0,15)</td>;
	const leftArrowValveAuthority = result =>
		0.15 * 0.9 <= result.valveAuthority ? (
			<td>&lt;</td>
		) : (
			<td className={cls.notMatch}>&gt;</td>
		);
	const resultValveAuthority = result => (
		<td>
			{result.valveAuthority.toFixed(roundingNumbers).replace(replaceReg, ',')}
		</td>
	);
	const rightArrowValveAuthority = result =>
		result.valveAuthority <= 0.8 * 1.1 ? (
			<td>&lt;</td>
		) : (
			<td className={cls.notMatch}>&gt;</td>
		);
	const endValveAuthority = <td>0,8</td>;

	const resultTotalPressureDrop = result => (
		<td>
			{result.totalPressureDrop
				.toFixed(roundingNumbers)
				.replace(replaceReg, ',')}
		</td>
	);
	const arrowTotalPressureDrop = result =>
		result.totalPressureDrop <= result.pumpPressure * 1.1 ? (
			<td>&lt;</td>
		) : (
			<td className={cls.notMatch}>&gt;</td>
		);
	const resultPumpPressure = result => (
		<td>
			{result.pumpPressure.toFixed(roundingNumbers).replace(replaceReg, ',')}
		</td>
	);

	return (
		<section className={cls.mixer}>
			<Form
				title='Расчёт смесительного узла'
				className={cls.form}
			>
				<Input
					label='Расход жидкости (м³/ч):'
					value={consumption}
					onChange={e => {
						setConsumption(Number(e.target.value.replace(/,/gi, '.')));
					}}
				/>
				<Input
					label='Падение давления жидкости в ТО (кПа):'
					value={pressure}
					onChange={e => {
						setPressure(Number(e.target.value.replace(/,/gi, '.')));
					}}
				/>
				{/* radio */}
				<div className='form-item'>
					<InputToggle
						type='radio'
						id='SU'
						checked={type === 'SU'}
						onChange={onChangeType}
						children='SU'
					/>
					<InputToggle
						type='radio'
						id='MSU'
						checked={type === 'MSU'}
						onChange={onChangeType}
						children='MSU'
					/>
					<InputToggle
						type='radio'
						id='2'
						checked={valve === '2'}
						onChange={onChangeValve}
						children='2-х ходовой клапан'
					/>
					<InputToggle
						type='radio'
						id='3'
						checked={valve === '3'}
						onChange={onChangeValve}
						children='3-х ходовой клапан'
					/>
				</div>
				{/* checkbox */}
				<div className='form-item'>
					<InputToggle
						type='checkbox'
						id='reverseConfig'
						checked={isReverseConfig}
						onChange={onChangeReverseConfig}
						children='Обратной конфигурацией'
					/>
					<InputToggle
						type='checkbox'
						id='thermomanometer'
						checked={isThermomanometer}
						onChange={onChangeThermomanometer}
						children='Термоманометр'
					/>
				</div>
			</Form>

			<div className={cls.block__table}>
				<table className={cls.table}>
					<TableThead />
					{/* &gt; - >;  &lt; - <*/}
					{/* &#8814; - не меньше, зачёркнутое меньше </ */}
					<tbody>
						{resultTable.map(result => (
							<tr
								className={classNames(
									cls.row,
									{ [cls.match]: result.match },
									[],
								)}
								key={result.mixerName}
								onClick={() => copyNameMixer(result.mixerName)}
							>
								{resultMixerName(result)}
								{resultValvePressureDrop(result)}
								{startValveAuthority}
								{leftArrowValveAuthority(result)}
								{resultValveAuthority(result)}
								{rightArrowValveAuthority(result)}
								{endValveAuthority}
								{resultTotalPressureDrop(result)}
								{arrowTotalPressureDrop(result)}
								{resultPumpPressure(result)}
							</tr>
						))}
					</tbody>
				</table>

				<div className={cls.mixer_choice}>
					{isCheckMark && (
						<p className={cls.mixer_text}>
							<u>Скопирован:</u>&#x2002; <i>{textCheckMark}</i>
						</p>
					)}
				</div>
			</div>
		</section>
	);
};
