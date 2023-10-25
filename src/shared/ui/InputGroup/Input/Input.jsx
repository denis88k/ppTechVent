import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';

export const Input = memo(propsInput => {
	const {
		className = '',
		label,
		value,
		onChange,
		children,
		...otherProps
	} = propsInput;

	return (
		<div className={classNames('form-item', {}, [className])}>
			<label className='label'>{label}</label>
			<input
				className='input'
				type='number'
				value={value}
				onChange={onChange}
				{...otherProps}
			/>
			{children}
		</div>
	);
});
