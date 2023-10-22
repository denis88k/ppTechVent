import cls from './Footer.module.scss';

export const Footer = () => {
	return (
		<footer className={cls.footer}>
			<div className='container'>
				<div className={cls.footer__inner}>ТехОтдел 2023 год. V2.5 React</div>
			</div>
		</footer>
	);
};
