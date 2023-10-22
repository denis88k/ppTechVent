import { SectionFan, SectionRegular } from 'entities/GV';
import styles from './GV.module.scss';

const GVPage = () => {
	let p1 = 0;
	let p2 = 0;
	return (
		<>
			<SectionRegular currLet={p1} />
			<hr />
			<SectionFan currLet={p2} />
		</>
	);
};

export default GVPage;
