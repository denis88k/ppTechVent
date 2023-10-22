import { useCallback, useEffect, useMemo, useState } from 'react';
import regular from 'shared/assets/img/section_regular.png';
import { Form } from 'shared/ui/Form/Form';
import { Img } from 'shared/ui/Img/Img';
import { Input } from 'shared/ui/InputGroup/Input/Input';
let i = 0;
let j = 0;
let k = 0;

export const SectionRegular = ({ currLet }) => {
	console.log('currLet1', ++currLet);
	console.log('Regular', ++k);
	const multipleNumber = 50; // округление для длины

	const [consumption, setConsumption] = useState(1000);
	const [widthSection, setWidthSection] = useState(500);
	const [maxSpeed, setMaxSpeed] = useState(4);
	const [minLengthGV, setMinLengthGV] = useState(250);

	// вычисление MIN длины гибкой вставки, при изменении consumption, widthSection, maxSpeed
	const onMinLengthGV = () => {
		console.log('onMinLengthGV', ++i);
		if (consumption && widthSection) {
			if (Number(maxSpeed) === 0) {
				return setMinLengthGV(0);
			}
			if (maxSpeed) {
				let lengthMin = (
					consumption /
					(3600 * (maxSpeed / 1000) * (widthSection / 1000))
				).toFixed(0);
				lengthMin = Math.ceil(lengthMin / multipleNumber) * multipleNumber;
				lengthMin <= 250 ? setMinLengthGV(250) : setMinLengthGV(lengthMin);
			}
		}
	};

	// вычисление MAX скорости при заданной длине гибкой вставки consumption, widthSection, maxSpeed
	const onMaxSpeed = () => {
		console.log('onMaxSpeed', ++j);
		if (consumption && widthSection) {
			if (+minLengthGV === 0) {
				return setMaxSpeed(0);
			}
			if (minLengthGV) {
				const NewMaxSpeed = (
					consumption /
					(3600 * (minLengthGV / 1000) * (widthSection / 1000))
				).toFixed(2);
				setMaxSpeed(NewMaxSpeed);
			}
		}
	};

	return (
		<section className='section'>
			<Form title='Расчёт в обычной секции'>
				<Input
					label='Расход (м³):'
					value={consumption}
					onChange={e => {
						setConsumption(Number(e.target.value));
						onMinLengthGV();
					}}
				/>
				<Input
					label='Ширина Гибкой вставки (мм):'
					value={widthSection}
					onChange={e => {
						setWidthSection(Number(e.target.value));
						onMinLengthGV();
					}}
				/>
				<Input
					label={
						<>
							Max скорость в&thinsp;<b>Гибкой вставке</b>&thinsp;(м/с):
						</>
					}
					value={maxSpeed}
					onChange={e => {
						setMaxSpeed(Number(e.target.value));
						onMinLengthGV();
					}}
				/>
				<Input
					label={
						<>
							Min длина&thinsp;<b>Гибкой вставки</b>&thinsp;(мм):
						</>
					}
					value={minLengthGV}
					onChange={e => {
						setMinLengthGV(Number(e.target.value));
						onMaxSpeed();
					}}
				/>
			</Form>
			<Img
				src={regular}
				alt='Обычная секция'
			/>
		</section>
	);
};
