import { GVPage } from 'pages/GV';
import { MixerPage } from 'pages/Mixer';
import { Suspense, useState } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { Footer } from 'widgets/Footer/Footer';
import { Tabs } from 'widgets/Tabs/Tabs';

function App() {
	const [tab, setTab] = useState('gv');

	const onTabSelect = tabName => {
		setTab(tabName);
	};

	return (
		<div className='App'>
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
