import { GVPage } from 'pages/GV';
import { MixerPage } from 'pages/Mixer';
import { Suspense, useEffect, useState } from 'react';
import img0 from 'shared/assets/img/0.png';
import img1 from 'shared/assets/img/1.png';
import img2 from 'shared/assets/img/2.png';
import { Loader } from 'shared/ui/Loader/Loader';
import { Footer } from 'widgets/Footer/Footer';
import { Tabs } from 'widgets/Tabs/Tabs';

function App() {
	const [tab, setTab] = useState('gv');
	const [slide, setSlide] = useState(0);
	const images = [img0, img1, img2];

	const onTabSelect = tabName => {
		setTab(tabName);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setSlide(prevIndex => (prevIndex + 1) % images.length);
		}, 3_000);

		return () => clearInterval(interval);
	}, []);

	const style = {
		backgroundImage: `url(${images[slide]})`,
	};

	return (
		<div
			className='App'
			style={style}
		>
			<Tabs
				onTabSelect={onTabSelect}
				tabSelect={tab}
			/>
			<div className='content'>
				<div className='container'>
					<div className='content__inner'>
						<Suspense fallback={<Loader />}>
							{tab === 'gv' ? <GVPage /> : <MixerPage />}
						</Suspense>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
