import cls from './Img.module.scss';

export const Img = propsImg => {
	const { src, alt } = propsImg;
	return (
		<img
			className={cls.Img}
			src={src}
			alt={alt}
		/>
	);
};
