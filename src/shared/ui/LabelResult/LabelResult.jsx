import { memo } from 'react';

export const LabelResult = memo(propsLabelResult => {
	const { label, input } = propsLabelResult;

	return (
		<div className='form-item'>
			<label className='label'>{label}</label>
			<div className='input'>{input}</div>
		</div>
	);
});
