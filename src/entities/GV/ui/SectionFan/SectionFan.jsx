import { useEffect, useState } from 'react';
import fan from 'shared/assets/img/section_fan.png';
import { Form } from 'shared/ui/Form/Form';
import { Img } from 'shared/ui/Img/Img';
import { Input } from 'shared/ui/InputGroup/Input/Input';
import { LabelResult } from 'shared/ui/LabelResult/LabelResult';
import { Select } from 'shared/ui/Select/Select';
import cls from './SectionFan.module.scss';
let k = 0;

export const SectionFan = ({ currLet }) => {
	console.log('currLet2', ++currLet);
	console.log('Fan', ++k);

	const optionsWheelFan = [
		22, 25, 28, 30, 31, 35, 40, 45, 50, 56, 63, 71, 80, 90, 100, 110,
	];
	const stepFindLengthFan = 5;
	const multipleNumber = 50;

	const [consumption, setConsumption] = useState(1000);
	const [wheelFan, setWheelFan] = useState(220);
	const [widthSection, setWidthSection] = useState(500);
	const [lengthSectionFan, setLengthSectionFan] = useState(700);
	const [maxSpeed, setMaxSpeed] = useState(4);
	const [maxLengthGV, setMaxLengthGV] = useState(0);
	const [minLengthGV, setMinLengthGV] = useState(0);
	const [changeLengthFan, setChangeLengthFan] = useState(false);
	const [focusLengthFan, setFocusLengthFan] = useState(false);

	const functionSolution = () => {
		if (
			consumption &&
			wheelFan &&
			widthSection &&
			lengthSectionFan &&
			maxSpeed
		) {
			if (lengthSectionFan < 500) {
				setLengthSectionFan(500);
				setChangeLengthFan(true);
				console.log('lengthSectionFan<550', lengthSectionFan);
				return;
			}
			// min длина гибкой вставки
			let lengthMin =
				consumption / (3600 * (maxSpeed / 1000) * (widthSection / 1000));

			let lengthMax, speedInLengthMax;
			let newLengthSectionFan = lengthSectionFan;

			const calcLengthSpeed = () => {
				// max длина гибкой вставки:
				// console.log(newLengthSectionFan, wheelFan, 'wheelFan')
				lengthMax = newLengthSectionFan - (wheelFan / 2 + 100);
				console.log('lengthSectionFan', lengthSectionFan);
				// скорость при данной длине гибкой вставки
				speedInLengthMax =
					consumption / (3600 * (lengthMax / 1000) * (widthSection / 1000));
			};

			calcLengthSpeed();

			if (
				lengthMax <= 0 ||
				speedInLengthMax >= maxSpeed ||
				speedInLengthMax < 0
			) {
				console.log(
					consumption,
					'consumption;',
					wheelFan,
					'wheelFan;',
					widthSection,
					'widthSection;',
					lengthSectionFan,
					'lengthSectionFan;',
					lengthMin,
					'lengthMin;',
					newLengthSectionFan,
					'newLengthSectionFan = lengthSectionFan;',
					lengthMax,
					'lengthMax;',
					speedInLengthMax,
					'speedInLengthMax;',
				);
				let i = 0;
				while (
					lengthMax <= 0 ||
					speedInLengthMax >= maxSpeed ||
					speedInLengthMax < 0
				) {
					i++;
					newLengthSectionFan = newLengthSectionFan + stepFindLengthFan;
					calcLengthSpeed();
				}
				console.log(newLengthSectionFan, 'после цикла');
				newLengthSectionFan =
					Math.ceil(
						(newLengthSectionFan - stepFindLengthFan) / multipleNumber,
					) * multipleNumber;
				// отнимаю 'stepFindLengthFan', потому что в цикле выше делал 'stepFindLengthFan'
				setLengthSectionFan(newLengthSectionFan);
				setChangeLengthFan(true);
			}
			//console.log(lengthMin, 'lengthMin', lengthMax, 'lengthMax', speedInLengthMax, 'speedInLengthMax', newLengthSectionFan, 'newLengthSectionFan')

			lengthMin = Math.ceil(lengthMin / multipleNumber) * multipleNumber;
			lengthMax = Math.ceil(lengthMax / multipleNumber) * multipleNumber;

			+lengthMin <= 250 ? setMinLengthGV(250) : setMinLengthGV(lengthMin);

			setMaxLengthGV(lengthMax);
		}
	};

	useEffect(() => {
		functionSolution();
	}, []);
	// consumption, wheelFan, widthSection, lengthSectionFan, maxSpeed;
	// TODO: исправить мигание при изменении длины секции вентилятора
	// useEffect(() => {
	// 	setChangeLengthFan(false);
	// }, [consumption, wheelFan, widthSection, maxSpeed]);

	return (
		<section className='section'>
			<Form title='Расчёт в секции вентилятора'>
				<Input
					label='Расход (м³):'
					value={consumption}
					onChange={e => {
						setConsumption(Number(e.target.value));
						functionSolution();
					}}
				/>
				<Select
					options={optionsWheelFan}
					label='Размер колеса (мм):'
					value={wheelFan}
					onChange={e => {
						setWheelFan(Number(e.target.value));
						functionSolution();
					}}
				/>
				<Input
					label='Ширина Гибкой вставки (мм):'
					value={widthSection}
					onChange={e => {
						setWidthSection(Number(e.target.value));
						functionSolution();
					}}
				/>
				<Input
					label='Длина секции вентилятора (мм):'
					value={lengthSectionFan}
					onChange={e => {
						setLengthSectionFan(Number(e.target.value));
						// setChangeLengthFan(false);
					}}
					// onFocus={() => {
					// 	setFocusLengthFan(true);
					// }}
					onBlur={() => {
						// setFocusLengthFan(false);
						functionSolution();
					}}
					className={cls.fanLength}
					children={changeLengthFan && <div className={cls.changeLengthFan} />}
				/>
				<Input
					label='Max скорость в Гибкой вставке (м/с):'
					value={maxSpeed}
					onChange={e => {
						setMaxSpeed(Number(e.target.value));
						functionSolution();
					}}
				/>
				<LabelResult
					label={
						<>
							Max длина&thinsp;<b>Гибкой вставки</b>&thinsp;(мм):
						</>
					}
					input={maxLengthGV}
				/>
				<LabelResult
					label={
						<>
							Min длина&thinsp;<b>Гибкой вставки</b>&thinsp;(мм):
						</>
					}
					input={minLengthGV}
				/>
			</Form>
			<Img
				src={fan}
				alt='Секция вентилятора'
			/>
		</section>
	);
};
