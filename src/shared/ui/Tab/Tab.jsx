import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Tab.module.scss';

export const Tab = memo(props => {
	const { activeTab, onClick, text } = props;

	const mods = {
		[cls.active]: activeTab,
	};

	return (
		<div
			className={classNames(cls.Tab, mods, [])}
			onClick={onClick}
		>
			{text}
		</div>
	);
});
