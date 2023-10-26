import { GVPage } from 'pages/GV';
import { MixerPage } from 'pages/Mixer';
import { Suspense, useEffect, useState } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { Footer } from 'widgets/Footer/Footer';
import { Tabs } from 'widgets/Tabs/Tabs';

function App() {
	const [tab, setTab] = useState('gv');
	const [slide, setSlide] = useState(1);
	const images = ['1', '2', '3'];

	const onTabSelect = tabName => {
		setTab(tabName);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setSlide(prevIndex => (prevIndex + 1) % images.length);
		}, 10_000);

		return () => clearInterval(interval);
	}, []);

	const style = {
		backgroundImage: `url(src/shared/assets/img/${String(slide)}.png)`,
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
