import { lazy } from 'react';

// export const MixerPageAsync = lazy(() => import('./MixerPage'));
export const MixerPageAsync = lazy(
	() =>
		new Promise(resolve => {
			setTimeout(() => resolve(import('./MixerPage')), 700);
		}),
);
