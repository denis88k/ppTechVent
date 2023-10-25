import { memo, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export const Select = memo(propsSelect => {
	const { options, label, value, onChange } = propsSelect;

	const onChangeHandler = e => {
		onChange?.(e);
	};

	const optionList = useMemo(
		() =>
			options?.map(option => (
				<option
					className={cls.option}
					value={option}
					key={option}
				>
					{option}
				</option>
			)),
		[options],
	);

	return (
		<div className={classNames('form-item', {}, [cls.Select])}>
			<label className='label'>{label}</label>
			<select
				className={classNames(cls.select, {}, ['input'])}
				onChange={onChangeHandler}
				value={value}
			>
				{optionList}
			</select>
		</div>
	);
});
