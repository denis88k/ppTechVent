import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './InputToggle.module.scss';

// children: SU, MSU, 2-х ходовой клапан, 3-х ходовой клапан
// id===value===htmlFor===(valve): SU, msu, 2, 3
// onChange: onChangeType, onChangeValve
// id === htmlFor
// type: checkbox, radio
// checked: radio-valve == '3' ? true : false, checkbox: reverseConfig,thermomanometer

export const InputToggle = memo(propsInputToggle => {
	const { type, value, isChecked, onChange, children } = propsInputToggle;

	return (
		<div className={styles.InputToggle}>
			<input
				className={styles.input}
				type={type}
				id={value}
				value={type === 'radio' ? value : ''}
				checked={isChecked}
				onChange={onChange}
			/>
			<label
				className={styles.label}
				htmlFor={value}
			>
				<span className={classNames(styles.span, {}, [styles[type]])} />
				{children}
			</label>
		</div>
	);
});
