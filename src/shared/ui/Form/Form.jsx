import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Form.module.scss';

export const Form = propsForm => {
	const { title, children, className = '' } = propsForm;
	return (
		<form className={classNames(cls.Form, {}, [className])}>
			<h3 className={cls.title}>{title}</h3>
			{children}
		</form>
	);
};
