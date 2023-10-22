import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LabelResult.module.scss';

export const LabelResult = memo(propsLabelResult => {
	const { label, input } = propsLabelResult;

	return (
		<div className='form-item'>
			<label className='label'>{label}</label>
			<div className='input'>{input}</div>
		</div>
	);
});
