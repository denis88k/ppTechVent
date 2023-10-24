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
	const { type, id, checked, onChange, children } = propsInputToggle;

	return (
		<div className={styles.InputToggle}>
			<input
				className={styles.input}
				id={id}
				type={type} // checkbox : radio
				checked={checked}
				onChange={onChange}
			/>
			<label
				className={styles.label}
				htmlFor={id}
			>
				<span className={classNames(styles.span, {}, [styles[type]])} />
				{children}
			</label>
		</div>
	);
});
